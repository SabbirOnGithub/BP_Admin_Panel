import React, { useState, useEffect } from 'react'
import ConsultancyReceiveHistoryForm from "./ConsultancyReceiveHistoryForm";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../../../components/UseTable/useTable";
import Popup from "../../../../components/Popup/Popup";
// import Controls from "../../../../components/controls/Controls";
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../../../components/Notification/Notification";
import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";
import Widget from "../../../../components/Widget/Widget";
import { ResponseMessage } from "../../../../themes/responseMessage";
import Loading from '../../../../components/Loading/Loading';


import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { 
    saveConsultancyReceiveHistory, 
    // deleteConsultancyReceiveHistory 
} from '../../../../redux/actions/consultancyReceiveHistoryActions';


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'consultancyReceiveDate', label: 'Consultancy Received Date' },
    { id: 'consultancyReceiveTime', label: 'Consultancy Received Time' },
    // { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ConsultancyReceiveHistoryScreen(props) {
    
    const { 
        ctaFunctionId,
        consultancyReceiveHistorys, 
        // loading, 
        // error 
        createOperation
        } = props;
    const consultancyReceiveHistorySave = useSelector(state => state.consultancyReceiveHistorySave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = consultancyReceiveHistorySave;
    // const consultancyReceiveHistoryDelete = useSelector(state => state.consultancyReceiveHistoryDelete);
    // //eslint-disable-next-line
    // const { loading: loadingDelete, success: successDelete, error: errorDelete } = consultancyReceiveHistoryDelete;

    const [recordForEdit, setRecordForEdit] = useState(null)
    // const [records, setRecords] = useState([])
    const [searchValue, setSearchValue] = useState("")

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
    } = useTable(consultancyReceiveHistorys, headCells, filterFn);

    const dispatch = useDispatch();
    // search from table
    const handleSearch = e => {
        e.persist();
        const recievedSearchValue = e.target.value;
        setSearchValue(recievedSearchValue);
        setFilterFn({
            fn: items => {
                if (recievedSearchValue){
                    return items.filter(x => {
                        const makeStringInRow = (
                            (x?.consultancyReceiveDate && new Date(`${x?.consultancyReceiveDate} UTC`).toLocaleDateString()) + 
                            (x?.consultancyReceiveTime && (' ' + (x?.consultancyReceiveTime/60).toFixed(2) + ' Hours')) 
                            )?.toString()?.toLowerCase();
                        return makeStringInRow.indexOf(recievedSearchValue.toString().toLowerCase()) > -1;
                    });
                }
                else{
                    return items;
                }
            }
        });
    }
    // add/update promise
    const saveItem = (item) => new Promise((resolve, reject) => {
        dispatch(saveConsultancyReceiveHistory(item));
        resolve();
    })

    // delete promise
    // const deleteItem = (id) => new Promise((resolve, reject) => {
    //     dispatch(deleteConsultancyReceiveHistory(id));
    //     resolve();
    // })

    const addOrEdit = async (item, resetForm) => {
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        saveItem(item)
            .then(() => {
                if (successSave) {
                    setNotify({
                        isOpen: true,
                        message: ResponseMessage.successSaveMessage,
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

    // const openInPopup = item => {
    //     setRecordForEdit(item)
    //     setOpenPopup(true)
    // }

    // const onDelete = id => {
    //     setConfirmDialog({
    //         ...confirmDialog,
    //         isOpen: false
    //     })
    //     deleteItem(id)
    //         .then(() => {
    //             if (successDelete) {
    //                 setNotify({
    //                     isOpen: true,
    //                     message: 'Deleted Successfully',
    //                     type: 'success'
    //                 })
    //             }
    //             if (errorDelete) {
    //                 setNotify({
    //                     isOpen: true,
    //                     message: ResponseMessage.errorDeleteMessage,
    //                     type: 'warning'
    //                 })
    //             }
    //         })
    // }

    useEffect(() => {
        return () => {
            // 
        }
    }, [dispatch, loadingSave])
    return (

        <>
            {
                (loadingSave) ? <Loading /> :
                    (
                        consultancyReceiveHistorys.length >= 0 &&
                        <>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Widget
                                        title="Consultancy Receive History List Table"
                                        upperTitle
                                        noBodyPadding
                                        setOpenPopup={setOpenPopup}
                                        setRecordForEdit={setRecordForEdit}
                                        threeDotDisplay={true}
                                        disableWidgetMenu
                                        addNew={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                        createOperation={createOperation}
                                        handleSearch = {handleSearch}
                                        searchLabel = 'Search here..'
                                        searchValue = {searchValue}
                                    >

                                        <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                            <TblContainer>
                                                <TblHead />
                                                <TableBody>
                                                    {
                                                        recordsAfterPagingAndSorting().map(item =>
                                                        (<TableRow key={item.id}>
                                                            <TableCell>{item.id}</TableCell>
                                                            <TableCell>{new Date(`${item.consultancyReceiveDate} UTC`).toLocaleDateString()}</TableCell>
                                                            <TableCell>{(item.consultancyReceiveTime/60).toFixed(2) + ' Hours'}</TableCell>
                                                            {/* <TableCell>
                                                                { <Controls.ActionButton
                                                                    color="primary"
                                                                    onClick={() => { openInPopup(item) }}>
                                                                    <EditOutlinedIcon fontSize="small" />
                                                                </Controls.ActionButton>
                                                                }
                                                                {<Controls.ActionButton
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
                                                            </TableCell> */}
                                                        </TableRow>)
                                                        )
                                                    }
                                                </TableBody>
                                            </TblContainer>
                                            <TblPagination />
                                        </Paper>
                                        <Popup
                                            title="Consultancy Receive History Form"
                                            openPopup={openPopup}
                                            setOpenPopup={setOpenPopup}
                                        >
                                            <ConsultancyReceiveHistoryForm
                                                recordForEdit={recordForEdit}
                                                addOrEdit={addOrEdit}
                                                // loadingSave={loadingSave}
                                                loadingSave={false}
                                                ctaFunctionId = {ctaFunctionId}
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
