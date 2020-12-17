import React, { useState, useEffect } from 'react'
import MenuSubMenuMapItemListItemForm from "./MenuSubMenuMapItemListItemForm";
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
import { listMenuSubMenuMapItemListItems, saveMenuSubMenuMapItemListItem, deleteMenuSubMenuMapItemListItem } from '../../../redux/actions/menuSubMenuMapItemListItemActions';
import { listMenuSubMenuMapItems } from '../../../redux/actions/menuSubMenuMapItemActions';


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'menuSubMenuMapItemId', label: 'Menu Sub Menu Map Item Id' },
    { id: 'text', label: 'Text' },
    { id: 'isActive', label: 'Active' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function MenuSubMenuMapItemListItemScreen() {
    const menuSubMenuMapItemList = useSelector(state => state.menuSubMenuMapItemList);
    //eslint-disable-next-line
    const { menuSubMenuMapItems, loading:loadingMenuSubMenuMapItem } = menuSubMenuMapItemList;

    const menuSubMenuMapItemListItemList = useSelector(state => state.menuSubMenuMapItemListItemList);
    //eslint-disable-next-line
    const { menuSubMenuMapItemListItems, loading, error } = menuSubMenuMapItemListItemList;
    const menuSubMenuMapItemListItemSave = useSelector(state => state.menuSubMenuMapItemListItemSave);
    // console.log(menuSubMenuMapItemListItemSave.menuSubMenuMapItemListItem)
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave  } = menuSubMenuMapItemListItemSave;
    
    const successSaveMessage = menuSubMenuMapItemListItemSave.menuSubMenuMapItemListItem ? menuSubMenuMapItemListItemSave.menuSubMenuMapItemListItem.message : ResponseMessage.successSaveMessage;

    const menuSubMenuMapItemListItemDelete = useSelector(state => state.menuSubMenuMapItemListItemDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = menuSubMenuMapItemListItemDelete;
    



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
    } = useTable(menuSubMenuMapItemListItems, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveMenuSubMenuMapItemListItem(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteMenuSubMenuMapItemListItem(id));
        resolve();
    })

    const addOrEdit = async (item, resetForm) => {
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        //call add item promise 
        saveItem(item)
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
        dispatch(listMenuSubMenuMapItems())
        dispatch(listMenuSubMenuMapItemListItems())

        // .then(()=>{
        //     if(!loadingMenuSubMenuMapItem){
        //         dispatch(listMenuSubMenuMapItemListItems());
        //     }
        // })
        
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])
    return (
        <>
            {
                loading || loadingSave || loadingDelete || loadingMenuSubMenuMapItem ? "Loading" :
                    <>
                        <PageTitle title="Menu SubMenu Map Item List Item" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Widget
                                    title="Menu SubMenu Map Item List Item List Table"
                                    upperTitle
                                    noBodyPadding
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    threeDotDisplay={true}
                                >
                                    <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                        <TblContainer>
                                            <TblHead />
                                            <TableBody>
                                                {
                                                    recordsAfterPagingAndSorting().map(item =>
                                                        (<TableRow key={item.id}>
                                                            <TableCell>{item.id}</TableCell>
                                                            <TableCell>{item.menuSubMenuMapItemId}</TableCell>
                                                            <TableCell>{item.text}</TableCell>
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
                                        title="Menu SubMenu Map Item List Item Form"
                                        openPopup={openPopup}
                                        setOpenPopup={setOpenPopup}
                                    >
                                        <MenuSubMenuMapItemListItemForm
                                            recordForEdit={recordForEdit}
                                            addOrEdit={addOrEdit}
                                            loadingSave={loadingSave}
                                            menuSubMenuMapItems={menuSubMenuMapItems}
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