import React, { useState, useEffect } from 'react'
import SubMenuOverViewForm from "./SubMenuOverViewForm";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../../components/UseTable/useTable";
import Controls from "../../../components/controls/Controls";
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
import { deleteSubMenuOverView, listSubMenuOverViews, saveSubMenuOverView } from '../../../redux/actions/subMenuOverViewActions';

import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL



const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'pictureUrl', label: 'Picture' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function SubMenuOverViewScreen() {

    const subMenuOverViewList = useSelector(state => state.subMenuOverViewList)
    //eslint-disable-next-line
    const { subMenuOverViews, loading, error } = subMenuOverViewList;
    //eslint-disable-next-line
    const subMenuOverViewSave = useSelector(state => state.subMenuOverViewSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = subMenuOverViewSave;
    const subMenuOverViewDelete = useSelector(state => state.subMenuOverViewDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = subMenuOverViewDelete;


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
    } = useTable(subMenuOverViews, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(saveSubMenuOverView(item, id));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteSubMenuOverView(id));
        resolve();
    })
    const addOrEdit = (item, files, resetForm) => {
        const formData = new FormData();
        console.log(item.id)
        formData.append('SubMenuId', item.id)
        formData.append('Title', item.title)
        formData.append('Description', item.description)
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
          
        }
    }

    const openInPopup = item => {
        // console.log(homePageCoreValueDetails)
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
        dispatch(listSubMenuOverViews());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete, errorSave])

    return (

        <div>
            {loading || loadingSave || loadingDelete ? "Loading ...." :
                <>
                    <PageTitle title="Submenu Overview" />

                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Widget
                                title="Submenu Overview List Table"
                                upperTitle
                                noBodyPadding
                                // bodyClass={classes.tableWidget}
                                setOpenPopup={setOpenPopup}
                                setRecordForEdit={setRecordForEdit}
                            >
                                {/* <Toolbar>
                                <Controls.Button
                                    text="Add New"
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    className={classes.newButton}
                                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                />
                            </Toolbar> */}
                                <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                    <TblContainer>
                                        <TblHead />
                                        <TableBody>
                                            {
                                                recordsAfterPagingAndSorting().map(item =>
                                                    (<TableRow key={item.id}>
                                                        <TableCell>{item.id}</TableCell>
                                                        <TableCell>{item.title}</TableCell>
                                                        <TableCell>{item.description}</TableCell>
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
                                    title="Submenu Overview Form"
                                    openPopup={openPopup}
                                    setOpenPopup={setOpenPopup}
                                >
                                    <SubMenuOverViewForm
                                        recordForEdit={recordForEdit}
                                        addOrEdit={addOrEdit} />
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