import React, { useState, useEffect } from 'react'
import PaymentPackageForm from "./PaymentPackageForm";
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
import Loading from '../../../components/Loading/Loading';

// 
import { useSelector, useDispatch } from 'react-redux';

// permissions
import { usePermission } from '../../../components/UsePermission/usePermission';
import { accessDeniedRoute } from '../../../routes/routeConstants';

// redux actions
import { deletePaymentPackage, listPaymentPackages, savePaymentPackage } from '../../../redux/actions/paymentPackageActions';
import { listMenus } from '../../../redux/actions/menuActions';
import { listSubMenus } from '../../../redux/actions/subMenuActions';


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'menuName', label: 'Menu Name' },
    { id: 'subMenuName', label: 'Sub Menu Name' },
    { id: 'title', label: 'Title' },
    { id: 'payAmount', label: 'Pay Amount' },
    { id: 'isActive', label: 'Is Active' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function PaymentPackageScreen() {
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
    // permission get end

    const menuList = useSelector(state => state.menuList);
    //eslint-disable-next-line
    const { menus, loading: loadingMenus } = menuList;

    const subMenuList = useSelector(state => state.subMenuList)

    //eslint-disable-next-line
    const { subMenus, loading: loadingSubMenus } = subMenuList;


    const paymentPackageList = useSelector(state => state.paymentPackageList)
    //eslint-disable-next-line
    const { paymentPackages, loading, error } = paymentPackageList;
    //eslint-disable-next-line
    const paymentPackageSave = useSelector(state => state.paymentPackageSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = paymentPackageSave;
    const paymentPackageDelete = useSelector(state => state.paymentPackageDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = paymentPackageDelete;


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
    } = useTable(paymentPackages, headCells, filterFn);

    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(savePaymentPackage(item, id));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deletePaymentPackage(id));
        resolve();
    })
    const addOrEdit = async (item, resetForm) => {
        console.log(item)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        saveItem(item)
            .then(() => {
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
                dispatch(listPaymentPackages());
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

        <div>
            {
                (loadingRoleResource || loading || loadingSave || loadingDelete || loadingMenus || loadingSubMenus) ? <Loading /> :
                    (
                        paymentPackages.length > 0 &&
                        <>
                            <PageTitle title="Payment Package" />

                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Widget
                                        title="Payment Package Table"
                                        upperTitle
                                        noBodyPadding
                                        setOpenPopup={setOpenPopup}
                                        setRecordForEdit={setRecordForEdit}
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
                                                            <TableCell>{searchNameByIdFromArray(menus, item.menuId)}</TableCell>
                                                            <TableCell>{searchNameByIdFromArray(subMenus, item.subMenuId)}</TableCell>
                                                            <TableCell>{item.title}</TableCell>
                                                            <TableCell>{item.payAmount}</TableCell>
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
                                            title="Payment Package Form"
                                            openPopup={openPopup}
                                            setOpenPopup={setOpenPopup}
                                        >
                                            <PaymentPackageForm
                                                recordForEdit={recordForEdit}
                                                addOrEdit={addOrEdit}
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
        </div>
    )
}