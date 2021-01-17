import React, { useState, useEffect } from 'react';
import BlogCategoryForm from "./BlogCategoryForm";
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
import { listBlogCategorys, saveBlogCategory, deleteBlogCategory } from '../../../redux/actions/blogCategoryActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function BlogCategoryScreen(props) {
   const { createOperation, readOperation, deleteOperation, updateOperation} = props;

    const blogCategoryList = useSelector(state => state.blogCategoryList);
    //eslint-disable-next-line
    const { blogCategorys, loading, error } = blogCategoryList;
    const blogCategorySave = useSelector(state => state.blogCategorySave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = blogCategorySave;
    const blogCategoryDelete = useSelector(state => state.blogCategoryDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = blogCategoryDelete;


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
    } = useTable(blogCategorys, headCells, filterFn);
    
    const dispatch = useDispatch();
    
    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveBlogCategory(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteBlogCategory(id));
        resolve();
    })

    const addOrEdit = async (item, resetForm) => {
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        saveItem(item)
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

    const openInPopup = item => {
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
        dispatch(listBlogCategorys());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])
    return (

        <>
            {
                // loading || loadingSave || loadingDelete ? "Loading" : readOperation &&
                loading || loadingSave || loadingDelete ? "Loading" : 
                    <>
                        <PageTitle title="Blog Categorys" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Widget
                                    title="Blog Category List Table"
                                    upperTitle
                                    noBodyPadding
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    threeDotDisplay={true}
                                    disableWidgetMenu
                                    addNew = {() => { setOpenPopup(true); setRecordForEdit(null); }}
                                    // createPermission = {createOperation}
                                    createPermission = {true}
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
                                                            {/* <TableCell>{item.isActive ? "yes" : "no"}</TableCell> */}
                                                            <TableCell>
                                                                {/* {createPermission(roleResource, currentPathName) ? 'yes' : 'no'} */}
                                                                
                                                            {/* {updateOperation &&  */}
                                                            {
                                                                <Controls.ActionButton
                                                                    color="primary"
                                                                    onClick={() => { openInPopup(item) }}>
                                                                    <EditOutlinedIcon fontSize="small" />
                                                                </Controls.ActionButton>
                                                            }
                                                            {/* {deleteOperation &&  */}
                                                            {
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
                                                            }
                                                            </TableCell>
                                                        </TableRow>)
                                                    )
                                                }
                                            </TableBody>
                                        </TblContainer>
                                        <TblPagination />
                                    </Paper>
                                    <Popup
                                        title="Blog Category Form"
                                        openPopup={openPopup}
                                        setOpenPopup={setOpenPopup}
                                    >
                                        <BlogCategoryForm
                                            recordForEdit={recordForEdit}
                                            addOrEdit={addOrEdit}
                                            loadingSave={loadingSave}
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
        </>
    )
}
