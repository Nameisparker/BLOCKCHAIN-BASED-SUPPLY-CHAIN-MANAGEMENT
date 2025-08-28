
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeWrapper from "./wrapper/HomeWrapper";

import Register from "./Register";
import ConfirmRegistration from "./ConfirmRegistration";

import Header from "./static/Header";
import Footer from "./static/Footer";
import { CircularPageLoader } from "./static/CircularPageLoader";
import NotFound from "./static/NotFound";
import NewUser from "./static/NewUser";
import RegistrationSuccess from "./static/RegistrationSuccess";
import RegistrationFailure from "./static/RegistrationFailure";

import { USER_TYPES } from "./enum/UsersEnum";

import "../css/App.css";

/**
 * Includes conditional application routing and user registration logic after app initialization.
 * 
 * @author syuki
 */
export const InitializedContent = ({contract, currentAddress}) => {

    const [isAuth, setIsAuth] = useState();
    const [userType, setUserType] = useState();

    const handleLogout = async () => {
        try {
            // Clear authentication state immediately
            setIsAuth(false);
            setUserType(null);
            
            // Clear all stored data
            localStorage.clear();
            sessionStorage.clear();
            
            // Clear any cached data
            if (window.ethereum && window.ethereum._state) {
                window.ethereum._state = {};
            }
            
            // Remove all event listeners from MetaMask
            if (window.ethereum && window.ethereum.removeAllListeners) {
                window.ethereum.removeAllListeners();
            }
            
            // Force a complete page reload and redirect to new-user page
            // This will clear all React state and force re-authentication
            window.location.replace(window.location.origin + '/new-user?logout=' + Date.now());
            
        } catch (error) {
            console.log('Logout error:', error);
            // Even if there's an error, force the redirect
            window.location.replace(window.location.origin + '/new-user?logout=' + Date.now());
        }
    };

    //If the user is registered as at least one role, they're allowed access to the application content.
    useEffect(() => {
        //Clear location state.
        window.history.replaceState({}, '');

        let retailerResult = null;
        let producerResult = null;
        
        contract.connect(currentAddress).isRetailer().then((receipt) => {
                    console.log(receipt);
                    retailerResult = receipt;
                    if(receipt){
                        setUserType(USER_TYPES[2]);
                    }
                }).catch((error) => {
                    console.log(error);
                    retailerResult = false;
                });
        contract.connect(currentAddress).isProducer().then((receipt) => {
                    console.log(receipt);
                    producerResult = receipt;
                    if(receipt){
                        setUserType(USER_TYPES[0]);
                    }
                }).catch((error) => {
                    console.log(error);
                    producerResult = false;
                });
        contract.connect(currentAddress).isDistributor().then((receipt) => {
                    console.log(receipt);
                    if(receipt){
                        setUserType(USER_TYPES[1]);
                    }
                    setIsAuth(retailerResult || producerResult || receipt);
                }).catch((error) => {
                    console.log(error);
                    setIsAuth(retailerResult || producerResult || false);
                });
    }, []);

    function updateIsAuth(newIsAuth){
        setIsAuth(newIsAuth);
    }

    function updateUserType(newUserType){
        setUserType(newUserType);
    }

    //Registered users are redirected to the home page, un-registered users go to the sign-up page.
    if(isAuth != undefined) {
        return (
            <Router>
                <Header isAuthenticated={isAuth} userType={userType} contract={contract} currentAddress={currentAddress} onLogout={handleLogout} />
                <div>
                    <Routes>
                        {/* Registered users are redirected to the home page, un-registered users go to the register/sign-up page. */}
                        <Route exact path="/new-user" element={<NewUser isAuthenticated={isAuth} />} /> 
                        <Route exact path="/register" element={<Register contract={contract} currentAddress={currentAddress} isAuthenticated={isAuth} />} /> 
                        <Route exact path="/confirm-registration" element={<ConfirmRegistration contract={contract} currentAddress={currentAddress} isAuthenticated={isAuth} />} />   
                        <Route exact path="/registration-success" element={<RegistrationSuccess isAuthenticated={isAuth} />} />   
                        <Route exact path="/registration-failure" element={<RegistrationFailure isAuthenticated={isAuth} />} />   
                        <Route exact path="/" element={<HomeWrapper contract={contract} currentAddress={currentAddress} isAuthenticated={isAuth} userType={userType} updateAuth={updateIsAuth} updateUserType={updateUserType} />} /> 
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer isAuthenticated={isAuth} />
            </Router>
        );
    } else {
        return (<CircularPageLoader open = {true} />);
    }
}
