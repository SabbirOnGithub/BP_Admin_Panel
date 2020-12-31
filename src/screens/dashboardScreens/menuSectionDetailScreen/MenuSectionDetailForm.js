import React, { useEffect } from 'react'
import { Grid, Button} from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    menuSectionId:'',
    title: '',
    description: '',
    pictureUrl: '',
    menuId:'',
}

export default function MenuSectionDetailForm(props) {
    const { addOrEdit, recordForEdit, menuSections, menus } = props

 

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('menuSectionId' in fieldValues)
            temp.menuSectionId = fieldValues.menuSectionId ? "" : "This field is required."
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        
        
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
        files
    } = useForm(initialFValues, true, validate);
    const felteredMenuSections = menuSections.filter(item=>item.menuId === values.menuId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, files, resetForm);
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
                        name="menuId"
                        label="Menu Title"
                        value={values.menuId}
                        onChange={handleInputChange}
                        error={errors.menuId}
                        options={menus ? menus : []}
                    />
                    <Controls.Select
                        name="menuSectionId"
                        label="Menu Section Title"
                        value={values.menuSectionId}
                        onChange={handleInputChange}
                        error={errors.menuSectionId}
                        // options={menuSections ? menuSections : []}
                        options={menuSections && felteredMenuSections ? felteredMenuSections : []}
                    />
                    <Controls.Input
                        name="title"
                        label="Title"
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
                   
                    <div style={{margin:5}}>
                    <Button
                        variant="contained"
                        component="label"
                        >
                        Upload File
                         <input
                        type="file"
                        onChange={handleFileChange}
                        hidden
                    />
                    </Button>
                    <span style={{marginLeft:5}}>{files ? files.name : 'no file'}</span>
                    </div>
                    
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