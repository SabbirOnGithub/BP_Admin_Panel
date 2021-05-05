import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import { Grid, makeStyles, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import Typography from '@material-ui/core/Typography';
import useTable from "../../../components/UseTable/useTable";
import { searchNameByIdFromArray } from '../../../helpers/search';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import { useForm, Form } from '../../../components/UseForm/useForm';

import { detailsCoursePurchase } from '../../../redux/actions/coursePurchaseActions';

const useStyles = makeStyles(theme => ({
    detailsContent: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        '& p': {
            flex: '0 0 50%',
            textAlign: 'justify'
        }
    },
    customPharagraph: {
        fontSize: '1.5rem',
        "& b": {
            color: '#536DFE'
        }
    },
    margin: {
        margin: theme.spacing(1),
    },
    padding: {
        padding: theme.spacing(1),
    },
    // textField: {
    //     width: '25ch',
    // },
}))

const initialFValues = {
    id: '',
    coursePurchaseId:'',
    firstDate:null,
    secondDate:null,
    thirdDate:null,
    selectedDateFrom: null,
    selectedDateTo: null
}

const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'coursePurchaseId', label: 'Course Purchase Id' },
    { id: 'title', label: 'Title' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
]
export default function CoursePurchaseDetailScreen(props) {
    const { recordForEdit, 
            // setOpenPopup, 
            trainingTypes, 
            softwares,
            addOrEdit 
        } = props

    const classes = useStyles();

    const coursePurchaseDetails = useSelector(state => state.coursePurchaseDetails);
    //eslint-disable-next-line
    const { coursePurchase, loading: loadingCoursePurchaseDetail, error: errorCoursePurchaseDetail } = coursePurchaseDetails;

    //eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    //eslint-disable-next-line
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(coursePurchase?.courseAttendees, headCells, filterFn);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('selectedDateFrom' in fieldValues)
            temp.selectedDateFrom = fieldValues.selectedDateFrom ? "" : "This field is required."
        if ('selectedDateTo' in fieldValues)
            temp.selectedDateTo = fieldValues.selectedDateTo ? "" : "This field is required."
        setErrors({
            ...temp
        })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);


    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            // if(values?.firstDate || values.secondDate){
            //     var mydate = new Date('2014-04-03');
            //     const formatSecondDate = new Date(values.secondDate);
            //     const formatThirdDate = new Date(values.thirdDate);
            //     values.firstDate = formatFirstDate
            //     values.secondDate = formatSecondDate
            //     values.thirdDate = formatThirdDate
            // }
            // values.firstDate && (values.firstDate = new Date(values.firstDate))
            console.log(values?.firstDate)
            
            let firstDate =values.firstDate.split('-')
            let secondDate =values.secondDate.split('-')
            let thirdDate =values.thirdDate.split('-')

            values.firstDate = new Date(firstDate[2], firstDate[1], firstDate[0]).toISOString();
            values.secondDate = new Date(secondDate[2], secondDate[1], secondDate[0]).toISOString();
            values.thirdDate = new Date(thirdDate[2], thirdDate[1], thirdDate[0]).toISOString();

            values.selectedDateFrom = values?.selectedDateFrom?.toISOString();
            values.selectedDateTo = values?.selectedDateTo?.toISOString();
            // .toUTCString()
            
            // values.selectedDateFrom = values.selectedDateFrom.toLocaleDateString()
            // values.selectedDateTo = values.selectedDateTo.toLocaleDateString()
            // values.selectedDateFrom = values.selectedDateFrom.toString()
            // values.selectedDateTo = values.selectedDateTo.toString()
            
            // const formatedData = {
            //     'courseAvailabilityDates':{...values}
            // }
            addOrEdit(values, resetForm);
        }
    }
console.log(values)
    useEffect(() => {

        try{
            dispatch(detailsCoursePurchase(recordForEdit.id));
        }catch(err){
            console.log(err)
        }finally{
            if (coursePurchase?.courseAvailabilityDates) {

                const recordForeditFormat = {
                    ...coursePurchase?.courseAvailabilityDates
                }
                recordForeditFormat?.firstDate && (recordForeditFormat['firstDate'] = new Date(...recordForeditFormat?.firstDate.split('-').reverse())).toLocaleDateString();
                setValues({
                    ...recordForeditFormat
                })
                // console.log(coursePurchase)
            }
        }
        return () => {
            // 
        }

        // eslint-disable-next-line
    }, [dispatch, recordForEdit.id])
    return (
        <>
            {
               loadingCoursePurchaseDetail ? <Loading /> :

                    <Grid container>
                        <Grid item xs={12}>
                            <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
                                <Grid container>
                                    <Grid item md={6}>
                                        <Typography paragraph className={classes.customPharagraph}><b>Name:</b> {recordForEdit.name} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Email:</b> {recordForEdit.email} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Software:</b> {softwares ? searchNameByIdFromArray(softwares, recordForEdit.softwareId) : recordForEdit.softwareId} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Attendence Count:</b> {recordForEdit.attendenceCount} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Total Amount:</b> {recordForEdit?.totalAmount} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Course Availability Dates:</b> {recordForEdit?.courseAvailabilityDates} </Typography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography paragraph className={classes.customPharagraph}><b>Phone:</b> {recordForEdit.phone} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Training Type :</b> {trainingTypes ? searchNameByIdFromArray(trainingTypes, recordForEdit?.trainingTypeId) : recordForEdit?.trainingTypeId} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Payment Status:</b> {recordForEdit?.paymentStatus > 0 ? 'Paid' : 'Unpaid'} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Transection Id:</b> {recordForEdit.transectionId} </Typography>
                                        <Typography paragraph className={classes.customPharagraph}><b>Total Discount:</b> {recordForEdit?.totalDiscount} </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting().map(item =>
                                            (<TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.coursePurchaseId}</TableCell>
                                                <TableCell>{item.title}</TableCell>
                                                <TableCell>{item.firstName}</TableCell>
                                                <TableCell>{item.lastName}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                            </TableRow>)
                                            )
                                        }
                                    </TableBody>
                                </TblContainer>
                                <TblPagination />
                            </Paper>

                            <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
                                <div>
                                    <Form>
                                        <Grid container>
                                            <Grid item md={4} xs={12}>
                                                <Controls.Input
                                                    name="firstDate"
                                                    label="First Date"
                                                    value={values.firstDate ? values.firstDate  : 'No date found'}
                                                    readOnly={true}
                                                    className={clsx(classes.padding, classes.textField)}
                                                />

                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <Controls.Input
                                                    name="secondDate"
                                                    label="Second Date"
                                                    value={values.secondDate ? values.secondDate : 'No date found'}
                                                    readOnly={true}
                                                    className={clsx(classes.padding, classes.textField)}
                                                />

                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <Controls.Input
                                                    name="thirdDate"
                                                    label="Third Date"
                                                    value={values.thirdDate ? values.thirdDate : 'No date found'}
                                                    readOnly={true}
                                                    className={clsx(classes.padding, classes.textField)}
                                                />

                                            </Grid>
                                        </Grid>
                                    </Form>
                                </div>
                                <div>
                                    <Form onSubmit={handleSubmit}>
                                        <Grid container>
                                            <Grid item md={5} xs={12}>
                                                <Controls.DatePicker
                                                    name="selectedDateFrom"
                                                    label="Selected Date From"
                                                    value={values.selectedDateFrom}
                                                    onChange={handleInputChange}
                                                    error={errors.selectedDateFrom}
                                                    placeholder='Set the start date'
                                                    disablePast
                                                    // message="If you're unsure, please give the estimate you can."
                                                    className={clsx(classes.padding, classes.textField)}

                                                />
                                            </Grid>
                                            <Grid item md={5} xs={12}>
                                                <Controls.DatePicker
                                                    name="selectedDateTo"
                                                    label="Selected Date To"
                                                    value={values.selectedDateTo}
                                                    onChange={handleInputChange}
                                                    error={errors.selectedDateTo}
                                                    placeholder='When do you need to have this solution created?'
                                                    disablePast
                                                    // message="If you're unsure, please give the estimate you can."
                                                    className={clsx(classes.padding, classes.textField)}

                                                />
                                            </Grid>
                                            <Grid item md={2} xs={12} style={{ alignSelf: 'center', display:'flex', justifyContent:'center' }}>
                                                <div >
                                                    <>
                                                        <Controls.Button
                                                            type="submit"
                                                            text="Submit"
                                                            size='large'
                                                        />
                                                    </>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </div>

                            </Paper>
                            {/* <div>
                                <>
                                    <Controls.Button
                                        text="Back"
                                        color="default"
                                        onClick={() => { setOpenPopup(false) }}
                                    />
                                </>
                            </div> */}
                        </Grid>
                    </Grid>
            }
        </>
    )
}
