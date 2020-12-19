import React, { useState, useEffect } from 'react'
import MenuSubMenuMapDetailForm from "./MenuSubMenuMapDetailForm";
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
import { deleteMenuSubMenuMapDetail, listMenuSubMenuMapDetails, saveMenuSubMenuMapDetail } from '../../../redux/actions/menuSubMenuMapDetailActions';
import {  listMenuSubMenuMaps } from '../../../redux/actions/menuSubMenuMapActions';

import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL




const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'menuSubMenuMapId', label: 'Menu Sub Menu Map Title' },
    { id: 'title', label: 'Title' },
    { id: 'subTitle', label: 'Sub Title' },
    { id: 'description', label: 'Description' },
    { id: 'pictureUrl', label: 'Picture' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function MenuSubMenuMapDetailScreen() {
    const menuSubMenuMapList = useSelector(state => state.menuSubMenuMapList)
    //eslint-disable-next-line
    const { menuSubMenuMaps, loading:loadingMenuSubMenuMaps } = menuSubMenuMapList;

    const menuSubMenuMapDetailList = useSelector(state => state.menuSubMenuMapDetailList)
    //eslint-disable-next-line
    const { menuSubMenuMapDetails, loading, error } = menuSubMenuMapDetailList;
    //eslint-disable-next-line
    const menuSubMenuMapDetailSave = useSelector(state => state.menuSubMenuMapDetailSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = menuSubMenuMapDetailSave;
    const menuSubMenuMapDetailDelete = useSelector(state => state.menuSubMenuMapDetailDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = menuSubMenuMapDetailDelete;


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
    } = useTable(menuSubMenuMapDetails, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(saveMenuSubMenuMapDetail(item,id));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteMenuSubMenuMapDetail(id));
        resolve();
    })
    const addOrEdit = (item, files, resetForm) => {

        const formData = new FormData();
        // append form data
        item.id && formData.append('Id', item.id)
        formData.append('MenuSubMenuMapId', item.menuSubMenuMapId)
        formData.append('Title', item.title)
        formData.append('SubTitle', item.subTitle)
        formData.append('Description', item.description)
        formData.append('file', files)

        if (formData) {
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            saveItem(formData, item.id)
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
        dispatch(listMenuSubMenuMapDetails());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])

    return (

        <div>
            {loading || loadingSave || loadingDelete || loadingMenuSubMenuMaps ? "Loading ...." :
                <>
                    <PageTitle title="Menu Sub Menu Map Detail" />

                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Widget
                                title="Menu Sub Menu Map Detail Table"
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
                                                        <TableCell>{searchTitleByIdFromArray(menuSubMenuMaps, item.menuSubMenuMapId)}</TableCell>
                                                        <TableCell>{item.title}</TableCell>
                                                        <TableCell>{item.subTitle}</TableCell>
                                                        <TableCell>{item.description ? item.description: 'no input given'}</TableCell>
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
                                    title="Menu Sub Menu Map Detail Form"
                                    openPopup={openPopup}
                                    setOpenPopup={setOpenPopup}
                                >
                                    <MenuSubMenuMapDetailForm
                                        recordForEdit={recordForEdit}
                                        addOrEdit={addOrEdit}
                                        menuSubMenuMaps={menuSubMenuMaps}
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