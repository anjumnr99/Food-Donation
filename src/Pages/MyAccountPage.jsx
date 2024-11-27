
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import useRecipient from "../Hooks/useRecipient";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useIndividualDonor from "../Hooks/useIndividualDonor";
import useBusinessDonor from "../Hooks/useBusinessDonor";

const MyAccountPage = () => {
    const { recipient } = useRecipient();
    const {IndividualDonor} = useIndividualDonor();
    const {businessDonor} = useBusinessDonor();
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const axiosPublic = useAxiosPublic();
    // Populate profile data when recipient data is fetched
    useEffect(() => {
        let data = recipient || IndividualDonor || businessDonor;
        console.log(data);
        if (data) {
            setProfileData({ ...data });
        }
    }, [recipient, IndividualDonor, businessDonor]);

    // Handle edit mode toggle
    const handleEditToggle = () => {
        setIsEditing((prevState) => !prevState);
    };

    // Update profile data on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Save updated profile data
    const handleSave = () => {
        setIsEditing(false);
        console.log("Updated Profile Data:", profileData);
        // Add logic to save profileData to the backend here
        const name = profileData.name;
        const email = profileData?.email;
        const phone = profileData.phone;
        const address = profileData.address;
        const role = "recipient"

        // Add API call or other logic here
        const updatedProfile = {
            name,
            email,
            phone,
            address,
            role
        }

        console.log(updatedProfile);

        axiosPublic.put(`/updateProfile/${profileData._id}`, updatedProfile)
            .then((response) => {
                console.log(response.data);
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
                    title: "Profile Updated successfully"
                })
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



    };

    // Ensure data is loaded
    if (!profileData) {
        return <div className="flex justify-center items-center h-[80vh] ">
            <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-green-700"></div>
        </div>;
    }



    return (
        <Box
            sx={{
                maxWidth: "800px",
                margin: "20px auto",
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: 3,
            }}
        >
            <Box sx={{ textAlign: "center", mb: 2 }}>
                <Avatar sx={{ width: 64, height: 64, margin: "0 auto" }}>
                    {profileData.name?.[0]?.toUpperCase() || ""}
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    {profileData.name || "User"}
                </Typography>
                <Typography variant="body2" className="uppercase">
                    {profileData.role || "Recipient"}
                </Typography>
            </Box>

            <Box component="form" sx={{ mt: 3 }}>
                <TextField
                    label="Name"
                    fullWidth
                    name="name"
                    value={profileData.name || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                />
                <TextField
                    label="Email"
                    fullWidth
                    name="email"
                    value={profileData.email || ""}
                    disabled
                    margin="normal"
                />
                <TextField
                    label="Phone"
                    fullWidth
                    name="phone"
                    value={profileData.phone || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                />
                <TextField
                    label="Address"
                    fullWidth
                    name="address"
                    value={profileData.address || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    margin="normal"
                />
                {profileData.role === "Donor" && (
                    <TextField
                        label="Organization Name"
                        fullWidth
                        name="organization"
                        value={profileData.organization || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        margin="normal"
                    />
                )}
                <Box sx={{ textAlign: "center", mt: 3 }}>
                    {isEditing ? (
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleEditToggle}
                        >
                            Edit Profile
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default MyAccountPage;