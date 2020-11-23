import React, { useState, useEffect } from 'react'
import MenuForm from "./MenuForm";
import { Grid, Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
import useTable from "../../../components/UseTable/useTable";
import Controls from "../../../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../../components/Popup/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";


import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { listMenus, saveMenu, deleteMenu } from '../../../redux/actions/menuActions';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
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
    { id: 'isActive', label: 'isActive' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function MenuPageScreen() {

    const menuList = useSelector(state => state.menuList);
    //eslint-disable-next-line
    const { menus, loading, error } = menuList;
    const menuSave = useSelector(state => state.menuSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = menuSave;
    const menuDelete = useSelector(state => state.menuDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = menuDelete;


    const classes = useStyles();
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
    } = useTable(menus, headCells, filterFn);

    const addOrEdit = async (menu, resetForm) => {
        console.log(menu)
        dispatch(saveMenu(menu));
        resetForm();
    }

    const openInPopup = item => {
        // console.log(subMenus)
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deleteMenu(id));
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
        dispatch(listMenus());

        return () => {
            // 

        }
    }, [dispatch, successSave, successDelete])
    return (

        <>
            {
                loading ? "Loading" :
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
                            
                                {/* {console.log(homePageDataList.homePageDatas)} */}
                                
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting().map(item =>
                                                (<TableRow key={item.id}>
                                                    <TableCell>{item.id}</TableCell>
                                                    <TableCell>{item.name}</TableCell>
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
                                title="Menu Form"
                                openPopup={openPopup}
                                setOpenPopup={setOpenPopup}
                            >
                                <MenuForm
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
                        </Grid>
                    </Grid>
            }
        </>
    )
}
