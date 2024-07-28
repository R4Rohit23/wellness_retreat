import { userGetAllRetreats } from "../hooks/useGetAllRetreats";
import RetreatItems from "../components/RetreatItems";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SelectMenu from "../common/SelectMenu";

const Retreats = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState<string>();
	const [type, setType] = useState<string>();

	const { data, isLoading } = userGetAllRetreats({ page, search, type });


	return (
		<div>
			<h1 className="text-3xl font-bold">Wellness Retreats</h1>
			<div className="flex items-center justify-center mt-5 gap-5">
				<div className="border   rounded-full  text-black flex items-center gap-3 px-5 py-2 ">
					<FaMagnifyingGlass />
					<input
						type="text"
						className="w-full outline-none"
						placeholder="Search something here..."
						onChange={(e) => {
							setTimeout(() => {
								setSearch(e.target.value);
							}, 1000);
						}}
					/>
				</div>

				<SelectMenu
					title="Type"
					options={data?.distinctConditions as string[]}
					selected={type as string}
					setSelected={setType}
				/>
			</div>

			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-10 justify-center">
						{data?.data &&
							data?.data?.length > 0 &&
							data?.data?.map((item) => <RetreatItems retreat={item} />)}
					</div>

					<div className="w-full flex justify-between mt-10">
						<button
							className="bg-black text-white px-3 py-2 rounded-lg hover:shadow-lg disabled:opacity-40"
							disabled={page <= 1}
							onClick={() => setPage(page - 1)}
						>
							Previous
						</button>
						<button
							className="bg-black text-white px-3 py-2 rounded-lg hover:shadow-lg disabled:opacity-40"
							disabled={data?.meta?.page! >= data?.meta?.totalPages!}
							onClick={() => setPage(page + 1)}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Retreats;
