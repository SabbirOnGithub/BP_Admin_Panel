import React, { useState, useEffect } from 'react'
import CoursePurchaseDetailScreen from "./CoursePurchaseDetailScreen";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../../components/UseTable/useTable";
import Controls from "../../../components/controls/Controls";
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import DetailsIcon from '@material-ui/icons/Details';
import Loading from '../../../components/Loading/Loading';
import { searchNameByIdFromArray } from '../../../helpers/search';


import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { listCoursePurchases } from '../../../redux/actions/coursePurchaseActions';
import { listSoftwares } from '../../../redux/actions/softwareActions';
import { listTrainingTypes } from '../../../redux/actions/trainingTypeActions';


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'trainingTypeId', label: 'Training Type' },
    { id: 'softwareId', label: 'Software' },
    { id: 'paymentStatus', label: 'Payment Status' },
    { id: 'attendenceCount', label: 'Attendence Count' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CoursePurchaseScreen() {
    const trainingTypeList = useSelector(state => state.trainingTypeList);
    //eslint-disable-next-line
    const { trainingTypes, loading:loadingTrainingTypes, error:errorTrainingTypes } = trainingTypeList;

    const softwareList = useSelector(state => state.softwareList);
    //eslint-disable-next-line
    const { softwares, loading: loadingSoftwares, error:errorSoftwares } = softwareList;

    const userSignIn = useSelector( state => state.userSignin );
    //eslint-disable-next-line
    const {  userInfo  } = userSignIn;

    const coursePurchaseList = useSelector(state => state.coursePurchaseList);
    //eslint-disable-next-line
    const { coursePurchases, loading, error } = coursePurchaseList;

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
    } = useTable(coursePurchases, headCells, filterFn);
    
    const dispatch = useDispatch();

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    useEffect(() => {
        dispatch(listSoftwares());
        dispatch(listTrainingTypes());
        dispatch(listCoursePurchases());
        return () => {
            // 
        }
    }, [dispatch])
    return (

        <>
            {
                loading ? <Loading /> :
                    <>
                        <PageTitle title="Course Purchase" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                {
                                    openPopup ? 
                                <Widget
                                    title="Course Purchase Detail"
                                    upperTitle
                                    // noBodyPadding
                                    disableWidgetMenu
                                >
                                    <CoursePurchaseDetailScreen
                                            recordForEdit={recordForEdit}
                                            setOpenPopup={setOpenPopup}
                                        />
                                </Widget> : 
                                
                                <Widget
                                    title="Course Purchase List Table"
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
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell>{item.email}</TableCell>
                                                            <TableCell>{softwares ? searchNameByIdFromArray(softwares, item.softwareId) : item.softwareId}</TableCell>
                                                            <TableCell>{trainingTypes ? searchNameByIdFromArray(trainingTypes, item.trainingTypeId) : item.trainingTypeId}</TableCell>
                                                            <TableCell>{item?.paymentStatus>0 ? 'True' : 'False'}</TableCell>
                                                            <TableCell>{item.attendenceCount}</TableCell>
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
