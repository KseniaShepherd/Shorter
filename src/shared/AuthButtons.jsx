import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login, logout} from '../store/reducers/authSlice';

import Button from "@mui/material/Button";

const AuthButtons = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        dispatch(login());
        navigate('/login');
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            {accessToken ? (
                <Button variant="outlined" color="secondary" onClick={handleLogout}>Выйти</Button>
            ) : (
                <Button variant="outlined" color="secondary" onClick={handleLogin}>Войти</Button>
            )}
        </div>
    );
};

export default AuthButtons;