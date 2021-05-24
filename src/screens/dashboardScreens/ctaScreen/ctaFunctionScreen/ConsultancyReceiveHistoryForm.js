import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { useForm, Form } from '../../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    ctaFunctionId: '',
    consultancyReceiveDate: new Date(),
    consultancyReceiveTime: new Date(),
    note: "",
}

export default function ConsultancyReceiveHistoryForm(props) {
    const { addOrEdit, recordForEdit, loadingSave } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('consultancyReceiveDate' in fieldValues)
            temp.consultancyReceiveDate = fieldValues.consultancyReceiveDate ? "" : "This field is required."
        if ('consultancyReceiveTime' in fieldValues)
            temp.consultancyReceiveTime = fieldValues.consultancyReceiveTime ? "" : "This field is required."
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
        // handleInputNumberChange,
        resetForm,
        handleDateInput
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
        if (validate()) {
            console.log(values)
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null){
            setValues({
                ...initialFValues,
                ctaFunctionId: recordForEdit.id,
            })
        }

    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.DatePickerCustom
                        name="consultancyReceiveDate"
                        label="Consultancy Providing Date"
                        value={values.consultancyReceiveDate ? values.consultancyReceiveDate : 'No date found'}
                        onChange={handleDateInput}
                        error={errors.consultancyReceiveDate}
                        placeholder='Set the date of providing consultancy'
                        disablePast
                        format="MM/dd/yyyy"
                        helperText="Add the consultancy providing date"
                    // className={clsx(classes.padding, classes.textField)}
                    />
                    

                    <Controls.TimePickerCustom
                        name="consultancyReceiveTime"
                        label="Consultancy Providing Times"
                        value={values.consultancyReceiveTime ? values.consultancyReceiveTime : 'No date found'}
                        onChange={handleDateInput}
                        error={errors.consultancyReceiveTime}
                        helperText="Add the hours and minutes for the given date (max 24 hours). Example 1:50 (1 hour 50 minutes)"

                    />

                    <Controls.Input
                        name="note"
                        label="Description/Note (if any)"
                        value={values.note}
                        onChange={handleInputChange}
                        error={errors.note}
                        helperText="Add some note/description for this record (if any)"

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
