import React, { useState, useEffect } from 'react'
import CtaCategoryDetailScreen from "./CtaCategoryDetailScreen";
import CtaCategoryForm from "./CtaCategoryForm";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../../components/UseTable/useTable";
import Controls from "../../../components/controls/Controls";
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import DetailsIcon from '@material-ui/icons/Details';
import Popup from "../../../components/Popup/Popup";
import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { listCtaCategorys } from '../../../redux/actions/ctaCategoryActions';
import { listCtaFunctions, saveCtaFunction, saveCtaFunctionDocument, deleteCtaFunctionDocument } from '../../../redux/actions/ctaFunctionActions';
import { listMenus } from '../../../redux/actions/menuActions';
import { detailsUser } from '../../../redux/actions/userActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'companyName', label: 'Company Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CtaCategoryScreen() {

    const userSignIn = useSelector(state => state.userSignin);
    //eslint-disable-next-line
    const { userInfo } = userSignIn;

    const userDetails = useSelector(state => state.userDetails);
    //eslint-disable-next-line
    const { user, loading: loadingUserdetail, error: errorUserDetail } = userDetails;

    const menuList = useSelector(state => state.menuList);
    //eslint-disable-next-line
    const { menus, loading: loadingMenus } = menuList;

    const ctaCategoryList = useSelector(state => state.ctaCategoryList);
    //eslint-disable-next-line
    const { ctaCategorys, loading, error } = ctaCategoryList;

    const ctaFunctionList = useSelector(state => state.ctaFunctionList);
    //eslint-disable-next-line
    const { ctaFunctions, loading:loadingCtaFunctions, error:errorCtaFunctions } = ctaFunctionList;

    const ctaFunctionDocumentDelete = useSelector(state => state.ctaFunctionDocumentDelete);
    //eslint-disable-next-line
    const { loading: loadingDeleteCtaFunctionDocument, success:  successDeleteCtaFunctionDocument, error: errorDeleteCtaFunctionDocument } = ctaFunctionDocumentDelete;

    const ctaCategorySave = useSelector(state => state.ctaCategorySave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave, ctaCategory: ctaCategorySaveData } = ctaCategorySave;

    const ctaFunctionSave = useSelector(state => state.ctaFunctionSave);
    //eslint-disable-next-line
    const { loading: loadingCtaFunctionSave, success: successCtaFunctionSave, error: errorCtaFunctionSave, ctaFunction: ctaFunctionSaveData } = ctaFunctionSave;

    const ctaFunctionDocumentSave = useSelector(state => state.ctaFunctionDocumentSave);
    //eslint-disable-next-line
    const { loading: loadingCtaFunctionDocumentSave, success: successCtaFunctionDocumentSave, error: errorCtaFunctionDocumentSave, ctaFunction: ctaFunctionDocumentSaveData } = ctaFunctionDocumentSave;


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
    } = useTable(ctaCategorys, headCells, filterFn);

    const dispatch = useDispatch();
    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        if(id){
            dispatch(saveCtaFunctionDocument(item));
            resolve();
        }else{
            dispatch(saveCtaFunction(item));
            // dispatch(saveCtaCategory(item));
            resolve();
        }
      
    })

    const addOrEdit = async (item, resetForm) => {
        // resetForm()
        // setRecordForEdit(null)
        // setOpenPopup(false)
        if(item.file){
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
                if (successSave) {
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                }

                if (errorSave) {
                    setNotify({
                        isOpen: true,
                        message: 'Submition Failed',
                        type: 'warning'
                    })
                }
            })

        }else{
            saveItem(item)
            .then(() => {
                // resetForm()
                // setRecordForEdit(null)
                // setOpenPopup(false)
                if (successDeleteCtaFunctionDocument) {
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                }

                if (errorDeleteCtaFunctionDocument) {
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
                // if (successDelete) {
                //     setNotify({
                //         isOpen: true,
                //         message: 'Deleted Successfully',
                //         type: 'success'
                //     })
                // }
                // if (errorDelete) {
                //     setNotify({
                //         isOpen: true,
                //         message: ResponseMessage.errorDeleteMessage,
                //         type: 'warning'
                //     })
                // }
            })

    }

    useEffect(() => {
        try{
            dispatch(listMenus());
            dispatch(detailsUser(userInfo.userId));
            dispatch(listCtaCategorys());
            dispatch(listCtaFunctions());
            // dispatch(listCtaFunctionModels());
        }catch(e){
            console.log(e)
        }
        
        return () => {
            // 
        }
    // }, [dispatch, userInfo.userId, loadingSave, loadingCtaFunctionSave, loadingCtaFunctionDocumentSave])
}, [dispatch, userInfo.userId, loadingSave, loadingCtaFunctionDocumentSave, loadingDeleteCtaFunctionDocument])
    // }, [])
    return (

        <>
            {
                (openPopup===false && (loading || loadingMenus || loadingUserdetail)) ? "Loading" :
                    <>
                        <PageTitle title="Cta Categorys" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                {
                                    showDetail ?
                                        <Widget
                                            title="Cta Category Detail"
                                            upperTitle
                                            // noBodyPadding
                                            disableWidgetMenu
                                        >
                                            <CtaCategoryDetailScreen
                                                recordForEdit={recordForEdit}
                                                setOpenPopup={setShowDetail}
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
                                            addNew={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                            buttonText = 'Schedule a consult'
                                            createOperation={true}
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
                                                <CtaCategoryForm
                                                    recordForEdit={recordForEdit}
                                                    addOrEdit={addOrEdit}
                                                    loadingSave={loadingSave}
                                                    menus={menus}
                                                    user={user}
                                                    successSave={successSave}
                                                    // ctaCategorySaveData={ctaCategorySaveData}
                                                    setOpenPopup={setOpenPopup}
                                                    ctaFunctionSaveData = {ctaFunctionSaveData}
                                                    setConfirmDialog={setConfirmDialog}
                                                    onDeleteCtaFunctionDocument= {onDeleteCtaFunctionDocument}
                                                    loadingDeleteCtaFunctionDocument= {loadingDeleteCtaFunctionDocument}
                                                    loadingCtaFunctionDocumentSave = {loadingCtaFunctionDocumentSave}

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
