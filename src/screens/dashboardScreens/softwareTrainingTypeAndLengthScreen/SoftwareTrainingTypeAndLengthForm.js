import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    softwareId: '',
    trainingTypeId: '',
    classType: "",
    classLength: '',
}

export default function SoftwareTrainingTypeAndLengthForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, trainingTypes, softwares } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('softwareId' in fieldValues)
            temp.softwareId = fieldValues.softwareId ? "" : "This field is required."
        if ('trainingTypeId' in fieldValues)
            temp.trainingTypeId = fieldValues.trainingTypeId ? "" : "This field is required."
        if ('classType' in fieldValues)
            temp.classType = fieldValues.classType ? "" : "This field is required."
        if ('classLength' in fieldValues)
            temp.classLength = fieldValues.classLength ? "" : "This field is required."
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
                        name="softwareId"
                        label="Software"
                        value={values.softwareId}
                        onChange={handleInputChange}
                        error={errors.softwareId}
                        options={softwares ? softwares : []}
                    />
                    <Controls.Select
                        name="trainingTypeId"
                        label="Training Type"
                        value={values.trainingTypeId}
                        onChange={handleInputChange}
                        error={errors.trainingTypeId}
                        options={trainingTypes ? trainingTypes : []}
                    />
                    <Controls.Input
                        name="classType"
                        label="Benefit"
                        value={values.classType}
                        onChange={handleInputChange}
                        error={errors.classType}
                    />
                    {/* <Controls.Input
                        label="Display Order"
                        name="classLength"
                        type="number"
                        value={values.classLength}
                        onChange={handleInputNumberChange}
                        error={errors.classLength}
                    /> */}
                    <Controls.Input
                        label="Class Length"
                        name="classLength"
                        value={values.classLength}
                        onChange={handleInputChange}
                        error={errors.classLength}
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
