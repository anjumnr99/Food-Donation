import { Link } from 'react-router-dom';
import facebookIcon from '../assets/facebook_2111398.png';
import instagramIcon from '../assets/instagram_2111463.png';
import linkedinIcon from '../assets/linkedin_3992606.png';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
    return (
        <div className="border min-h-screen w-full flex flex-col-2 bg-gray-50">
            <div className="flex-1 hero rounded-r-[10%] justify-center items-center"
                style={{
                    backgroundImage: "url(https://i.ibb.co.com/8KP0X8F/top-view-people-preparing-box-with-food-donation-23-2148613304.jpg)",
                }}>

                <div className="card  bg-black opacity-70 rounded-3xl  w-[80%] h-[80%]">

                    <div className="card-body w-full space-y-10 rounded-3xl text-white">
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
                            <h1>Already have an account?</h1>
                            <Link to={'/sign-up'} className='text-lg font-semibold hover:underline'>Login Now!</Link>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex-1 justify-center bg-gray-50 items-center h-full ">
                <div className=" p-8 rounded-lg min-h-full ">
                    <div className="py-5 pl-8 pr-24 flex-auto space-y-2">
                        <h1 className=" text-4xl font-semibold mb-6 ">Register Here!</h1>
                        {/* <p className="text-xl font-semibold">Login to your account</p> */}
                        <p className="text-gray-600 font-light max-w-[70%]">Inter your name, valid email address and password to register your account</p>

                        <form
                            className="flex flex-col gap-5 py-6">


                            <h1 className='text-xl font-semibold'>Full Name</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text"
                                    name="name"
                                    className="grow" placeholder="Enter your name"
                                    required />
                            </label>
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


                            <div className="form-control flex flex-row gap-2">
                                <input type="checkbox" className="checkbox checkbox-success" />
                                <p className=" text-sm font-medium">I agree with Terms of Service. Terms Of Payments and Privacy Policy</p>
                            </div>


                            <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-700  text-white text-xl">Login</button>
                        </form>
                        <p className=" text-lg text-center text-gray-600 font-normal">OR</p>
                        <div className='w-full'>

                            <div className="flex w-full h-16 gap-2 py-2 ">
                                <button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border-2 border-blue-700 hover:border-none hover:bg-red-500 rounded-md focus:ri focus:ri dark:border-gray-400 focus:ri">
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

export default RegisterPage;