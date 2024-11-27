import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useIndividualDonor = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {  data, isLoading  } = useQuery({
        queryKey: [user?.email,'isIndividualDonor'],
        queryFn: async() =>{
            const res = await axiosPublic.get(`/individualDonor/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,

    })
    const isIndividualDonor = data?.individualDonor; // Extract recipient status
    const IndividualDonor = data?.findIndividualDonor; // Extract the full object
console.log(isIndividualDonor, IndividualDonor);
    return { isIndividualDonor, IndividualDonor,isLoading};
};

export default useIndividualDonor;