import React, { useState, useEffect } from 'react'
import RoleResourceForm from "./RoleResourceForm";
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
import { listRoleResources, saveRoleResource, deleteRoleResource } from '../../../redux/actions/roleResourceActions';
import { listRoles } from '../../../redux/actions/roleActions';
import { listResources } from '../../../redux/actions/resourceActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'roleId', label: 'Role' },
    { id: 'resourceId', label: 'Resource' },
    { id: 'createOperation', label: 'Create Operation' },
    { id: 'readOperation', label: 'Read Operation' },
    { id: 'updateOperation', label: 'Update Operation' },
    { id: 'deleteOperation', label: 'Delete Operation' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function RoleResourceScreen() {
    const resourceList = useSelector(state => state.resourceList);
    //eslint-disable-next-line
    const { resources, loading:loadingResources } = resourceList;

    const roleList = useSelector(state => state.roleList);
    //eslint-disable-next-line
    const { roles, loading:loadingRoles } = roleList;

    const roleResourceList = useSelector(state => state.roleResourceList);
    //eslint-disable-next-line
    const { roleResources, loading, error } = roleResourceList;
    const roleResourceSave = useSelector(state => state.roleResourceSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = roleResourceSave;
    const roleResourceDelete = useSelector(state => state.roleResourceDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = roleResourceDelete;


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
    } = useTable(roleResources, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveRoleResource(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteRoleResource(id));
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
        dispatch(listRoles());
        dispatch(listRoleResources());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])
    return (

        <>
            {
                loading || loadingSave || loadingDelete || loadingRoles || loadingResources ? "Loading" :
                    <>
                        <PageTitle title="Role Resources" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Widget
                                    title="Role Resource List Table"
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
                                                            <TableCell>{roles ? searchNameByIdFromArray(roles, item.roleId) : ""}</TableCell>
                                                            <TableCell>{resources ? searchNameByIdFromArray(resources, item.resourceId) : ""}</TableCell>

                                                            <TableCell>{item.createOperation ? "yes" : "no"}</TableCell>
                                                            <TableCell>{item.readOperation ? "yes" : "no"}</TableCell>
                                                            <TableCell>{item.updateOperation ? "yes" : "no"}</TableCell>
                                                            <TableCell>{item.deleteOperation ? "yes" : "no"}</TableCell>
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
                                        title="Role Resource Form"
                                        openPopup={openPopup}
                                        setOpenPopup={setOpenPopup}
                                    >
                                        <RoleResourceForm
                                            recordForEdit={recordForEdit}
                                            addOrEdit={addOrEdit}
                                            loadingSave={loadingSave}
                                            roles = {roles}
                                            resources = {resources}
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
