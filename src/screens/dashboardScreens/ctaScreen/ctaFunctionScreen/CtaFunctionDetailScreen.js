import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles, Paper } from '@material-ui/core';
// import Controls from "../../../../components/controls/Controls";
import Typography from '@material-ui/core/Typography';
// import useTable from "../../../components/UseTable/useTable";
// import { searchTitleByIdFromArray, searchNameByIdFromArray } from '../../../../helpers/search';
import { searchNameByIdFromArray } from '../../../../helpers/search';
import Loading from '../../../../components/Loading/Loading';

import { detailsCtaFunction } from '../../../../redux/actions/ctaFunctionActions';

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
        fontSize: '1.5rem',
        "& b": {
            color: '#536DFE'
        },
        padding:10,
    },


}))

// const headCells = [
//     { id: 'id', label: 'Id' },
//     { id: 'name', label: 'Name' },
// ]
export default function CtaFunctionDetailScreen(props) {
    const { recordForDetails,
        //  setOpenPopup 
        ctaFunctionModels,
        } = props
    const classes = useStyles();

    

    //eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
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

    const dispatch = useDispatch();

    useEffect(() => {

        try{
            dispatch(detailsCtaFunction(recordForDetails.id));
        }catch(err){
            console.log(err)
        }
        return () => {
            // 
        }

        // eslint-disable-next-line
    }, [dispatch, recordForDetails.id])

// console.log(ctaFunctionModels?.techStacks)
// console.log(ctaFunction)
    return (
        <>
        {
            loading ? <Loading /> :
            <Grid container>
                <Grid item xs={12}>
                <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
                                <h1>Details</h1>

                                <Grid container>
                                    <Grid item md={6}>
                                        <Typography paragraph className={classes.customPharagraph}><b>First Name:</b> {ctaFunction?.firstName} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Phone:</b> {ctaFunction?.phone} </Typography> 
                                        <Typography paragraph className={classes.customPharagraph}><b>Company Name:</b> {ctaFunction?.companyName} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Service Specificity:</b> {searchNameByIdFromArray(ctaFunctionModels?.serviceSpecificities,ctaFunction?.serviceSpecificity)} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}>
                                            <b>Technology Preference:</b> 
                                                {/* {ctaFunction?.technologyPreference} */}
                                                {
                                                     ctaFunction?.technologyPreference && (ctaFunction?.technologyPreference).split(',').map((itemId, index)=>{
                                                         if((ctaFunction?.technologyPreference).split(',').length === index+1){
                                                            return <span> {searchNameByIdFromArray(ctaFunctionModels?.techStacks, itemId)}</span>
                                                         }else{
                                                            return <span> {searchNameByIdFromArray(ctaFunctionModels?.techStacks, itemId)}, </span>
                                                         }

                                                    })
                                                }
                                        
                                        </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve Service:</b> {ctaFunction?.goalsToAchieveService} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve Technology:</b> {ctaFunction?.goalsToAchieveTechnology} </Typography>
                            
                                        
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography paragraph className={classes.customPharagraph}><b>Last Name:</b> {ctaFunction?.lastName} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Email:</b> {ctaFunction?.email} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Solution Specificity:</b> {searchNameByIdFromArray(ctaFunctionModels?.solutionSpecificities, ctaFunction?.solutionSpecificity)} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve Solution:</b> {ctaFunction?.goalsToAchieveSolution} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Tell Us More:</b> {ctaFunction?.tellUsMore} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Description:</b> {ctaFunction?.description} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Estimation:</b> {ctaFunction?.estimation} </Typography>
                                    </Grid>
                                </Grid>
                                <h1>Payment History</h1>
                                {
                                   ctaFunction?.ctaPurchaseHistories.length > 0 ?  ctaFunction?.ctaPurchaseHistories?.map(item=>
                                            <div key={item.id}>
                                                <Grid container>
                                                    <Grid item md={6}>
                                                        <Typography paragraph className={classes.customPharagraph}><b>Payment Status:</b> {item?.paymentStatus} </Typography>
                                                        <Typography paragraph className={classes.customPharagraph}><b>Transection Id:</b> {item?.transectionId} </Typography>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <Typography paragraph className={classes.customPharagraph}><b>Amount:</b> $ {item?.amount} </Typography>
                                                        
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )
                                        : 
                                        <Typography paragraph className={classes.customPharagraph}> Payment history not found </Typography>
                                    }
                                    
                                {/* </Grid> */}
                </Paper>
               
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
