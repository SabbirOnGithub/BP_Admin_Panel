import React, { useState, useEffect } from 'react'
import ContactUsMessageDetailScreen from "./ContactUsMessageDetailScreen";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../../components/UseTable/useTable";
import Controls from "../../../components/controls/Controls";
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import DetailsIcon from '@material-ui/icons/Details';
import Loading from '../../../components/Loading/Loading';


import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { listContactUsMessages } from '../../../redux/actions/contactUsMessageActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'companyName', label: 'Company Name' },
    { id: 'email', label: 'Email' },
    { id: 'phoneNumber', label: 'Phone Number' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ContactUsMessageScreen() {

    const userSignIn = useSelector( state => state.userSignin );
    //eslint-disable-next-line
    const {  userInfo  } = userSignIn;

    const contactUsMessageList = useSelector(state => state.contactUsMessageList);
    //eslint-disable-next-line
    const { contactUsMessages, loading, error } = contactUsMessageList;

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
    } = useTable(contactUsMessages, headCells, filterFn);
    
    const dispatch = useDispatch();

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    useEffect(() => {
        dispatch(listContactUsMessages());
        return () => {
            // 
        }
    }, [dispatch])
    return (

        <>
            {
                loading ? <Loading /> :
                    <>
                        <PageTitle title="Contact Us Message" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                {
                                    openPopup ? 
                                <Widget
                                    title="Contact Us Message Detail"
                                    upperTitle
                                    // noBodyPadding
                                    disableWidgetMenu
                                    closePopup = {()=>{setOpenPopup(false); setRecordForEdit(null);}}
                                    closePopUpButtonText = 'Go back to list'

                                >
                                    <ContactUsMessageDetailScreen
                                            recordForEdit={recordForEdit}
                                        />
                                </Widget> : 
                                
                                <Widget
                                    title="Contact Us Message List Table"
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
                                                            <TableCell>{item.fullName}</TableCell>
                                                            <TableCell>{item.companyName}</TableCell>
                                                            <TableCell>{item.email}</TableCell>
                                                            <TableCell>{item.phoneNumber}</TableCell>
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
