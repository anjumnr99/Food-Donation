
import { Link } from "react-router-dom";
import Chart from "./Chart";
import { Avatar, Box, Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const TopDonorsPage = () => {
    const [donors, setDonors] = useState([]); // Initialize as an empty array

    useEffect(() => {
        // Simulating fetching donor data; replace this with an API call if needed
        const fetchData = async () => {
            const dummyData = [
                {
                    "id": 1,
                    "name": "Fresh Foods Inc.",
                    "logo": "https://i.ibb.co.com/4V7zZLn/horizontal-shot-satisfied-college-student-uses-new-cool-app-cell-phone-carries-notepad-writing-notes.jpg",
                    "foodDonated": "2,500 lbs",
                    "peopleFed": 1250,
                    "mealsProvided": 5000
                },
                {
                    "id": 2,
                    "name": "Green Grocers",
                    "logo": "https://i.ibb.co.com/4V7zZLn/horizontal-shot-satisfied-college-student-uses-new-cool-app-cell-phone-carries-notepad-writing-notes.jpg",
                    "foodDonated": "1,800 lbs",
                    "peopleFed": 900,
                    "mealsProvided": 4000
                },
                {
                    "id": 3,
                    "name": "Harvest Bites",
                    "logo": "https://i.ibb.co.com/4V7zZLn/horizontal-shot-satisfied-college-student-uses-new-cool-app-cell-phone-carries-notepad-writing-notes.jpg",
                    "foodDonated": "3,000 lbs",
                    "peopleFed": 1500,
                    "mealsProvided": 6000
                },
                {
                    "id": 4,
                    "name": "Healthy Harvest",
                    "logo": "https://i.ibb.co.com/4V7zZLn/horizontal-shot-satisfied-college-student-uses-new-cool-app-cell-phone-carries-notepad-writing-notes.jpg",
                    "foodDonated": "1,200 lbs",
                    "peopleFed": 600,
                    "mealsProvided": 3000
                },
                {
                    "id": 5,
                    "name": "City Fresh Market",
                    "logo": "https://i.ibb.co.com/4V7zZLn/horizontal-shot-satisfied-college-student-uses-new-cool-app-cell-phone-carries-notepad-writing-notes.jpg",
                    "foodDonated": "2,700 lbs",
                    "peopleFed": 1350,
                    "mealsProvided": 5500
                }
            ];
            setDonors(dummyData); // Setting the data to the donors state
        };

        fetchData();
    }, []);
    return (
        <div className=" bg-green-100 min-h-screen">

            {/* Hero Section */}
            <Box className="bg-green-500 text-white py-10 text-center">
                <Typography variant="h4" className="font-bold">Top Donors and Their Impact</Typography>
                <Box className="flex justify-around mt-5">
                    <Box>
                        <Typography variant="h5">Total Meals Provided</Typography>
                        <Typography variant="h6">200,000+</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">Total Pounds of Food Donated</Typography>
                        <Typography variant="h6">150,000 lbs</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">Environmental Impact</Typography>
                        <Typography variant="h6">CO₂ Saved</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Card Section */}
            <div className="flex flex-wrap justify-center  p-8">
                {Array.isArray(donors) && donors.map((donor) => (
                    <Card key={donor.id} className="w-full md:w-1/3 lg:w-1/4 m-4">
                        <CardContent>
                            <Avatar src={donor.logo} className="w-16 h-16 mx-auto" />
                            <Typography variant="h6" className="text-center font-bold mt-2">
                                {donor.name}
                            </Typography>
                            <Typography className="text-center mt-1">
                                Pounds of Food Donated: {donor.foodDonated}
                            </Typography>
                            <Typography className="text-center">
                                People Fed: {donor.peopleFed}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Leader Board Section */}
            <div className="bg-green-300 p-8">
                <div className="text-center flex flex-col justify-center items-center py-10 ">
                    <h1 className=" uppercase text-xs tracking-wider w-[50%] mx-auto font-semibold text-gray-500 ">Let's See our</h1>
                    <p className=" uppercase text-4xl tracking-[.10em] font-semibold border-b-2 border-dashed border-gray-500 w-fit">Top Donors</p>
                </div>
                <h2 className="text-center text-xl font-bold mb-4"></h2>
                <table className="table-auto w-full">
                    <thead>
                        <tr className="text-left">
                            <th className="px-4 py-2">Rank</th>
                            <th className="px-4 py-2">Donor</th>
                            <th className="px-4 py-2">Meals Provided</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map((donor, index) => (
                            <tr key={donor.id}>
                                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-400  px-4 py-2">{donor.name}</td>
                                <td className="border border-gray-400  px-4 py-2">{donor.mealsProvided}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Progress Bar */}
            <Box className="bg-green-500 text-white py-10 text-center">
                <Typography variant="h5" className="font-bold mb-4">
                    Help Us Reach 100,000 Meals Donated!
                </Typography>
                <Box className="w-1/2 mx-auto">
                    <LinearProgress variant="determinate" value={70} />
                </Box>
                <Typography variant="body1" className="mt-2">
                    {70}% to Goal
                </Typography>
            </Box>

            {/* Graph */}
            <div className=" flex justify-center items-center py-20 ">
                <Chart></Chart>
            </div>

            <div className="text-center flex flex-col justify-center items-center py-10 ">
                <h1 className=" uppercase text-xs tracking-wider w-[50%] mx-auto font-semibold text-gray-500 ">Let's Meet our</h1>
                <p className=" uppercase text-4xl tracking-[.10em] font-semibold border-b-2 border-dashed border-gray-500 w-fit">Connected Donors</p>
            </div>

            <div className="flex flex-col justify-start items-start max-w-full py-6 mt-5 px-20  ">
                <h1 className="text-2xl font-semibold mb-2">Search here by Donors name or any Organization</h1>

                <fieldset className=" w-full space-y-1 dark:dark:text-gray-100">
                    <label htmlFor="Search" className="hidden">Search</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:dark:text-gray-100">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                            </button>
                        </span>
                        <input type="search" id="input-field" name="Search" placeholder="Search..." className=" w-full py-2 pl-10 text-sm rounded-md  focus:outline-none dark:dark:bg-gray-800 dark:dark:text-gray-100 focus:border-green-600 focus:dark:dark:bg-gray-900 focus:ring-0 focus:dark:dark:border-violet-400" />
                    </div>
                </fieldset>

            </div>

            <div className=" grid grid-cols-3 gap-5 px-20">
                <div className="card glass h-96">
                    <figure className=" h-1/2">
                        <img
                            className="w-full object-cover"
                            src="https://i.ibb.co.com/tJYTCMH/Food.png"
                            alt="car!" />
                    </figure>
                    <div className="card-body h-1/2">
                        <h2 className="card-title">Donors Name</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <Link className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                                View Profile
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card glass h-96 ">
                    <figure className=" h-1/2">
                        <img
                            className="w-full h-full object-cover"
                            src="https://i.ibb.co.com/tcdykjB/Clothing.png"
                            alt="car!" />
                    </figure>
                    <div className="card-body h-1/2 ">
                        <h2 className="card-title">Donors Name</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <Link className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                                View Profile
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card glass h-96">
                    <figure className=" h-1/2">
                        <img
                            className="w-full object-cover"
                            src="https://i.ibb.co.com/ky4N6mZ/health3.jpg"
                            alt="car!" />
                    </figure>
                    <div className="card-body h-1/2">
                        <h2 className="card-title">Donors Name</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <Link className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                                View Profile
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card glass h-96">
                    <figure className=" h-1/2">
                        <img
                            className="w-full object-cover"
                            src="https://i.ibb.co.com/6ZP6zvv/food2.jpg"
                            alt="car!" />
                    </figure>
                    <div className="card-body h-1/2">
                        <h2 className="card-title">Donors Name</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <Link className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                                View Profile
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card glass h-96">
                    <figure className=" h-1/2">
                        <img
                            className="w-full object-cover"
                            src="https://i.ibb.co.com/swsTbyF/Rectangle-4281.png"
                            alt="car!" />
                    </figure>
                    <div className="card-body h-1/2">
                        <h2 className="card-title">Donors Name</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <Link className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                                View Profile
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card glass h-96">
                    <figure className=" h-1/2">
                        <img
                            className="w-full object-cover"
                            src="https://i.ibb.co.com/98V0MT0/clothing2.jpg"
                            alt="car!" />
                    </figure>
                    <div className="card-body h-1/2">
                        <h2 className="card-title">Donors Name</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <Link className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                                View Profile
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    );
};

export default TopDonorsPage;