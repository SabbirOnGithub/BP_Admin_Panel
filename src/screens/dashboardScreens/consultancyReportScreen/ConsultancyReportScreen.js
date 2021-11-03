import React, { useState, useEffect } from 'react'
// import ConsultancyReportForm from "./ConsultancyReportForm";
import CtaFunctionDetailScreen from "../ctaScreen/ctaFunctionScreen/CtaFunctionDetailScreen";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
// import useTable from "../../../components/UseTable/useTable";
import Controls from "../../../components/controls/Controls";
// import Popup from "../../../components/Popup/Popup";
import useTableServerSide from "../../../components/UseTable/useTableServerSide";
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import CloseIcon from '@material-ui/icons/Close';
import DetailsIcon from '@material-ui/icons/Details';
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
// import { ResponseMessage } from "../../../themes/responseMessage";
import Loading from '../../../components/Loading/Loading';

import { useSelector, useDispatch } from 'react-redux';
// permissions
import { usePermission } from '../../../components/UsePermission/usePermission';
import { accessDeniedRoute } from '../../../routes/routeConstants';

// redux actions
import { listConsultancyReports } from '../../../redux/actions/consultancyReportActions';
import { saveCtaFunction } from '../../../redux/actions/ctaFunctionActions';
import { saveConsultancyAssignment } from '../../../redux/actions/consultancyAssignmentActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'companyName', label: 'Company name' },
    { id: 'contactName', label: 'Contact Name' },
    { id: 'status', label: 'Status' },
    { id: 'consultationTypeName', label: 'Consultation type Name' },
    { id: 'packageName', label: 'Package Name' },
    { id: 'paymentStatus', label: 'Payment Status' },
    { id: 'amount', label: 'Amount' },
    { id: 'purchasedHours', label: 'Purchase Hours (aka total hours)' },
    { id: 'usedHours', label: 'Used hours' },
    { id: 'remainingHours', label: 'Remaining Hours' },
    { id: 'expirationDate', label: 'Expiration date' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ConsultancyReportScreen() {
    // permission get
    const {
        permission,
        setPermission,
        recievedPermission,
        loadingRoleResource,
        history,
        initialPermission
    } = usePermission();
    //eslint-disable-next-line
    const { createOperation, readOperation, updateOperation, deleteOperation } = permission;
    // permission get end

    const consultancyReportList = useSelector(state => state.consultancyReportList);
    //eslint-disable-next-line
    const { consultancyReports, loading, error } = consultancyReportList;

    const ctaFunctionSave = useSelector(state => state.ctaFunctionSave);
    //eslint-disable-next-line
    const { loading: loadingCtaFunctionSave, success: successCtaFunctionSave } = ctaFunctionSave;

    // const {totalAmount, totalPurchaseHours, totalRemainingHours, totalUsedHours, consultancyReportItems} = consultancyReports;
    // console.log(consultancyReportItems)
    //eslint-disable-next-line
    const [recordForEdit, setRecordForEdit] = useState(null)
    //eslint-disable-next-line
    const [recordForDetails, setRecordForDetails] = useState(null)
    const [showCtaFunctionDetail, setShowCtaFunctionDetail] = useState(false)

    // const [records, setRecords] = useState([])
    //eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    //eslint-disable-next-line
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [searchValue, setSearchValue] = useState("")

    //eslint-disable-next-line
    const {
        TblContainer,
        TblHead,
        // TblPagination,
        recordsAfterPagingAndSorting,
        pageDataConfig,
        setPageDataConfig
    } = useTableServerSide(consultancyReports?.consultancyReportItems || [], headCells, filterFn, consultancyReports?.consultancyReportItems?.length || 0);

    const dispatch = useDispatch();
    // search from table
    const handleSearch = e => {
        e.persist();
        const recievedSearchValue = e.target.value;
        setSearchValue(recievedSearchValue);
        // --------------------
        // server side search
        // --------------------
        setPageDataConfig(prevState => {
            return { ...prevState, keyword: recievedSearchValue }
        })
        // --------------------
        // client side search
        // --------------------
        // setFilterFn({
        //     fn: items => {
        //         if (recievedSearchValue) {
        //             return items.filter(x => {
        //                 const makeStringInRow = (
        //                     (x?.firstName && x?.firstName) +
        //                     (x?.lastName && (' ' + x?.lastName)) +
        //                     (x?.companyName && (' ' + x?.companyName)) +
        //                     (x?.email && (' ' + x?.email)) +
        //                     (x?.phone && (' ' + x?.phone))
        //                 )?.toString()?.toLowerCase();
        //                 return makeStringInRow.indexOf(recievedSearchValue.toString().toLowerCase()) > -1;
        //             });
        //         }
        //         else {
        //             return items;
        //         }
        //     }
        // });
        // --------------------
        // client side search end
        // --------------------
    }

    const openInDetails = item => {
        setRecordForDetails(item)
        setShowCtaFunctionDetail(true)
    }

    // ctaFunction related function copied
    //------------------------------------- 
    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(saveCtaFunction(item))
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log('err occured' + err)
                reject(err)
            })
    })

    // add/update promise
    const saveAssignItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(saveConsultancyAssignment(item))
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log('err occured' + err)
                reject(err)
            })
    })

    const addOrEdit = async (item, resetForm, values, activeStep, setActiveStep) => {
        // resetForm()
        console.log(item)
        return saveItem(item)
            .then((res) => {
                console.log(res)
                if (res?.status === true) {
                    resetForm()
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                    setActiveStep && setActiveStep(activeStep + 1)
                    delete item.id
                    setRecordForEdit({
                        ...values,
                        id: res.data
                    })
                } else {
                    setNotify({
                        isOpen: true,
                        message: 'Submition Failed',
                        type: 'warning'
                    })
                }
                return res

            })
            .catch(err => {
                console.log('err occured' + err)
            })

    }
    const addOrEditConsultancyAssign = async (item, resetForm, setRecordForEdit, setOpenPopupForAssign) => {
        return saveAssignItem(item)
            .then((res) => {
                if (res?.status) {
                    resetForm();
                    setRecordForEdit(null);
                    setOpenPopupForAssign(false);
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                } else {
                    setNotify({
                        isOpen: true,
                        message: 'Submition Failed',
                        type: 'warning'
                    })
                }

                // if (successConsultancyAssignmentSave) {
                //     setNotify({
                //         isOpen: true,
                //         message: 'Submitted Successfully',
                //         type: 'success'
                //     })
                // }

                // if (errorConsultancyAssignmentSave) {
                //     setNotify({
                //         isOpen: true,
                //         message: 'Submition Failed',
                //         type: 'warning'
                //     })
                // }
                return res
            })
            .catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {
        try {

            if (recievedPermission) {
                setPermission({ ...recievedPermission })
            }
            if (recievedPermission?.readOperation) {
                dispatch(listConsultancyReports(pageDataConfig));
            }
            if (readOperation === false) {
                history.push(accessDeniedRoute);
            }
            if (loadingRoleResource === false && !recievedPermission) {
                setPermission({ ...initialPermission })
            }
        } catch (e) {
            console.log(e)
        }
        return () => {
            // 
        }
    }, [dispatch, setPermission, recievedPermission, readOperation, history, initialPermission, loadingRoleResource, pageDataConfig])
    return (

        <>
            {
                (loadingRoleResource) ? <Loading /> :

                    (
                        showCtaFunctionDetail ?
                            <>
                                <Widget
                                    title={recordForDetails?.isCategory ? "Cta Category Detail" : "Cta Function Detail"}
                                    upperTitle
                                    // noBodyPadding
                                    disableWidgetMenu
                                    closePopup={() => setShowCtaFunctionDetail(false)}
                                    closePopUpButtonText='Go back to list'
                                >
                                    <CtaFunctionDetailScreen
                                        recordForDetails={recordForDetails}
                                        createOperation={createOperation} // ctaScreen create permission for user
                                        updateOperation={updateOperation}
                                        deleteOperation={deleteOperation}
                                        addOrEdit={addOrEdit}
                                        successCtaFunctionSave={successCtaFunctionSave}
                                        loadingCtaFunctionSave={loadingCtaFunctionSave}
                                        addOrEditConsultancyAssign={addOrEditConsultancyAssign}
                                    />
                                </Widget>
                            </>
                            :
                            (
                                // consultancyReportItems?.length >= 0 &&
                                <>
                                    <PageTitle title="Consultancy Dashboard" />

                                    <Grid container spacing={4}>
                                        <Grid item xs={12}>
                                            <Widget
                                                title="Consultancy Report List Table"
                                                upperTitle
                                                noBodyPadding
                                                setOpenPopup={setOpenPopup}
                                                setRecordForEdit={setRecordForEdit}
                                                threeDotDisplay={true}
                                                disableWidgetMenu
                                                addNew={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                                createOperation={createOperation}
                                                handleSearch={handleSearch}
                                                searchLabel='Search here..'
                                                searchValue={searchValue}
                                            >
                                                <>
                                                    <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                                        <TblContainer>
                                                            <TblHead />
                                                            <TableBody>
                                                                {
                                                                    (loading) ?
                                                                        (<TableRow key={0}>
                                                                            <TableCell style={{ borderBottom: 'none' }}>
                                                                                <Loading />
                                                                            </TableCell>

                                                                        </TableRow>) :
                                                                        consultancyReports?.consultancyReportItems?.length >= 0 &&
                                                                        <>
                                                                            {
                                                                                recordsAfterPagingAndSorting()?.map(item =>
                                                                                (<TableRow key={item.id}>
                                                                                    <TableCell>{item?.id}</TableCell>
                                                                                    <TableCell>{item?.companyName}</TableCell>
                                                                                    <TableCell>{item?.contactName}</TableCell>
                                                                                    <TableCell>{item?.status}</TableCell>
                                                                                    <TableCell>{item?.consultationTypeName}</TableCell>
                                                                                    <TableCell>{item?.packageName}</TableCell>
                                                                                    <TableCell>{item?.paymentStatus ? 'Paid' : 'Not paid'}</TableCell>
                                                                                    <TableCell>{item?.amount}</TableCell>
                                                                                    <TableCell>{item?.purchasedHours}</TableCell>
                                                                                    <TableCell>{item?.usedHours}</TableCell>
                                                                                    <TableCell>{item?.remainingHours}</TableCell>
                                                                                    <TableCell>{item?.expirationDate}</TableCell>
                                                                                    <TableCell>
                                                                                        <Controls.ActionButton
                                                                                            color="primary"
                                                                                            onClick={() => { openInDetails(item) }}>
                                                                                            <DetailsIcon fontSize="small" />
                                                                                        </Controls.ActionButton>
                                                                                        {/* {!updateOperation && !deleteOperation && <>Access Denied</>} */}
                                                                                    </TableCell>
                                                                                </TableRow>)
                                                                                )
                                                                            }

                                                                            <TableRow key={consultancyReports?.consultancyReportItems?.length + 1}>
                                                                                <TableCell>{'Total'}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell>{consultancyReports?.totalAmount}</TableCell>
                                                                                <TableCell>{consultancyReports?.totalPurchaseHours}</TableCell>
                                                                                <TableCell>{consultancyReports?.totalUsedHours}</TableCell>
                                                                                <TableCell>{consultancyReports?.totalRemainingHours}</TableCell>
                                                                                <TableCell></TableCell>
                                                                                <TableCell></TableCell>
                                                                            </TableRow>
                                                                        </>
                                                                }
                                                            </TableBody>
                                                        </TblContainer>
                                                        {/* <TblPagination /> */}
                                                    </Paper>
                                                    <Notification
                                                        notify={notify}
                                                        setNotify={setNotify}
                                                    />
                                                    <ConfirmDialog
                                                        confirmDialog={confirmDialog}
                                                        setConfirmDialog={setConfirmDialog}
                                                    />
                                                </>

                                            </Widget>

                                        </Grid>
                                    </Grid>
                                </>
                            )
                    )
            }
        </>
    )
}
