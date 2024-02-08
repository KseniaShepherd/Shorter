import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser, registerUser } from '../store/reducers/authSlice';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, TextField, Typography, Box, IconButton, InputAdornment } from '@mui/material';

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error); // Получение ошибки из состояния

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialValues = {
        username: '', // Добавлено поле username в initialValues
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Имя пользователя обязательно'),
        password: Yup.string()
            .required('Пароль обязателен')
            .min(8, 'Пароль должен содержать минимум 8 символов')
            .matches(/^(?=.*[A-Z])(?=.*\d)/, 'Пароль должен содержать как минимум одну заглавную букву и одну цифру'),
        confirmPassword: Yup.string()
            .required('Подтверждение пароля обязательно')
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    });

    const onSubmit = async (values) => {
        try {
            const response = await dispatch(registerUser(values));
            const {username, password} = values;
            if (!response.error) {
                await dispatch(loginUser({username, password}));
                navigate('/');
            } else {
                console.error('Ошибка регистрации:', response.error);
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        // Логика для обнаружения ошибки и ее обработки, если необходимо
    }, [error]); // Передаем error в массив зависимостей, чтобы useEffect вызывался при изменении error

    return (
        <Box sx={{maxWidth: 400, margin: 'auto'}}>
            <Typography variant="h5" mb={2}>
                Регистрация
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({isValid}) => (
                    <Form>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                fullWidth
                                id="username"
                                name="username"
                                label="Имя пользователя"
                                variant="outlined"
                                sx={{
                                    borderColor: validationSchema?.errors?.username ? 'red' : '',
                                }}
                            />
                            <ErrorMessage name="username" component="div" className="error"/>
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                fullWidth
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                label="Пароль"
                                variant="outlined"
                                sx={{
                                    borderColor: validationSchema?.errors?.password ? 'red' : '',
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <ErrorMessage name="password" component="div" className="error"/>
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                label="Подтвердите пароль"
                                variant="outlined"
                                sx={{
                                    borderColor: validationSchema?.errors?.confirmPassword ? 'red' : '',
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                                                {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="error"/>
                        </Box>
                        <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
                            Зарегистрироваться
                        </Button>
                        {error && <div className="error">{error}</div>}
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default RegistrationForm;