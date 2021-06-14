import React, { useState, useEffect } from 'react'
import CoursePurchaseDetailScreen from "./CoursePurchaseDetailScreen";
import { Grid, Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTableServerSide from "../../../components/UseTable/useTableServerSide";
import Controls from "../../../components/controls/Controls";
import Notification from "../../../components/Notification/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import DetailsIcon from '@material-ui/icons/Details';
import Loading from '../../../components/Loading/Loading';
import { searchNameByIdFromArray, getFilterDataByUser } from '../../../helpers/search';


// permissions
import { usePermission } from '../../../components/UsePermission/usePermission';
import { accessDeniedRoute } from '../../../routes/routeConstants';
import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { listCoursePurchases } from '../../../redux/actions/coursePurchaseActions';
import { listSoftwares } from '../../../redux/actions/softwareActions';
import { listTrainingTypes } from '../../../redux/actions/trainingTypeActions';
import { saveCourseAvailabilityDate } from '../../../redux/actions/courseAvailabilityDateActions';


const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'trainingTypeId', label: 'Training Type' },
    { id: 'softwareId', label: 'Software' },
    { id: 'paymentStatus', label: 'Payment Status' },
    { id: 'attendenceCount', label: 'Attendence Count' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function CoursePurchaseScreen() {
        // permission get
        const {
            permission,
            setPermission,
            recievedPermission,
            loadingRoleResource,
            history,
            initialPermission,
           
        } = usePermission();
        //eslint-disable-next-line
        const { createOperation, readOperation, updateOperation, deleteOperation } = permission;

    const trainingTypeList = useSelector(state => state.trainingTypeList);
    //eslint-disable-next-line
    const { trainingTypes, loading:loadingTrainingTypes, error:errorTrainingTypes } = trainingTypeList;

    const softwareList = useSelector(state => state.softwareList);
    //eslint-disable-next-line
    const { softwares, loading: loadingSoftwares, error:errorSoftwares } = softwareList;

    const userSignIn = useSelector( state => state.userSignin );
    //eslint-disable-next-line
    const {  userInfo  } = userSignIn;

    const coursePurchaseList = useSelector(state => state.coursePurchaseList);
    //eslint-disable-next-line
    const { coursePurchases, loading, error } = coursePurchaseList;

    const coursePurchasesFilterByUser = getFilterDataByUser(coursePurchases?.item1, userInfo);

    const courseAvailabilityDateSave = useSelector(state => state.courseAvailabilityDateSave);
    //eslint-disable-next-line
    const { loading: loadingCourseAvailabilityDateSave, success: successCourseAvailabilityDateSave, error: errorCourseAvailabilityDateSave } = courseAvailabilityDateSave;

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [searchValue, setSearchValue] = useState("")

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
        recordsAfterPagingAndSorting,
        pageDataConfig,
        setPageDataConfig
    } = useTableServerSide(coursePurchasesFilterByUser, headCells, filterFn, coursePurchases?.item2);
    
    const dispatch = useDispatch();
    // search from table
    const handleSearch = e => {
        e.persist();
        const recievedSearchValue = e.target.value;
        setSearchValue(recievedSearchValue);
        // --------------------
        // server side search
        // --------------------
            setPageDataConfig(prevState =>{
                return { ...prevState,keyword:recievedSearchValue}
            })
        // --------------------
        // client side search
        // --------------------
            // setFilterFn({
            //     fn: items => {
            //         if (recievedSearchValue) {
            //             return items.filter(x => {
            //                 const makeStringInRow = (
            //                     (x?.roleId && x?.roleId) +
            //                     (x?.resourceId && (' ' + x?.resourceId)) +
            //                     (x?.createOperation ? ' yes' : 'no') +
            //                     (x?.updateOperation ? ' yes' : 'no') +
            //                     (x?.deleteOperation ? ' yes' : 'no')
            //                 )?.toString()?.toLowerCase();
            //                 return makeStringInRow.indexOf(recievedSearchValue.toString().toLowerCase()) > -1;
            //             });
            //         }
            //         else {
            //             return items;
            //         }
            //     }
            // });

        // --------------------
        // client side search end
        // --------------------
    }

    const openInPopup = item => {
        setRecordForEdit(null);
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const addOrEdit = async (item, resetForm) => {
        console.log(item)
        resetForm();
        // setRecordForEdit(null)
        setOpenPopup(false)
        dispatch(saveCourseAvailabilityDate(item))
            .then((res) => {
                if(res.status===true){
                    setNotify({
                                isOpen: true,
                                message: 'Submitted Successfully',
                                type: 'success'
                            })
                }else{
                        setNotify({
                            isOpen: true,
                            message: 'Submition Failed',
                            type: 'warning'
                        })
                    }
            })

    }

    useEffect(() => {
        // dispatch(listSoftwares());
        // dispatch(listTrainingTypes());
        // dispatch(listCoursePurchases(pageDataConfig));
        // return () => {
        //     // 
        // }

        try {
            if (recievedPermission) {
                setPermission({ ...recievedPermission })
            }
            if (recievedPermission?.readOperation) {
                dispatch(listSoftwares());
                dispatch(listTrainingTypes());
                dispatch(listCoursePurchases(pageDataConfig));
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
    }, [
        dispatch, 
        loadingRoleResource,
        loadingCourseAvailabilityDateSave,
        setPermission, 
        recievedPermission, 
        readOperation, 
        history, 
        initialPermission, 
        pageDataConfig
    ])
    return (

        <>
            {
                // loading || loadingCourseAvailabilityDateSave ? <Loading /> :
                    <>
                        <PageTitle title="Course Purchase" />

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                {
                                    openPopup ? 
                                <Widget
                                    title="Course Purchase Detail"
                                    upperTitle
                                    // noBodyPadding
                                    disableWidgetMenu
                                    closePopup = {()=>{setOpenPopup(false); setRecordForEdit(null);}}
                                    closePopUpButtonText = 'Go back to list'
                                >
                                    <CoursePurchaseDetailScreen
                                            recordForEdit={recordForEdit}
                                            setRecordForEdit = {setRecordForEdit}
                                            setOpenPopup={setOpenPopup}
                                            softwares = {softwares}
                                            trainingTypes = {trainingTypes}
                                            addOrEdit = {addOrEdit}
                                            loadingCourseAvailabilityDateSave= {loadingCourseAvailabilityDateSave}

                                        />
                                </Widget> : 
                                
                                <Widget
                                    title="Course Purchase List Table"
                                    upperTitle
                                    noBodyPadding
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    threeDotDisplay={true}
                                    disableWidgetMenu
                                    handleSearch={handleSearch}
                                    searchLabel='Search here..'
                                    searchValue={searchValue}
                                >
                                    
                                    <Paper style={{ overflow: "auto", backgroundColor: "transparent" }}>
                                        <TblContainer>
                                            <TblHead />
                                            <TableBody>
                                                {
                                                loading || loadingCourseAvailabilityDateSave ? 
                                                    <TableRow key={0}>
                                                        <TableCell style={{ borderBottom: 'none' }}>
                                                            <Loading />
                                                        </TableCell>

                                                    </TableRow>
                                                    :
                                                    recordsAfterPagingAndSorting().map(item =>
                                                        (<TableRow key={item.id}>
                                                            <TableCell>{item.id}</TableCell>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell>{item.email}</TableCell>
                                                            <TableCell>{softwares ? searchNameByIdFromArray(softwares, item.softwareId) : item.softwareId}</TableCell>
                                                            <TableCell>{trainingTypes ? searchNameByIdFromArray(trainingTypes, item.trainingTypeId) : item.trainingTypeId}</TableCell>
                                                            <TableCell>{item?.paymentStatus>0 ? 'Paid' : 'Unpaid'}</TableCell>
                                                            <TableCell>{item.attendenceCount}</TableCell>
                                                            <TableCell>
                                                                <Controls.ActionButton
                                                                    color="primary"
                                                                    onClick={() => { openInPopup(item) }}>
                                                                    <DetailsIcon fontSize="small" />
                                                                </Controls.ActionButton>
                                                            </TableCell>
                                                        </TableRow>)
                                                    )
                                                }
                                            </TableBody>
                                        </TblContainer>
                                        <TblPagination />
                                    </Paper>
                                    
                                    <Notification
                                        notify={notify}
                                        setNotify={setNotify}
                                    />
                                    <ConfirmDialog
                                        confirmDialog={confirmDialog}
                                        setConfirmDialog={setConfirmDialog}
                                    />
                                </Widget>

                                }
                                
                            </Grid>
                        </Grid>
                    </>
            }
        </>
    )
}
