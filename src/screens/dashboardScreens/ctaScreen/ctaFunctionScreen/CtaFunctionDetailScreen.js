import React, { useState, useEffect } from 'react'
import CtaFunctionStatusUpdateForm from "./CtaFunctionStatusUpdateForm";
import ConsultancyAssignmentForm from "./ConsultancyAssignmentForm";
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles, Paper, Chip } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import Popup from "../../../../components/Popup/Popup";
import Typography from '@material-ui/core/Typography';
// import useTable from "../../../components/UseTable/useTable";
import { searchTitleByIdFromArray } from '../../../../helpers/search';
import { searchNameByIdFromArray } from '../../../../helpers/search';
import { timeConverter } from '../../../../helpers/converter';
import Loading from '../../../../components/Loading/Loading';
import ConsultancyReceiveHistoryScreen from '../consultancyReceiveHistoryScreen/ConsultancyReceiveHistoryScreen';
import { detailsCtaFunction } from '../../../../redux/actions/ctaFunctionActions';
import { listCtaFunctionModels } from '../../../../redux/actions/ctaFunctionActions';
import { ctaFunctionStatus } from '../../../../helpers/staticData';

import DocumentsLink from '../../../../components/DocumentsLink/DocumentsLink';

const useStyles = makeStyles(theme => ({
    detailsContent:{
        display:'flex',
        justifyContent:'space-between',
        flexWrap: 'wrap',
        '& p':{
            flex: '0 0 50%',
            textAlign:'justify'
        }
    },
    customPharagraph: {
        ...theme?.customPharagraph
    },
    subHeadlineText :{
        ...theme?.subHeadlineText
    }


}))

// const headCells = [
//     { id: 'id', label: 'Id' },
//     { id: 'name', label: 'Name' },
// ]
// hard coded to both frontend and backend
// const ctaFunctionStatus = [
//     {
//         title: 'Requested',
//         value:1,
//         id:1,
//     },
//     {
//         title: 'Inprogress',
//         value:2,
//         id:2,

//     },
//     {
//         title: 'Done',
//         value:3,
//         id:3,
//     },
// ]

export default function CtaFunctionDetailScreen(props) {
    const { recordForDetails,
        //  setOpenPopup 
        // ctaFunctionModels,
        createOperation,
        updateOperation,
        deleteOperation,
        addOrEdit,
        successCtaFunctionSave,
        loadingCtaFunctionSave,
        addOrEditConsultancyAssign
        } = props
    const classes = useStyles();

    const ctaFunctionModelList = useSelector(state => state.ctaFunctionModelList);
    //eslint-disable-next-line
    const { ctaFunctionModels } = ctaFunctionModelList;

    const [recordForEdit, setRecordForEdit] = useState(null)
    //eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [openPopupForAssign, setOpenPopupForAssign] = useState(false)
    const [fetched, setFetched] = useState(false);
    //eslint-disable-next-line
    // const {
    //     TblContainer,
    //     TblHead,
    //     TblPagination,
    //     recordsAfterPagingAndSorting
    // } = useTable(recordForDetails.ctaDocuments, headCells, filterFn);

    const ctaFunctionDetails = useSelector(state => state.ctaFunctionDetails);
    //eslint-disable-next-line
    const { ctaFunction, loading, error } = ctaFunctionDetails;

    const consultancyReceiveHistorySave = useSelector(state => state.consultancyReceiveHistorySave);
    //eslint-disable-next-line
    const { loading: loadingSaveConsultancyReceiveHistory, success: successSaveConsultancyReceiveHistory, error: errorSaveConsultancyReceiveHistory } = consultancyReceiveHistorySave;
    const consultancyReceiveHistoryDelete = useSelector(state => state.consultancyReceiveHistoryDelete);
    //eslint-disable-next-line
    const { loading: loadingDeleteConsultancyReceiveHistory,success: successDeleteConsultancyReceiveHistory, error: errorDeleteConsultancyReceiveHistory } = consultancyReceiveHistoryDelete;
    
    const consultancyAssignmentSave = useSelector(state => state.consultancyAssignmentSave);
    //eslint-disable-next-line
    const { loading: loadingConsultancyAssignmentSave, success: successConsultancyAssignmentSave, error: errorConsultancyAssignmentSave } = consultancyAssignmentSave;

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const openInPopupForAssign = item => {
        setRecordForEdit(item)
        setOpenPopupForAssign(true)
    }
    
    const dispatch = useDispatch();

    useEffect(() => {
        const ac = new AbortController();

        try{
            Promise.all([
                dispatch(listCtaFunctionModels()),
                dispatch(detailsCtaFunction(recordForDetails.id))
              ]).then(() => setFetched(true))
                .catch(ex => console.error(ex));
              return () => ac.abort(); // Abort both fetches on unmount
        }catch(err){
            console.log(err)
        }
        return () => {
            return fetched;
        }

        // eslint-disable-next-line
    }, [
        dispatch, 
        recordForDetails.id, 
        successSaveConsultancyReceiveHistory, 
        successDeleteConsultancyReceiveHistory, 
        successCtaFunctionSave,
        successConsultancyAssignmentSave
    ])

// console.log(ctaFunctionModels?.techStacks)
// console.log(ctaFunction)
    return (
        <>
        {
            loading || loadingCtaFunctionSave ? <Loading /> :
            <Grid container>
                <Grid item xs={12}>
                <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
                                    {
                                    <Grid container >
                                        <Grid item md={6} style={{display:"flex", justifyContent:"center"}}>
                                            {/* { ctaFunction?.status &&
                                                <Chip 
                                                    label= {searchTitleByIdFromArray(ctaFunctionStatus, ctaFunction?.status)}
                                                    color="secondary"
                                                    style={{fontSize:"1.6rem"}}
                                                />
                                            } */}
                                        </Grid>
                                        <Grid item md={6} style={{display:"flex", justifyContent:"center"}}>
                                                <Controls.Button
                                                    color="secondary"
                                                    onClick={() => { openInPopup(ctaFunction) }}
                                                    text={"Update Status"}
                                                    variant="contained"
                                                    size="large"
                                                >
                                                </Controls.Button>
                                                <Controls.Button
                                                    color="primary"
                                                    onClick={() => { openInPopupForAssign(ctaFunction) }}
                                                    text={"Assign to"}
                                                    variant="contained"
                                                    size="large"
                                                >
                                                </Controls.Button>
                                        </Grid>
                                    </Grid>
                                    }
                                <h1 className={classes.subHeadlineText}>Details</h1>

                                <Grid container>
                                    <Grid item md={6}>
                                        <Typography paragraph className={classes.customPharagraph}><b>First Name: </b> {ctaFunction?.firstName} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Phone: </b> {ctaFunction?.phone} </Typography> 
                                        <Typography paragraph className={classes.customPharagraph}><b>Company Name: </b> {ctaFunction?.companyName} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Service Specificity: </b> {searchNameByIdFromArray(ctaFunctionModels?.serviceSpecificities,ctaFunction?.serviceSpecificity)} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}>
                                            <b>Technology Preference:</b> 
                                                {/* {ctaFunction?.technologyPreference} */}
                                                {
                                                     ctaFunction?.technologyPreference && (ctaFunction?.technologyPreference).split(',').map((itemId, index)=>{
                                                         if((ctaFunction?.technologyPreference).split(',')?.length === index+1){
                                                            return <span key = {itemId}> {searchNameByIdFromArray(ctaFunctionModels?.techStacks, itemId)}</span>
                                                         }else{
                                                            return <span  key = {itemId}> {searchNameByIdFromArray(ctaFunctionModels?.techStacks, itemId)}, </span>
                                                         }

                                                    })
                                                }
                                        
                                        </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve Service: </b> {ctaFunction?.goalsToAchieveService} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve Technology: </b> {ctaFunction?.goalsToAchieveTechnology} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Estimation: </b> {ctaFunction?.estimation && new Date(`${ctaFunction?.estimation} UTC`).toLocaleDateString()} </Typography>
                                        {
                                            ctaFunction?.totalHour  && <Typography paragraph className={classes.customPharagraph}><b>Total Hours: </b> {timeConverter(ctaFunction?.totalHour)} </Typography>
                                        }
                                        
                                        
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography paragraph className={classes.customPharagraph}><b>Last Name: </b> {ctaFunction?.lastName} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Email: </b> {ctaFunction?.email} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Solution Specificity: </b> {searchNameByIdFromArray(ctaFunctionModels?.solutionSpecificities, ctaFunction?.solutionSpecificity)} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve Solution: </b> {ctaFunction?.goalsToAchieveSolution} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Tell Us More: </b> {ctaFunction?.tellUsMore} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Description:</b> {ctaFunction?.description} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Status: </b> 
                                        { ctaFunction?.status ?
                                                <Chip 
                                                    label= {searchTitleByIdFromArray(ctaFunctionStatus, ctaFunction?.status)}
                                                    color="secondary"
                                                    style={{fontSize:"1.6rem"}}
                                                />
                                                : 'No data found'
                                        } </Typography>

                                        {
                                            ctaFunction?.hourRemaining && <Typography paragraph className={classes.customPharagraph}><b>Remaining Hours: </b> { timeConverter(ctaFunction?.hourRemaining)} </Typography>
                                        }
                                        {
                                            ctaFunction?.hourUsed &&  <Typography paragraph className={classes.customPharagraph}><b>Used Hours: </b> { timeConverter(ctaFunction?.hourUsed)} </Typography>
                                        }
                                        
                                    </Grid>
                                </Grid>
                                <h1 className={classes.subHeadlineText}> Assigned To </h1>
                                
                                {
                                    ctaFunction?.consultancyAssignments?.length > 0 ?
                                    (
                                        <>
                                        
                                            {    ctaFunction?.consultancyAssignments?.map(item=>{
                                                    return <Typography paragraph className={classes.customPharagraph}><b>Email: </b> {item.userEmail} </Typography>
                                                })
                                            }
                                        </>
                                    ) : <Typography paragraph className={classes.customPharagraph}> No Assignment found </Typography>
                                    
                                }
                                <h1 className={classes.subHeadlineText}> Attached Documents </h1>
                                {ctaFunction?.ctaDocuments?.length > 0 ?
                                    <>
                                        <DocumentsLink docList={ctaFunction?.ctaDocuments} />
                                    </> : <Typography paragraph className={classes.customPharagraph}> No documents found </Typography>
                                }

                                


                                <h1 className={classes.subHeadlineText}>Payment History</h1>
                                {
                                   ctaFunction?.ctaPurchaseHistories?.length > 0 ?  ctaFunction?.ctaPurchaseHistories?.map(item=>
                                            <div key={item.id}>
                                                <Grid container>
                                                    <Grid item md={6}>
                                                        <Typography paragraph className={classes.customPharagraph}><b>Payment Status: </b> {item?.isPaid ? 'Paid' : 'Un-paid'} </Typography>
                                                        <Typography paragraph className={classes.customPharagraph}><b>Transection Id: </b> {item?.transectionId} </Typography>
                                                        {/* <Typography paragraph className={classes.customPharagraph}><b>ctaPackageHourlyId:</b> {item?.ctaPackageHourlyId} </Typography>
                                                        <Typography paragraph className={classes.customPharagraph}><b>ctaPackageDailyId:</b> {item?.ctaPackageDailyId} </Typography>
                                                        <Typography paragraph className={classes.customPharagraph}><b>ctaPackageMonthlyYearlyId:</b> {item?.ctaPackageMonthlyYearlyId} </Typography> */}
                                                       
                                                        <Typography paragraph className={classes.customPharagraph}><b>Consultation Type Name: </b> {item?.consultationTypeName} </Typography>
                                                        
                                                        {
                                                            item?.ctaPackageHourly && <Typography paragraph className={classes.customPharagraph}><b>Package Name:</b> {item?.ctaPackageHourly?.ctaHourName} </Typography>
                                                        }

                                                        {
                                                            item?.ctaPackageDaily && <Typography paragraph className={classes.customPharagraph}><b>Package Name:</b> Solution Discovery  </Typography>
                                                        }

                                                        {
                                                            item?.ctaPackageMonthlyYearly && <Typography paragraph className={classes.customPharagraph}><b>Package Name:</b> Access Retainer  </Typography>
                                                        }

{
                                                            item?.completionDate && <Typography paragraph className={classes.customPharagraph}><b>Completion Date: </b> {new Date(`${item?.completionDate} UTC`).toLocaleDateString()} </Typography>
                                                        }

                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <Typography paragraph className={classes.customPharagraph}><b>Amount: </b> ${item?.amount} </Typography>
                                                        <Typography paragraph className={classes.customPharagraph}><b>Payment Gateway: </b> {item?.paymentGateway} </Typography>
                                                        <Typography paragraph className={classes.customPharagraph}><b>Purchase Date: </b> 
                                                            {new Date(`${item?.purchaseDate} UTC`).toLocaleDateString()} 
                                                        </Typography>
                                                        <Typography paragraph className={classes.customPharagraph}><b>Subscription: </b> 
                                                            {item?.isYearlySubscription && 'Yearly'} 
                                                            {item?.isMonthlySubscription && 'Monthly'} 
                                                            { item?.ctaPackageDailyId && 'Daily'}
                                                            { item?.ctaPackageHourlyId && 'Hourly'}
                                                        </Typography>
                                                            
                                                       

                                                        
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )
                                        : 
                                        <Typography paragraph className={classes.customPharagraph}> Payment history not found </Typography>
                                    }
                                    
                                {/* </Grid> */}
                </Paper>

                <ConsultancyReceiveHistoryScreen 
                    consultancyReceiveHistorys = {ctaFunction?.consultancyReceiveHistories ? ctaFunction?.consultancyReceiveHistories : []}
                    loading = {false}
                    ctaFunctionId = {ctaFunction?.id}
                    // createOperation = {ctaFunction?.ctaPurchaseHistories?.length >0 ? true :false}
                    createOperation = {createOperation && !ctaFunction?.isCompleted}
                    updateOperation = {updateOperation}
                    deleteOperation = {deleteOperation}
                    hourRemaining = {ctaFunction?.hourRemaining}
                />

                <Popup
                    title="Update Cta Function Status"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <CtaFunctionStatusUpdateForm
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                        // loadingSave={loadingSave}
                        setRecordForEdit = {setRecordForEdit}
                        setOpenPopup={setOpenPopup}
                        ctaFunctionStatus ={ctaFunctionStatus}
                    />

                </Popup>

                <Popup
                    title="Assign consultancy"
                    openPopup={openPopupForAssign}
                    setOpenPopup={setOpenPopupForAssign}
                >
                    <ConsultancyAssignmentForm
                        recordForEdit={recordForEdit}
                        addOrEditConsultancyAssign={addOrEditConsultancyAssign}
                        // loadingSave={loadingSave}
                        setRecordForEdit = {setRecordForEdit}
                        setOpenPopupForAssign={setOpenPopupForAssign}
                        ctaFunctionStatus ={ctaFunctionStatus}
                    />

                </Popup>
                
               
                    {/* <div>
                        <>
                            <Controls.Button
                                text="Back"
                                color="default"
                                onClick={()=>{setOpenPopup(false)}}
                            />
                        </>
                    </div> */}
                </Grid>
            </Grid>
        }
        </>
    )
}
