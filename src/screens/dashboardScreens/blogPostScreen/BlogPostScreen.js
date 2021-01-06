import React, { useState, useEffect } from 'react'
import BlogPostForm from "./BlogPostForm";
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


import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { listBlogPosts, saveBlogPost, deleteBlogPost } from '../../../redux/actions/blogPostActions';
import { listBlogSubCategorys } from '../../../redux/actions/blogSubCategoryActions';



const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'blogSubCategoryId', label: 'BlogSubCategoryId' },
    { id: 'title', label: 'Title' },
    { id: 'content', label: 'Content' },
    { id: 'tags', label: 'Tags' },
    { id: 'published', label: 'Published' },
    // { id: 'authorId', label: 'AuthorId' },
    // { id: 'blogCategoryId', label: 'BlogCategoryId' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function BlogPostScreen() {
    const blogSubCategoryList = useSelector(state => state.blogSubCategoryList);
    //eslint-disable-next-line
    const { blogSubCategorys, loading:loadingBlogSubCategorys } = blogSubCategoryList;

    const userSignIn = useSelector( state => state.userSignin );
    const {  userInfo  } = userSignIn;

    const blogPostList = useSelector(state => state.blogPostList);
    //eslint-disable-next-line
    const { blogPosts, loading, error } = blogPostList;
    const blogPostSave = useSelector(state => state.blogPostSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = blogPostSave;
    const blogPostDelete = useSelector(state => state.blogPostDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = blogPostDelete;


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
    } = useTable(blogPosts, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveBlogPost(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteBlogPost(id));
        resolve();
    })

    const addOrEdit = async (item, resetForm) => {
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        item['authorId'] = userInfo.userId
        // item.published ? item['published'] = 1 : item['published'] = 0
        delete item.authorName
        delete item.createdAt
        delete item.updatedAt
        delete item.publishedAt
        console.log(item)
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
        // item.published === 1 ? item['published'] = true : item['published'] = false
        // setRecordForEdit(item)
        // typeof item.published === "boolean" && setRecordForEdit(item)
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
        dispatch(listBlogSubCategorys());
        dispatch(listBlogPosts());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])
    return (

        <>
            {
                loading || loadingSave || loadingDelete || loadingBlogSubCategorys? "Loading" :
                    <>
                        <PageTitle title="BlogPosts" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Widget
                                    title="BlogPost List Table"
                                    upperTitle
                                    noBodyPadding
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    threeDotDisplay={true}
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
                                                            <TableCell>{item.blogSubCategoryId}</TableCell>
                                                            {/* <TableCell>{blogSubCategorys ? searchNameByIdFromArray(blogSubCategorys, item.blogSubCategorys) : ""}</TableCell> */}

                                                            <TableCell>{item.title}</TableCell>
                                                            <TableCell>{item.content}</TableCell>
                                                            <TableCell>{item.tags}</TableCell>
                                                            <TableCell>{item.published ? "published" : "Not published"}</TableCell>
                                                            {/* <TableCell>{item.authorId}</TableCell> */}
                                                            {/* <TableCell>{item.blogCategoryId}</TableCell> */}
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
                                        title="BlogPost Form"
                                        openPopup={openPopup}
                                        setOpenPopup={setOpenPopup}
                                    >
                                        <BlogPostForm
                                            recordForEdit={recordForEdit}
                                            addOrEdit={addOrEdit}
                                            loadingSave={loadingSave}
                                            blogSubCategorys={blogSubCategorys}
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
