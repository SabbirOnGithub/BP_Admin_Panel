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
import { listCtaHours } from '../../../redux/actions/ctaHourActions';
// redux actions
import { deleteCtaPackageHourly, listCtaPackageHourlys, saveCtaPackageHourly } from '../../../redux/actions/ctaPackageHourlyActions';
import { accessDeniedRoute } from '../../../routes/routeConstants';
import { ResponseMessage } from "../../../themes/responseMessage";
import CtaPackageHourlyForm from "./CtaPackageHourlyForm";






const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'companyTypeId', label: 'Company Type' },
    { id: 'ctaHourId', label: 'Cta Hour' },
    { id: 'validity', label: 'Validity' },
    { id: 'rate', label: 'Rate' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CtaPackageHourlyScreen() {
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

    const ctaHourList = useSelector(state => state.ctaHourList);
    //eslint-disable-next-line
    const { ctaHours, loading: loadingCtaHours, error: errorCtaHours } = ctaHourList;

    const companyTypeList = useSelector(state => state.companyTypeList);
    //eslint-disable-next-line
    const { companyTypes, loading: loadingCompanyTypes, error: errorCompanyTypes } = companyTypeList;

    const ctaPackageHourlyList = useSelector(state => state.ctaPackageHourlyList);
    //eslint-disable-next-line
    const { ctaPackageHourlys, loading, error } = ctaPackageHourlyList;
    
    const ctaPackageHourlySave = useSelector(state => state.ctaPackageHourlySave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = ctaPackageHourlySave;
    const ctaPackageHourlyDelete = useSelector(state => state.ctaPackageHourlyDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = ctaPackageHourlyDelete;


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
    } = useTable(ctaPackageHourlys, headCells, filterFn);

    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveCtaPackageHourly(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteCtaPackageHourly(id));
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
                dispatch(listCtaHours());
                dispatch(listCompanyTypes());
                dispatch(listCtaPackageHourlys());

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
                (loadingRoleResource || loading || loadingCtaHours || loadingCompanyTypes || loadingSave || loadingDelete) ? <Loading /> :
                    (
                        ctaPackageHourlys.length >= 0 &&
                        <>
                            <PageTitle title="Consultancy Packages (Hourly Support)" />

                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Widget
                                        title="Packages List"
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
                                                            <TableCell>{searchNameByIdFromArray(ctaHours, item.ctaHourId)}</TableCell>
                                                            <TableCell>{item.validity}</TableCell>
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
                                            title="Cta Package Hourly Form"
                                            openPopup={openPopup}
                                            setOpenPopup={setOpenPopup}
                                        >
                                            <CtaPackageHourlyForm
                                                recordForEdit={recordForEdit}
                                                addOrEdit={addOrEdit}
                                                loadingSave={loadingSave}
                                                ctaHours={ctaHours}
                                                companyTypes={companyTypes}
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
