import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useFoodRequests = () => {
    const axiosPublic = useAxiosPublic();
    const {  data: foodRequests, refetch  } = useQuery({
        queryKey: ['foodRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/foodRequests');
            return res.data;
        }
    })
    return {foodRequests,refetch};
};

export default useFoodRequests;