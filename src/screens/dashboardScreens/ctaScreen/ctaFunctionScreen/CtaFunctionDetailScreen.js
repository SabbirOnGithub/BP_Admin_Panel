import React,  { useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core';
// import Controls from "../../../../components/controls/Controls";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
// import useTable from "../../../components/UseTable/useTable";
// import { searchTitleByIdFromArray, searchNameByIdFromArray } from '../../../../helpers/search';
// import { searchTitleByIdFromArray, searchNameByIdFromArray } from '../../../../helpers/search';


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

console.log(ctaFunctionModels?.techStacks)
    return (
            <Grid container>
                <Grid item xs={12}>
                <CardContent className={classes.detailsContent}>
                    <Typography paragraph className={classes.customPharagraph}><b>First Name:</b> {recordForDetails?.firstName} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Last Name:</b> {recordForDetails?.lastName} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Company Name:</b> {recordForDetails?.companyName} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Email:</b> {recordForDetails?.email} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Phone:</b> {recordForDetails?.phone} </Typography>
                    {/* <Typography paragraph className={classes.customPharagraph}><b>BusinessIndustry:</b> {recordForDetails.businessIndustry} </Typography> */}
                    {/* <Typography paragraph className={classes.customPharagraph}><b>BusinessStage:</b> {recordForDetails.businessStage} </Typography> */}
                    {/* <Typography paragraph className={classes.customPharagraph}><b>Category:</b> {recordForDetails.category} </Typography> */}
                    <Typography paragraph className={classes.customPharagraph}><b>Service Specificity:</b> {recordForDetails?.serviceSpecificity} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Solution Specificity:</b> {recordForDetails?.solutionSpecificity} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Technology Preference:</b> {recordForDetails?.technologyPreference} </Typography>
                    {/* <Typography paragraph className={classes.customPharagraph}>
                        <b>Technology Preference:</b> 
                    {
                    
                                recordForDetails?.technologyPreference && (recordForDetails?.technologyPreference).split(',').map(item=>{
                                    return <span>{searchNameByIdFromArray(ctaFunctionModels?.techStacks, item)}</span>
                                })

                    } 
                    </Typography> */}
                    {/* <Typography paragraph className={classes.customPharagraph}><b>Technology Serivce Type:</b> {recordForDetails.technologySerivceType} </Typography> */}
                    <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve Service:</b> {recordForDetails?.goalsToAchieveService} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve Solution:</b> {recordForDetails?.goalsToAchieveSolution} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve Technology:</b> {recordForDetails?.goalsToAchieveTechnology} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Tell Us More:</b> {recordForDetails?.tellUsMore} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Estimation:</b> {recordForDetails?.estimation} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Description:</b> {recordForDetails?.description} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Payment Status:</b> {recordForDetails?.paymentStatus} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Transection Id:</b> {recordForDetails?.transectionId} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Amount:</b> {recordForDetails?.amount} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Sub-Menu Id:</b> {recordForDetails?.subMenuId} </Typography>
                    {/* <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography> */}
                </CardContent>
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
    )
}
