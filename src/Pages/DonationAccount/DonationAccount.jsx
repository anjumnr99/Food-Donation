import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';



const DonationAccount = () => {

    // const images = [
    //     {
    //         url: 'https://i.ibb.co.com/LZPdvL8/volunteer-giving-box-with-donations-another-volunteer-23-2149230558.jpg',
    //         title: 'Recipient',
    //         width: '50%',
    //     },
    //     {
    //         url: 'https://i.ibb.co.com/RSXDQxg/charity-share-love-18591-25851.jpg',
    //         title: 'Donors',
    //         width: '50%',
    //     },

    // ];

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 300,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '6px solid black',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));
    return (
        <div className=' h-screen bg-green-100'>
            <div className="text-center flex flex-col justify-center items-center py-16 ">
                <h1 className=" uppercase text-xs tracking-wider w-[50%] mx-auto font-semibold text-gray-500 ">Select the type of your account</h1>
                <p className=" uppercase text-4xl tracking-[.05em] font-semibold border-b-2 border-dashed border-gray-500 w-fit">Your account type?</p>
            </div>
            <div className='flex justify-center items-center '>
                <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    <ImageButton
                        focusRipple
                        style={{
                            width: "30%",
                        }}
                    >
                        <ImageSrc style={{ backgroundImage: `url(https://i.ibb.co.com/LZPdvL8/volunteer-giving-box-with-donations-another-volunteer-23-2149230558.jpg)` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Link to={'/recipient-form'}>
                            <Image>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    // color="black"
                                    sx={(theme) => ({
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: `calc(${theme.spacing()} + 6px)`,
                                        fontSize: '1.5em'
                                    })}
                                >
                                    {'Recipient'}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image></Link>
                    </ImageButton>
                    <ImageButton
                        focusRipple
                        style={{
                            width: "40%",
                        }}
                    >
                        <ImageSrc style={{ backgroundImage: `url(https://i.ibb.co.com/swsTbyF/Rectangle-4281.png)` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                //  color="black"
                                sx={(theme) => ({
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: `calc(${theme.spacing()} + 6px)`,
                                    fontSize: '1.5em'
                                })}
                            >
                                <Link to={'/donors-form'}>{'Business/Organization'}</Link>
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                    <ImageButton
                        focusRipple
                        style={{
                            width: "30%",
                        }}
                    >
                        <ImageSrc style={{ backgroundImage: `url(https://i.ibb.co.com/6ZP6zvv/food2.jpg)` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                // color="black"
                                sx={(theme) => ({
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: `calc(${theme.spacing()} + 6px)`,
                                    fontSize: '1.5em'
                                })}
                            >
                                <Link to={'/individual-donors-form'}>{'Individual Donors'}</Link>
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Box>
            </div>
        </div>
    );
};

export default DonationAccount;