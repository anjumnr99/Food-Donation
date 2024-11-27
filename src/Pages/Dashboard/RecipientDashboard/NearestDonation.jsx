
import { Card, CardContent, Typography, Button, Box, Grid2 } from "@mui/material";
import useRecipient from "../../../Hooks/useRecipient";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const NearestDonation = () => {
  const { findRecipient } = useRecipient();
  const [donations, setDonations] = useState([]);
  const axiosPublic = useAxiosPublic();
  const recipientAddress = findRecipient?.address;

  console.log(recipientAddress);

  useEffect(() => {
    const fetchNearbyDonations = async () => {
      try {
        const res = await axiosPublic.get(`/donations/nearby/${recipientAddress}`);
        setDonations(res.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchNearbyDonations();
  }, [axiosPublic, recipientAddress]);

  console.log(donations);


  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" mb={3}>Nearby Donations</Typography>
      {donations.length > 0 ? (
        <div>
          <Grid2 container spacing={2}>
            {
              donations.map((donation) => (
                <Card key={donation.donation_id} sx={{ marginBottom: "15px" }}>
                  <CardContent>
                    <Typography variant="h6">{donation.item_name}</Typography>
                    <Typography>Quantity: {donation.quantity} lbs</Typography>
                    <Typography>Location: {donation.location}</Typography>
                    <Typography>Expiry Date: {donation.expire_date}</Typography>
                    <Typography>Notes: {donation.notes}</Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                      Claim Donation
                    </Button>
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