import React, { useState, useEffect } from 'react'
import SubMenuForm from "./SubMenuForm";
import { Grid, Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
import useTable from "../../../components/UseTable/useTable";
import Controls from "../../../components/controls/Controls";
// import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../../components/Popup/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";

import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { deleteSubMenu, listSubMenus, saveSubMenu } from '../../../redux/actions/subMenuActions';

import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'shortDescription', label: 'Short Description' },
    { id: 'pictureName', label: 'Picture' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function SubMenuScreen() {

    const subMenuList = useSelector(state => state.subMenuList)
    const { subMenus, loading, error } = subMenuList;
    //eslint-disable-next-line
    const subMenuSave = useSelector(state => state.subMenuSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = subMenuSave;
    const subMenuDelete = useSelector(state => state.subMenuDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = subMenuDelete;


    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(subMenus, headCells, filterFn);

    const addOrEdit = (subMenu, files, resetForm) => {

        const formData = new FormData();
        console.log(subMenu.id)
        subMenu.id && formData.append('Id', subMenu.id)
        formData.append('Name', subMenu.name)
        formData.append('ShortDescription', subMenu.shortDescription)
        formData.append('file', files)

        if(formData){
            dispatch(saveSubMenu(formData, subMenu.id));
            resetForm();
        }
        
    }

    const openInPopup = item => {
        console.log(subMenus)
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deleteSubMenu(id));

    }


    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            // resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            setNotify({
                isOpen: true,
                message: 'Submitted Successfully',
                type: 'success'
            })
        }
        if (successDelete) {
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'success'
            })
        }
        // if(error){
        //     // history.pushState('')
        //     console.log('error is'+error)
        // }
        dispatch(listSubMenus());
        console.log(subMenus)

        return () => {
            // 

        }
    }, [dispatch, successSave, successDelete])

    return (

        <div>
            {loading ? "Loading ...." :
                <>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Toolbar>
                                <Controls.Button
                                    text="Add New"
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    className={classes.newButton}
                                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                />
                            </Toolbar>
                            <Paper style={{overflow:"auto",backgroundColor:"transparent"}}>
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting().map(item =>
                                                (<TableRow key={item.id}>
                                                    <TableCell>{item.id}</TableCell>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.shortDescription}</TableCell>
                                                    <TableCell><img src={BASE_ROOT_URL + "/" + item.pictureUrl.split("\\").join('/')} alt="logo" style={{ width: 100, height: 100 }} /></TableCell>
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
                                title="Submenu Form"
                                openPopup={openPopup}
                                setOpenPopup={setOpenPopup}
                            >
                                <SubMenuForm
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
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    )
}