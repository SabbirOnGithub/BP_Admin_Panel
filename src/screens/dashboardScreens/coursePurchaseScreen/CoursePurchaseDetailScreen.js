import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import { Grid, makeStyles, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import Typography from '@material-ui/core/Typography';
import useTable from "../../../components/UseTable/useTable";
// import { searchNameByIdFromArray } from '../../../helpers/search';
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
        ...theme?.customPharagraph
    },
    margin: {
        margin: theme.spacing(1),
    },
    padding: {
        padding: theme.spacing(1),
    },
    subHeadlineText :{
        ...theme?.subHeadlineText
    }
    
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

    const { 
            recordForEdit,
            addOrEdit,
            loadingCourseAvailabilityDateSave 
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
    
    // console.log(coursePurchase?.courseAvailabilityDates)
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleDateInput,
        // handleInputChange,
        // handleEditorInput,
        resetForm,
    } = useForm(initialFValues, true, validate);


    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
       
        try{
            dispatch(detailsCoursePurchase(recordForEdit.id))
            .then(res=>{
                if(res.status===true){
                    // console.log(res.data)
                    if (res?.data?.courseAvailabilityDates) {

                        const recordForeditFormat = {
                            ...res?.data?.courseAvailabilityDates
                        }
               
                        setValues({
                            ...recordForeditFormat,
                            firstDate : new Date(new Date(`${recordForeditFormat.firstDate} GMT`).toString()),
                            secondDate : new Date(new Date(`${recordForeditFormat.secondDate} GMT`).toString()),
                            thirdDate : new Date(new Date(`${recordForeditFormat.thirdDate} GMT`).toString()),
                            selectedDateFrom:null,
                            selectedDateTo: null
                        })
                    }
                    
                }
            })
            .catch(err=>{
                console.log(err)
            })
       
        }catch(err){
            console.log(err)
        }

        return () => {
            // 
        }

        // eslint-disable-next-line
    }, [dispatch, recordForEdit?.id, loadingCourseAvailabilityDateSave, setValues])
    return (
        <>
            {
               loadingCoursePurchaseDetail || !coursePurchase || !values ? <Loading /> :

                    <Grid container>
                        <Grid item xs={12}>
                            {
                                coursePurchase &&
                                (
                                    <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
                                    <Grid container>
                                        <Grid item md={6} sm={12}>
                                        
                                            <h1 className={classes.subHeadlineText}>User details</h1>

                                            <Typography paragraph className={classes.customPharagraph}><b>Name:</b> {coursePurchase?.name} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Email:</b> {coursePurchase?.email} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Phone:</b> {coursePurchase?.phone} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>CompanyName:</b> {coursePurchase?.companyName} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Company Size:</b> {coursePurchase?.companySize?.name} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Company Type:</b> {coursePurchase?.companyType?.name} </Typography>

                                            <h1 className={classes.subHeadlineText}>Training details</h1>
                                            {/* <Typography paragraph className={classes.customPharagraph}><b>Software:</b> {softwares ? searchNameByIdFromArray(softwares, coursePurchase?.softwareId) : coursePurchase?.softwareId} </Typography> */}
                                            {/* <Typography paragraph className={classes.customPharagraph}><b>Training Type :</b> {trainingTypes ? searchNameByIdFromArray(trainingTypes, coursePurchase?.trainingTypeId) : coursePurchase?.trainingTypeId} </Typography> */}
                                            <Typography paragraph className={classes.customPharagraph}><b>Software:</b> {coursePurchase?.software?.name} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Training Type :</b> {coursePurchase?.trainingType?.name} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Attendence Count:</b> {coursePurchase?.attendenceCount} </Typography>

                                        </Grid>
                                        <Grid item md={6} sm={12}>
                                            <h1 className={classes.subHeadlineText}>Payment  details:</h1>
                                            <Typography paragraph className={classes.customPharagraph}><b>Payment Status: </b> {coursePurchase?.paymentStatus > 0 ? 'Paid' : 'Unpaid'} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Transection Id: </b> {coursePurchase?.transectionId} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Total Amount: </b> {coursePurchase?.totalAmount} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Total Discount: </b> {coursePurchase?.totalDiscount} </Typography>

                                            <h1 className={classes.subHeadlineText}>Course availability dates:</h1>
                                            <Typography paragraph className={classes.customPharagraph}><b>First Date: </b> {new Date(`${coursePurchase?.courseAvailabilityDates?.firstDate} UTC`).toLocaleDateString()}</Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Second Date: </b> {new Date(`${coursePurchase?.courseAvailabilityDates?.secondDate} UTC`).toLocaleDateString()} </Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Third Date: </b> {new Date(`${coursePurchase?.courseAvailabilityDates?.thirdDate} UTC`).toLocaleDateString()}</Typography>
                                            <Typography paragraph className={classes.customPharagraph}><b>Selected Date and Time From: </b> 
                                                {  coursePurchase?.courseAvailabilityDates?.selectedDateFrom ? ( 
                                                        new Date(`${coursePurchase?.courseAvailabilityDates?.selectedDateFrom} UTC`).toLocaleDateString() + '  ' + 
                                                        new Date(`${coursePurchase?.courseAvailabilityDates?.selectedDateFrom} UTC`).toLocaleTimeString()
                                                    ) : 'No date available'
                                                }  
                                                </Typography>
                                            {/* <Typography paragraph className={classes.customPharagraph}><b>Selected Date From:</b> {console.log(new Date(Date.parse(`${coursePurchase?.courseAvailabilityDates?.selectedDateFrom} UTC`)))} </Typography> */}
                                            <Typography paragraph className={classes.customPharagraph}><b>Selected Date and Time To: </b> 
                                                {  coursePurchase?.courseAvailabilityDates?.selectedDateTo ? (
                                                        new Date(`${coursePurchase?.courseAvailabilityDates?.selectedDateTo} UTC`).toLocaleDateString() + '  ' + 
                                                        new Date(`${coursePurchase?.courseAvailabilityDates?.selectedDateTo} UTC`).toLocaleTimeString()
                                                    ) : 'No date available'
                                                } 
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                )
                            }
                          
                            <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
                                <h1>Course attendees</h1>
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            recordsAfterPagingAndSorting()?.map(item =>
                                            (<TableRow key={item.id}>
                                                <TableCell>{item?.id}</TableCell>
                                                <TableCell>{item?.coursePurchaseId}</TableCell>
                                                <TableCell>{item?.title}</TableCell>
                                                <TableCell>{item?.firstName}</TableCell>
                                                <TableCell>{item?.lastName}</TableCell>
                                                <TableCell>{item?.email}</TableCell>
                                            </TableRow>)
                                            )
                                        }
                                    </TableBody>
                                </TblContainer>
                                <TblPagination />
                            </Paper>
                            
                            
                            {
                                // !(values.firstDate && values.secondDate && values.thirdDate) ? <Loading /> :
                                (

                                    <Paper style={{ overflow: "auto", backgroundColor: "transparent", marginBottom: 20, padding: 20 }}>
                                    <div>
                                        <h1>Date submission form</h1>
                                        <Form>
                                            <Grid container>
                                                <Grid item md={4} xs={12}>
                                                <Controls.DateTimePickerCustom
                                                        name="firstDate"
                                                        label="First Date"
                                                        value={values.firstDate ? values.firstDate  : 'No date found'}
                                                       onChange={handleDateInput}
                                                        error={errors.firstDate}
                                                        placeholder='Set the start date'
                                                        disabled
                                                        format="MM/dd/yyyy"
                                                        // message="If you're unsure, please give the estimate you can."
                                                        className={clsx(classes.padding, classes.textField)}
                                                    />
                                                    
    
                                                </Grid>
                                                <Grid item md={4} xs={12}>
                                                    
                                                     <Controls.DateTimePickerCustom
                                                        name="secondDate"
                                                        label="Second Date"
                                                        value={values.secondDate ? values.secondDate : 'No date found'}
                                                       onChange={handleDateInput}
                                                        error={errors.secondDate}
                                                        placeholder='Set the start date'
                                                        disabled
                                                        format="MM/dd/yyyy"
                                                        // message="If you're unsure, please give the estimate you can."
                                                        className={clsx(classes.padding, classes.textField)}
                                                    />
    
                                                </Grid>
                                                <Grid item md={4} xs={12}>
                                                 
                                                    <Controls.DateTimePickerCustom
                                                       name="thirdDate"
                                                       label="Third Date"
                                                       value={values.thirdDate ? values.thirdDate : 'No date found'}
                                                       onChange={handleDateInput}
                                                        error={errors.thirdDate}
                                                        placeholder='Set the start date'
                                                        disabled
                                                        format="MM/dd/yyyy"
                                                        // message="If you're unsure, please give the estimate you can."
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
                                                    <Controls.DateTimePickerCustom
                                                        name="selectedDateFrom"
                                                        label="From date and time"
                                                        value={values.selectedDateFrom}
                                                        onChange={handleDateInput}
                                                        error={errors.selectedDateFrom}
                                                        placeholder='From date and time'
                                                        disablePast
                                                        // format="dd-MM-yyyy"
                                                        // message="If you're unsure, please give the estimate you can."
                                                        className={clsx(classes.padding, classes.textField)}
                                                    />
                                                </Grid>
                                                <Grid item md={5} xs={12}>
                                                    <Controls.DateTimePickerCustom
                                                       name="selectedDateTo"
                                                       label="To date and time"
                                                       value={values.selectedDateTo}
                                                       onChange={handleDateInput}
                                                       error={errors.selectedDateTo}
                                                       placeholder='To date and time'
                                                       disablePast
                                                       // message="If you're unsure, please give the estimate you can."
                                                       className={clsx(classes.padding, classes.textField)}
                                                       minDate={values.selectedDateFrom ? values.selectedDateFrom : new Date()}
                                                       disabled = {values.selectedDateFrom ? false : true}
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
                               
                                )
                            }
                            
                        </Grid>
                    </Grid>
            }
        </>
    )
}
