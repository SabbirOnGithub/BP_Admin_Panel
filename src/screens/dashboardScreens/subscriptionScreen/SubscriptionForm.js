import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    name: '',
    email: '',
    subscriptionStatus: false,
    subscriptionDate: new Date(),
}

export default function SubscriptionForm(props) {
    const { addOrEdit, recordForEdit, loadingSave } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('subscriptionDate' in fieldValues)
            temp.subscriptionDate = fieldValues.subscriptionDate ? "" : "This field is required."

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
        handleDateInput,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        // console.log(values)
        if (validate()) {
            // console.log(values)
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null){
            if(recordForEdit.subscriptionDate){
                // recordForEdit['subscriptionDate'] = new Date(recordForEdit.subscriptionDate)
            }
            setValues({
                ...recordForEdit
            })

        }
            
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                       
                    />
                     <Controls.DatePickerCustom
                        name="subscriptionDate"
                        label="Subscription Date"
                        value={values.subscriptionDate}
                        onChange={handleDateInput}
                        error={errors.subscriptionDate}
                        placeholder='Enter the subscription Date'
                        disablePast
                        // message="If you're unsure, please give the estimate you can."
                        // className={clsx(classes.padding, classes.textField)}

                    />
                    <Controls.Checkbox
                        name="subscriptionStatus"
                        label="Subscription Status"
                        value={values.subscriptionStatus}
                        onChange={handleInputChange}
                        error={errors.subscriptionStatus}
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
