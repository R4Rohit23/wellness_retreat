import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import clsx from "clsx";
import { Retreat } from "../interface/Retreat";
import { useState } from "react";
import axios from "axios";
import ROUTES from "../Routes";
import toast from "react-hot-toast";

interface IProps {
	retreat: Retreat;
	setIsOpen: (value: any) => void;
}

export default function Booking({ retreat, setIsOpen }: IProps) {
	const [formData, setFormData] = useState<any>({ retreat_id: retreat?.id });
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event: any) => {
		try {
			event.preventDefault();
			setIsLoading(true);
			const { status } = await axios.post(ROUTES.BOOK_RETREAT, {
				...formData,
				booking_date: new Date(formData?.booking_date).getTime(),
			});

			if (status >= 200 && status < 3000) {
                toast.success("Retreat booked successfully");
                setIsOpen(false);
				setIsLoading(false);
			}
			setIsLoading(false);    
		} catch (error: any) {
			setIsLoading(false);
			console.error("Error booking retreat", error);
			toast.error(error?.response?.data?.error ?? "Something went wrong while booking");
		}
	};

	console.log(formData);

	return (
		<div className="w-full">
			<Fieldset className="space-y-6 rounded-xl bg-white/5">
				<Legend className="text-lg font-semibold text-black">
					Booking details
				</Legend>
				<Field>
					<div className="flex flex-col gap-5 mt-3 w-80">
						<div>
							<Label className="text-sm/6 font-medium text-black">
								Retreat Id
							</Label>
							<Input
								className={clsx(
									"block w-full rounded-lg border py-1.5 px-3 text-sm/6 text-black",
									"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
								)}
								name="retreat_id"
								type="text"
								placeholder="Enter your username..."
								disabled
								value={retreat?.id}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label className="text-sm/6 font-medium text-black">
								Username
							</Label>
							<Input
								className={clsx(
									"block w-full rounded-lg border py-1.5 px-3 text-sm/6 text-black",
									"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
								)}
								name="user_name"
								type="text"
								placeholder="Enter your username..."
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label className="text-sm/6 font-medium text-black">Email</Label>
							<Input
								className={clsx(
									"block w-full rounded-lg border py-1.5 px-3 text-sm/6 text-black",
									"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
								)}
								name="user_email"
								type="email"
								placeholder="Enter your email..."
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label className="text-sm/6 font-medium text-black">
								Phone Number
							</Label>
							<Input
								className={clsx(
									"block w-full rounded-lg border py-1.5 px-3 text-sm/6 text-black",
									"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
								)}
								name="user_phone"
								type="number"
								placeholder="Enter your phone number..."
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label className="text-sm/6 font-medium text-black">
								Booking Date
							</Label>
							<Input
								className={clsx(
									"block w-full rounded-lg border py-1.5 px-3 text-sm/6 text-black",
									"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
								)}
								name="booking_date"
								type="date"
								onChange={handleInputChange}
							/>
						</div>

						<button
							className="text-sm w-full bg-black text-white py-2 rounded-lg hover:shadow-lg disabled:opacity-40"
							onClick={(e) => handleSubmit(e)}
							disabled={isLoading}
						>
							Book
						</button>
					</div>
				</Field>
			</Fieldset>
		</div>
	);
}
