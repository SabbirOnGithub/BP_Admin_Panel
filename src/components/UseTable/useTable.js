import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
    table: {
        // marginTop: theme.spacing(3),
        paddingTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            // color: '#ffffff',
            color: '#4A4A4A',
            // backgroundColor: '#F3F5FF',
            fontSize:'1.5rem',
            borderTop:'none',
        },
        '& tbody td': {
            fontWeight: '300',
            fontSize:'1.5rem',

        },
        '& tbody tr:hover': {
            // backgroundColor: '#fffbf2',
            backgroundColor: '#F3F5FF',
            cursor: 'pointer',
        },
        '& tbody td img':{
            width:'100px',
            height: 'auto'
        },
        '& tbody td p':{
            display: 'block',
            width: '150px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        },
        '& tbody td div':{
            display: 'block',
            width: '150px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        },
        '& tbody td ul':{
            display: 'block',
            width: '150px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        }
    },
}))

export default function useTable(records, headCells, filterFn) {

    const classes = useStyles();

    const pages = [5, 10, 25, 50, 100]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }

        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}>
                            {headCell.disableSorting ? headCell.label :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    // direction={orderBy === headCell.id ? order : 'desc'}
                                    onClick={() => { handleSortRequest(headCell.id) }}>
                                    {headCell.label}
                                </TableSortLabel>
                            }
                        </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const TblPagination = () => (<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={ Array.isArray(records) ? records.length : 0}
        // onChangePage={handleChangePage}
        onPageChange={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />)

    function stableSort(array, comparator) {
        const stabilizedThis = Array.isArray(array) ? array.map((el, index) => [el, index]) : [];
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });

        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}
