
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useIndividualDonors = () => {

    const axiosPublic = useAxiosPublic();
    const {  data: individualDonors, refetch  } = useQuery({
        queryKey: ['individualDonors'],
        queryFn: async () => {
            const res = await axiosPublic.get('/individualDonors');
            return res.data;
        }
    })
    return {individualDonors,refetch};
};

export default useIndividualDonors;