import { Box, Button, Card, CardContent, Grid2, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useBusinessDonor from "../../../Hooks/useBusinessDonor";
import useIndividualDonor from "../../../Hooks/useIndividualDonor";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const DonorsNearbyRequest = () => {
  const { user } = useContext(AuthContext);
  const { businessDonor } = useBusinessDonor();
  const { IndividualDonor } = useIndividualDonor();


  const axiosPublic = useAxiosPublic();
  const donorAddress = businessDonor?.address || IndividualDonor?.address;
  console.log(donorAddress);
  const acceptedBy = { acceptedBy: user?.email };
  const { data: foodRequests, refetch } = useQuery({
    queryKey: ['foodRequests'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/foodRequest/nearby/${donorAddress}`);
      return res.data;
    }
  })
  const { data: acceptedRequests } = useQuery({
    queryKey: [user?.email, 'acceptedRequests'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/acceptedRequests/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(acceptedRequests);

  const handleAcceptDonation = (id) => {
    console.log("Accept Donation", id);
    // Wrap in an object
    axiosPublic.patch(`/foodRequest/accept/${id}`, acceptedBy) // Pass as second argument
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => {
        console.error("Error accepting donation:", err);
      });
  };
  const handleDeclineDonation = (id) => {
    console.log("Decline Donation", id);
    axiosPublic.patch(`/foodRequest/decline/${id}`) // Pass as second argument
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) => {
        console.error("Error accepting donation:", err);
      });
  };

  return (
    <Box sx={{ padding: "20px" }} className="flex flex-row justify-between items-start ">
      <div>
        <Typography variant="h4" mb={3}>Nearby Food Requests: </Typography>
        {foodRequests?.length > 0 ? (
          <div>
            <Grid2 container spacing={2}>
              {
                foodRequests.map((request) => (
                  <Card key={request._id} sx={{ marginBottom: "15px" }}>
                    <CardContent>
                      <Typography variant="h6">{request.item_name}</Typography>
                      <Typography>Quantity: {request.quantity} lbs</Typography>
                      <Typography>Location: {request.location}</Typography>
                      <Typography>Expiry Date: {request.expire_date}</Typography>
                      <Typography>Notes: {request.notes}</Typography>
                      {
                        request.request_status == "pending" ? <Button
                          onClick={() => handleAcceptDonation(request._id)}
                          variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                          Accept Donation
                        </Button> : <Typography variant="h6" sx={{ color: "green" }}>You Accepted this request</Typography>
                      }
                      {
                        request.request_status == "accepted" && <Button
                          onClick={() => handleDeclineDonation(request._id)}
                          variant="contained" color="error" sx={{ marginTop: "10px" }}>
                          Decline
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
      </div>

      <div>
        {acceptedRequests?.length > 0 && (
          <div className="">
            <Typography variant="h4" mb={3}>Your Accepted Food Requests: </Typography>
            <Grid2 container spacing={2}>
              {
                acceptedRequests?.map((request) => (
                  <Card key={request._id} sx={{ marginBottom: "15px" }}>
                    <CardContent>
                      <Typography variant="h6">{request.item_name}</Typography>
                      <Typography>Quantity: {request.quantity} lbs</Typography>
                      <Typography>Location: {request.location}</Typography>
                      <Typography>Expiry Date: {request.expire_date}</Typography>
                      <Typography>Notes: {request.notes}</Typography>
                      {
                      request?.accepted_by == user?.email ? <div>
                        <Typography variant="h6" sx={{ color: "green" }}>You Accepted this Food Request</Typography><Button
                          onClick={() => handleDeclineDonation(request._id)}
                          variant="contained" color="error" sx={{ marginTop: "10px" }}>
                          Decline
                        </Button>
                      </div> : <Button
                        onClick={() => handleAcceptDonation(request._id)}
                        variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                        Accept Food Request
                      </Button>
                    }

                    </CardContent>
                  </Card>
                ))
              }
            </Grid2>
          </div>
        )}
      </div>
    </Box>
  );
};

export default DonorsNearbyRequest;