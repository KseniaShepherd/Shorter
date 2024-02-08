import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {squeezeLink} from '../../store/reducers/linkSlice';
import {TextField, Button, Box, Grid} from '@mui/material';

const LinkForm = () => {
    const dispatch = useDispatch();
    const [link, setLink] = useState('');
    const {error} = useSelector((state) => state.link);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(squeezeLink({link}));
        setLink('')
    };

    const handleChange = (event) => {
        setLink(event.target.value);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '50px'}}>
                        <TextField
                            id="link"
                            label="Введите ссылку"
                            variant="outlined"
                            value={link}
                            onChange={handleChange}
                            sx={{width: '1300px', marginRight: '16px'}}
                        />
                        <Button type="submit" variant="contained" color="primary"
                                sx={{minHeigh: '100%', paddingTop: '4px', paddingBottom: '4px'}}>
                            Сократить ссылку
                        </Button>
                    </Box>
                </form>
                {error && (
                    <p style={{color: 'red'}}>
                        Для доступа к этому ресурсу требуется авторизация. Пожалуйста,
                        <a href="/login" style={{color: 'red', textDecoration: 'underline'}}> войдите в систему </a>
                        чтобы продолжить.
                    </p>
                )}
            </Grid>
        </Grid>
    );
};

export default LinkForm;