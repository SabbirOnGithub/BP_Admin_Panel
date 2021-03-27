import React, { useState, useEffect } from 'react'
import TestimonialDetailForm from "./TestimonialDetailForm";
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
import { deleteTestimonialDetail, listTestimonialDetails, saveTestimonialDetail } from '../../../redux/actions/testimonialDetailActions';
import { listHomePageDatas } from '../../../redux/actions/homePageActions';
import { listUsers } from '../../../redux/actions/userActions';

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'homepageId', label: 'Homepage Id' },
    { id: 'userId', label: 'User' },
    { id: 'userName', label: 'User Name' },
    { id: 'isActive', label: 'Is Active' },
    { id: 'displayOrder', label: 'DisplayOrder' },
    { id: 'message', label: 'Message' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function TestimonialDetailScreen() {
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

    const userList = useSelector(state => state.userList);
    //eslint-disable-next-line
    const { users, loading: loadingUsers } = userList;

    const homePageDataList = useSelector(state => state.homePageDataList);
    //eslint-disable-next-line
    const { homePageDatas, loading: loadingHomePageDatas } = homePageDataList;

    const testimonialDetailList = useSelector(state => state.testimonialDetailList)
    //eslint-disable-next-line
    const { testimonialDetails, loading, error } = testimonialDetailList;
    //eslint-disable-next-line
    const testimonialDetailSave = useSelector(state => state.testimonialDetailSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = testimonialDetailSave;
    const testimonialDetailDelete = useSelector(state => state.testimonialDetailDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = testimonialDetailDelete;


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
    } = useTable(testimonialDetails, headCells, filterFn);

    const dispatch = useDispatch();

    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveTestimonialDetail(item));
        resolve();
    })

    // delete promise
    const deleteItem = (id) => new Promise((resolve, reject) => {
        dispatch(deleteTestimonialDetail(id));
        resolve();
    })
    const addOrEdit = (item, resetForm) => {
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
        // console.log(TestimonialDetails)
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
                dispatch(listUsers());
                dispatch(listHomePageDatas());
                dispatch(listTestimonialDetails());
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
                (loadingRoleResource || loading || loadingSave || loadingDelete || loadingHomePageDatas || loadingUsers) ? <Loading /> :
                    (
                        testimonialDetails.length > 0 &&
                        <>
                            <PageTitle title="Testimonial Details" />

                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Widget
                                        title="Testimonial Details List Table"
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
                                                            <TableCell>{item.homepageId}</TableCell>
                                                            {/* <TableCell>{item.userId}</TableCell> */}
                                                            <TableCell>{users ? searchNameByIdFromArray(users, item.userId) : item.userId}</TableCell>
                                                            <TableCell>{item.userName}</TableCell>
                                                            <TableCell>{item.isActive ? "yes" : "no"}</TableCell>
                                                            <TableCell>{item.displayOrder}</TableCell>
                                                            {/* <TableCell>{item.message}</TableCell> */}
                                                            <TableCell><div dangerouslySetInnerHTML={{ __html: `${item.message}` }} /></TableCell>

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
                                            title="Home Page Core Value Detail Form"
                                            openPopup={openPopup}
                                            setOpenPopup={setOpenPopup}
                                        >
                                            <TestimonialDetailForm
                                                recordForEdit={recordForEdit}
                                                addOrEdit={addOrEdit}
                                                homePageDatas={homePageDatas}
                                                users={users}
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