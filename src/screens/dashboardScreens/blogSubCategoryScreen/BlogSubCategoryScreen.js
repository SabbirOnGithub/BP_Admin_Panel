import React, { useState, useEffect } from 'react'
import BlogSubCategoryForm from "./BlogSubCategoryForm";
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
import { searchNameByIdFromArray } from '../../../helpers/search';
import Loading from '../../../components/Loading/Loading';


import { useSelector, useDispatch } from 'react-redux';

// permissions
import { usePermission } from '../../../components/UsePermission/usePermission';
import { accessDeniedRoute } from '../../../routes/routeConstants';

// redux actions
import { listBlogSubCategorys, saveBlogSubCategory, deleteBlogSubCategory } from '../../../redux/actions/blogSubCategoryActions';
import { listBlogCategorys } from '../../../redux/actions/blogCategoryActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'blogCategoryId', label: 'Blog Category' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function BlogSubCategoryScreen() {
    // permission get
    const {
        permission,
        setPermission,
        recievedPermission,
        loadingRoleResource,
        history,
        initialPermission
    } = usePermission();
    const { createOperation, readOperation, updateOperation, deleteOperation } = permission;
    // permission get end

    const blogCategoryList = useSelector(state => state.blogCategoryList);
    //eslint-disable-next-line
    const { blogCategorys, loading: loadingBlogCategorys } = blogCategoryList;


    const blogSubCategoryList = useSelector(state => state.blogSubCategoryList);
    //eslint-disable-next-line
    const { blogSubCategorys, loading, error } = blogSubCategoryList;

    const blogSubCategorySave = useSelector(state => state.blogSubCategorySave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = blogSubCategorySave;
    const blogSubCategoryDelete = useSelector(state => state.blogSubCategoryDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = blogSubCategoryDelete;


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
    } = useTable(blogSubCategorys, headCells, filterFn);

    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveBlogSubCategory(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteBlogSubCategory(id));
        resolve();
    })

    const addOrEdit = async (item, resetForm) => {
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        saveItem(item)
            .then(() => {
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
            .then(() => {
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
                        message: ResponseMessage.errorDeleteMessage,
                        type: 'warning'
                    })
                }
            })
    }


    useEffect(() => {
        try {
            if (recievedPermission) {
                setPermission({ ...recievedPermission })
            }
            if (recievedPermission?.readOperation) {
                dispatch(listBlogCategorys());
                dispatch(listBlogSubCategorys());
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
    }, [dispatch, successSave, successDelete, setPermission, recievedPermission, readOperation, history, initialPermission, loadingRoleResource])
    return (

        <>
            {
                (loadingRoleResource || loading || loadingSave || loadingDelete || loadingBlogCategorys) ? <Loading /> :
                    (
                        blogSubCategorys.length >= 0 &&
                        <>
                            <PageTitle title="Blog Sub Categorys" />

                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Widget
                                        title="Blog Sub Category List Table"
                                        upperTitle
                                        noBodyPadding
                                        setOpenPopup={setOpenPopup}
                                        setRecordForEdit={setRecordForEdit}
                                        threeDotDisplay={true}
                                        disableWidgetMenu
                                        addNew={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                        createOperation={createOperation}
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
                                                            <TableCell>{blogCategorys ? searchNameByIdFromArray(blogCategorys, item.blogCategoryId) : ""}</TableCell>
                                                            <TableCell>
                                                                {updateOperation && <Controls.ActionButton
                                                                    color="primary"
                                                                    onClick={() => { openInPopup(item) }}>
                                                                    <EditOutlinedIcon fontSize="small" />
                                                                </Controls.ActionButton>
                                                                }
                                                                {deleteOperation && <Controls.ActionButton
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
                                                                {!updateOperation && !deleteOperation && <>Access Denied</>}
                                                            </TableCell>
                                                        </TableRow>)
                                                        )
                                                    }
                                                </TableBody>
                                            </TblContainer>
                                            <TblPagination />
                                        </Paper>
                                        <Popup
                                            title="Blog Sub Category Form"
                                            openPopup={openPopup}
                                            setOpenPopup={setOpenPopup}
                                        >
                                            <BlogSubCategoryForm
                                                recordForEdit={recordForEdit}
                                                addOrEdit={addOrEdit}
                                                loadingSave={loadingSave}
                                                blogCategorys={blogCategorys}
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
                    )
            }
        </>
    )
}
