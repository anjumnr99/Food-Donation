import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useNotification = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [user?.email, 'notifications'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/notifications/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const notifications = data?.notifications || []; 

    if (isError) {
        console.error("Error fetching notifications:", error);
    }

    return { notifications, isLoading };
};

export default useNotification;
