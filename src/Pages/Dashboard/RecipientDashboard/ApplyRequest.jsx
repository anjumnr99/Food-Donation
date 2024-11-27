import { TextField, Button, Typography, Box } from "@mui/material";
import { useContext, useState } from "react";
import useFoodRequests from "../../../Hooks/useFoodRequests";
import { AuthContext } from "../../../Authentication/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ApplyRequest = () => {
    const {foodRequests}=useFoodRequests();
    const {user} = useContext(AuthContext);
    console.log(foodRequests?.length);
    const axiosPublic = useAxiosPublic();
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const food_request_id = foodRequests?.length+1;
      const item_mane = e.target?.item_name?.value;
      const quantity = e.target?.quantity?.value;
      const note = e.target?.note?.value;
      const requested_by = user?.email;
      const location = e.target?.location?.value;
      const contact_number = e.target?.contact_number?.value;
      const request_status = "pending"

      const newFoodRequest = {
        food_request_id,
        item_mane,
        quantity,
        note,
        requested_by,
        location,
        contact_number,
        request_status
      }
       console.log(newFoodRequest);

       axiosPublic.post('/add-food-request', newFoodRequest)
           .then(res => {
               console.log(res.data);
               e.target.reset();
           })
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
           title: "Request submitted successfully"
       })
       .catch(err => {
           // toast.error(err.message)
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
               icon: "error",
               title: err.message
           });

       })
      
      // Add API logic here
    };
    return (
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Request Donations</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Items Needed"
            name="item_name"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Quantity"
            name="quantity"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Location"
            name="location"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Contact Number"
            name="contact_number"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Additional Notes"
            name="note"
            multiline
            rows={4}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit Request
          </Button>
        </form>
      </Box>
    );
  };
  
export default ApplyRequest;