import React, { useState, useEffect } from 'react'
import ShortIntroForm from "./ShortIntroForm";
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
    { id: 'shortDescription', label: 'Short Description' },
    { id: 'isActive', label: 'Active' },
    { id: 'displayOrder', label: 'Display Order' },
    { id: 'pictureName', label: 'Picture' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ShortIntroScreen() {
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
    const addOrEdit = (item, files, resetForm) => {
        const formData = new FormData();
        item.id && formData.append('Id', item.id)
        formData.append('HomepageId', item.homepageId)
        formData.append('Name', item.name)
        formData.append('ShortDescription', item.shortDescription)
        formData.append('DisplayOrder', item.displayOrder)
        formData.append('isActive', item.isActive)
        formData.append('file', files)

        if (formData) {
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            saveItem(formData, item.id)
            .then(()=>{
                // resetForm()
                // setRecordForEdit(null)
                // setOpenPopup(false)
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
        console.log(subMenus)
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
                    <PageTitle title="Short Intro" />

                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Widget
                                title="Short Intro List Table"
                                upperTitle
                                noBodyPadding
                                setOpenPopup={setOpenPopup}
                                setRecordForEdit={setRecordForEdit}
                                disableWidgetMenu
                                addNew = {() => { setOpenPopup(true); setRecordForEdit(null); }}
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
                                                        {/* <TableCell>{item.shortDescription}</TableCell> */}
                                                        <TableCell><div dangerouslySetInnerHTML={{__html: `${item.shortDescription}`}} /></TableCell>
                                                        <TableCell>{item.isActive ? 'Yes': 'No'}</TableCell>
                                                        <TableCell>{item.displayOrder ? item.displayOrder: 'no input given'}</TableCell>
                                                        <TableCell>
                                                            {
                                                                item.pictureUrl ? <img src={BASE_ROOT_URL + "/" + item.pictureUrl.split("\\").join('/')} alt="logo" style={{ width: 100, height: 100 }} /> : "No image uploaded"
                                                            }</TableCell>
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
                                    title="Short Intro Form"
                                    openPopup={openPopup}
                                    setOpenPopup={setOpenPopup}
                                >
                                    <ShortIntroForm
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