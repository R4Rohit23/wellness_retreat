const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const serverless = require("serverless-http");
const { createServer } = require("http");
const { PrismaClient } = require("@prisma/client");
dotenv.config();

const app = express();
const httpServer = createServer(app);
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// for testing
app.get("/", (req, res) => {
	res.json({ message: "success" });
});

// Get all retreats
app.get("/retreats", async (req, res) => {
	try {
		const { filter, location, search, page = 1, limit = 5 } = req.query;
		const skip = (page - 1) * limit;

		let whereClause = {};

		if (filter) {
			whereClause.condition = { contains: filter, mode: "insensitive" };
		}

		if (location) {
			whereClause.location = { contains: location, mode: "insensitive" };
		}

		if (search) {
			whereClause.OR = [
				{ title: { contains: search, mode: "insensitive" } },
				{ description: { contains: search, mode: "insensitive" } },
				{ location: { contains: search, mode: "insensitive" } },
				{ condition: { contains: search, mode: "insensitive" } },
			];
		}

		const retreats = await prisma.retreats.findMany({
			where: whereClause,
			skip: parseInt(skip),
			take: parseInt(limit),
			orderBy: { date: "desc" },
		});

		const totalCount = await prisma.retreats.count({ where: whereClause });

		const distinctConditions = [
			...new Set(
				(await prisma.retreats.findMany({ select: { condition: true } })).map(
					(retreat) => retreat.condition
				)
			),
		];

		res.json({
			data: retreats,
			meta: {
				total: totalCount,
				page: parseInt(page),
				limit: parseInt(limit),
				totalPages: Math.ceil(totalCount / limit),
			},
			distinctConditions,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Server error");
	}
});

app.post("/book", async (req, res) => {
	try {
		const { user_name, user_email, user_phone, retreat_id, booking_date } =
			req.body;

		if (!user_email && !retreat_id) {
			return res
				.status(400)
				.json({ error: "Missing required fields. - [user_email, retreat_id]" });
		}

		// Check if the user already exists
		let user = await prisma.user.findUnique({
			where: { email: user_email },
		});

		// If user doesn't exist, create a new user
		if (!user) {
			user = await prisma.user.create({
				data: {
					name: user_name,
					email: user_email,
					phone: user_phone,
				},
			});
		}

		// Check if the user has already booked this retreat
		const existingBooking = await prisma.booking.findFirst({
			where: {
				userEmail: user_email,
				retreatId: retreat_id,
			},
		});

		if (existingBooking) {
			return res
				.status(400)
				.json({ error: "You have already booked this retreat." });
		}

		// Create the booking
		const booking = await prisma.booking.create({
			data: {
				userEmail: user_email,
				retreatId: retreat_id,
				booking_date: String.toString(booking_date),
			},
		});

		res.status(201).json({
			message: "Booking created successfully",
			booking,
		});
	} catch (error) {
		console.error("Error creating booking:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
	console.log(`Server is running on PORT: ${port}`);
});

module.exports.handler = async (event, context) => {
	try {
		console.log(`[handler] Event received - ${JSON.stringify(event)}`);
		const path = event.path || "";
		console.log("[Lambda Handler] Requested Path -", path);
		return await serverless(app)(event, context);
	} catch (error) {
		console.error("Lambda Handler Error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Internal Server Error" }),
		};
	}
};

// app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}`);
// });
