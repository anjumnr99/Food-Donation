
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Table } from '@mui/material';
import { useContext, useState } from 'react';
import useFoodRequests from '../../../Hooks/useFoodRequests';
import { AuthContext } from '../../../Authentication/AuthProvider';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useRecipient from '../../../Hooks/useRecipient';

// function createData(name, calories, fat, carbs, protein, price) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//         price,
//         history: [
//             {
//                 date: '2020-01-05',
//                 customerId: '11091700',
//                 amount: 3,
//             },
//             {
//                 date: '2020-01-02',
//                 customerId: 'Anonymous',
//                 amount: 1,
//             },
//         ],
//     };
// }

// function Row(props) {
//     const { row } = props;
//     const [open, setOpen] = useState(false);

//     return (
//         <Fragment>
//             <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//                 <TableCell>
//                     <IconButton
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.calories}</TableCell>
//                 <TableCell align="right">{row.fat}</TableCell>
//                 <TableCell align="right">{row.carbs}</TableCell>
//                 <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 History
//                             </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Date</TableCell>
//                                         <TableCell>Customer</TableCell>
//                                         <TableCell align="right">Amount</TableCell>
//                                         <TableCell align="right">Total price ($)</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {row.history.map((historyRow) => (
//                                         <TableRow key={historyRow.date}>
//                                             <TableCell component="th" scope="row">
//                                                 {historyRow.date}
//                                             </TableCell>
//                                             <TableCell>{historyRow.customerId}</TableCell>
//                                             <TableCell align="right">{historyRow.amount}</TableCell>
//                                             <TableCell align="right">
//                                                 {Math.round(historyRow.amount * row.price * 100) / 100}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </Fragment>
//     );
// }

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//     createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

const History = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [open, setOpen] = useState(false);
    // const {foodRequests,refetch} = useFoodRequests();

    const { user } = useContext(AuthContext);
    const isRecipient = useRecipient();
    const axiosPublic = useAxiosPublic();

    const { data: foodRequest,isLoading, refetch } = useQuery({
        queryKey: ['foodRequest'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/foodRequest?email=${user?.email}`)
            console.log(res.data);
            return res.data;
        }

    });

    console.log(foodRequest);

    const handleDetailsOpen = (request) => {
        setSelectedRequest(request);
        setOpen(true);
    };

    const handleDetailsClose = () => {
        setSelectedRequest(null);
        setOpen(false);
    };


    const handleCancelRequest = (id) => {
        console.log(`Request with ID ${id} has been cancelled.`);
        axiosPublic.delete(`/foodRequest/${id}`)
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
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-[80vh] ">
          <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-green-700"></div>
        </div>
      }

    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            <Typography variant="h5" className="mb-4 font-bold">
                Your Applied Requests
            </Typography>
            {
                foodRequest.length > 0 ? <div>
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
                                    {foodRequest?.map((request) => (
                                        <TableRow key={request._id}>
                                            <TableCell>{request?.food_request_id}</TableCell>
                                            <TableCell>{request?.item_mane}</TableCell>
                                            <TableCell>{request?.quantity}</TableCell>
                                            <TableCell>{request?.request_status}</TableCell>
                                            <TableCell >
                                                <div className='flex flex-row gap-2'>
                                                    {request?.request_status === "pending" && (
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            size="small"
                                                            onClick={() => handleCancelRequest(request._id)}

                                                        >
                                                            Cancel
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleDetailsOpen(request)}

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
                                        Request ID: <span className='text-gray-500'>{selectedRequest?.food_request_id}</span>
                                    </Typography>
                                    <Typography>Item Name: <span className='text-gray-500'>{selectedRequest?.item_mane}</span></Typography>
                                    <Typography>Location: <span className='text-gray-500'>{selectedRequest?.location}</span></Typography>
                                    <Typography>Quantity: <span className='text-gray-500'>{selectedRequest?.quantity}</span></Typography>
                                    <Typography>Contact Number: <span className='text-gray-500'>{selectedRequest?.contact_number}</span></Typography>
                                    <Typography>Requested By: <span className='text-gray-500'>{selectedRequest?.requested_by}</span></Typography>

                                    <Typography>Status: <span className='text-gray-500'>{selectedRequest?.request_status || "None"}</span></Typography>
                                    <Typography>
                                        Additional Notes: <span className='text-gray-500'>{selectedRequest?.note || "None"}</span>
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
                </div> : <Typography >You have not applied any requests</Typography>
            }
        </div>

    );
};

export default History;