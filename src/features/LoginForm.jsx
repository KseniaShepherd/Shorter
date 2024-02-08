import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginUser} from '../store/reducers/authSlice';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Button, TextField, Typography, Box} from '@mui/material';



const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Имя пользователя обязательно'),
        password: Yup.string().required('Пароль обязателен'),
    });
    const handleRegistrationClick = () => {
        navigate('/registration');
    };
    const onSubmit = async (values) => {
        try {
            await dispatch(loginUser(values));
            navigate('/');
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    };

    return (
        <Box sx={{maxWidth: 400, margin: 'auto'}}>
            <Typography variant="h5" mb={2}>
                Вход
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
                                type="password"
                                label="Пароль"
                                variant="outlined"
                                sx={{
                                    borderColor: validationSchema?.errors?.password ? 'red' : '',
                                }}
                            />
                            <ErrorMessage name="password" component="div" className="error"/>
                        </Box>
                        <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
                            Войти
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography variant="body2" mt={2} onClick={handleRegistrationClick}>
                Еще не зарегистрированы? Регистрация
            </Typography>
        </Box>
    );
};

export default LoginForm;