import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    sectionName: "",
    showSection: false,
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit, loadingSave } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('sectionName' in fieldValues)
            temp.sectionName = fieldValues.sectionName ? "" : "This field is required."
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
                    <Controls.Input
                        name="sectionName"
                        label="Section Name"
                        value={values.sectionName}
                        onChange={handleInputChange}
                        error={errors.sectionName}
                    />
                    <Controls.Checkbox
                        name="showSection"
                        label="Show Section"
                        value={values.showSection}
                        onChange={handleInputChange}
                        error={errors.showSection}
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
