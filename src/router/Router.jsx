import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import MainPage from "../pages/MainPage";
import Header from "../layouts/Header/Header";

const Router = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/registration' element={<RegistrationPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </div>
    );
};

export default Router;