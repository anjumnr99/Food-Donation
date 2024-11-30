import { Box, Button, Card, CardContent, Grid2, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const DonorsDonationOffers = () => {
    const { user } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();
    const [offers, setOffers] = useState([]);

    const { data: donations, refetch } = useQuery({
        queryKey: ['activeDonation'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/activeDonations/donors?email=${user?.email}`);
            // console.log('res data:',res.data);
            return res.data;
        }

    });
    useEffect(() => {
        setOffers(donations);
    }, [donations])

    const handleCancelDonation = (id) => {
        console.log(`Request with ID ${id} has been cancelled.`);
        axiosPublic.delete(`/donation/${id}`)
        .then(res => {
            console.log(res.data);
            if (res.data?.deletedCount > 0) {
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Request Canceled!"
                  });
                  refetch();
            }

        })
    };

    return (
        <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" mb={3}>Active Donations</Typography>
        {offers?.length > 0 ? (
          <div>
            <Grid2 container spacing={2}>
              {
                offers.map((offer) => (
                  <Card key={offer.donation_id} sx={{ marginBottom: "15px" }}>
                    <CardContent>
                      <Typography variant="h6">{offer.item_name}</Typography>
                      <Typography>Quantity: {offer.quantity} lbs</Typography>
                      <Typography>Location: {offer.location}</Typography>
                      <Typography>Expiry Date: {offer.expire_date}</Typography>
                      <Typography>Notes: {offer.notes}</Typography>
                      <Button
                      onClick={() => handleCancelDonation(offer._id)} 
                      variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                        Cancel Donation
                      </Button>
                    </CardContent>
                  </Card>
                ))
              }
            </Grid2>
          </div>
        ) : (
          <Typography>You do not have any active donations available at the moment.</Typography>
        )}
      </Box>
       
    );
};

export default DonorsDonationOffers;