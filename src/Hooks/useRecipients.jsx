import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useRecipients = () => {
    const axiosPublic = useAxiosPublic();

    const {  data: recipients, refetch  } = useQuery({
        queryKey: ['recipients'],
        queryFn: async () => {
            const res = await axiosPublic.get('/recipients');
            return res.data;
        }
    })
    return {recipients,refetch};
};

export default useRecipients;