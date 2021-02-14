import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    name: "",
    systemName: "",
    urlPath: "",
    ordering: "",
    isBaseItem: false,
    isActive: false,
    baseItemId: "",
    isWfasettingsRequired: false,
    isNotificationSettingsRequired: false,
}

export default function ResourceForm(props) {
    const { addOrEdit, recordForEdit, loadingSave } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('systemName' in fieldValues)
            temp.systemName = fieldValues.systemName ? "" : "This field is required."
        if ('urlPath' in fieldValues)
            temp.urlPath = fieldValues.urlPath ? "" : "This field is required."
        if ('ordering' in fieldValues)
            temp.ordering = fieldValues.ordering ? "" : "This field is required."
        if ('baseItemId' in fieldValues)
            temp.baseItemId = fieldValues.baseItemId ? "" : "This field is required."
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
        // console.log(values)
        if (validate()) {
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
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                     <Controls.Input
                        name="systemName"
                        label="System Name"
                        value={values.systemName}
                        onChange={handleInputChange}
                        error={errors.systemName}
                    />
                     <Controls.Input
                        name="urlPath"
                        label="Url Path"
                        value={values.urlPath}
                        onChange={handleInputChange}
                        error={errors.urlPath}
                    />
                    <Controls.Input
                        label="Ordering"
                        name="ordering"
                        type="number"
                        value={values.ordering}
                        onChange={handleInputNumberChange}
                        error={errors.ordering}
                    />
                    <Controls.Checkbox
                        name="isBaseItem"
                        label="isBaseItem"
                        value={values.isBaseItem}
                        onChange={handleInputChange}
                        error={errors.isBaseItem}
                    />
                    <Controls.Checkbox
                        name="isActive"
                        label="Active"
                        value={values.isActive}
                        onChange={handleInputChange}
                        error={errors.isActive}
                    />
                     <Controls.Input
                        label="Base Item Id"
                        name="baseItemId"
                        type="number"
                        value={values.baseItemId}
                        onChange={handleInputNumberChange}
                        error={errors.baseItemId}
                    />
                    <Controls.Checkbox
                        name="isWfasettingsRequired"
                        label="Is Wfasettings Required"
                        value={values.isWfasettingsRequired}
                        onChange={handleInputChange}
                        error={errors.isWfasettingsRequired}
                    />
                    <Controls.Checkbox
                        name="isNotificationSettingsRequired"
                        label="Is Notification Settings Required"
                        value={values.isNotificationSettingsRequired}
                        onChange={handleInputChange}
                        error={errors.isNotificationSettingsRequired}
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
