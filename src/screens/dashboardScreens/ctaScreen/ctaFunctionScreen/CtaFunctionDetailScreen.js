import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles, Paper } from '@material-ui/core';
// import Controls from "../../../../components/controls/Controls";
import Typography from '@material-ui/core/Typography';
// import useTable from "../../../components/UseTable/useTable";
// import { searchTitleByIdFromArray, searchNameByIdFromArray } from '../../../../helpers/search';
import { searchNameByIdFromArray } from '../../../../helpers/search';
import { timeConverter } from '../../../../helpers/converter';
import Loading from '../../../../components/Loading/Loading';

import ConsultancyReceiveHistoryScreen from '../consultancyReceiveHistoryScreen/ConsultancyReceiveHistoryScreen';

import { detailsCtaFunction } from '../../../../redux/actions/ctaFunctionActions';
import { listCtaFunctionModels } from '../../../../redux/actions/ctaFunctionActions';

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
export default function CtaFunctionDetailScreen(props) {
    const { recordForDetails,
        //  setOpenPopup 
        // ctaFunctionModels,
        createOperation,
        updateOperation,
        deleteOperation
        } = props
    const classes = useStyles();

    const ctaFunctionModelList = useSelector(state => state.ctaFunctionModelList);
    //eslint-disable-next-line
    const { ctaFunctionModels } = ctaFunctionModelList;

    //eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
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
    const { loading: loadingSaveConsultancyReceiveHistory } = consultancyReceiveHistorySave;
    const consultancyReceiveHistoryDelete = useSelector(state => state.consultancyReceiveHistoryDelete);
    //eslint-disable-next-line
    const { loading: loadingDeleteConsultancyReceiveHistory } = consultancyReceiveHistoryDelete;

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
    }, [dispatch, recordForDetails.id, loadingSaveConsultancyReceiveHistory, loadingDeleteConsultancyReceiveHistory])

// console.log(ctaFunctionModels?.techStacks)
// console.log(ctaFunction)
    return (
        <>
        {
            loading ? <Loading /> :
            <Grid container>
                <Grid item xs={12}>
                <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
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
                                        <Typography paragraph className={classes.customPharagraph}><b>Estimation: </b> {ctaFunction?.estimation} </Typography>
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
                                        <Typography paragraph className={classes.customPharagraph}><b>Status: </b> {ctaFunction?.isCompleted ? "Completed" : 'Ongoing'} </Typography>
                                        {
                                            ctaFunction?.hourRemaining && <Typography paragraph className={classes.customPharagraph}><b>Remaining Hours: </b> { timeConverter(ctaFunction?.hourRemaining)} </Typography>
                                        }
                                        {
                                            ctaFunction?.hourUsed &&  <Typography paragraph className={classes.customPharagraph}><b>Used Hours: </b> { timeConverter(ctaFunction?.hourUsed)} </Typography>
                                        }
                                        
                                    </Grid>
                                </Grid>
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
                />
               
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
