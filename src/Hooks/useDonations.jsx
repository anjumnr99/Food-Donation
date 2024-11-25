import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useDonations = () => {
    const axiosPublic = useAxiosPublic();
    const {  data: donations, refetch  } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donations');
            return res.data;
        }
    })
    return {donations,refetch};
};
export default useDonations;