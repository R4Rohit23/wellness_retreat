// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const axios = require("axios")
const prisma = new PrismaClient();

(async function main() {
	try {
		await prisma.retreats.createMany({
			data: await axios.get("https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"),
		});

		console.log("Data seeded successfully");
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
})();
