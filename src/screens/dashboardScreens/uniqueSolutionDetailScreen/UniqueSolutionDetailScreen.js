import React, { useState, useEffect } from 'react'
import UniqueSolutionDetailForm from "./UniqueSolutionDetailForm";
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
import { deleteUniqueSolutionDetail, listUniqueSolutionDetails, saveUniqueSolutionDetail } from '../../../redux/actions/uniqueSolutionDetailActions';
import { listHomePageDatas } from '../../../redux/actions/homePageActions';

import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'homepageId', label: 'Homepage Id' },
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'pictureUrl', label: 'Picture' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function UniqueSolutionDetailScreen() {
    const homePageDataList = useSelector(state => state.homePageDataList);
    //eslint-disable-next-line
    const { homePageDatas, loading: loadingHomePageDatas } = homePageDataList;

    const uniqueSolutionDetailList = useSelector(state => state.uniqueSolutionDetailList)
    //eslint-disable-next-line
    const { uniqueSolutionDetails, loading, error } = uniqueSolutionDetailList;
    //eslint-disable-next-line
    const uniqueSolutionDetailSave = useSelector(state => state.uniqueSolutionDetailSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = uniqueSolutionDetailSave;
    const uniqueSolutionDetailDelete = useSelector(state => state.uniqueSolutionDetailDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = uniqueSolutionDetailDelete;


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
    } = useTable(uniqueSolutionDetails, headCells, filterFn);

    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(saveUniqueSolutionDetail(item, id));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteUniqueSolutionDetail(id));
        resolve();
    })
    const addOrEdit = (item, files, resetForm) => {
        const formData = new FormData();
        console.log(item.homepageId)
        item.id && formData.append('Id', item.id)
        formData.append('HomepageId', item.homepageId)
        formData.append('Title', item.title)
        formData.append('Description', item.description)
        formData.append('file', files)

        if (formData) {
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            saveItem(formData, item.id)
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
        dispatch(listHomePageDatas());
        dispatch(listUniqueSolutionDetails());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])

    return (

        <div>
            {loading || loadingSave || loadingDelete || loadingHomePageDatas ? "Loading ...." :
                <>
                    <PageTitle title="Unique Solution Detail" />

                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Widget
                                title="Unique Solution Detail List Table"
                                upperTitle
                                noBodyPadding
                                // bodyClass={classes.tableWidget}
                                setOpenPopup={setOpenPopup}
                                setRecordForEdit={setRecordForEdit}
                                disableWidgetMenu
                                addNew={() => { setOpenPopup(true); setRecordForEdit(null); }}
                            >
                                <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                    <TblContainer>
                                        <TblHead />
                                        <TableBody>
                                            {
                                                recordsAfterPagingAndSorting().map(item =>
                                                (<TableRow key={item.id}>
                                                    <TableCell>{item.id}</TableCell>
                                                    <TableCell>{item.homepageId}</TableCell>
                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>{item.description}</TableCell>
                                                    <TableCell>
                                                        {
                                                            item.pictureUrl ? <img src={BASE_ROOT_URL + "/" + item.pictureUrl.split("\\").join('/')} alt="logo" style={{ width: 100, height: 100 }} /> : "No image uploaded"
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
                                    title="Unique Solution Detail Form"
                                    openPopup={openPopup}
                                    setOpenPopup={setOpenPopup}
                                >
                                    <UniqueSolutionDetailForm
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