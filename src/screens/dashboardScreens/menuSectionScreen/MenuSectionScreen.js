import React, { useState, useEffect } from 'react'
import MenuSectionForm from "./MenuSectionForm";
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
import { deleteMenuSection, listMenuSections, saveMenuSection } from '../../../redux/actions/menuSectionActions';
import { listMenus } from '../../../redux/actions/menuActions';

import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL




const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'menuId', label: 'Menu Title' },
    { id: 'title', label: 'Title' },
    { id: 'pictureUrl', label: 'Picture' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function MenuSectionScreen() {
    const menuList = useSelector(state => state.menuList);
    //eslint-disable-next-line
    const { menus, loading:loadingMenus } = menuList;

    const menuSectionList = useSelector(state => state.menuSectionList)
    //eslint-disable-next-line
    const { menuSections, loading, error } = menuSectionList;
    //eslint-disable-next-line
    const menuSectionSave = useSelector(state => state.menuSectionSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = menuSectionSave;
    const menuSectionDelete = useSelector(state => state.menuSectionDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = menuSectionDelete;


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
    } = useTable(menuSections, headCells, filterFn);
    
    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(saveMenuSection(item,id));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteMenuSection(id));
        resolve();
    })
    const addOrEdit = (item, files, resetForm) => {

        const formData = new FormData();
        console.log(item.id)
        item.id && formData.append('Id', item.id)
        formData.append('Title', item.title)
        formData.append('MenuId', item.menuId)
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
        dispatch(listMenus());
        dispatch(listMenuSections());
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete])

    return (

        <div>
            {loading || loadingSave || loadingDelete || loadingMenus ? "Loading ...." :
                <>
                    <PageTitle title="Menu Section" />

                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Widget
                                title="Menu Section Table"
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
                                                        <TableCell>{searchNameByIdFromArray(menus, item.menuId)}</TableCell>
                                                        <TableCell>{item.title}</TableCell>
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
                                    title="Menu Section Form"
                                    openPopup={openPopup}
                                    setOpenPopup={setOpenPopup}
                                >
                                    <MenuSectionForm
                                        recordForEdit={recordForEdit}
                                        addOrEdit={addOrEdit}
                                        menus={menus} 
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