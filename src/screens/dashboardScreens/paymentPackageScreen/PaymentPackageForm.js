import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    menuId:'',
    subMenuId:'',
    title: '',
    payAmount: '',
    isActive: false,
}

export default function PaymentPackageForm(props) {
    const { addOrEdit, recordForEdit, menus, subMenus } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('menuId' in fieldValues)
            temp.menuId = fieldValues.menuId ? "" : "This field is required."
        if ('subMenuId' in fieldValues)
            temp.subMenuId = fieldValues.subMenuId ? "" : "This field is required."
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('payAmount' in fieldValues)
            temp.payAmount = fieldValues.payAmount ? "" : "This field is required."
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

    const handleSubmit = e => {
        e.preventDefault()
        values["systemName"] = values.title.split(' ').join('_')
        values["payAmount"] = Number(values.payAmount)
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
                <Controls.Select
                        name="menuId"
                        label="Menu Name"
                        value={values.menuId}
                        onChange={handleInputChange}
                        error={errors.menuId}
                        options={menus ? menus : []}
                    />
                     <Controls.Select
                        name="subMenuId"
                        label="Sub Menu Name"
                        value={values.subMenuId}
                        onChange={handleInputChange}
                        error={errors.subMenuId}
                        options={subMenus ? subMenus : []}
                    />
                    <Controls.Input
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                     <Controls.Input
                        label="PayAmount"
                        name="payAmount"
                        type="number"
                        value={values.payAmount}
                        onChange={handleInputChange}
                        error={errors.payAmount}
                       
                    />
                     <Controls.Checkbox
                        name="isActive"
                        label="Active"
                        value={values.isActive}
                        onChange={handleInputChange}
                        error={errors.isActive}
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