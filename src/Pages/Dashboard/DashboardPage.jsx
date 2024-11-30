import { NavLink, Outlet } from "react-router-dom";
import useRecipient from "../../Hooks/useRecipient";



const DashboardPage = () => {
  const {isRecipient} = useRecipient();
  console.log(isRecipient);

  return (
    <div className=" pb-20 ">
      <div className=" grid grid-cols-1 md:grid-cols-12 gap-2">
        {/* dashboard side bar */}
        <div className="w-full md:col-span-4 lg:col-span-2 h-screen md:min-h-fit bg-green-400">
          <div className="menu p-1 md:p-4 ">
            {
              isRecipient ?
                <ul className="flex md:flex-col text-lg">
                  <li>
                    <NavLink to="/dashboard/recipient-applied-request" className={`p-2 rounded-sm`}>

                      Create Food Request</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/recipient-nearest-donation" className={`p-2 rounded-sm`}>

                      Nearby Offered Donation </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/recipient-history" className={`p-2 rounded-sm`}>

                      History
                    </NavLink>
                  </li>

                </ul> : <ul className="flex md:flex-col text-lg">
                  <li>
                    <NavLink to="/dashboard/create-donation-offer" className={`p-2 rounded-sm`}>
                     Offer a Donation</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/donors-nearby-requests" className={`p-2 rounded-sm`}>
                      Nearby Requests</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/donors-donation-offers" className={`p-2 rounded-sm`}>
                      My Active Donation Offers </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/donors-past-donation" className={`p-2 rounded-sm`}>
                      Past Donations
                    </NavLink>
                  </li>
                </ul>
            }
          </div>
        </div>
        {/* dashboard content */}
        <div className="w-full md:col-span-8 bg-green-100 lg:col-span-10 py-10">
          <Outlet></Outlet>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;