import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    menuSubMenuMapId:'',
    title: '',
    description: '',
    displayOrder:'',
    isActive: false,
}

export default function MenuForm(props) {
    const { addOrEdit, recordForEdit, loadingSave } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('menuSubMenuMapId' in fieldValues)
            temp.menuSubMenuMapId = fieldValues.menuSubMenuMapId ? "" : "This field is required."
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        if ('displayOrder' in fieldValues)
            temp.displayOrder = fieldValues.displayOrder ? "" : "This field is required."
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
                <Controls.Input
                        label="Menu Sub Menu Map Id"
                        name="menuSubMenuMapId"
                        type="number"
                        value={values.menuSubMenuMapId}
                        onChange={handleInputNumberChange}
                        error={errors.menuSubMenuMapId}
                    />
                {/* <Controls.Select
                        name="menuSubMenuMapId"
                        label="Menu Sub Menu Map Id"
                        value={values.menuSubMenuMapId}
                        onChange={handleInputChange}
                        error={errors.menuSubMenuMapId}
                        options={menuSubMenuMaps ? menuSubMenuMaps : []}
                    /> */}
                <Controls.Input
                        label="Title"
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                    <Controls.Input
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    />
                    <Controls.Input
                        label="Display Order"
                        name="displayOrder"
                        type="number"
                        value={values.displayOrder}
                        onChange={handleInputNumberChange}
                        error={errors.displayOrder}
                    />
                    <Controls.Checkbox
                        name="isActive"
                        label="Active"
                        value={values.isActive}
                        onChange={handleInputChange}
                        error={errors.isActive}
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
