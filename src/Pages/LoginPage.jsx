import { Link, useLocation, useNavigate } from 'react-router-dom';
import facebookIcon from '../assets/facebook_2111398.png';
import instagramIcon from '../assets/instagram_2111463.png';
import linkedinIcon from '../assets/linkedin_3992606.png';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';

const LoginPage = () => {

    const { googleLogin, loginWithEmailAndPassword } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location.state);
    const axiosPublic = useAxiosPublic();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    role: "general_user"
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/')
                    })
                // toast.success('Logged Successfully!')
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
                    title: 'Logged Successfully!'
                });
                navigate(location?.state ? location.state : '/')
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
    const handleLoginWithEmailAndPassword = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        loginWithEmailAndPassword(email, password)
            .then(result => {

                // toast.success('Logged Successfully!')
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
                    title: "Signed in successfully"
                });
                  navigate(location?.state ? location.state : '/')
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
                            <Link to={'/register'} className='text-lg font-semibold hover:underline'>Register Now!</Link>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex-1 justify-center items-center bg-gray-50 h-full ">
                <div className=" p-8 rounded-lg min-h-full ">
                    <div className="py-5 pl-8 pr-24 flex-auto space-y-2">
                        <h1 className=" text-4xl font-semibold mb-6 ">Log In</h1>
                        {/* <p className="text-xl font-semibold">Login to your account</p> */}
                        <p className="text-gray-600 font-light max-w-[70%]">Inter your name, valid email address and password to register your account</p>

                        <form onSubmit={handleLoginWithEmailAndPassword}
                            className="flex flex-col gap-5 py-6">


                            <h1 className='text-xl font-semibold'>Email Address</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text"
                                    name="email"
                                    className="grow" placeholder="Enter your email"
                                    required />
                            </label>
                            <h1 className='text-xl font-semibold'>Password</h1>
                            <label className="input input-bordered flex items-center gap-2">

                                <input type="password"
                                    name="password"
                                    required
                                    className="grow"
                                    placeholder="Enter password" />
                            </label>


                            <div>
                                <Link href="#" className="text-lg font-medium text-emerald-500 hover:underline">Forget Password?</Link>
                            </div>


                            <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-700  text-white text-xl">Login</button>
                        </form>
                        <p className=" text-lg text-center text-gray-600 font-normal">OR</p>
                        <div className='w-full'>

                            <div className="flex w-full h-16 gap-2 py-2 ">
                                <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border-2 border-blue-700 hover:border-none hover:bg-red-500 rounded-md focus:ri focus:ri dark:border-gray-400 focus:ri">
                                    <FcGoogle className="text-3xl "></FcGoogle>
                                    <p className="text-blue-800 hover:text-white font-semibold">Continue with Google</p>
                                </button>

                                <img className=" w-12 flex-none" src={facebookIcon} alt="" />
                                <img className=" w-12 flex-none" src={instagramIcon} alt="" />
                                <img className=" w-12 flex-none" src={linkedinIcon} alt="" />
                            </div>

                            {/* <p className=" mt-4 font-semibold">Do not have an account? <span className="text-blue-700 hover:text-blue-900">
                                <Link to={'/sign-up'}>Sign Up Now!</Link></span></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;