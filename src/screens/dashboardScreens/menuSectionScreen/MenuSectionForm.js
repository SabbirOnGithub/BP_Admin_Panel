import React, { useEffect } from 'react'
import { Grid, Button} from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    menuId: '',
    title: '',
    pictureUrl: '',
}

export default function MenuSectionForm(props) {
    const { addOrEdit, recordForEdit, menus } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('menuId' in fieldValues)
            temp.menuId = fieldValues.menuId ? "" : "This field is required."
        
        
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
                        label="Menu Name"
                        value={values.menuId}
                        onChange={handleInputChange}
                        error={errors.menuId}
                        options={menus ? menus : []}
                    />
                    <Controls.Input
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                    <Controls.Input
                        label="Sub-Title"
                        name="menuId"
                        value={values.menuId}
                        onChange={handleInputChange}
                        error={errors.menuId}
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