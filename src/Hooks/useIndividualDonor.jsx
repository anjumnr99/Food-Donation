import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useIndividualDonor = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {  data: isIndividualDonor  } = useQuery({
        queryKey: [user?.email,'isIndividualDonor'],
        queryFn: async() =>{
            const res = await axiosPublic.get(`/individualDonor/${user?.email}`);
            return res.data?.individualDonor;
        }

    })
    console.log(isIndividualDonor);
    return isIndividualDonor;
};

export default useIndividualDonor;