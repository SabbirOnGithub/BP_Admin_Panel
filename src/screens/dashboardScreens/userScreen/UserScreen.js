import React, { useState, useEffect } from 'react'
// import UserForm from "./UserForm";
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
import { listUsers, saveUser, deleteUser } from '../../../redux/actions/userActions';
import { listRoles } from '../../../redux/actions/roleActions';

import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'username', label: 'User Name' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'address', label: 'Address' },
    { id: 'photo', label: 'Photo' },
    { id: 'roleName', label: 'Role Name' },
    { id: 'isActive', label: 'Is Active' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function UserScreen() {
    const roleList = useSelector(state => state.roleList);
    //eslint-disable-next-line
    const { roles, loading: roleListLoading, error: roleListError } = roleList;
    console.log(roles)
    const userList = useSelector(state => state.userList);
    //eslint-disable-next-line
    const { users, loading, error } = userList;
    const userSave = useSelector(state => state.userSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = userSave;

    const successSaveMessage = userSave.user ? userSave.user.message : ResponseMessage.successSaveMessage;

    const userDelete = useSelector(state => state.userDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete;



    //eslint-disable-next-line
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
    } = useTable(users, headCells, filterFn);

    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveUser(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteUser(id));
        resolve();
    })
    //eslint-disable-next-line
    const addOrEdit = async (user, resetForm) => {
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        //call add item promise 
        saveItem(user)
            .then(() => {
                // resetForm()
                // setRecordForEdit(null)
                // setOpenPopup(false)
                if (successSave) {
                    console.log(successSave)
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
            .catch(() => {

            })

    }
    const getUserRoleName = (id) => {
        const roleDetails = roles.find(item => item.id === id);
        if (roleDetails) {
            return roleDetails.name
        } else {
            return 'role not found'
        }
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
        //call delete item promise 
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
        dispatch(listUsers());
        dispatch(listRoles());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])
    return (
        <>
            {
                loading || loadingSave || loadingDelete ? "Loading" :
                    <>
                        <PageTitle title="Users" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Widget
                                    title="User List Table"
                                    upperTitle
                                    noBodyPadding
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    threeDotDisplay={false}
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
                                                        <TableCell>{item.username}</TableCell>
                                                        <TableCell>{item.name}</TableCell>
                                                        <TableCell>{item.email}</TableCell>
                                                        <TableCell>{item.mobile}</TableCell>
                                                        <TableCell>{item.address}</TableCell>
                                                        <TableCell>
                                                            {
                                                                item.photo ? <img src={BASE_ROOT_URL + "/" + item.photo.split("\\").join('/')} alt="logo" style={{ width: 100, height: 100 }} /> : "No image uploaded"
                                                            }</TableCell>
                                                        <TableCell>{getUserRoleName(item.roleId)}</TableCell>
                                                        <TableCell>{item.isActive ? "yes" : "no"}</TableCell>
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
                                        title="User Form"
                                        openPopup={openPopup}
                                        setOpenPopup={setOpenPopup}
                                    >
                                        {/* <UserForm
                                            recordForEdit={recordForEdit}
                                            addOrEdit={addOrEdit}
                                            loadingSave={loadingSave}
                                        /> */}

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
