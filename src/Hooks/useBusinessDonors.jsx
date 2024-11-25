import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useBusinessDonors = () => {

    const axiosPublic = useAxiosPublic();
    const {  data: businessDonors, refetch  } = useQuery({
        queryKey: ['businessDonors'],
        queryFn: async () => {
            const res = await axiosPublic.get('/businessDonors');
            return res.data;
        }
    })
    return {businessDonors,refetch};
};

export default useBusinessDonors;