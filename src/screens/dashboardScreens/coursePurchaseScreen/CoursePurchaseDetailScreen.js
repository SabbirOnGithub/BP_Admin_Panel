import React,  { useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
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
        fontSize: '1.5rem',
        "& b": {
            color: '#536DFE'
        }
    },


}))

// const headCells = [
//     { id: 'id', label: 'Id' },
//     { id: 'name', label: 'Name' },
// ]
export default function CoursePurchaseDetailScreen(props) {
    const { recordForEdit, setOpenPopup } = props
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
                <CardContent className={classes.detailsContent}>
                    <Typography paragraph className={classes.customPharagraph}><b>Name:</b> {recordForEdit.name} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Email:</b> {recordForEdit.email} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Training Type :</b> {recordForEdit.trainingTypeId} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Software:</b> {recordForEdit.softwareId} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Payment Status:</b> {recordForEdit.paymentStatus} </Typography>
                    <Typography paragraph className={classes.customPharagraph}><b>Attendence Count:</b> {recordForEdit.attendenceCount} </Typography>
                    {/* <Typography paragraph className={classes.customPharagraph}><b>Status:</b> {recordForEdit.status} </Typography> */}
                </CardContent>
                <CardContent >
                    <Typography paragraph className={classes.customPharagraph}><b>Message:</b> {recordForEdit.message} </Typography>
                </CardContent>

                    <div>
                        <>
                            <Controls.Button
                                text="Back"
                                color="default"
                                onClick={()=>{setOpenPopup(false)}}
                            />
                        </>
                    </div>
                </Grid>
            </Grid>
    )
}
