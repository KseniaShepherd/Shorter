import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DialogSelect({onSort}) {
    const [open, setOpen] = React.useState(false);
    const [sortField, setSortField] = React.useState('');
    const [sortDirection, setSortDirection] = React.useState('');

    const handleChange = (event) => {
        setSortField(event.target.value);
    };
    const handleChangeDirection = (event) => {
        setSortDirection(event.target.value);
    };

    const handleApply = () => {
        onSort(sortField, sortDirection);
        handleClose();
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    return (
        <div style={{width: '1300px', justifyContent: 'center'}}>
            <Button onClick={() => setOpen(true)}>Сортировать</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Сортировать по</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel htmlFor="sort-field">Столбцу</InputLabel>
                            <Select
                                value={sortField}
                                onChange={handleChange}
                                input={<OutlinedInput label="По" id="sort-field"/>}
                            >
                                <MenuItem value="short">Короткая ссылка</MenuItem>
                                <MenuItem value="target">Оригинальная ссылка</MenuItem>
                                <MenuItem value="counter">Количество переходов</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel htmlFor="sort-direction">Направлению</InputLabel>
                            <Select
                                value={sortDirection}
                                onChange={handleChangeDirection}
                                input={<OutlinedInput label="Направлению" id="sort-direction"/>}
                            >
                                <MenuItem value="asc">Возрастанию</MenuItem>
                                <MenuItem value="desc">Убыванию</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleApply}>Применить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}