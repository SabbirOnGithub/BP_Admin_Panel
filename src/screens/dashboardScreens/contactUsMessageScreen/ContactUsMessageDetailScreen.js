import React, { useState } from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import useTable from "../../../components/UseTable/useTable";


const useStyles = makeStyles(theme => ({
    customPharagraph: {
        ...theme?.customPharagraph
    },


}))

// const headCells = [
//     { id: 'id', label: 'Id' },
//     { id: 'name', label: 'Name' },
// ]
export default function ContactUsMessageDetailScreen(props) {
    const { recordForEdit } = props
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
                            <Typography paragraph className={classes.customPharagraph}><b>Full Name:</b> {recordForEdit.fullName} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Company Name:</b> {recordForEdit.companyName} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Email:</b> {recordForEdit.email} </Typography>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <Typography paragraph className={classes.customPharagraph}><b>Phone Number:</b> {recordForEdit.phoneNumber} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Is Reviewed:</b> {recordForEdit.isReviewed} </Typography>
                            <Typography paragraph className={classes.customPharagraph}><b>Status:</b> {recordForEdit.status} </Typography>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <Typography paragraph className={classes.customPharagraph}><b>Message:</b> {recordForEdit.message} </Typography>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}
