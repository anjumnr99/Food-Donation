import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const DonorsPastDonations = () => {

  const { user } = useContext(AuthContext);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [open, setOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  const { data: closedDonations } = useQuery({
    queryKey: ['closedDonations', user?.email], // Include email in query key for proper caching
    queryFn: async () => {
      const res = await axiosPublic.get(`/closedDonations/donors?email=${user?.email}`);
      console.log('Response data:', res.data);
      return res.data;
    },
    enabled: !!user?.email, // Ensure query runs only if email is available
  });
console.log('closedDonations:', closedDonations);

const handleDetailsOpen = (request) => {
  setSelectedRequest(request);
  setOpen(true);
};

const handleDetailsClose = () => {
  setSelectedRequest(null);
  setOpen(false);
};


  return (
    <Box>
      <Typography variant="h4" p={4} mb={3}>Your Past Donations :</Typography>
      {
                closedDonations?.length > 0 ? <div>
                    <Card className="shadow-lg">
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Request ID</TableCell>
                                        <TableCell>Item </TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {closedDonations?.map((donation) => (
                                        <TableRow key={donation._id}>
                                            <TableCell>{donation?.donation_id}</TableCell>
                                            <TableCell>{donation?.item_name}</TableCell>
                                            <TableCell>{donation?.quantity}</TableCell>
                                            <TableCell>{donation?.creation_status}</TableCell>
                                            <TableCell >
                                                <div className='flex flex-row gap-2'>
                                                  
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleDetailsOpen(donation)}

                                                    >
                                                        Details
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Popup for Request Details */}
                    <Dialog open={open} onClose={handleDetailsClose}>
                        <DialogTitle>Request Details</DialogTitle>
                        <DialogContent>
                            {selectedRequest ? (
                                <div>
                                    <Typography variant="h6">
                                        Request ID: <span className='text-gray-500'>{selectedRequest?.donation_id}</span>
                                    </Typography>
                                    <Typography>Item Name: <span className='text-gray-500'>{selectedRequest?.item_mane}</span></Typography>
                                    <Typography>Location: <span className='text-gray-500'>{selectedRequest?.location}</span></Typography>
                                    <Typography>Quantity: <span className='text-gray-500'>{selectedRequest?.quantity}</span></Typography>
                                    <Typography>Date: <span className='text-gray-500'>{selectedRequest?.expire_date}</span></Typography>
                                    {/* <Typography>Contact Number: <span className='text-gray-500'>{selectedRequest?.contact_number}</span></Typography> */}
                                    <Typography>Accepted By: <span className='text-gray-500'>{selectedRequest?.accepted_by}</span></Typography>

                                    <Typography>Status: <span className='text-gray-500'>{selectedRequest?.accepting_status || "None"}</span></Typography>
                                    <Typography>
                                        Additional Notes: <span className='text-gray-500'>{selectedRequest?.notes || "None"}</span>
                                    </Typography>
                                </div>
                            ) : (
                                <Typography>No details available.</Typography>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDetailsClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div> : <Typography m={5}>You do not have any donation records!</Typography>
            }

    </Box>
  );
};

export default DonorsPastDonations;



{/* <Grid2 container spacing={2} p={4}>
        
{closedDonations?.map((record) => (
  <Grid2 item xs={12} md={6} key={record.id}>
    <Card>
      <CardContent>
      <Typography variant="h6">{record.item_name}</Typography>
            <Typography>Quantity: {record.quantity} lbs</Typography>
            <Typography>Location: {record.location}</Typography>
            <Typography>Expiry Date: {record.expire_date}</Typography>
            <Typography>Notes: {record.notes}</Typography>
      </CardContent>
    </Card>
  </Grid2>
))}
</Grid2> */}