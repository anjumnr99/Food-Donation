import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useBusinessDonor = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {  data: isBusinessDonor  } = useQuery({
        queryKey: [user?.email,'isBusinessDonor'],
        queryFn: async() =>{
            const res = await axiosPublic.get(`/businessDonor/${user?.email}`);
            return res.data?.businessDonor;
        }

    })
    console.log(isBusinessDonor);
    return isBusinessDonor;
};

export default useBusinessDonor;