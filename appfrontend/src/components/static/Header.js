import React, { useState } from 'react';  
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';  

import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { USER_TYPES } from '../enum/UsersEnum';

import Profile from '../Profile';
// Clock component displays the realtime clock on the right side of the header.
import Clock from './Clock';

import '../../css/App.css';

/**
 * Header component. Present in every page when user is an authenticated one.
 * 
 * @author syuki
 */
export default function Header({isAuthenticated, userType, contract, currentAddress, onLogout}) {

    const [showProfile, setShowProfile] = useState();
    const [anchorEl, setAnchorEl] = useState();
    const [profilePicture, setProfilePicture] = useState();

    function toggleProfile(event) {
        let profilePicturePath = "/profile-designs/Producer.png";
        if(userType == USER_TYPES[1]){
            profilePicturePath = "/profile-designs/Distributor.png";
        } 
        if(userType == USER_TYPES[2]){
            profilePicturePath = "/profile-designs/Retailer.png";
        } 
        setProfilePicture(profilePicturePath);
        setShowProfile(!showProfile);
        // Only set anchorEl if event exists (when opening the menu)
        if (event && event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function closeProfile() {
        setShowProfile(false);
    }

    if(!isAuthenticated){
        return null;
    } else {
        return(
            <div> 
                <AppBar position="static" color="secondary" elevation={0}>
                    <Toolbar> 
                        <NavLink exact to="/" className="undecorated-links"> 
                            <IconButton color="inherit">
                                <img src="/ntp.jpg" alt="logo" id="app-logo-header"/>
                            </IconButton>
                        </NavLink>
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography 
                                variant="h6" 
                                component="div" 
                                sx={{ 
                                    fontWeight: 800, 
                                    color: 'white', 
                                    letterSpacing: '1.5px', 
                                    fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                                    fontFamily: 'Segoe UI, Arial, sans-serif',
                                    textTransform: 'uppercase',
                                    mb: 0.2,
                                    textAlign: 'center'
                                }}
                            >
                                Track to Trust: Building Transparency
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                component="div"
                                sx={{
                                    color: 'white',
                                    fontWeight: 400,
                                    fontSize: { xs: '0.75rem', sm: '0.95rem', md: '1.05rem' },
                                    fontFamily: 'Segoe UI, Arial, sans-serif',
                                    letterSpacing: '0.5px',
                                    textTransform: 'none',
                                    mt: 0,
                                    textAlign: 'center'
                                }}
                            >
                                with NTP Product Traceability Chain
                            </Typography>
                        </div>
                        <Clock />
                        <IconButton color="inherit" id="right-anchored-menu-item" onClick={toggleProfile}>
                            <AccountCircle style={{ fontSize: 40 }}/> 
                            <ArrowDropDownIcon className="dropdown-arrow-icon" />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {showProfile ? 
                    <Profile 
                        open={showProfile} 
                        close={closeProfile}
                        userType={userType} 
                        currentAddress={currentAddress}
                        anchorEl={anchorEl}
                        profilePicturePath={profilePicture}
                        onLogout={onLogout}
                    />
                    : null
                }   
            </div>
        );
    }
};
