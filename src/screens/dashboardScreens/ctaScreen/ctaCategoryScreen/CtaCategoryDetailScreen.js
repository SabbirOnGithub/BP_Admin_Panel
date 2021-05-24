import React,  { useState } from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core';
// import Controls from "../../../../components/controls/Controls";
import Typography from '@material-ui/core/Typography';
// import useTable from "../../../components/UseTable/useTable";


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


}))

// const headCells = [
//     { id: 'id', label: 'Id' },
//     { id: 'name', label: 'Name' },
// ]
export default function CtaCategoryDetailScreen(props) {
    const { recordForEdit, 
        // setOpenPopup 
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
    // } = useTable(recordForEdit.ctaDocuments, headCells, filterFn);


    return (
            <Grid container>
                <Grid item xs={12}>
                <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
                    <Grid container>
                        <Grid item md={6} sm={12}>
                            <Typography paragraph className={classes.customPharagraph}><b>First Name:</b> {recordForEdit.firstName} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Last Name:</b> {recordForEdit.lastName} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Company Name:</b> {recordForEdit.companyName} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Email:</b> {recordForEdit.email} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Phone:</b> {recordForEdit.phone} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>BusinessIndustry:</b> {recordForEdit.businessIndustry} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>BusinessStage:</b> {recordForEdit.businessStage} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Category:</b> {recordForEdit.category} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Specificity:</b> {recordForEdit.specificity} </Typography>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <Typography paragraph className={classes.customPharagraph}><b>Technologies:</b> {recordForEdit.technologies} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Technology Serivce Type:</b> {recordForEdit.technologySerivceType} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Goals To Achieve:</b> {recordForEdit.goalsToAchieve} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Tell Us More:</b> {recordForEdit.tellUsMore} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Estimation:</b> {recordForEdit.estimation} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Description:</b> {recordForEdit.description} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Payment Status:</b> {recordForEdit.paymentStatus} </Typography>
                            {/* <Typography paragraph className={classes.customPharagraph}><b>Transection Id:</b> {recordForEdit.transectionId} </Typography> */}
                            <Typography paragraph className={classes.customPharagraph}><b>Transection Id:</b> {recordForEdit.transectionId} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Amount:</b> {recordForEdit.amount} </Typography>
                            {/* <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography> */}
                        </Grid>

                    </Grid>
                </Paper>
                </Grid>
            </Grid>
    )
}
