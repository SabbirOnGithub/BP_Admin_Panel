import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { useForm, Form } from '../../../../components/UseForm/useForm';
import {isAdminUser} from '../../../../helpers/search'

const initialFValues = {
    id: '',
    ctaFunctionId: '',
    consultancyReceiveDate: new Date(),
    // consultancyReceiveTime: new Date(),
    consultancyReceiveTime: '',
    // consultancyReceivedHour: '',
    // consultancyReceivedMinutes: '',
    note: "",
    status:1,
}

export default function ConsultancyReceiveHistoryForm(props) {
    const { 
        addOrEdit, 
        recordForEdit, 
        loadingSave,
        ctaFunctionId,
        consultancyReceiveHistoryStatuses,
        hourRemaining,
    } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('consultancyReceiveDate' in fieldValues)
            temp.consultancyReceiveDate = fieldValues.consultancyReceiveDate ? "" : "This field is required."
        if ('consultancyReceiveTime' in fieldValues)
            temp.consultancyReceiveTime = consultancyReceiveTimeIsValid(fieldValues.consultancyReceiveTime) ? "" : "This field is required."
         if ('status' in fieldValues)
            temp.status = fieldValues.status ? "" : "This field is required."
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
        handleInputNumberChange,
        resetForm,
        handleDateInput,
        // handleInputFloatNumberChange
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        // console.log(values)
        if (validate()) {
            // console.log(values)
            addOrEdit(values, resetForm);
        }
    }
    const consultancyReceiveTimeIsValid = (value) =>{
        if(hourRemaining){
            return value <= hourRemaining ? value : ""
        }else{
            return value <= 1440 ? value : ""
        }
    } 
    // console.log(values)

    useEffect(() => {
        if (recordForEdit != null){
            setValues({
                ...recordForEdit,
                // consultancyReceiveDate: ''
                consultancyReceiveDate: new Date(new Date(`${recordForEdit.consultancyReceiveDate} GMT`).toString()),
            })
        }
        else {
            if(ctaFunctionId)
                setValues({
                    ...initialFValues,
                    ctaFunctionId
                })
            
        }

    }, [recordForEdit, setValues, ctaFunctionId])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                <Controls.Select
                    name="status"
                    label="Status"
                    value={values?.status ? values?.status : ''}
                    onChange={handleInputChange}
                    error={errors.status}
                    options={consultancyReceiveHistoryStatuses ? consultancyReceiveHistoryStatuses : []}
                    disabled = {!isAdminUser() ? true : false}

                />
                    <Controls.DatePickerCustom
                        name="consultancyReceiveDate"
                        label="Consultancy requested date"
                        value={values.consultancyReceiveDate ? values.consultancyReceiveDate : ''}
                        onChange={handleDateInput}
                        error={errors.consultancyReceiveDate}
                        placeholder='Set the date of received consultancy'
                        disablePast
                        format="MM/dd/yyyy"
                        helperText="Add the requested consultancy date"
                        readOnly = {isAdminUser() && true}
                    // className={clsx(classes.padding, classes.textField)}
                    />
                    {/* <Controls.TimePickerCustom
                        name="consultancyReceiveTime"
                        label="Consultancy Providing Times"
                        value={values.consultancyReceiveTime ? values.consultancyReceiveTime : 'No date found'}
                        onChange={handleDateInput}
                        error={errors.consultancyReceiveTime}
                        helperText="Add the hours and minutes for the given date (max 24 hours). Example 1.5 (1 hour 30 minutes)"

                    /> */}

                    {/* <Controls.Input
                        label="Consultancy Provided (Hours)"
                        name="consultancyReceiveTime"
                        type="number"
                        value={values.consultancyReceiveTime}
                        onChange={handleInputFloatNumberChange}
                        error={errors.consultancyReceiveTime}
                        helperText="Add the consultancy hours that you provided in the given date above. Example: 1 hour 45 minutes = 1.75"

                    /> */}

                    
                    {/* <Controls.Input
                        label="Consultancy Provided (Hours)"
                        name="consultancyReceivedHour"
                        type="number"
                        value={values.consultancyReceivedHour}
                        onChange={handleInputNumberChange}
                        error={errors.consultancyReceivedHour}
                        helperText="Add the consultancy hour that you provided in the given date above"

                    /> */}
                    <Controls.Input
                        label="Consultancy requested times (in Minutes)"
                        name="consultancyReceiveTime"
                        type="number"
                        value={values.consultancyReceiveTime}
                        onChange={handleInputNumberChange}
                        error={errors.consultancyReceiveTime}
                        helperText="Add the requested consultancy time in Munutes for the given date. Example: 5 hours 40 minutes = 5x60+40 = 340"
                        max ={hourRemaining ? hourRemaining : 1440}
                        readOnly = {isAdminUser() && true}

                    />

                    <Controls.Input
                        name="note"
                        label="Description/Note (if any)"
                        value={values.note}
                        onChange={handleInputChange}
                        error={errors.note}
                        helperText="Add some note/description for this record (if any)"
                        readOnly = {isAdminUser() && true}

                    />


                    <div>
                        {loadingSave ? (
                            <CircularProgress size={26} />
                        ) : (<>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm} />
                        </>
                        )
                        }
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
