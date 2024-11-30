
import { Card, CardContent, Typography, Button, Box, Grid2 } from "@mui/material";
import useRecipient from "../../../Hooks/useRecipient";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import AddNotificationContent from "../../../Components/AddNotificationContent";

const NearestDonation = () => {
  const { recipient } = useRecipient();
  const { user } = useContext(AuthContext);
  // const [donations, setDonations] = useState([]);
  const axiosPublic = useAxiosPublic();
  const recipientAddress = recipient?.address;

  console.log(recipientAddress);

  const { data: donations, refetch, isFetching } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/donations/nearby/${recipientAddress}`);
      return res.data;
    }
  })

  // useEffect(() => {
  //   const fetchNearbyDonations = async () => {
  //     try {
  //       const res = await axiosPublic.get(`/donations/nearby/${recipientAddress}`);
  //       setDonations(res.data);
  //     } catch (error) {
  //       console.error("Error fetching donations:", error);
  //     }
  //   };
  //   fetchNearbyDonations();
  // }, [axiosPublic, recipientAddress]);

  console.log(donations);

  const handleAcceptDonation = (id, donation) => {
    console.log("Notification data", id, donation);
    const acceptedBy = { acceptedBy: user?.email };

    axiosPublic
      .patch(`/donation/accept/${id}`, acceptedBy)
      .then((res) => {
        console.log("Accept Donation", id);
        console.log(res.data);
        console.log(res.data);
        if (res.data?.modifiedCount) {
          const dataId = id;
          const message = `A recipient accept your donation Offer`;
          const sent_to = donation.created_by;
          const from = user.email;

          const notificationData = {
            dataId,
            message,
            sent_to,
            from
          }
          AddNotificationContent(notificationData,refetch);
          
        }
        
      })
      .catch((err) => {
        console.error("Error accepting donation:", err);
      });
  };

  const handleDeclineDonation = (id, donation) => {
    console.log("Notification data", id, donation);
    console.log("Decline Donation", id);
    axiosPublic.patch(`/donation/decline/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.data);
        if (res.data?.modifiedCount) {
          const dataId = id;
          const message = `A Recipient Declined your Donation Offer`;
          const sent_to = donation.created_by;
          const from = user.email;

          const notificationData = {
            dataId,
            message,
            sent_to,
            from
          }
          AddNotificationContent(notificationData,refetch);
         
        }
      })
      .catch((err) => {
        console.error("Error accepting donation:", err);
      });
  };

  if (isFetching) {
    return <div className="flex justify-center items-center h-[80vh] ">
      <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-green-700"></div>
    </div>
  }


  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" mb={3}>Nearby Donations</Typography>
      {donations?.length > 0 ? (
        <div>
          <Grid2 container spacing={2}>
            {
              donations.map((donation) => (
                <Card key={donation._id} sx={{ marginBottom: "15px" }}>
                  <CardContent>
                    <Typography variant="h6">{donation.item_name}</Typography>
                    <Typography>Quantity: {donation.quantity} lbs</Typography>
                    <Typography>Location: {donation.location}</Typography>
                    <Typography>Expiry Date: {donation.expire_date}</Typography>
                    <Typography>Notes: {donation.notes}</Typography>

                    {
                      donation?.accepted_by == user?.email ? <div>
                        <Typography variant="h6" sx={{ color: "green" }}>You Accepted this donation</Typography><Button
                          onClick={() => handleDeclineDonation(donation._id, donation)}
                          variant="contained" color="error" sx={{ marginTop: "10px" }}>
                          Decline
                        </Button>
                      </div> : <Button
                        onClick={() => handleAcceptDonation(donation._id, donation)}
                        variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                        Accept Donation
                      </Button>
                    }

                  </CardContent>
                </Card>
              ))
            }
          </Grid2>
        </div>
      ) : (
        <Typography>No nearby donations available at the moment.</Typography>
      )}
    </Box>
  );
};

export default NearestDonation;