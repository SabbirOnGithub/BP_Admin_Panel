import React, { useState, useEffect } from 'react'
import SubMenuForm from "./SubMenuForm";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../../components/UseTable/useTable";
import Controls from "../../../components/controls/Controls";
// import { Search } from "@material-ui/icons";
import Popup from "../../../components/Popup/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import { ResponseMessage } from "../../../themes/responseMessage";

import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { deleteSubMenu, listSubMenus, saveSubMenu } from '../../../redux/actions/subMenuActions';
import { listHomePageDatas } from '../../../redux/actions/homePageActions';

import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'overViewTitle', label: 'Over View Title' },
    { id: 'overViewSubtitle', label: 'Over View Subtitle' },
    { id: 'bestPracticeTitle', label: 'Best Practice Title' },
    { id: 'bestPracticeSubtitle', label: 'Best Practice Subtitle' },
    { id: 'pictureUrl', label: 'Sub Menu Picture' },
    { id: 'overViewBackgroundPicture', label: 'Over View Background Picture' },
    { id: 'bestPracticeBackgroundPicture', label: 'Best Practice Background Picture' },
    { id: 'actions', label: 'Actions', disableSorting: true }

]

export default function SubMenuScreen() {
    const homePageDataList = useSelector(state => state.homePageDataList);
    //eslint-disable-next-line
    const { homePageDatas, loading: loadingHomePageDatas } = homePageDataList;

    const subMenuList = useSelector(state => state.subMenuList)

    //eslint-disable-next-line
    const { subMenus, loading, error } = subMenuList;
    //eslint-disable-next-line
    const subMenuSave = useSelector(state => state.subMenuSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = subMenuSave;
    const successSaveMessage = ResponseMessage.successSaveMessage;

    const subMenuDelete = useSelector(state => state.subMenuDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = subMenuDelete;


    const [recordForEdit, setRecordForEdit] = useState(null)
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
    } = useTable(subMenus, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(saveSubMenu(item, id));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteSubMenu(id));
        resolve();
    })
    const addOrEdit = (item, resetForm) => {

        const formData = new FormData();
        console.log(typeof(item.overViewBackgroundPicture))
        console.log(item.overViewBackgroundPicture)
        // append form data 
        item.id && formData.append('Id', item.id)
        formData.append('HomepageId', item.homepageId)
        formData.append('Name', item.name)
        formData.append('ShortDescription', item.shortDescription)
        formData.append('DisplayOrder', item.displayOrder)
        formData.append('isActive', item.isActive)
        formData.append('OverViewTitle', item.overViewTitle)
        formData.append('OverViewSubtitle', item.overViewSubtitle)
        formData.append('BestPracticeTitle', item.bestPracticeTitle)
        formData.append('BestPracticeSubtitle', item.bestPracticeSubtitle)
  
        // ---------------------------
        // append file for add/update
        // ---------------------------
        if(typeof(item.pictureUrl) === 'object'){
            formData.append('sub_menu_image', item.pictureUrl)
        }
        if(typeof(item.overViewBackgroundPicture) === 'object'){
            formData.append('over_view_background', item.overViewBackgroundPicture)
        }
        if(typeof(item.bestPracticeBackgroundPicture) === 'object'){
            formData.append('best_practice_background', item.bestPracticeBackgroundPicture)
        }
        // ------------------------
        // append file for delete
        // ------------------------
        // eslint-disable-next-line 
        if(typeof(item.pictureUrl) === 'string' || typeof(item.pictureUrl) === 'null'){
            formData.append('pictureUrl', item.pictureUrl)
        }
        // eslint-disable-next-line 
        if(typeof(item.overViewBackgroundPicture) === 'string' || typeof(item.overViewBackgroundPicture) === 'null'){
            formData.append('overViewBackgroundPicture', item.overViewBackgroundPicture)
        }
        // eslint-disable-next-line 
        if(typeof(item.bestPracticeBackgroundPicture) === 'string' || typeof(item.bestPracticeBackgroundPicture) === 'null'){
            formData.append('bestPracticeBackgroundPicture', item.bestPracticeBackgroundPicture)
        }


        // typeof(item.pictureUrl) === 'object' && formData.append('sub_menu_image', item.pictureUrl)
        // typeof(item.overViewBackgroundPicture) === 'object' && formData.append('over_view_background', item.overViewBackgroundPicture)
        // typeof(item.bestPracticeBackgroundPicture) === 'object' && formData.append('best_practice_background', item.bestPracticeBackgroundPicture)

        // ------------------------
        // append file for delete
        // ------------------------

        // eslint-disable-next-line 
        // (typeof(item.pictureUrl) === 'string' || typeof(item.pictureUrl) === 'null') && formData.append('pictureUrl', item.pictureUrl)
        // eslint-disable-next-line 
        // (typeof(item.overViewBackgroundPicture) === 'string' || typeof(item.overViewBackgroundPicture) === 'null') && formData.append('overViewBackgroundPicture', item.overViewBackgroundPicture)
        // eslint-disable-next-line 
        // (typeof(item.bestPracticeBackgroundPicture) === 'string' || typeof(item.bestPracticeBackgroundPicture) === 'null') && formData.append('bestPracticeBackgroundPicture', item.bestPracticeBackgroundPicture)

        // append form data end
        if (formData) {
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            saveItem(formData, item.id)
            .then(()=>{
                if (successSave) {
                    setNotify({
                        isOpen: true,
                        message: successSaveMessage,
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
          
        }

    }

    const openInPopup = item => {
        // console.log(subMenus)
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteItem(id)
        .then(()=>{
            if (successDelete) {
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfully',
                    type: 'success'
                })
            }
            if (errorDelete) {
                setNotify({
                    isOpen: true,
                    message:  ResponseMessage.errorDeleteMessage,
                    type: 'warning'
                })
            }
        })

    }



    useEffect(() => {
        dispatch(listHomePageDatas());
        dispatch(listSubMenus());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])

    return (

        <div>
            
            {loading || loadingSave || loadingDelete || loadingHomePageDatas ? "Loading ...." :
                <>
                    <PageTitle title="Sub Menus" />

                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Widget
                                title="Sub Menu List Table"
                                upperTitle
                                noBodyPadding
                                // setOpenPopup={setOpenPopup}
                                setRecordForEdit={setRecordForEdit}
                                disableWidgetMenu
                                // addNew = {() => { setOpenPopup(true); setRecordForEdit(null); }}
                                createOperation = {false}

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
                                                        <TableCell>{item.overViewTitle}</TableCell>
                                                        <TableCell>{item.overViewSubtitle}</TableCell>
                                                        <TableCell>{item.bestPracticeTitle}</TableCell>
                                                        <TableCell>{item.bestPracticeSubtitle}</TableCell>
                                                        <TableCell>
                                                            {
                                                                item.pictureUrl ? <img src={BASE_ROOT_URL + "/" + item.pictureUrl.split("\\").join('/')} alt="logo" style={{ width: 100, height: 100 }} /> : "No image uploaded"
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                item.overViewBackgroundPicture ? <img src={BASE_ROOT_URL + "/" + item.overViewBackgroundPicture.split("\\").join('/')} alt="logo" style={{ width: 100, height: 100 }} /> : "No image uploaded"
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                item.bestPracticeBackgroundPicture ? <img src={BASE_ROOT_URL + "/" + item.bestPracticeBackgroundPicture.split("\\").join('/')} alt="logo" style={{ width: 100, height: 100 }} /> : "No image uploaded"
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <Controls.ActionButton
                                                                color="primary"
                                                                onClick={() => { openInPopup(item) }}>
                                                                <EditOutlinedIcon fontSize="small" />
                                                            </Controls.ActionButton>
                                                            <Controls.ActionButton
                                                                color="secondary"
                                                                onClick={() => {
                                                                    setConfirmDialog({
                                                                        isOpen: true,
                                                                        title: 'Are you sure to delete this record?',
                                                                        subTitle: "You can't undo this operation",
                                                                        onConfirm: () => { onDelete(item.id) }
                                                                    })
                                                                }}>
                                                                <CloseIcon fontSize="small" />
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
                                    title="Submenu Form"
                                    openPopup={openPopup}
                                    setOpenPopup={setOpenPopup}
                                    plainForm
                                >
                                    <SubMenuForm
                                        recordForEdit={recordForEdit}
                                        addOrEdit={addOrEdit} 
                                        homePageDatas = {homePageDatas}
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

                        </Grid>
                    </Grid>
                </>
            }
        </div>
    )
}