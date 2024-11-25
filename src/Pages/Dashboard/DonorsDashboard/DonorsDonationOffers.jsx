import { Button, Card, CardContent, Grid2, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const DonorsDonationOffers = () => {
    const { user } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();
    const [offers, setOffers] = useState([]);

    const { data: donations, refetch } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donations/donors?email=${user?.email}`);
            // console.log('res data:',res.data);
            return res.data;
        }

    });
    useEffect(() => {
        setOffers(donations);
    }, [donations])

    const handleCancel = (id) => {
        setOffers((prev) => prev.filter((offer) => offer.id !== id));
        refetch();
    };
    return (
        <Grid2 container spacing={2}>
            {offers?.map((offer) => (
                <Grid2 item xs={12} md={6} key={offer.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Offer ID: {offer.id}</Typography>
                            <Typography>Items: {offer.items}</Typography>
                            <Typography>Quantity: {offer.quantity}</Typography>
                            <Typography>Status: {offer.status}</Typography>
                            {offer?.status === "pending" && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ mt: 2 }}
                                    onClick={() => handleCancel(offer.id)}
                                >
                                    Cancel Offer
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default DonorsDonationOffers;