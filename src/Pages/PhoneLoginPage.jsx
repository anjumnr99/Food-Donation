import { useContext, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthProvider';
import toast from 'react-hot-toast';
import auth from '../Authentication/firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const PhoneLoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const { setConfirmationResult } = useContext(AuthContext);
    const [isCaptchaSet, setIsCaptchaSet] = useState(false);
    const navigate = useNavigate();

    // Setup reCAPTCHA verifier
    const setupRecaptcha = useCallback(() => {
        if (!isCaptchaSet && auth) {  // Check if auth is properly initialized
            try {
                window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                    size: 'invisible', // Invisible reCAPTCHA
                    callback: (response) => {
                        console.log("reCAPTCHA solved", response);
                    }
                }, auth);
                window.recaptchaVerifier.render(); // Render reCAPTCHA
                setIsCaptchaSet(true); // Prevent re-initializing
            } catch (error) {
                console.error("Recaptcha setup failed:", error);
            }
        }
        
    });

    // Handle phone number submission
    const onSignInSubmit = (e) => {
        e.preventDefault();
        setupRecaptcha(); // Initialize reCAPTCHA
        const appVerifier = window.recaptchaVerifier;

        if (!phoneNumber) {
            alert('Please enter a phone number.');
            return;
        }

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                navigate('/otp-page', { state: { phoneNumber } });
            })
            .catch((error) => {
                console.error("Error during sign-in:", error);
                alert("Error sending SMS. Please try again.");
            });
    };

    useEffect(() => {
        // Set up reCAPTCHA when component mounts
        setupRecaptcha();
    }, [setupRecaptcha]); // Empty dependency array to run only once

    return (
        <div className="border min-h-screen w-full flex flex-col-2 bg-gray-50">
            <div className="flex-1 hero rounded-r-[10%] justify-center items-center"
                style={{
                    backgroundImage: "url(https://i.ibb.co/8KP0X8F/top-view-people-preparing-box-with-food-donation-23-2148613304.jpg)",
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
                    <h1 className=" text-4xl font-semibold mb-6 ">Phone Login</h1>
                    <p className="text-gray-600 font-normal max-w-[70%]">Please enter your number with the country code</p>

                    <form onSubmit={onSignInSubmit}
                        className="flex flex-col gap-5 py-6">
                        <h1 className='text-xl font-semibold'>Enter your number </h1>
                        <label className="input input-bordered flex items-center gap-2">

                            <input type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="grow" placeholder="+44"
                                required />
                        </label>
                        <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-700  text-white text-xl">Send OTP</button>
                    </form>
                    <div id="recaptcha-container"></div>
                    <p className=" text-lg text-center text-gray-600 font-normal">Return To?<Link to={'/login'} className="text-blue-600" >Login</Link></p>
                </div>

            </div>
        </div>
    );
};

export default PhoneLoginPage;
