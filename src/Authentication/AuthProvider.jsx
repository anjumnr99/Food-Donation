import { createUserWithEmailAndPassword, GoogleAuthProvider,  onAuthStateChanged,  sendPasswordResetEmail, signInWithEmailAndPassword,  signInWithPhoneNumber,  signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./firebase.config";
export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const [confirmationResult, setConfirmationResult] = useState(null);
    // Google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // email password sign up
    const signUpWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // email password login
    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };


    useEffect(() => {
        const unSubscriber = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => {
            unSubscriber()
        }

    }, []);

    // User updating
    const userUpdate = (name, email) => {
        return (
            updateProfile(auth.currentUser, {
                displayName: name, email: email
            })
        )
    }

    const resetPassword=(email)=>{
        return sendPasswordResetEmail(auth, email)
    }

    const phoneLogin=(phoneNumber)=>{
        auth.useDeviceLanguage();
        const appVerifier = window.recaptchaVerifier;

        return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((result) => {
            setConfirmationResult(result);
            return result;
        });
    }


    const authInfo = {
        googleLogin,
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        user,
        logOut,
        userUpdate,
        loading,
        resetPassword,
        phoneLogin,
        confirmationResult,
        setConfirmationResult
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );


};

export default AuthProvider;