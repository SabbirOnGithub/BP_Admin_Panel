import React, { useEffect } from 'react'
import { Grid, Button} from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    menuSubMenuMapId:'',
    title: '',
    subTitle: '',
    description:'',
    pictureUrl: '',
    menuId:'',
    subMenuId:'',
}

export default function MenuSubMenuMapDetailForm(props) {
    const { addOrEdit, recordForEdit, menuSubMenuMaps, menus, subMenus } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('menuSubMenuMapId' in fieldValues)
            temp.menuSubMenuMapId = fieldValues.menuSubMenuMapId ? "" : "This field is required."
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('subTitle' in fieldValues)
            temp.subTitle = fieldValues.subTitle ? "" : "This field is required."
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

    const felteredMenuSubMenuMaps = menuSubMenuMaps.filter(item=>item.menuId === values.menuId && item.subMenuId === values.subMenuId)


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
                        name="subMenuId"
                        label="Sub Menu Title"
                        value={values.subMenuId}
                        onChange={handleInputChange}
                        error={errors.subMenuId}
                        options={subMenus ? subMenus : []}
                    />
                <Controls.Select
                        name="menuSubMenuMapId"
                        label="Menu Sub Menu Map Title"
                        value={values.menuSubMenuMapId}
                        onChange={handleInputChange}
                        error={errors.menuSubMenuMapId}
                        options={menuSubMenuMaps && felteredMenuSubMenuMaps ? felteredMenuSubMenuMaps : []}
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
                        name="subTitle"
                        value={values.subTitle}
                        onChange={handleInputChange}
                        error={errors.subTitle}
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