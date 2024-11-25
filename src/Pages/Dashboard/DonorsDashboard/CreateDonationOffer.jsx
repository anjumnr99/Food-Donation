import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import useDonations from "../../../Hooks/useDonations";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Refresh } from "@mui/icons-material";


const CreateDonationOffer = () => {

    const {user} = useContext(AuthContext);
    const {donations,refetch} = useDonations();

    const axiosPublic = useAxiosPublic();

    console.log(donations,"length = ", donations?.length+1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const donation_id = donations?.length+1;
        const item_name = e.target?.item_name?.value;
        const quantity = e.target?.quantity?.value;
        const location = e.target?.location?.value;
        const expire_date = e.target?.expire_date?.value;
        const notes = e.target?.notes?.value;
        const created_by = user?.email;
        const status = 'pending';


        const newDonation = {
            donation_id,
            item_name,
            quantity,
            location,
            expire_date,
            notes,
            created_by,
            status    
        }
        console.log("Donation Submitted:", newDonation);
        axiosPublic.post('/add-donation', newDonation)
        .then(res => {
            console.log(res.data);
            toast.success("Created Donation Offer Successfully");
            refetch();
            e.target.reset();
            
        })
        .catch(err => {
            console.log(err);
            toast.error("Failed to Create Donation Offer");
        })
        

    };


    return (
        <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Create a Donation Offer
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Food Details"
                    name="item_name"
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Quantity/Details"
                    name="quantity"
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Pickup/Drop-off Location"
                    name="location"
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Preferred Time"
                    name="expire_date"
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Additional Notes (Optional)"
                    name="notes"
                    multiline
                    rows={4}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Create Donation
                </Button>
            </form>
        </Box>
    );
};

export default CreateDonationOffer;