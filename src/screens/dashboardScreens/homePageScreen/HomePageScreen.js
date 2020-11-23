import React, { useState, useEffect } from 'react'
import HomePageForm from "./HomePageForm";
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
import { listHomePageDatas, saveHomePageData, deleteHomePageData } from '../../../redux/actions/homePageActions';


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
    { id: 'heroText', label: 'Hero Text' },
    { id: 'heroSectionDescription', label: 'heroSectionDescription' },
    { id: 'videoUrl', label: 'videoUrl' },
    { id: 'heroSectionBackgroundImage', label: 'heroSectionBackgroundImage' },
    { id: 'shortIntroTitle', label: 'shortIntroTitle' },
    { id: 'shortIntroSubTitle', label: 'shortIntroSubTitle' },
    { id: 'functionAreaWalkthroughTitle', label: 'functionAreaWalkthroughTitle' },
    { id: 'functionAreaWalkthroughSubTitle', label: 'functionAreaWalkthroughSubTitle' },
    { id: 'consultingTitle', label: 'consultingTitle' },
    { id: 'consultingSubTitle', label: 'ConsultingSubTitle' },
    { id: 'coreValueTitle', label: 'CoreValue Title' },
    { id: 'coreValueSubtitle', label: 'CoreValue Subtitle' },
    { id: 'trainingTitle', label: 'TrainingTitle' },
    { id: 'trainingSubtitile', label: 'Training Subtitile' },
    { id: 'testimonialTitle', label: 'Testimonial Title' },
    { id: 'testimonialSubTitle', label: 'Testimonial Sub Title' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function HomePageScreen() {

    const homePageDataList = useSelector(state => state.homePageDataList);
    //eslint-disable-next-line
    const { homePageDatas, loading, error } = homePageDataList;
    const homePageDataSave = useSelector(state => state.homePageDataSave);
    //eslint-disable-next-line
    const { loading: loadingSave, success: successSave, error: errorSave } = homePageDataSave;
    const homePageDataDelete = useSelector(state => state.homePageDataDelete);
    //eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = homePageDataDelete;


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
    } = useTable(homePageDatas, headCells, filterFn);

    const addOrEdit = async (homePageData, resetForm) => {
        dispatch(saveHomePageData(homePageData));
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
        dispatch(deleteHomePageData(id));
        // dispatch(listHomePageDatas());

        // setNotify({
        //     isOpen: true,
        //     message: 'Deleted Successfully',
        //     type: 'error'
        // })
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
        dispatch(listHomePageDatas());

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
                                                    <TableCell>{item.heroText}</TableCell>
                                                    <TableCell>{item.heroSectionDescription}</TableCell>
                                                    <TableCell>{item.videoUrl}</TableCell>
                                                    <TableCell>{item.heroSectionBackgroundImage}</TableCell>
                                                    <TableCell>{item.shortIntroTitle}</TableCell>
                                                    <TableCell>{item.shortIntroSubTitle}</TableCell>
                                                    <TableCell>{item.functionAreaWalkthroughTitle}</TableCell>
                                                    <TableCell>{item.functionAreaWalkthroughSubTitle}</TableCell>
                                                    <TableCell>{item.consultingTitle}</TableCell>
                                                    <TableCell>{item.consultingSubTitle}</TableCell>
                                                    <TableCell>{item.coreValueTitle}</TableCell>
                                                    <TableCell>{item.coreValueSubtitle}</TableCell>
                                                    <TableCell>{item.trainingTitle}</TableCell>
                                                    <TableCell>{item.trainingSubtitile}</TableCell>
                                                    <TableCell>{item.testimonialTitle}</TableCell>
                                                    <TableCell>{item.testimonialSubTitle}</TableCell>
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
                                title="Home Page Data Form"
                                openPopup={openPopup}
                                setOpenPopup={setOpenPopup}
                            >
                                <HomePageForm
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
