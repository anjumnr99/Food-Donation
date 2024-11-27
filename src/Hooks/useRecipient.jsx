import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRecipient = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data, isLoading} = useQuery({
        queryKey: [user?.email, 'isRecipient'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/recipient/${user?.email}`);
            return res.data; // Return the entire response object
        },
        enabled: !!user?.email, // Ensure query runs only when email exists
    });

    const isRecipient = data?.recipient; // Extract recipient status
    const recipient = data?.findRecipient; // Extract the full object
console.log(isRecipient, recipient);
    return { isRecipient, recipient,isLoading};
};

export default useRecipient;