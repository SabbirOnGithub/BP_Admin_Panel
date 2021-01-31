import React, { useState, useEffect } from 'react'
import CtaCategoryDetailScreen from "./CtaCategoryDetailScreen";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../../components/UseTable/useTable";
import Controls from "../../../components/controls/Controls";
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import DetailsIcon from '@material-ui/icons/Details';


import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { listCtaCategorys } from '../../../redux/actions/ctaCategoryActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'companyName', label: 'Company Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CtaCategoryScreen() {

    const userSignIn = useSelector( state => state.userSignin );
    //eslint-disable-next-line
    const {  userInfo  } = userSignIn;

    const ctaCategoryList = useSelector(state => state.ctaCategoryList);
    //eslint-disable-next-line
    const { ctaCategorys, loading, error } = ctaCategoryList;

    const [recordForEdit, setRecordForEdit] = useState(null)
    // const [records, setRecords] = useState([])
    //eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(ctaCategorys, headCells, filterFn);
    
    const dispatch = useDispatch();

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    useEffect(() => {
        dispatch(listCtaCategorys());
        return () => {
            // 
        }
    }, [dispatch])
    return (

        <>
            {
                loading ? "Loading" :
                    <>
                        <PageTitle title="Cta Categorys" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                {
                                    openPopup ? 
                                <Widget
                                    title="Cta Category Detail"
                                    upperTitle
                                    // noBodyPadding
                                    disableWidgetMenu
                                >
                                    <CtaCategoryDetailScreen
                                            recordForEdit={recordForEdit}
                                            setOpenPopup={setOpenPopup}
                                        />
                                </Widget> : 
                                
                                <Widget
                                    title="Cta Category List Table"
                                    upperTitle
                                    noBodyPadding
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    threeDotDisplay={true}
                                    disableWidgetMenu
                                >
                                    
                                    <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                        <TblContainer>
                                            <TblHead />
                                            <TableBody>
                                                {
                                                    recordsAfterPagingAndSorting().map(item =>
                                                        (<TableRow key={item.id}>
                                                            <TableCell>{item.id}</TableCell>
                                                            <TableCell>{item.firstName + ' ' + item.lastName}</TableCell>
                                                            <TableCell>{item.companyName}</TableCell>
                                                            <TableCell>{item.email}</TableCell>
                                                            <TableCell>{item.phone}</TableCell>
                                                            <TableCell>
                                                                <Controls.ActionButton
                                                                    color="primary"
                                                                    onClick={() => { openInPopup(item) }}>
                                                                    <DetailsIcon fontSize="small" />
                                                                </Controls.ActionButton>
                                                            </TableCell>
                                                        </TableRow>)
                                                    )
                                                }
                                            </TableBody>
                                        </TblContainer>
                                        <TblPagination />
                                    </Paper>
                                    
                                    <Notification
                                        notify={notify}
                                        setNotify={setNotify}
                                    />
                                    <ConfirmDialog
                                        confirmDialog={confirmDialog}
                                        setConfirmDialog={setConfirmDialog}
                                    />
                                </Widget>

                                }
                                
                            </Grid>
                        </Grid>
                    </>
            }
        </>
    )
}
