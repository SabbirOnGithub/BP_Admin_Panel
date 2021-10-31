import { Grid, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Controls from "../../../components/controls/Controls";
import Loading from '../../../components/Loading/Loading';
import Notification from "../../../components/Notification/Notification";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Popup from "../../../components/Popup/Popup";
// permissions
import { usePermission } from '../../../components/UsePermission/usePermission';
import useTable from "../../../components/UseTable/useTable";
import Widget from "../../../components/Widget/Widget";
import { searchNameByIdFromArray } from '../../../helpers/search';
import { listCompanyTypes } from '../../../redux/actions/companyTypeActions';
// redux actions
import { deleteCtaPackageDaily, listCtaPackageDailys, saveCtaPackageDaily } from '../../../redux/actions/ctaPackageDailyActions';
import { listSubMenus } from '../../../redux/actions/subMenuActions';
import { accessDeniedRoute } from '../../../routes/routeConstants';
import { ResponseMessage } from "../../../themes/responseMessage";
import CtaPackageDailyForm from "./CtaPackageDailyForm";






const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'companyTypeId', label: 'Company Type' },
    { id: 'submenuId', label: 'Submenu' },
    { id: 'rate', label: 'Rate' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CtaPackageDailyScreen() {
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

    const companyTypeList = useSelector(state => state.companyTypeList);
    //eslint-disable-next-line
    const { companyTypes, loading:loadingCompanyTypes, error:errorCompanyTypes } = companyTypeList;

    const subMenuList = useSelector(state => state.subMenuList)
    //eslint-disable-next-line
    const { subMenus, loading:loadingSubMenus, error: errorSubMenus } = subMenuList;

    const ctaPackageDailyList = useSelector(state => state.ctaPackageDailyList);
    //eslint-disable-next-line
    const { ctaPackageDailys, loading, error } = ctaPackageDailyList;
    const ctaPackageDailySave = useSelector(state => state.ctaPackageDailySave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = ctaPackageDailySave;
    const ctaPackageDailyDelete = useSelector(state => state.ctaPackageDailyDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = ctaPackageDailyDelete;


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
    } = useTable(ctaPackageDailys, headCells, filterFn);

    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveCtaPackageDaily(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteCtaPackageDaily(id));
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
                dispatch(listCompanyTypes());
                dispatch(listSubMenus());
                dispatch(listCtaPackageDailys());
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
                (loadingRoleResource || loading || loadingSubMenus || loadingCompanyTypes || loadingSave || loadingDelete) ? <Loading /> :
                    (
                        ctaPackageDailys.length >= 0 &&
                        <>
                        <PageTitle title="Consultancy Packages (Solutions Discovery)" />

                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Widget
                                        title="Package List"
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
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell>{searchNameByIdFromArray(companyTypes, item.companyTypeId)}</TableCell>
                                                            <TableCell>{searchNameByIdFromArray(subMenus, item.submenuId)}</TableCell>
                                                            <TableCell>{item.rate}</TableCell>
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
                                            title="Cta Package Daily Form"
                                            openPopup={openPopup}
                                            setOpenPopup={setOpenPopup}
                                        >
                                            <CtaPackageDailyForm
                                                recordForEdit={recordForEdit}
                                                addOrEdit={addOrEdit}
                                                loadingSave={loadingSave}
                                                subMenus={subMenus}
                                                companyTypes ={companyTypes}
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
