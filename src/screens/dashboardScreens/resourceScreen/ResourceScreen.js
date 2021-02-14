import React, { useState, useEffect } from 'react'
import ResourceForm from "./ResourceForm";
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
import { listResources, saveResource, deleteResource } from '../../../redux/actions/resourceActions';



const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'systemName', label: 'System Name' },
    { id: 'urlPath', label: 'Url Path' },
    { id: 'ordering', label: 'Ordering' },
    { id: 'isBaseItem', label: 'Is Base Item' },
    { id: 'isActive', label: 'Active' },
    { id: 'baseItemId', label: 'Base Item Id' },
    { id: 'isWfasettingsRequired', label: 'Is Wfasettings Required' },
    { id: 'isNotificationSettingsRequired', label: 'Is Notification Settings Required' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ResourceScreen() {

    const resourceList = useSelector(state => state.resourceList);
    //eslint-disable-next-line
    const { resources, loading, error } = resourceList;
    
    const resourceSave = useSelector(state => state.resourceSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = resourceSave;
    const resourceDelete = useSelector(state => state.resourceDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = resourceDelete;


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
    } = useTable(resources, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveResource(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteResource(id));
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
        dispatch(listResources());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])
    return (

        <>
            {
                loading || loadingSave || loadingDelete ? "Loading" :
                    <>
                        <PageTitle title="Resources" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Widget
                                    title="Resource List Table"
                                    upperTitle
                                    noBodyPadding
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    threeDotDisplay={true}
                                    disableWidgetMenu
                                    addNew = {() => { setOpenPopup(true); setRecordForEdit(null); }}
                                    createOperation = {true}
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
                                                            <TableCell>{item.systemName}</TableCell>
                                                            <TableCell>{item.urlPath}</TableCell>
                                                            <TableCell>{item.ordering}</TableCell>
                                                            <TableCell>{item.isBaseItem ? "yes" : "no"}</TableCell>
                                                            <TableCell>{item.isActive ? "yes" : "no"}</TableCell>
                                                            <TableCell>{item.baseItemId}</TableCell>
                                                            <TableCell>{item.isWfasettingsRequired ? "yes" : "no"}</TableCell>
                                                            <TableCell>{item.isNotificationSettingsRequired ? "yes" : "no"}</TableCell>
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
                                        title="Resource Form"
                                        openPopup={openPopup}
                                        setOpenPopup={setOpenPopup}
                                    >
                                        <ResourceForm
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
