import { Button, Card, CardContent, Grid2, Typography } from "@mui/material";


const DonorsNearbyRequest = () => {
    const requests = [
        { id: 1, recipient: "Shelter A", items: "Food Packages", distance: "2 km" },
        { id: 2, recipient: "NGO B", items: "Clothes", distance: "5 km" },
      ];
    return (
        <Grid2 container spacing={2}>
        {requests.map((request) => (
          <Grid2 item xs={12} md={6} key={request.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{request.recipient}</Typography>
                <Typography>Items Needed: {request.items}</Typography>
                <Typography>Distance: {request.distance}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Offer Help
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    );
};

export default DonorsNearbyRequest;