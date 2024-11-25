
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
const NearestDonation = () => {
    const donations = [
        { id: 1, donor: "Restaurant A", items: "20 meals", distance: "2 km" },
        { id: 2, donor: "Grocery Store B", items: "10 kg of vegetables", distance: "3.5 km" },
      ];
    return (
        <Grid container spacing={2}>
        {donations.map((donation) => (
          <Grid item xs={12} md={6} key={donation.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{donation.donor}</Typography>
                <Typography>Items: {donation.items}</Typography>
                <Typography>Distance: {donation.distance}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>Request</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
};

export default NearestDonation;