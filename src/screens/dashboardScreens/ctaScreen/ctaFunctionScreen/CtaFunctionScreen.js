import React, { useState, useEffect } from 'react'
import CtaFunctionDetailScreen from "./CtaFunctionDetailScreen";
import CtaFunctionForm from "./CtaFunctionForm";
import { Grid, Paper, TableBody, TableRow, TableCell, Chip } from '@material-ui/core';
import useTableServerSide from "../../../../components/UseTable/useTableServerSide";
import Controls from "../../../../components/controls/Controls";
import Notification from "../../../../components/Notification/Notification";
import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Widget from "../../../../components/Widget/Widget";
import DetailsIcon from '@material-ui/icons/Details';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../../components/Loading/Loading';
import { ResponseMessage } from "../../../../themes/responseMessage";
import { getFilterDataByUser, searchTitleByIdFromArray } from '../../../../helpers/search';
import { ctaFunctionStatus } from '../../../../helpers/staticData';
import { timeConverter } from '../../../../helpers/converter';

// redux actions
// import { listCtaCategorys } from '../../../../redux/actions/ctaCategoryActions';
import { listCtaFunctions, saveCtaFunction, saveCtaFunctionDocument, deleteCtaFunctionDocument } from '../../../../redux/actions/ctaFunctionActions';
import { saveConsultancyAssignment } from '../../../../redux/actions/consultancyAssignmentActions';

// import { detailsUser } from '../../../../redux/actions/userActions';
// import { listCtaPackageHourlys } from '../../../../redux/actions/ctaPackageHourlyActions';
// import { listCtaPackageDailys } from '../../../../redux/actions/ctaPackageDailyActions';
// import { listCtaPackageMonthlyYearlys } from '../../../../redux/actions/ctaPackageMonthlyYearlyActions';
// import { listCtaFunctionModels } from '../../../../redux/actions/ctaFunctionActions';

import { saveCtaPayment } from '../../../../redux/actions/ctaPaymentActions';
import { saveCtaPurchaseHistory } from '../../../../redux/actions/ctaPurchaseHistoryActions';


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'User details' },
    { id: 'companyName', label: 'Company Name' },
    // { id: 'email', label: 'Email' },
    // { id: 'phone', label: 'Phone' },
    { id: 'totalHour', label: 'Hour calc.' },
    // { id: 'hourUsed', label: 'hourUsed' },
    // { id: 'hourRemaining', label: 'hourRemaining' },
    { id: 'isCompleted', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CtaFunctionScreen(props) {

    const { createOperation, updateOperation, deleteOperation, openPopup, setOpenPopup, showCtaFunctionDetail, setShowCtaFunctionDetail } = props;

    const userSignIn = useSelector(state => state.userSignin);
    //eslint-disable-next-line
    const { userInfo } = userSignIn;

    // const userDetails = useSelector(state => state.userDetails);
    // //eslint-disable-next-line
    // const { user, loading: loadingUserdetail, error: errorUserDetail } = userDetails;


    const ctaPaymentSave = useSelector(state => state.ctaPaymentSave);
    //eslint-disable-next-line
    const { loading: loadingCtaPaymentSave, success: successCtaPaymentSave, error: errorCtaPaymentSave } = ctaPaymentSave;

    const ctaPurchaseHistorySave = useSelector(state => state.ctaPurchaseHistorySave);
    //eslint-disable-next-line
    const { loading: loadingCtaPurchaseHistorySave, success: successCtaPurchaseHistorySave, error: errorCtaPurchaseHistorySave } = ctaPurchaseHistorySave;

    // const ctaPackageHourlyList = useSelector(state => state.ctaPackageHourlyList);
    //eslint-disable-next-line
    // const { ctaPackageHourlys, loading: loadingCtaPackageHourlys, error: errorCtaPackageHourlys } = ctaPackageHourlyList;

    const ctaPackageDailyList = useSelector(state => state.ctaPackageDailyList);
    //eslint-disable-next-line
    const { ctaPackageDailys, loading: loadingCtaPackageDailys, error: errorCtaPackageDailys } = ctaPackageDailyList;

    const ctaPackageMonthlyYearlyList = useSelector(state => state.ctaPackageMonthlyYearlyList);
    //eslint-disable-next-line
    const { ctaPackageMonthlyYearlys, loading: loadingCtaPackageMonthlyYearlys, error: errorCtaPackageMonthlyYearlys } = ctaPackageMonthlyYearlyList;

    const ctaFunctionList = useSelector(state => state.ctaFunctionList);
    //eslint-disable-next-line
    const { ctaFunctions, loading: loadingCtaFunctions, error: errorCtaFunctions } = ctaFunctionList;
    // 1-superadmin, 2-admin, 3- member, 4- client 
    // const ctaFunctionsFilterByUser = (userInfo?.userRole === 1 || userInfo?.userRole === 2) ? ctaFunctions : (userInfo?.userRole === 3 ? [] : ctaFunctions.filter(item=>item.email === userInfo.email))
    const ctaFunctionsFilterByUser = getFilterDataByUser(ctaFunctions?.item1, userInfo);

    const ctaFunctionSave = useSelector(state => state.ctaFunctionSave);
    //eslint-disable-next-line
    const { loading: loadingCtaFunctionSave, success: successCtaFunctionSave, error: errorCtaFunctionSave, ctaFunction: ctaFunctionSaveData } = ctaFunctionSave;

    const ctaFunctionDocumentSave = useSelector(state => state.ctaFunctionDocumentSave);
    //eslint-disable-next-line
    const { loading: loadingCtaFunctionDocumentSave, success: successCtaFunctionDocumentSave, error: errorCtaFunctionDocumentSave, ctaFunction: ctaFunctionDocumentSaveData } = ctaFunctionDocumentSave;
    
    const consultancyAssignmentSave = useSelector(state => state.consultancyAssignmentSave);
    //eslint-disable-next-line
    const { loading: loadingConsultancyAssignmentSave, success: successConsultancyAssignmentSave, error: errorConsultancyAssignmentSave } = consultancyAssignmentSave;

    const ctaFunctionDocumentDelete = useSelector(state => state.ctaFunctionDocumentDelete);
    //eslint-disable-next-line
    const { loading: loadingDeleteCtaFunctionDocument, success: successDeleteCtaFunctionDocument, error: errorDeleteCtaFunctionDocument } = ctaFunctionDocumentDelete;

    // const ctaFunctionModelList = useSelector(state => state.ctaFunctionModelList);
    // //eslint-disable-next-line
    // const { ctaFunctionModels } = ctaFunctionModelList;

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [recordForDetails, setRecordForDetails] = useState(null)
    const [searchValue, setSearchValue] = useState("")
    // const [records, setRecords] = useState([])
    //eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    // openPopUp passed from cta screen to show add form
    // const [openPopup, setOpenPopup] = useState(false)
    // const [showDetail, setShowDetail] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        pageDataConfig,
        setPageDataConfig
    } = useTableServerSide(ctaFunctionsFilterByUser, headCells, filterFn, ctaFunctions?.item2);

    const dispatch = useDispatch();
    // search from table
    const handleSearch = e => {
        e.persist();
        const recievedSearchValue = e.target.value;
        setSearchValue(recievedSearchValue);
        // --------------------
        // server side search
        // --------------------
            setPageDataConfig(prevState =>{
                return { ...prevState,keyword:recievedSearchValue}
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

    const addOrEditCtaFunctionDocument = (item, resetForm) => {
        // console.log(item)
        if (item?.id && item?.file) {
            const formData = new FormData();
            formData.append("CtaFunctionId", item.id);
            formData.append("file", item.file);

            //  no update applied id send for applying condition toabove method
            dispatch(saveCtaFunctionDocument(formData))
                .then((res) => {
                    if (res?.status === true) {
                        resetForm()
                        delete item['file']

                        setRecordForEdit(item)
                        // setOpenPopup(false)
                        if (successCtaFunctionDocumentSave) {
                            setNotify({
                                isOpen: true,
                                message: 'Submitted Successfully',
                                type: 'success'
                            })
                        }

                        if (errorCtaFunctionDocumentSave) {
                            setNotify({
                                isOpen: true,
                                message: 'Submition Failed',
                                type: 'warning'
                            })
                        }
                    }

                })
        }

    }
    // addOrEdit(formatData, resetForm, values,  activeStep, setActiveStep, setValues);
    const addOrEdit = async (item, resetForm, values, activeStep, setActiveStep) => {
        // resetForm()
        // console.log(item)
        return saveItem(item)
                .then((res) => {
                    // console.log(res)
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
    const addOrEditConsultancyAssign = async (item, resetForm) => {
            return saveAssignItem(item)
                    .then((res) => {
                        // resetForm()
                        // setRecordForEdit(null)
                        // setOpenPopup(false)
                        if (successConsultancyAssignmentSave) {
                            setNotify({
                                isOpen: true,
                                message: 'Submitted Successfully',
                                type: 'success'
                            })
                        }

                        if (errorConsultancyAssignmentSave) {
                            setNotify({
                                isOpen: true,
                                message: 'Submition Failed',
                                type: 'warning'
                            })
                        }
                        return res
                    })

    }
    
    const handleCtaPayment = (token, item, resetActiveStep) => {
        // const tokenId = token?.id;
        // console.log(item)
        if (token && (item?.getCtaHourlyId || item?.getCtaDailyId || item?.getCtaMonthlyYearlyId)) {

            try {
                if (item.paypal) {
                    const paypalFormatPurchaseHistoryData = {
                        transectionId: token?.paymentID,
                        isPaid: token?.paid,
                        amount: parseInt(item.rate),
                        ctaFunctionId: item?.ctaFunctionId,
                        paymentGateway: 'paypal',
                        userEmail: userInfo?.email,
                    }

                    item.getCtaHourlyId && (paypalFormatPurchaseHistoryData['ctaPackageHourlyId'] = item.id);
                    item.getCtaDailyId && (paypalFormatPurchaseHistoryData['ctaPackageDailyId'] = item.id);
                    item.getCtaMonthlyYearlyId && (paypalFormatPurchaseHistoryData['ctaPackageMonthlyYearlyId'] = item.id);

                    item.isMonthlySubscription && (paypalFormatPurchaseHistoryData['isMonthlySubscription'] = item.isMonthlySubscription);
                    item.isYearlySubscription && (paypalFormatPurchaseHistoryData['isYearlySubscription'] = item.isYearlySubscription);

                    dispatch(saveCtaPurchaseHistory(paypalFormatPurchaseHistoryData))
                        .then(res => {
                            if (res.status === true) {
                                // stepper step auto increment
                                resetActiveStep((prevActiveStep) => prevActiveStep + 1);
                            }
                        })
                }
                else {
                    const formatData = {
                        token: token?.id,
                        amount: parseInt(item.rate),
                        description: token.email,
                    }

                    dispatch(saveCtaPayment(formatData))
                        .then(res => {
                            // console.log(res.data.id)
                            if (res.status === true) {
                                const formatePurchaseHistoryData = {
                                    transectionId: res.data.id,
                                    isPaid: res.data.paid,
                                    amount: parseInt(item.rate),
                                    ctaFunctionId: item?.ctaFunctionId,
                                    paymentGateway: 'stripe',
                                    userEmail: userInfo.email

                                }
                                // item.getCtaHourlyId && (formatePurchaseHistoryData['ctaPackageHourlyId'] = item.ctaHourId);
                                // item.ctaHourly && (formatePurchaseHistoryData['ctaPackageDailyId'] = item.ctaDailyId);
                                // item.ctaHourly && (formatePurchaseHistoryData['ctaPackageMonthlyYearlyId'] = item.ctaMonthlyYearlyId);

                                item.getCtaHourlyId && (formatePurchaseHistoryData['ctaPackageHourlyId'] = item.id);
                                item.getCtaDailyId && (formatePurchaseHistoryData['ctaPackageDailyId'] = item.id);
                                item.getCtaMonthlyYearlyId && (formatePurchaseHistoryData['ctaPackageMonthlyYearlyId'] = item.id);
                                item.isMonthlySubscription && (formatePurchaseHistoryData['isMonthlySubscription'] = item.isMonthlySubscription);
                                item.isYearlySubscription && (formatePurchaseHistoryData['isYearlySubscription'] = item.isYearlySubscription);

                                dispatch(saveCtaPurchaseHistory(formatePurchaseHistoryData))
                                    .then(res => {
                                        if (res.status === true) {
                                            // stepper step auto increment
                                            resetActiveStep((prevActiveStep) => prevActiveStep + 1);
                                        }
                                    })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }


            } catch (err) {
                console.log(err)
            }



        }

    }
    const openInDetails = item => {
        setRecordForDetails(item)
        setShowCtaFunctionDetail(true)
    }

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteCtaFunctionDocument(id));
        resolve();
    })

    const onDeleteCtaFunctionDocument = id => {
        // console.log(id)
        // setConfirmDialog({
        //     ...confirmDialog,
        //     isOpen: false
        // })
        deleteItem(id)
            .then(() => {
                if (successDeleteCtaFunctionDocument) {
                    setNotify({
                        isOpen: true,
                        message: 'Deleted Successfully',
                        type: 'success'
                    })
                }
                if (errorDeleteCtaFunctionDocument) {
                    setNotify({
                        isOpen: true,
                        message: ResponseMessage.errorDeleteMessage,
                        type: 'warning'
                    })
                }
            })

    }
    useEffect(() => {
        try {
            dispatch(listCtaFunctions(pageDataConfig))
        } catch (e) {
            console.log(e)
        }

        return () => {
            // 
        }
    }, [
        dispatch,
        pageDataConfig,
        openPopup
    ])

    return (

        <>
            {
                // (openPopup === false) ? <Loading /> :
                    <>
                        <PageTitle
                            title="Consultancy"
                            button={
                                createOperation &&
                                <div>
                                    <Controls.Button
                                        text='Schedule a consult'
                                        // variant="outlined"
                                        // startIcon={<AddIcon />}
                                        onClick={() => { setShowCtaFunctionDetail(false); setOpenPopup(true); setRecordForEdit(null); }}
                                    />
                                </div>
                            }
                            showButton={!openPopup}

                        />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>


                                {
                                    showCtaFunctionDetail ?
                                        <Widget
                                            title="Cta Function Detail"
                                            upperTitle
                                            // noBodyPadding
                                            disableWidgetMenu
                                            closePopup={() => setShowCtaFunctionDetail(false)}
                                            closePopUpButtonText='Go back to list'
                                        >
                                            <CtaFunctionDetailScreen
                                                recordForDetails={recordForDetails}
                                                // ctaFunctionModels={ctaFunctionModels}
                                                // setOpenPopup={setShowCtaFunctionDetail}
                                                createOperation={createOperation} // ctaScreen create permission for user
                                                updateOperation = {updateOperation}
                                                deleteOperation ={deleteOperation}
                                                addOrEdit={addOrEdit}
                                                successCtaFunctionSave ={successCtaFunctionSave}
                                                loadingCtaFunctionSave ={loadingCtaFunctionSave}
                                                addOrEditConsultancyAssign={addOrEditConsultancyAssign}
                                            />
                                        </Widget> :
                                        (openPopup ?
                                            (<Widget
                                                title="Schedule a consult"
                                                upperTitle
                                                // noBodyPadding
                                                disableWidgetMenu
                                                closePopup={() => { setOpenPopup(false); setRecordForEdit(null) }}
                                            >
                                                <CtaFunctionForm
                                                    recordForEdit={recordForEdit}
                                                    // setRecordForEdit = {setRecordForEdit}
                                                    addOrEdit={addOrEdit}
                                                    addOrEditCtaFunctionDocument={addOrEditCtaFunctionDocument}
                                                    setOpenPopup={setOpenPopup}
                                                    ctaFunctionSaveData={ctaFunctionSaveData}
                                                    setConfirmDialog={setConfirmDialog}
                                                    onDeleteCtaFunctionDocument={onDeleteCtaFunctionDocument}
                                                    loadingDeleteCtaFunctionDocument={loadingDeleteCtaFunctionDocument}
                                                    loadingCtaFunctionDocumentSave={loadingCtaFunctionDocumentSave}
                                                    loadingCtaFunctionSave={loadingCtaFunctionSave}
                                                    // ctaPackageHourlys={ctaPackageHourlys?.filter(item => item.companyTypeId === userInfo?.companyTypeId)}
                                                    // loadingCtaPackageHourlys={loadingCtaPackageHourlys}
                                                    // ctaPackageDailys={ctaPackageDailys?.filter(item => item.companyTypeId === userInfo?.companyTypeId)}
                                                    // loadingCtaPackageDailys={loadingCtaPackageDailys}
                                                    // ctaPackageMonthlyYearlys={ctaPackageMonthlyYearlys?.filter(item => item.companyTypeId === userInfo?.companyTypeId)}
                                                    // loadingCtaPackageMonthlyYearlys={loadingCtaPackageMonthlyYearlys}
                                                    handleCtaPayment={handleCtaPayment}
                                                    loadingCtaPaymentSave={loadingCtaPaymentSave}
                                                    successCtaPaymentSave={successCtaPaymentSave}
                                                    loadingCtaPurchaseHistorySave={loadingCtaPurchaseHistorySave}
                                                    successCtaPurchaseHistorySave={successCtaPurchaseHistorySave}

                                                />
                                            </Widget>
                                            )
                                            :

                                            <Widget
                                                title="Cta Function List Table"
                                                upperTitle
                                                noBodyPadding
                                                setOpenPopup={setOpenPopup}
                                                setRecordForEdit={setRecordForEdit}
                                                threeDotDisplay={true}
                                                disableWidgetMenu
                                                addNew={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                                buttonText='Schedule a consult'
                                                createOperation={false}
                                                handleSearch={handleSearch}
                                                searchLabel='Search here..'
                                                searchValue={searchValue}

                                            >
                                                <Paper style={{
                                                    overflow: "auto",
                                                    backgroundColor: "transparent",

                                                }}>
                                                    <TblContainer>
                                                        <TblHead />
                                                        {

                                                            <TableBody>

                                                                {loadingCtaFunctions ?
                                                                    <TableRow key={0}>
                                                                        <TableCell style={{ borderBottom: 'none' }}>
                                                                            <Loading />
                                                                        </TableCell>

                                                                    </TableRow>
                                                                    :
                                                                    recordsAfterPagingAndSorting().map(item =>
                                                                    (<TableRow key={item.id}>
                                                                        <TableCell>{item.id}</TableCell>
                                                                        <TableCell>
                                                                            {/* <span><b>Name:</b> {(item?.firstName && item?.firstName + ' ')  + (item?.lastName && item?.lastName)} </span> <br /> */}
                                                                            <span><b>Name:</b> {Boolean(item?.firstName) && item?.firstName} </span> <br />
                                                                            <span><b>Email:</b> {item?.email} </span> <br />
                                                                            <span><b>Phone: </b>{item?.phone} </span> <br />
                                                                        </TableCell>
                                                                        {/* <TableCell>{item.name}</TableCell> */}
                                                                        <TableCell>
                                                                            <span><b>Company name:</b> {item?.companyName} </span> <br />
                                                                            <span><b>Bussiness Industry:</b> {item?.businessIndustry} </span> <br />
                                                                            <span><b>Company type: </b>{item?.companyTypeName} </span> <br />
                                                                            <span><b>Company size: </b>{item?.companySizeName} </span> <br />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                item?.totalHour ? <span><b>Total Hours:</b> {timeConverter(item?.totalHour)}  <br /> </span> : <span>Not applicable</span>
                                                                            }
                                                                            {
                                                                                item?.hourUsed ? <span><b>Used Hours:</b> {timeConverter(item?.hourUsed)} <br /> </span> : null
                                                                            }
                                                                           {
                                                                               item?.hourRemaining && <span><b>Remaining Hours: </b>{ timeConverter(item?.hourRemaining)} <br /></span> 
                                                                           }
                                                                             
                                                                            
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Chip 
                                                                                label= {item?.status ? searchTitleByIdFromArray(ctaFunctionStatus, item?.status) : "No status found"}
                                                                                color="secondary"
                                                                                style={{fontSize:"1.6rem"}}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Controls.ActionButton
                                                                                color="primary"
                                                                                onClick={() => { openInDetails(item) }}>
                                                                                <DetailsIcon fontSize="small" />
                                                                            </Controls.ActionButton>
                                                                        </TableCell>
                                                                    </TableRow>)
                                                                    )
                                                                }
                                                            </TableBody>
                                                        }
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

                                        )}

                            </Grid>
                        </Grid>
                    </>
            }
        </>
    )
}
