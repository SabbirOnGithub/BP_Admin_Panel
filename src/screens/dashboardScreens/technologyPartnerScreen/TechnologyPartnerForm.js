import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    name: '',
    isActive: false,
    pictureUrl: '',
    menuId: '',
    subMenuId: '',
}

export default function TechnologyPartnerForm(props) {
    const { addOrEdit, recordForEdit, menus, subMenus } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('menuId' in fieldValues)
            temp.menuId = fieldValues.menuId ? "" : "This field is required."
        if ('subMenuId' in fieldValues)
            temp.subMenuId = fieldValues.subMenuId ? "" : "This field is required."
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
        handleFileChange,
        resetForm,
        resetFileInput
    } = useForm(initialFValues, true, validate);


    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            try{
                addOrEdit(values, resetForm);
            }
            catch(e){
                console.log(e)
            }
           
        }
    }

    useEffect(() => {
        if (recordForEdit != null){
            try {    
                setValues({
                    ...recordForEdit
                })
              } catch (e) {
                console.warn(e);
              } 
        }
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Select
                        name="menuId"
                        label="Menu Title"
                        value={values.menuId}
                        onChange={handleInputChange}
                        error={errors.menuId}
                        options={menus ? menus : []}
                    />
                    <Controls.Select
                        name="subMenuId"
                        label="Sub Menu Title"
                        value={values.subMenuId}
                        onChange={handleInputChange}
                        error={errors.subMenuId}
                        options={subMenus ? subMenus : []}
                    />
                    
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                     <Controls.Checkbox
                        name="isActive"
                        label="Active"
                        value={values.isActive}
                        onChange={handleInputChange}
                        error={errors.isActive}
                    />
                    
                    <Controls.FileInput
                        name="pictureUrl"
                        label="Picture"
                        value={values.pictureUrl}
                        onChange={handleFileChange}
                        error={errors.pictureUrl}
                        resetFileInput = {resetFileInput}
                    />
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