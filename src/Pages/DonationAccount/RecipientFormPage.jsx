import { Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";


const RecipientFormPage = () => {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name?.value;
        const email = user?.email;
        const phone = e.target.phone?.value;
        const address = e.target.address?.value;
        const role = "recipient"
        
        // Add API call or other logic here
        const recipientInfo = {
            name ,
            email ,
            phone ,
            address,
            role 
        }

        console.log(recipientInfo);
        axiosPublic.post('/add-recipient', recipientInfo)
            .then(res => {
                console.log(res.data);
                console.log(user);
                
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
                    title: "Account Created successfully"
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                navigate('/dashboard');
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
    return (
        <div className="flex flex-row justify-center items-center bg-green-200">
            <img className="w-[50%]" src="https://i.ibb.co.com/GCbn7DX/rb-5299.png" alt="" />
            <div className="w-[50%]">
                <div className="text-center flex flex-col justify-center items-center pt-5 ">
                    <h1 className=" uppercase text-xs tracking-wider w-[50%] mx-auto font-semibold text-gray-500 ">Please fill up the form with valid information</h1>
                    <p className=" uppercase text-4xl tracking-[.06em] font-semibold border-b-2 border-dashed border-gray-500 w-fit">Recipient account</p>
                </div>
                <form className="p-8  rounded-md shadow-md  space-y-4 mx-auto" onSubmit={handleSubmit}>

                    <TextField label="Name" name="name" fullWidth required  className="mb-4" />
                    <TextField label="Email" name="email" fullWidth readOnly value={user?.email} required type="email"  className="mb-4" />
                    
                    <TextField label="Phone" name="phone" fullWidth required type="tel"  className="mb-4" />
                    <TextField label="Address" name="address" fullWidth required multiline  className="mb-4" />
                    <FormControlLabel
                        control={<Checkbox name="termsAccepted" required />}
                        label="I accept the terms and conditions"
                    />
                    <Button type="submit" variant="contained" color="success" fullWidth className="mt-4">Create</Button>
                </form>
            </div>

        </div>
    );
};

export default RecipientFormPage;