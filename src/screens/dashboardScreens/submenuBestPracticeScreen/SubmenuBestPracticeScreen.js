import React, { useState, useEffect } from 'react'
import SubmenuBestPracticeForm from "./SubmenuBestPracticeForm";
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

import { useSelector, useDispatch } from 'react-redux';

// permissions
import { usePermission } from '../../../components/UsePermission/usePermission';
import { accessDeniedRoute } from '../../../routes/routeConstants';

// redux actions
import { deleteSubmenuBestPractice, listSubmenuBestPractices, saveSubmenuBestPractice } from '../../../redux/actions/submenuBestPracticeActions';
import { listSubMenus } from '../../../redux/actions/subMenuActions';

import { config } from "../../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL



const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'subMenuId', label: 'SubMenu' },
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'pictureUrl', label: 'Picture' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function SubmenuBestPracticeScreen() {
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

    const subMenuList = useSelector(state => state.subMenuList)

    //eslint-disable-next-line
    const { subMenus, loading: loadingSubMenus } = subMenuList;

    const submenuBestPracticeList = useSelector(state => state.submenuBestPracticeList)
    //eslint-disable-next-line
    const { submenuBestPractices, loading, error } = submenuBestPracticeList;
    //eslint-disable-next-line
    const submenuBestPracticeSave = useSelector(state => state.submenuBestPracticeSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = submenuBestPracticeSave;
    const submenuBestPracticeDelete = useSelector(state => state.submenuBestPracticeDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = submenuBestPracticeDelete;


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
    } = useTable(submenuBestPractices, headCells, filterFn);

    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item, id) => new Promise((resolve, reject) => {
        dispatch(saveSubmenuBestPractice(item, id));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteSubmenuBestPractice(id));
        resolve();
    })
    const addOrEdit = (item, resetForm) => {
        const formData = new FormData();
        console.log(item.id)
        item.id && formData.append('Id', item.id)
        formData.append('SubMenuId', item.subMenuId)
        formData.append('Title', item.title)
        formData.append('Description', item.description)
        // append for add/update image
        if (typeof (item.pictureUrl) === 'object') {
            formData.append('file', item.pictureUrl)
        }
        // eslint-disable-next-line 
        if (typeof (item.pictureUrl) === 'null' || typeof (item.pictureUrl) === 'string') {
            formData.append('pictureUrl', item.pictureUrl)
        }
        if (formData) {
            resetForm()
            setRecordForEdit(null)
            setOpenPopup(false)
            saveItem(formData, item.id)
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
    }

    const openInPopup = item => {
        // console.log(homePageCoreValueDetails)
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
                dispatch(listSubMenus());
                dispatch(listSubmenuBestPractices());
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
                (loadingRoleResource || loadingSubMenus || loading || loadingSave || loadingDelete) ? <Loading /> :
                    (
                        submenuBestPractices.length > 0 &&
                        <>
                            <PageTitle title="Submenu Best Practice" />

                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Widget
                                        title="Submenu Best Practice List Table"
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
                                                            <TableCell>{subMenus ? searchNameByIdFromArray(subMenus, item.subMenuId) : item.subMenuId}</TableCell>
                                                            <TableCell>{item.title}</TableCell>
                                                            {/* <TableCell>{item.description}</TableCell> */}
                                                            <TableCell><div dangerouslySetInnerHTML={{ __html: `${item.description}` }} /></TableCell>
                                                            <TableCell>
                                                                {
                                                                    item.pictureUrl ? <img src={BASE_ROOT_URL + "/" + item.pictureUrl.split("\\").join('/')} alt="logo" /> : "No image uploaded"
                                                                }</TableCell>
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
                                            title="Submenu Best Practice Form"
                                            openPopup={openPopup}
                                            setOpenPopup={setOpenPopup}
                                        >
                                            <SubmenuBestPracticeForm
                                                recordForEdit={recordForEdit}
                                                addOrEdit={addOrEdit}
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