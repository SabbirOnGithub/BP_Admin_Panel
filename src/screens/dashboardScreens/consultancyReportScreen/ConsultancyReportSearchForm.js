import React from 'react';
import { Grid } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';

const initialFValues = {
    dayCount: '',
    fromDate: null,
    toDate: null,
    keyword: '',
}

const filterOptions = [
    { id: '1', title: 'Today' },
    { id: '7', title: 'Last Week' },
    { id: '15', title: 'Last 15 days' },
    { id: '30', title: 'Last Month' },
]
export default function ConsultancyReportSearchForm(props) {
    const { 
        handleSearch, 
    } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if (fieldValues?.toDate?.valueOf() <= fieldValues?.fromDate?.valueOf())
            temp.toDate = fieldValues.toDate ? '' : "Invalid range"
        setErrors({
            ...temp
        })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        // setValues,
        errors,
        setErrors,
        resetForm,
        handleDateInput,
        handleInputChange
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()

        const lastSevenDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
        const lastFifteenDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
        const lastThirtyDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        const today = new Date().toISOString()
        // const formatFromDateValue = values?.fromDate.toISOString()
        // const formatToDateValue = values?.toDate.toISOString()

        const countDay = values?.dayCount

        if(validate()){
            console.log('valid')
            if(countDay){
                if(countDay===1){
                    values.fromDate = today
                    values.toDate = today
                }
                else if(countDay===7){
                    values.toDate = today
                    values.fromDate = lastSevenDate
                    
                }
                else if(countDay===15){
                    values.toDate = today
                    values.fromDate = lastFifteenDate
                }else{
                    values.toDate = today
                    values.fromDate = lastThirtyDate
                }
            }else{
                values.fromDate = values?.fromDate?.toISOString()
                values.toDate = values?.toDate?.toISOString()
            }
            
            handleSearch(values, resetForm)
        }

       
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                    <Grid item sm={6}>
                        <Controls.RadioGroup
                            name="dayCount"
                            label=""
                            value={values.dayCount}
                            onChange={handleInputChange}
                            items={filterOptions}
                        />

                        <Controls.Input
                            name="keyword"
                            keyword="keyword"
                            label="Search by keyword"
                            value={values.keyword}
                            onChange={handleInputChange}
                            error={errors.keyword}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <Controls.DatePickerCustom
                            name="fromDate"
                            label="From date"
                            value={values.fromDate?.toISOString()}
                            onChange={handleDateInput}
                            error={errors.fromDate}
                            placeholder='From date'
                            disableFuture
                            format="MM/dd/yyyy"
                        />
                        <Controls.DatePickerCustom
                            name="toDate"
                            label="To date"
                            value={values.toDate}
                            onChange={handleDateInput}
                            error={errors.toDate}
                            placeholder='To date'
                            format="MM/dd/yyyy"
                            disableFuture
                            // InputProps={{ className: !values.toDate ? classes.datepicker : null }}
                        />
                    </Grid>
                  
                    <div>
                        {<>
                            <Controls.Button
                                type="submit"
                                text="Search" />
                        </>
                        }
                    </div>
            </Grid>
        </Form>
    )
}
