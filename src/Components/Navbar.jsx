import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Fragment, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRecipient from '../Hooks/useRecipient';
import useIndividualDonor from '../Hooks/useIndividualDonor';
import useBusinessDonor from '../Hooks/useBusinessDonor';
import { green, lightGreen } from '@mui/material/colors';
import useNotification from '../Hooks/useNotification';
import { Avatar, CssBaseline, Divider, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Tooltip } from '@mui/material';
import { Login, Logout, PersonAdd, Settings } from '@mui/icons-material';

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../assets/food-donation.png";
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Navbar = () => {

    const [showDashboard, setShowDashboard] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const { notifications } = useNotification();
    const navigate = useNavigate();
    const [notificationCount, setNotificationCount] = useState(notifications?.length || 0);

    const { isRecipient } = useRecipient();
    const { isIndividualDonor } = useIndividualDonor();
    const { isBusinessDonor } = useBusinessDonor();


    console.log("Notification from nav", notifications);


    useEffect(() => {
        if (isBusinessDonor || isIndividualDonor || isRecipient) {
            setShowDashboard(true);
        } else {
            setShowDashboard(false);
        }
    }, [isBusinessDonor, isIndividualDonor, isRecipient]);
    console.log(isBusinessDonor, isIndividualDonor, isRecipient);
    console.log(showDashboard);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleNewNotification = () => {
        setNotificationCount(0)
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result);
                toast.success('Logout Successfully!')

                navigate('/login');
            })
            .catch(err => {
                toast.error(err.message)
                console.log(err)
            })
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {
                user && <div className=' border-b-2'>
                    <MenuItem onClick={handleMenuClose}>{user?.displayName}</MenuItem>
                    <MenuItem onClick={handleMenuClose}>{user?.email}</MenuItem>
                </div>
            }
            {
                showDashboard ? <div>
                    <MenuItem onClick={handleMenuClose}>
                        <Link to={'/my-account'}>My account</Link></MenuItem>
                    <MenuItem onClick={handleMenuClose}><Link to={'/dashboard'}>
                        Dashboard</Link></MenuItem>
                </div> : <MenuItem onClick={handleMenuClose}><Link to={'/donation-account'}>
                    Create an Account</Link></MenuItem>
            }

            <MenuItem onClick={handleMenuClose}>
                <button onClick={handleLogOut} className="block w-full  text-md font-semibold text-green-600 hover:bg-green-100 dark:hover:bg-green-600 dark:text-green-500 dark:hover:text-white"> Logout
                </button></MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const [anchorEl2, setAnchorEl2] = useState(null);
    const open = Boolean(anchorEl2);
    const handleClick = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl2(null);
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 50px",
                backgroundColor: "#000000",
                color: "#ffffff",
            }}
        >
            <div className='flex'>
                <img
                    src={logo}
                    alt="logo"
                    style={{ height: "50px", marginRight: "20px" }}
                />
                <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>give grub</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Link to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
                    Home
                </Link>
                <Link to="/how-it-works" style={{ textDecoration: "none", color: "#ffffff" }}>
                    How It Works
                </Link>
                <Link to="/about-us" style={{ textDecoration: "none", color: "#ffffff" }}>
                    About Us
                </Link>
                <Link to="/top-donors" style={{ textDecoration: "none", color: "#ffffff" }}>
                    Top Donors
                </Link>
                {
                    user?.email ? <div>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="large"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'show new notifications' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}

                                >
                                    <Badge onClick={handleNewNotification} badgeContent={notificationCount} color="error">
                                        <NotificationsIcon color='primary' sx={{ fontSize: '2.5rem' }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl2}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            // mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem >
                                    <AppBar color='success'>
                                        <Toolbar>
                                            <Typography variant="h6" component="div">
                                                Notifications
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                    <List sx={{
                                        mt: 8,
                                        width: '300px',
                                        height: 'max-content',
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                    }}>
                                        {notifications?.map((notification, index) => (
                                            <Fragment key={notification._id}>
                                                <ListItemText
                                                    primary={notification.message}
                                                    sx={{
                                                        whiteSpace: 'normal',
                                                        wordWrap: 'break-word',
                                                        marginBottom: '10px',
                                                        marginTop: '10px'
                                                    }}
                                                />

                                                {index < notifications.length - 1 && <Divider />}
                                            </Fragment>
                                        ))}
                                    </List>
                                </MenuItem>

                            </Menu>


                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle sx={{ fontSize: '3rem' }} />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </div> : <div className="flex justify-center items-center gap-3">


                        <button className="text-2xl  font-semibold text-blue-500">
                            <NavLink
                                to="/login"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "  text-blue-400 font-bold" : ""
                                }
                            >
                                Login
                            </NavLink>

                        </button>

                    </div>
                }

            </div>
            {renderMobileMenu}
            {renderMenu}
        </nav>
    );
};

export default Navbar;


{/* <Box sx={{ flexGrow: 1 }}>
<AppBar position="static" sx={{ backgroundColor: '#505050' }} >
    <Toolbar>
        
        <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
        >
            give&take
        </Typography>
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        <Box sx={{ flexGrow: 1 }} />

        {
            user?.email ? <div>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="large"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'show new notifications' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            
                        >
                            <Badge onClick={handleNewNotification} badgeContent={notificationCount} color="error">
                                <NotificationsIcon color='primary' sx={{ fontSize: '2.5rem' }} />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl2}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    // mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem >
                            <AppBar color='success'>
                                <Toolbar>
                                    <Typography variant="h6" component="div">
                                        Notifications
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <List sx={{
                                mt: 8,
                                width: '300px',
                                height: 'max-content',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                            }}>
                                {notifications?.map((notification, index) => (
                                    <Fragment key={notification._id}>
                                        <ListItemText
                                            primary={notification.message}
                                            sx={{
                                                whiteSpace: 'normal',
                                                wordWrap: 'break-word',
                                                marginBottom: '10px',
                                                marginTop: '10px'
                                            }}
                                        />

                                        {index < notifications.length - 1 && <Divider />}
                                    </Fragment>
                                ))}
                            </List>
                        </MenuItem>

                    </Menu>


                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle  sx={{ fontSize: '3rem' }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </Box>
            </div> : <div className="flex justify-center items-center gap-3">


                <button className="text-2xl  font-semibold text-blue-500">
                    <NavLink
                        to="/login"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "  text-blue-400 font-bold" : ""
                        }
                    >
                        Login
                    </NavLink>

                </button>
            </div>
        }
    </Toolbar>
</AppBar>
{renderMobileMenu}
{renderMenu}
</Box> */}