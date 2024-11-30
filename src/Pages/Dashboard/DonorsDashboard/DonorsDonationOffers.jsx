import { Box, Button, Card, CardContent, Grid2, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import AddNotificationContent from "../../../Components/AddNotificationContent";


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

  const handleConfirm = (id,donation) => {

    axiosPublic.patch(`/donation/confirm/${id}`)
      .then(res => {
        console.log(res.data);
        console.log('Confirmed!');
        if (res.data?.modifiedCount) {
          const dataId = id;
          const message = `Donor confirm the donation you have requested`;
          const sent_to = donation.accepted_by;
          const from = user.email;

          const notificationData = {
            dataId,
            message,
            sent_to,
            from
          }
          
          AddNotificationContent(notificationData);
        }
        
      })
  }
  const handleReject = (id,donation) => {
    const recvMail = donation.accepted_by;
    axiosPublic.patch(`/donation/reject/${id}`)
      .then(res => {
        console.log(res.data);
        console.log('Rejected!');
        if (res.data?.modifiedCount) {
          const dataId = id;
          const message = `Donor reject the donation you have requested`;
          const sent_to = recvMail ;
          const from = user.email;

          const notificationData = {
            dataId,
            message,
            sent_to,
            from
          }
          
          AddNotificationContent(notificationData);
        }
        refetch();
      })
  }
  const handleComplete = (id,donation) => {
    axiosPublic.patch(`/donation/complete/${id}`)
      .then(res => {
        console.log(res.data);
        console.log('Completed!');
        if (res.data?.modifiedCount) {
          const dataId = id;
          const message = `Donation Is Completed! How Was your Experiences?`;
          const sent_to = donation?.accepted_by;
          const from = user?.email;

          const notificationData = {
            dataId,
            message,
            sent_to,
            from
          }
          
          AddNotificationContent(notificationData);
        }
        
      })
  }
  const handleCloseDonation = (id) => {
    axiosPublic.patch(`/donation/close/${id}`)
      .then(res => {
        console.log(res.data);
        console.log('Closed!');
        refetch();
      })
  }

  return (
    <Box sx={{ padding: "20px" }}>

      {offers?.length > 0 ? (

        <div>
          <Typography variant="h4" mb={3}>Active Donations</Typography>
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
                    {
                      offer.accepting_status == "accepted" && <div>
                        <Typography color="success" variant="h6">A recipient accepted your donation. Do you want to confirm?</Typography>
                        <div className="flex flex-row justify-start gap-4">
                          <Button
                            onClick={() => handleConfirm(offer._id, offer)}
                            variant="contained" color="success" sx={{ marginTop: "10px" }}>
                            Yes, Confirm
                          </Button>

                          <Button
                            onClick={() => handleReject(offer._id)}
                            variant="contained" color="info" sx={{ marginTop: "10px" }}>
                            Reject
                          </Button>
                        </div>
                      </div>
                    }
                    {
                      offer.accepting_status == "confirm" && <div>
                        <Typography color="success" variant="h6">You confirmed your donation. It will be delivered to the recipient.</Typography>
                        <div className="flex flex-row justify-start gap-4">
                          <Button
                            onClick={() => handleComplete(offer._id, offer)}
                            variant="contained" color="success" sx={{ marginTop: "10px" }}>
                            Make Complete
                          </Button>

                          <Button
                            onClick={() => handleReject(offer._id, offer)}
                            variant="contained" color="info" sx={{ marginTop: "10px" }}>
                            Reject
                          </Button>
                        </div>
                      </div>
                    }
                    {
                      offer?.accepting_status == "completed" ?
                        <div>
                          <Typography color="success" variant="h6">You completed your donation!.</Typography>
                          <div className="flex flex-row justify-end">
                            <Button
                              onClick={() => handleCloseDonation(offer._id)}
                              variant="contained" color="error" sx={{ marginTop: "10px" }}>
                              Close Donation
                            </Button>
                          </div>
                        </div> : <div className="flex flex-row justify-end">
                          <Button
                            onClick={() => handleCancelDonation(offer._id)}
                            variant="contained" color="error" sx={{ marginTop: "10px" }}>
                            Remove Donation
                          </Button>
                        </div>
                    }

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