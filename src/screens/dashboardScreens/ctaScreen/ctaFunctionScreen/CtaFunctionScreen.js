import React, { useState, useEffect } from 'react'
import CtaFunctionDetailScreen from "./CtaFunctionDetailScreen";
import CtaFunctionForm from "./CtaFunctionForm";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../../../components/UseTable/useTable";
import Controls from "../../../../components/controls/Controls";
import Notification from "../../../../components/Notification/Notification";
import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Widget from "../../../../components/Widget/Widget";
import DetailsIcon from '@material-ui/icons/Details';
import Popup from "../../../../components/Popup/Popup";
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../../components/Loading/Loading';
import { ResponseMessage } from "../../../../themes/responseMessage";

// redux actions
import { listCtaCategorys } from '../../../../redux/actions/ctaCategoryActions';
import { listCtaFunctions, saveCtaFunction, saveCtaFunctionDocument, deleteCtaFunctionDocument } from '../../../../redux/actions/ctaFunctionActions';
import { detailsUser } from '../../../../redux/actions/userActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'companyName', label: 'Company Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CtaFunctionScreen(props) {

    const { createOperation } = props;

    const userSignIn = useSelector(state => state.userSignin);
    //eslint-disable-next-line
    const { userInfo } = userSignIn;

    const userDetails = useSelector(state => state.userDetails);
    //eslint-disable-next-line
    const { user, loading: loadingUserdetail, error: errorUserDetail } = userDetails;

    const ctaFunctionList = useSelector(state => state.ctaFunctionList);
    //eslint-disable-next-line
    const { ctaFunctions, loading: loadingCtaFunctions, error: errorCtaFunctions } = ctaFunctionList;

    const ctaFunctionSave = useSelector(state => state.ctaFunctionSave);
    //eslint-disable-next-line
    const { loading: loadingCtaFunctionSave, success: successCtaFunctionSave, error: errorCtaFunctionSave, ctaFunction: ctaFunctionSaveData } = ctaFunctionSave;

    const ctaFunctionDocumentSave = useSelector(state => state.ctaFunctionDocumentSave);
    //eslint-disable-next-line
    const { loading: loadingCtaFunctionDocumentSave, success: successCtaFunctionDocumentSave, error: errorCtaFunctionDocumentSave, ctaFunction: ctaFunctionDocumentSaveData } = ctaFunctionDocumentSave;


    const ctaFunctionDocumentDelete = useSelector(state => state.ctaFunctionDocumentDelete);
    //eslint-disable-next-line
    const { loading: loadingDeleteCtaFunctionDocument, success: successDeleteCtaFunctionDocument, error: errorDeleteCtaFunctionDocument } = ctaFunctionDocumentDelete;


    const [recordForEdit, setRecordForEdit] = useState(null)
    // const [records, setRecords] = useState([])
    //eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(ctaFunctions, headCells, filterFn);

    const dispatch = useDispatch();
    // search from table
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x?.email?.toLowerCase()?.includes(target?.value?.toLowerCase()))
                    // return items.filter(x => x?.firstName?.toUpperCase().indexOf(target?.value?.toUpperCase()) >-1)
            }
        })
    }
    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        if (id) {
            dispatch(saveCtaFunctionDocument(item));
            resolve();
        } else {
            dispatch(saveCtaFunction(item));
            // dispatch(saveCtaCategory(item));
            resolve();
        }

    })

    const addOrEdit = async (item, resetForm) => {
        if (item.file) {
            const formData = new FormData();
            formData.append("CtaFunctionId", item.id);
            formData.append("file", item.file);

            //  no update applied id send for applying condition toabove method
            saveItem(formData, item.id)
                .then(() => {
                    delete item['file']
                    // resetForm()
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
                })

        } else {
            saveItem(item)
                .then(() => {

                    if (successCtaFunctionSave) {
                        setNotify({
                            isOpen: true,
                            message: 'Submitted Successfully',
                            type: 'success'
                        })
                    }
                    if (errorCtaFunctionSave) {
                        setNotify({
                            isOpen: true,
                            message: 'Submition Failed',
                            type: 'warning'
                        })
                    }
                })
        }
    }
    const openInPopup = item => {
        setRecordForEdit(item)
        setShowDetail(true)
    }
    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteCtaFunctionDocument(id));
        resolve();
    })

    const onDeleteCtaFunctionDocument = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
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
            dispatch(detailsUser(userInfo.userId));
            dispatch(listCtaCategorys());
            dispatch(listCtaFunctions());
        } catch (e) {
            console.log(e)
        }

        return () => {
            // 
        }
    }, [dispatch, userInfo.userId, loadingCtaFunctionSave, loadingCtaFunctionDocumentSave, loadingDeleteCtaFunctionDocument])
    return (

        <>
            {
                (openPopup === false && (loadingCtaFunctions || loadingUserdetail)) ? <Loading /> :
                    <>
                        <PageTitle 
                            title="Consultancy" 
                            button = {
                                createOperation &&
                                <div>
                                    <Controls.Button
                                        text='Schedule a consult'
                                        variant="outlined"
                                        // startIcon={<AddIcon />}
                                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                    />
                                </div>
                            }
                            
                        />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>

                                {
                                    showDetail ?
                                        <Widget
                                            title="Cta Function Detail"
                                            upperTitle
                                            // noBodyPadding
                                            disableWidgetMenu
                                        >
                                            <CtaFunctionDetailScreen
                                                recordForEdit={recordForEdit}
                                                setOpenPopup={setShowDetail}
                                            />
                                        </Widget> :

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
                                            handleSearch = {handleSearch}
                                            searchLabel = 'Search by email'
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
                                            <Popup
                                                title="Schedule a consult"
                                                openPopup={openPopup}
                                                setOpenPopup={setOpenPopup}
                                                disableDivider
                                            >
                                                <CtaFunctionForm
                                                    recordForEdit={recordForEdit}
                                                    addOrEdit={addOrEdit}
                                                    user={user}
                                                    setOpenPopup={setOpenPopup}
                                                    ctaFunctionSaveData={ctaFunctionSaveData}
                                                    setConfirmDialog={setConfirmDialog}
                                                    onDeleteCtaFunctionDocument={onDeleteCtaFunctionDocument}
                                                    loadingDeleteCtaFunctionDocument={loadingDeleteCtaFunctionDocument}
                                                    loadingCtaFunctionDocumentSave={loadingCtaFunctionDocumentSave}
                                                    loadingCtaFunctionSave={loadingCtaFunctionSave}

                                                />
                                            </Popup>
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
