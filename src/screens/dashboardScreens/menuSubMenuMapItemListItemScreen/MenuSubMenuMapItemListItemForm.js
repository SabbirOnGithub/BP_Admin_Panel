import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';



const initialFValues = {
    id: '',
    menuSubMenuMapItemId: '',
    text: "",
    isActive: false,
    menuId:'',
    subMenuId:'',
    menuSubMenuMapId:'',
}

export default function MenuSubMenuMapItemListItemForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, menuSubMenuMapItems, menuSubMenuMaps, menus, subMenus } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('menuSubMenuMapItemId' in fieldValues)
            temp.menuSubMenuMapItemId = fieldValues.menuSubMenuMapItemId ? "" : "This field is required."
        if ('text' in fieldValues)
            temp.text = fieldValues.text ? "" : "This field is required."
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
        resetForm,
    } = useForm(initialFValues, true, validate);

    const felteredMenuSubMenuMaps = menuSubMenuMaps.filter(item=>item.menuId === values.menuId && item.subMenuId === values.subMenuId)
    const felteredMenuSubMenuMapItems = menuSubMenuMapItems.filter(item=>item.menuSubMenuMapId === values.menuSubMenuMapId)

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
    }, [ recordForEdit, setValues])

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
                        label="Menu Sub Menu Map Name" 
                        name="menuSubMenuMapId"
                        value={values.menuSubMenuMapId}
                        onChange={handleInputChange}
                        error={errors.menuSubMenuMapId}
                        options={menuSubMenuMaps && felteredMenuSubMenuMaps ? felteredMenuSubMenuMaps : []}
                    />
                    <Controls.Select
                        name="menuSubMenuMapItemId"
                        label="Menu Sub Menu Map Item"
                        value={values.menuSubMenuMapItemId}
                        onChange={handleInputChange}
                        error={errors.menuSubMenuMapItemId}
                        options={menuSubMenuMapItems && felteredMenuSubMenuMapItems ? felteredMenuSubMenuMapItems : []}
                    />
                    <Controls.Input
                        name="text"
                        label="Text"
                        value={values.text}
                        onChange={handleInputChange}
                        error={errors.text}
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
