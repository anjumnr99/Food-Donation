import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import TopDonorsPage from "../Pages/TopDonorsPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import OTPpage from "../Pages/OTPpage";
import PhoneLoginPage from "../Pages/PhoneLoginPage";
import DonationAccount from "../Pages/DonationAccount/DonationAccount";
import DonorsFormPage from "../Pages/DonationAccount/DonorsFormPage";
import RecipientFormPage from "../Pages/DonationAccount/RecipientFormPage";
import IndividualFormPage from "../Pages/DonationAccount/IndividualFormPage";
import MainLayout from "../Layout/MainLayout";
import PrivateRouters from "./PrivateRouters";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import NearestDonation from "../Pages/Dashboard/RecipientDashboard/NearestDonation";
import History from "../Pages/Dashboard/RecipientDashboard/History";
import DonorsNeaybyRequests from "../Pages/Dashboard/DonorsDashboard/DonorsNearbyRequest";
import DonorsDonationOffers from "../Pages/Dashboard/DonorsDashboard/DonorsDonationOffers";
import DonorsPastDonations from "../Pages/Dashboard/DonorsDashboard/DonorsPastDonations";
import CreateDonationOffer from "../Pages/Dashboard/DonorsDashboard/CreateDonationOffer";
import ApplyRequest from "../Pages/Dashboard/RecipientDashboard/ApplyRequest";
import MyAccountPage from "../Pages/MyAccountPage";

const MainRouters = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/login",
        element: <LoginPage></LoginPage>
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage></ResetPasswordPage>
      },
      {
        path: "/top-donors",
        element: <TopDonorsPage></TopDonorsPage>
      },
      {
        path: "/phone-login",
        element: <PhoneLoginPage></PhoneLoginPage>
      },
      {
        path: "/otp-page",
        element: <OTPpage></OTPpage>
      },
      {
        path: "/donation-account",
        element: <PrivateRouters><DonationAccount></DonationAccount></PrivateRouters>
      },
      {
        path: "/donors-form",
        element: <PrivateRouters><DonorsFormPage></DonorsFormPage></PrivateRouters>
      },
      {
        path: "/recipient-form",
        element: <PrivateRouters><RecipientFormPage></RecipientFormPage></PrivateRouters>
      },
      {
        path: "/individual-donors-form",
        element: <PrivateRouters><IndividualFormPage></IndividualFormPage></PrivateRouters>
      },
      {
        path: "/my-account",
        element: <PrivateRouters><MyAccountPage></MyAccountPage></PrivateRouters>
      },

      {
        path: '/dashboard',
        element: <PrivateRouters><DashboardPage></DashboardPage></PrivateRouters>,
        children:[
          {
            path: 'recipient-applied-request',
            element:<ApplyRequest></ApplyRequest>
          },
          {
            path: 'recipient-nearest-donation',
            element:<NearestDonation></NearestDonation>
          },
          {
            path: 'recipient-history',
            element:<History></History>
          },
          {
            path: 'donors-nearby-requests',
            element:<DonorsNeaybyRequests></DonorsNeaybyRequests>
          },
          {
            path: 'donors-donation-offers',
            element: <DonorsDonationOffers></DonorsDonationOffers>
          },
          {
            path: 'donors-past-donation',
            element:<DonorsPastDonations></DonorsPastDonations>
          },
          {
            path: 'create-donation-offer',
            element:<CreateDonationOffer></CreateDonationOffer>
          }
        ]
      }
    ]
  }


])

export default MainRouters;