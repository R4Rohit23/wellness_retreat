import { FaLocationDot, FaIndianRupeeSign, FaRegClock } from "react-icons/fa6";
import { epochToDate } from "../utils/reusableFunctions";
import { Retreat } from "../interface/Retreat";
import { useState } from "react";
import OverlayFragment from "../common/OverlayFragement";
import Booking from "./Booking";

interface IProps {
	retreat: Retreat;
}

const RetreatItems = ({ retreat }: IProps) => {
	const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

	const handleBookingToggle = () => setIsBookingOpen((prev) => !prev);

	return (
		<div
			className="border-2 rounded-lg shadow-lg max-w-sm hover:scale-105 transition-transform duration-200"
			key={retreat?.title}
			onClick={handleBookingToggle}
		>
			<div>
				<img
					src={retreat?.image}
					alt={retreat?.title}
					className="w-full h-80 rounded-t-lg"
				/>
			</div>
			<div className="px-5 py-3 text-start flex flex-col gap-2 ">
				<div className="flex gap-2 items-center">
					<h2 className="text-start text-base font-semibold">
						{retreat.title}
					</h2>
					<p className="text-sm text-gray-500">{epochToDate(retreat.date)}</p>
				</div>

				<p className="text-sm text-gray-600">{retreat.description}</p>

				<div className="flex gap-5 items-center">
					<p className="flex items-center gap-2">
						<FaLocationDot />
						{retreat.location}
					</p>

					<p className="flex items-center gap-1">
						<FaIndianRupeeSign />
						{retreat.price}
					</p>
					<p className="flex items-center gap-1">
						<FaRegClock />
						{retreat.duration}
					</p>
				</div>
			</div>

			<OverlayFragment
				children={<Booking retreat={retreat} setIsOpen={setIsBookingOpen} />}
				isOpen={isBookingOpen}
				setIsOpen={setIsBookingOpen}
			/>
		</div>
	);
};

export default RetreatItems;
