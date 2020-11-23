import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';


const initialFValues = {
    id: 0,
    name: '',
    shortDescription: '',
    pictureName: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function SubMenuForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.fullName = fieldValues.name ? "" : "This field is required."
        if ('shortDescription' in fieldValues)
            temp.shortDescription = fieldValues.shortDescription ? "" : "This field is required."
        if ('pictureName' in fieldValues)
            temp.mobile = fieldValues.shortDescription ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

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
                        label="Short Description"
                        name="shortDescription"
                        value={values.shortDescription}
                        onChange={handleInputChange}
                        error={errors.shortDescription}
                    />
                    <Controls.Input
                        label="Picture"
                        name="pictureName"
                        type="file"
                        value={values.pictureName}
                        onChange={handleInputChange}
                        error={errors.pictureName}
                    />
                    
                    {/* <input
                        type="file"
                    /> */}
                    
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
