import React, { useState, useEffect } from 'react'
import HomeConsultationTopicForm from "./HomeConsultationTopicForm";
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

import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { deleteHomeConsultationTopic, listHomeConsultationTopics, saveHomeConsultationTopic } from '../../../redux/actions/homeConsultationTopicActions';

import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL



const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'pictureUrl', label: 'Picture' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function HomeConsultationTopicScreen() {

    const homeConsultationTopicList = useSelector(state => state.homeConsultationTopicList)
    //eslint-disable-next-line
    const { homeConsultationTopics, loading, error } = homeConsultationTopicList;
    //eslint-disable-next-line
    const homeConsultationTopicSave = useSelector(state => state.homeConsultationTopicSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = homeConsultationTopicSave;
    const homeConsultationTopicDelete = useSelector(state => state.homeConsultationTopicDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = homeConsultationTopicDelete;


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
    } = useTable(homeConsultationTopics, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(saveHomeConsultationTopic(item, id));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteHomeConsultationTopic(id));
        resolve();
    })
    const addOrEdit = (item, files, resetForm) => {
        const formData = new FormData();
        console.log(item.id)
        formData.append('HompageId', item.id)
        formData.append('Name', item.name)
        formData.append('Description', item.description)
        formData.append('file', files)
        
        if (formData) {
            saveItem(formData, item.id)
            .then(()=>{
                resetForm()
                setRecordForEdit(null)
                setOpenPopup(false)
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
            
        })
    }



    useEffect(() => {
        dispatch(listHomeConsultationTopics());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete, errorSave])

    return (

        <div>
            {loading || loadingSave || loadingDelete ? "Loading ...." :
                <>
                    <PageTitle title="Home Consultation Topic" />

                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Widget
                                title="Home Consultation Topic List Table"
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
                                                        <TableCell>{item.name}</TableCell>
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
                                    title="Home Page Function Area Detail Form"
                                    openPopup={openPopup}
                                    setOpenPopup={setOpenPopup}
                                >
                                    <HomeConsultationTopicForm
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