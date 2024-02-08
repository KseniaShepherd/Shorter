import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUserStatistics} from '../store/reducers/linkSlice';
import DialogSelect from '../shared/SortSelect';
import ShortLink from '../shared/ShortLink';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TableHead} from "@mui/material";

function CustomPaginationActionsTable() {
    const dispatch = useDispatch();
    const {userLinksStats, loading, error, totalCount} = useSelector((state) => state.link);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortField, setSortField] = useState('short');
    const [sortDirection, setSortDirection] = useState('asc');
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        dispatch(getUserStatistics({
            order: `${sortDirection}_${sortField}`,
            offset: page * rowsPerPage,
            limit: rowsPerPage
        }));
    }, [dispatch, page, rowsPerPage, sortDirection, sortField, rerender]);
    const handleRerender = () => {
        setRerender(prevState => !prevState);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const newOffset = newPage * rowsPerPage;
        dispatch(getUserStatistics({order: `${sortDirection}_${sortField}`, offset: newOffset, limit: rowsPerPage}));
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        const newOffset = 0;
        dispatch(getUserStatistics({order: `${sortDirection}_${sortField}`, offset: newOffset, limit: newRowsPerPage}));
    };

    const handleSort = (field, direction) => {
        setSortField(field);
        setSortDirection(direction);
        setPage(0); // Reset page when changing sort
        dispatch(getUserStatistics({order: `${direction}_${field}`, offset: 0, limit: rowsPerPage}));
    };

    const handleShortLinkClick = () => {
        // Перерендериваем всю таблицу
        handleRerender();
    };
    if (loading) return <p style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }}>Loading...</p>;
    if (error) return <p style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }}>Error: {error}</p>;

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <DialogSelect onSort={handleSort}/>

                <TableContainer style={{cursor: 'default', display: 'flex', justifyContent: 'center'}}
                                sx={{maxWidth: 1500, justifyContent: 'center'}} align={'center'} component={Paper}>
                    <Table sx={{maxWidth: 1300}} align={'center'} aria-label="custom pagination table">
                        <TableHead> {/* Добавлено */}
                            <TableRow> {/* Добавлено */}
                                <TableCell>ССЫЛКА</TableCell> {/* Добавлено */}
                                <TableCell align="center">КОРОТКАЯ ССЫЛКА</TableCell> {/* Добавлено */}
                                <TableCell align="right">КОЛИЧЕСТВО ПЕРЕХОДОВ</TableCell> {/* Добавлено */}
                            </TableRow> {/* Добавлено */}
                        </TableHead> {/* Добавлено */}
                        <TableBody>
                            {userLinksStats && userLinksStats.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {row.target}
                                    </TableCell>
                                    <TableCell style={{width: 460, display: 'flex', justifyContent: 'space-between'}}
                                               align="right">
                                        <ShortLink value={row.short} rerenderTable={handleShortLinkClick}/>
                                    </TableCell>
                                    <TableCell style={{width: 160}} align="right">
                                        {row.counter}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={3}
                                    count={totalCount}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default CustomPaginationActionsTable;