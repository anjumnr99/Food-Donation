import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthProvider";
import Swal from "sweetalert2";

const ResetPasswordPage = () => {
    const { resetPassword } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleResetPassword = e => {
        e.preventDefault();
        const email = e.target.email.value;

        resetPassword(email)
            .then(result => {
                console.log(result);
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
                    title: "Check you mail for further instructions!"
                });
                navigate('/')
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
                    title: "Fail to reset password" + err.message
                });
                console.log(err);
            })
    }
    return (
        <div className="border min-h-screen w-full flex flex-col-2 bg-gray-50">
            <div className="flex-1 hero rounded-r-[10%] justify-center items-center"
                style={{
                    backgroundImage: "url(https://i.ibb.co.com/8KP0X8F/top-view-people-preparing-box-with-food-donation-23-2148613304.jpg)",
                }}>

                <div className="card  bg-black opacity-70 rounded-3xl  w-[80%] h-[80%]">

                    <div className="card-body w-full  rounded-3xl text-white">
                        <div>
                            <h1 className="text-5xl mb-12 text-indigo-700 font-extrabold italic ">Give Grub</h1>
                        </div>
                        <div className="text-lg">
                            <h1 className="text-2xl mb-4">Welcome to Give Grub! </h1>
                            <h1 className="text-3xl font-medium mb-4">A platform that connects food donors.</h1>
                            <h1>We're a Digital Agency.
                                We are glad to see you again! Get access to your Orders, Wishlist and Recommendations.</h1>
                        </div>
                        <div className="mt-10">
                            <h1>Don't have an account?</h1>
                            <Link to={'/sign-up'} className='text-lg font-semibold hover:underline'>Register Now!</Link>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex-1  bg-gray-50 h-screen ">
                <div className=" flex flex-col justify-center rounded-lg h-screen my-auto  px-20 space-y-2 ">
                    <h1 className=" text-4xl font-semibold mb-6 ">Reset Password</h1>
                    <p className="text-gray-600 font-normal max-w-[70%]">Enter the email address which is associated with your account. We will send you a link.</p>

                    <form onSubmit={handleResetPassword}
                        className="flex flex-col gap-5 py-6">
                        <h1 className='text-xl font-semibold'>Enter your email </h1>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text"
                                name="email"
                                className="grow" placeholder="Enter your email"
                                required />
                        </label>
                        <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-700  text-white text-xl">Login</button>
                    </form>
                    <p className=" text-lg text-center text-gray-600 font-normal">Return To?<Link to={'/login'} className="text-blue-600" >Login</Link></p>
                </div>

            </div>
        </div>
    );
};

export default ResetPasswordPage;