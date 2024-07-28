import axios from "axios";
import ROUTES from "../Routes";
import { useQuery } from "@tanstack/react-query";
import { Retreat } from "../interface/Retreat";

interface IResponse {
	data: Retreat[];
	meta: {
		limit: number;
		page: number;
		total: number;
		totalPages: number;
	};
	distinctConditions: string[];
}

interface IProps {
	page?: number;
	type?: string;
	search?: string;
}

export const userGetAllRetreats = ({ page, type, search }: IProps) => {
	const fetchRetreats = async () => {
		try {
			let url = ROUTES.GET_RETREATS;

			if (page) {
				url += `?page=${page}`;
			}
			if (type) {
                url += `&filter=${type}`;
            }
			if (search) {
                url += `&search=${search}`;
            }

			const { data, status } = await axios.get(url);

			if (!status) {
				console.error("Failed to fetch retreats");
				return;
			}
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const { data, isError, isLoading, error } = useQuery<IResponse>({
		queryKey: ["retreats", page, search, type],
		queryFn: fetchRetreats,
	});

	return { data, isError, isLoading, error };
};
