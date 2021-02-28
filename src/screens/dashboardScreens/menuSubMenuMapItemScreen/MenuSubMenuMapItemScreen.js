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
import { searchTitleByIdFromArray, searchNameByIdFromArray } from '../../../helpers/search';


import { useSelector, useDispatch } from 'react-redux';
// permissions
import { usePermission } from '../../../components/UsePermission/usePermission';
import { accessDeniedRoute } from '../../../routes/routeConstants';

// redux actions
import { listMenuSubMenuMapItems, saveMenuSubMenuMapItem, deleteMenuSubMenuMapItem } from '../../../redux/actions/menuSubMenuMapItemActions';
import { listMenuSubMenuMaps } from '../../../redux/actions/menuSubMenuMapActions';
import { listMenus } from '../../../redux/actions/menuActions';
import { listSubMenus } from '../../../redux/actions/subMenuActions';


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'menuName/subMenuName', label: 'Menu/Sub Menu Name' },
    { id: 'menuSubMenuMapId', label: 'Menu SubMenu Map Title' },
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'displayOrder', label: 'DisplayOrder' },
    { id: 'isActive', label: 'Active' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function MenuSubMenuMapItemScreen() {
    // permission get
    const {
        permission,
        setPermission,
        recievedPermission,
        loadingRoleResource,
        history,
        initialPermission
    } = usePermission();
    const { createOperation, readOperation, updateOperation, deleteOperation } = permission;

    const menuList = useSelector(state => state.menuList);
    //eslint-disable-next-line
    const { menus, loading: loadingMenus } = menuList;

    const subMenuList = useSelector(state => state.subMenuList)

    //eslint-disable-next-line
    const { subMenus, loading: loadingSubMenus } = subMenuList;


    const menuSubMenuMapList = useSelector(state => state.menuSubMenuMapList)
    //eslint-disable-next-line
    const { menuSubMenuMaps, loading: loadingMenuSubMenuMaps } = menuSubMenuMapList;

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
            .then(() => {
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
        let menuId = menuSubMenuMaps.find(menuSubMenuMapItem => menuSubMenuMapItem.id === item.menuSubMenuMapId).menuId;
        let subMenuId = menuSubMenuMaps.find(menuSubMenuMapItem => menuSubMenuMapItem.id === item.menuSubMenuMapId).subMenuId;
        item["menuId"] = menuId
        item["subMenuId"] = subMenuId

        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
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
        try {
            if (recievedPermission) {
                setPermission({ ...recievedPermission })
            }
            if (recievedPermission?.readOperation) {
                dispatch(listMenus());
                dispatch(listSubMenus());
                dispatch(listMenuSubMenuMaps());
                dispatch(listMenuSubMenuMapItems());
            }
            if (readOperation === false) {
                history.push(accessDeniedRoute);
            }
            if (loadingRoleResource === false && !recievedPermission) {
                setPermission({ ...initialPermission })
            }
        } catch (e) {
            console.log(e)
        }
        return () => {
            // 
        }
    }, [dispatch, successSave, successDelete, setPermission, recievedPermission, readOperation, history, initialPermission, loadingRoleResource])
    return (

        <>
            {
                (loadingRoleResource || loading || loadingSave || loadingDelete || loadingMenuSubMenuMaps || loadingMenus || loadingSubMenus) ? "Loading" :
                    (
                        menuSubMenuMapItems.length > 0 &&
                        <>
                            <PageTitle title="Menu Sub Menu Map Items" />

                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Widget
                                        title="Menu Sub Menu Map Item List Table"
                                        upperTitle
                                        noBodyPadding
                                        setOpenPopup={setOpenPopup}
                                        setRecordForEdit={setRecordForEdit}
                                        threeDotDisplay={true}
                                        disableWidgetMenu
                                        addNew={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                        createOperation={createOperation}

                                    >

                                        <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                            <TblContainer>
                                                <TblHead />
                                                <TableBody>
                                                    {
                                                        recordsAfterPagingAndSorting().map(item =>
                                                        (<TableRow key={item.id}>
                                                            <TableCell>{item.id}</TableCell>
                                                            <TableCell>{searchNameByIdFromArray(menus, menuSubMenuMaps.find(menuSubMenuMapItem => menuSubMenuMapItem.id === item.menuSubMenuMapId).menuId)} /
                                                                    {searchNameByIdFromArray(subMenus, menuSubMenuMaps.find(menuSubMenuMapItem => menuSubMenuMapItem.id === item.menuSubMenuMapId).subMenuId)}
                                                            </TableCell>
                                                            <TableCell>{searchTitleByIdFromArray(menuSubMenuMaps, item.menuSubMenuMapId)}</TableCell>
                                                            <TableCell>{item.title}</TableCell>
                                                            {/* <TableCell>{item.description}</TableCell> */}
                                                            <TableCell><div dangerouslySetInnerHTML={{ __html: `${item.description}` }} /></TableCell>
                                                            <TableCell>{item.displayOrder}</TableCell>
                                                            <TableCell>{item.isActive ? "yes" : "no"}</TableCell>
                                                            <TableCell>
                                                                {updateOperation && <Controls.ActionButton
                                                                    color="primary"
                                                                    onClick={() => { openInPopup(item) }}>
                                                                    <EditOutlinedIcon fontSize="small" />
                                                                </Controls.ActionButton>
                                                                }
                                                                {deleteOperation && <Controls.ActionButton
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
                                                                }
                                                                {!updateOperation && !deleteOperation && <>Access Denied</>}
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
                                                menuSubMenuMaps={menuSubMenuMaps}
                                                menus={menus}
                                                subMenus={subMenus}
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
                    )
            }
        </>
    )
}
