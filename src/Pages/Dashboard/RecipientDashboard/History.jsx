
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Table } from '@mui/material';
import { useState } from 'react';

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

    const handleDetailsOpen = (request) => {
        setSelectedRequest(request);
        setOpen(true);
    };

    const handleDetailsClose = () => {
        setSelectedRequest(null);
        setOpen(false);
    };
    const userType = "Recipient";
    const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        avatar: "https://via.placeholder.com/150",
    };

    const userRequests = [
        {
            id: 1,
            description: "Canned Food",
            quantity: 20,
            status: "Pending",
            notes: "Please deliver before next week.",
        },
        {
            id: 2,
            description: "Fresh Vegetables",
            quantity: 10,
            status: "Completed",
            notes: "Urgent request fulfilled.",
        },
    ];

    const handleCancelRequest = (id) => {
        console.log(`Request with ID ${id} has been cancelled.`);
    };


    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            {/* User Information Section */}
            {/* <Card className="mb-6 shadow-lg">
          <CardContent>
            <div className="flex items-center">
              <Avatar
                src={userData.avatar}
                alt="User Avatar"
                className="w-16 h-16 mr-4"
              />
              <div>
                <Typography variant="h6" className="font-bold">
                  {userData.name}
                </Typography>
                <Typography>{userType}</Typography>
                <Typography>Email: {userData.email}</Typography>
                <Typography>Phone: {userData.phone}</Typography>
              </div>
            </div>
          </CardContent>
        </Card> */}

            {/* Requests Section */}
            <Typography variant="h5" className="mb-4 font-bold">
                {userType === "Recipient" ? "Your Requests" : "Donation Offers"}
            </Typography>
            <Card className="shadow-lg">
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Request ID</TableCell>
                                <TableCell>Item Description</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.description}</TableCell>
                                    <TableCell>{request.quantity}</TableCell>
                                    <TableCell>{request.status}</TableCell>
                                    <TableCell >
                                        <div className='flex flex-row gap-2'> 
                                            {request.status === "Pending" && (
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleCancelRequest(request.id)}

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
                                Request ID: {selectedRequest.id}
                            </Typography>
                            <Typography>Description: {selectedRequest.description}</Typography>
                            <Typography>Quantity: {selectedRequest.quantity}</Typography>
                            <Typography>Status: {selectedRequest.status}</Typography>
                            <Typography>
                                Additional Notes: {selectedRequest.notes || "None"}
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
        </div>


        // <TableContainer component={Paper}>
        //     <Table aria-label="collapsible table">
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell />
        //                 <TableCell>Dessert (100g serving)</TableCell>
        //                 <TableCell align="right">Calories</TableCell>
        //                 <TableCell align="right">Fat&nbsp;(g)</TableCell>
        //                 <TableCell align="right">Carbs&nbsp;(g)</TableCell>
        //                 <TableCell align="right">Protein&nbsp;(g)</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {rows.map((row) => (
        //                 <Row key={row.name} row={row} />
        //             ))}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
    );
};

export default History;