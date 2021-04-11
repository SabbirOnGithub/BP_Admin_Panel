import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    name: "",
    companyTypeId: "",
    submenuId: "",
    monthlyRate: "",
    yearlyRate: "",
}

export default function CtaPackageMonthlyYearlyForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, companyTypes, subMenus } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('companyTypeId' in fieldValues)
            temp.companyTypeId = fieldValues.companyTypeId ? "" : "This field is required."
        if ('submenuId' in fieldValues)
            temp.submenuId = fieldValues.submenuId ? "" : "This field is required."

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
                        name="submenuId"
                        label="Sub Menu"
                        value={values.submenuId}
                        onChange={handleInputChange}
                        error={errors.submenuId}
                        options={subMenus ? subMenus : []}
                    />
                    <Controls.Select
                        name="companyTypeId"
                        label="Company Type"
                        value={values.companyTypeId}
                        onChange={handleInputChange}
                        error={errors.companyTypeId}
                        options={companyTypes ? companyTypes : []}
                    />
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="monthlyRate"
                        label="Monthly Rate"
                        value={values.monthlyRate}
                        type="number"
                        onChange={handleInputNumberChange}
                        error={errors.monthlyRate}
                    />
                    
                    <Controls.Input
                        name="yearlyRate"
                        label="Yearly Rate"
                        value={values.yearlyRate}
                        type="number"
                        onChange={handleInputNumberChange}
                        error={errors.namyearlyRatee}
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
