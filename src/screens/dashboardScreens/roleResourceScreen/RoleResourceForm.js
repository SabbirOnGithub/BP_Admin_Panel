import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    roleId: "",
    resourceId: "",
    createOperation: false,
    readOperation: false,
    updateOperation: false,
    deleteOperation: false,
}

export default function RoleResourceForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, roles, resources } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('roleId' in fieldValues)
            temp.roleId = fieldValues.roleId ? "" : "This field is required."
        if ('resourceId' in fieldValues)
            temp.resourceId = fieldValues.resourceId ? "" : "This field is required."
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
            // console.log(values)
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
                        name="roleId"
                        label="Role"
                        value={values.roleId}
                        onChange={handleInputChange}
                        error={errors.roleId}
                        options={roles ? roles : []}
                    />
                    <Controls.Select
                        name="resourceId"
                        label="Resource"
                        value={values.resourceId}
                        onChange={handleInputChange}
                        error={errors.resourceId}
                        options={resources ? resources : []}
                    />
                    <Controls.Checkbox
                        name="createOperation"
                        label="Create Operation"
                        value={values.createOperation}
                        onChange={handleInputChange}
                        error={errors.createOperation}
                    />
                    <Controls.Checkbox
                        name="readOperation"
                        label="Read Operation"
                        value={values.readOperation}
                        onChange={handleInputChange}
                        error={errors.readOperation}
                    />
                    <Controls.Checkbox
                        name="updateOperation"
                        label="Update Operation"
                        value={values.updateOperation}
                        onChange={handleInputChange}
                        error={errors.updateOperation}
                    />
                    <Controls.Checkbox
                        name="deleteOperation"
                        label="Delete Operation"
                        value={values.deleteOperation}
                        onChange={handleInputChange}
                        error={errors.deleteOperation}
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
