import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel } from '@material-ui/core'
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    table: {
        paddingTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: '#4A4A4A',
            borderTop:'none',
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#F3F5FF',
            cursor: 'pointer',
        },
        '& img':{
            width: 'auto', 
            maxHeight: 200
        }
    },
    
    [theme.breakpoints.down("sm")]: {
        MuiTableCell: {
            head: {
              fontSize: "1.3rem",
            },
            body: {
              fontSize: "1.3rem",
            },
            
          },
    },
}))

export default function useTableServerSide(records, headCells, filterFn, totalRecords) {
    const userSignIn = useSelector( state => state.userSignin );
    const {  userInfo  } = userSignIn;

    const classes = useStyles();

    const pages = [5, 10, 20]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const [pageDataConfig, setPageDataConfig] = useState({
        "currentPage": 1,
        "perPageCount": 5,
        "orderBy": "Id",
        "isAscending": false,
        "keyword": "",
        "email":userInfo?.email
      })

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
        setPageDataConfig(prevState =>{
            return { ...prevState,currentPage:newPage+1}
        })
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
        setPageDataConfig(prevState =>{
            return { ...prevState,perPageCount:parseInt(event.target.value, 10)}
        })
    }
    const TblPagination = () => (<TablePagination
        component="div"
        page={(page > 0 && (totalRecords ? totalRecords < rowsPerPage : records?.length < rowsPerPage )) ? 0 : page}
        // page={pageDataConfig.currentPage-1}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={ totalRecords ? totalRecords : (Array.isArray(records) ? records.length : 0)}
        // count={8}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
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
            // .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        pageDataConfig,
        setPageDataConfig
    }
}
