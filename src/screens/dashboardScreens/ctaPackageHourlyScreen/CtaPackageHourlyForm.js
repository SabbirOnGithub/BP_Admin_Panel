import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    name: "",
    companyTypeId: "",
    ctaHourId: "",
    validity: "",
    rate: "",
}

export default function CtaPackageHourlyForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, ctaHours, companyTypes } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('companyTypeId' in fieldValues)
            temp.companyTypeId = fieldValues.companyTypeId ? "" : "This field is required."
        if ('ctaHourId' in fieldValues)
            temp.ctaHourId = fieldValues.ctaHourId ? "" : "This field is required."
        if ('validity' in fieldValues)
            temp.validity = fieldValues.validity ? "" : "This field is required."
        if ('rate' in fieldValues)
            temp.rate = fieldValues.rate ? "" : "This field is required."
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
        resetForm
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
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Select
                        name="companyTypeId"
                        label="Company Type"
                        value={values.companyTypeId}
                        onChange={handleInputChange}
                        error={errors.companyTypeId}
                        options={companyTypes ? companyTypes : []}
                    />
                    <Controls.Select
                        name="ctaHourId"
                        label="Cta Hour"
                        value={values.ctaHourId}
                        onChange={handleInputChange}
                        error={errors.ctaHourId}
                        options={ctaHours ? ctaHours : []}
                    />
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        label="Validity"
                        name="validity"
                        type="number"
                        value={values.validity}
                        onChange={handleInputNumberChange}
                        error={errors.validity}
                    />
                    <Controls.Input
                        label="Rate"
                        name="rate"
                        type="number"
                        value={values.rate}
                        onChange={handleInputNumberChange}
                        error={errors.rate}
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
