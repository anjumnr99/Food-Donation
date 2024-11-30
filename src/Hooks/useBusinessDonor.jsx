import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useBusinessDonor = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {  data, isLoading } = useQuery({
        queryKey: [user?.email,'isBusinessDonor'],
        queryFn: async() =>{
            const res = await axiosPublic.get(`/businessDonor/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,

    })
    const isBusinessDonor = data?.businessDonor; // Extract recipient status
    const businessDonor = data?.findBusinessDonor; // Extract the full object
console.log(isBusinessDonor, businessDonor);
    return { isBusinessDonor, businessDonor,isLoading};
};

export default useBusinessDonor;