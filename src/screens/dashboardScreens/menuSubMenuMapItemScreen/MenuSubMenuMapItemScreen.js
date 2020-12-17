import React, { useState, useEffect } from 'react'
import MenuSubMenuMapItemForm from "./MenuSubMenuMapItemForm";
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
import { searchTitleByIdFromArray } from '../../../helpers/search';


import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { listMenuSubMenuMapItems, saveMenuSubMenuMapItem, deleteMenuSubMenuMapItem } from '../../../redux/actions/menuSubMenuMapItemActions';
import {  listMenuSubMenuMaps } from '../../../redux/actions/menuSubMenuMapActions';



const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'menuSubMenuMapId', label: 'Menu SubMenu Map Title' },
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'displayOrder', label: 'DisplayOrder' },
    { id: 'isActive', label: 'Active' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function MenuSubMenuMapItemScreen() {
    const menuSubMenuMapList = useSelector(state => state.menuSubMenuMapList)
    //eslint-disable-next-line
    const { menuSubMenuMaps, loading: loadingMenuSubMenuMaps } = menuSubMenuMapList;
    console.log(menuSubMenuMaps)

    const menuSubMenuMapItemList = useSelector(state => state.menuSubMenuMapItemList);
    //eslint-disable-next-line
    const { menuSubMenuMapItems, loading, error } = menuSubMenuMapItemList;
    const menuSubMenuMapItemSave = useSelector(state => state.menuSubMenuMapItemSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = menuSubMenuMapItemSave;
    const menuSubMenuMapItemDelete = useSelector(state => state.menuSubMenuMapItemDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = menuSubMenuMapItemDelete;


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
    } = useTable(menuSubMenuMapItems, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveMenuSubMenuMapItem(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteMenuSubMenuMapItem(id));
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
        dispatch(listMenuSubMenuMaps());
        dispatch(listMenuSubMenuMapItems());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])
    return (

        <>
            {
                loading || loadingSave || loadingDelete || loadingMenuSubMenuMaps ? "Loading" :
                    <>
                        <PageTitle title="Menu Sub Menu Map Items" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Widget
                                    title="Menu Sub Menu Map Item List Table"
                                    upperTitle
                                    noBodyPadding
                                    // bodyClass={classes.tableWidget}
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    threeDotDisplay={true}
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
                                                            <TableCell>{searchTitleByIdFromArray(menuSubMenuMaps, item.menuSubMenuMapId)}</TableCell>
                                                            <TableCell>{item.title}</TableCell>
                                                            <TableCell>{item.description}</TableCell>
                                                            <TableCell>{item.displayOrder}</TableCell>
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
                                        title="Menu Sub Menu Map Item Form"
                                        openPopup={openPopup}
                                        setOpenPopup={setOpenPopup}
                                    >
                                        <MenuSubMenuMapItemForm
                                            recordForEdit={recordForEdit}
                                            addOrEdit={addOrEdit}
                                            loadingSave={loadingSave}
                                            menuSubMenuMaps = {menuSubMenuMaps}
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
