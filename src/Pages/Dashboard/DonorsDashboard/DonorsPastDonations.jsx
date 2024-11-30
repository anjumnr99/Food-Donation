import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";


const DonorsPastDonations = () => {
  const history = [
    { id: 1, date: "2024-10-10", items: "Canned Food, 50 lbs", status: "Delivered" },
    { id: 2, date: "2024-10-12", items: "Blankets, 20 pcs", status: "Pending" },
  ];
  return (
    <Box>
      <Typography variant="h4" mb={3}>Your Past Donations :</Typography>
      <Grid2 container spacing={2}>
        
        {history.map((record) => (
          <Grid2 item xs={12} md={6} key={record.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Donation ID: {record.id}</Typography>
                <Typography>Date: {record.date}</Typography>
                <Typography>Items Donated: {record.items}</Typography>
                <Typography>Status: {record.status}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default DonorsPastDonations;