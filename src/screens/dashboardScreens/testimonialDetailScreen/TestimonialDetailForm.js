import React, { useEffect } from 'react'
import { Grid, Button} from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    homepageId:'',
    userId:'',
    userName:'',
    isActive: false,
    displayOrder: '',
    message:'',
}

export default function TestimonialDetailForm(props) {
    const { addOrEdit, recordForEdit, homePageDatas } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('homepageId' in fieldValues)
            temp.homepageId = fieldValues.homepageId ? "" : "This field is required."
        if ('userId' in fieldValues)
            temp.userId = fieldValues.userId ? "" : "This field is required."
         if ('userName' in fieldValues)
            temp.userName = fieldValues.userName ? "" : "This field is required."
        if ('displayOrder' in fieldValues)
            temp.displayOrder = fieldValues.displayOrder ? "" : "This field is required."
        if ('message' in fieldValues)
            temp.message = fieldValues.message ? "" : "This field is required."
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
        resetForm,
        files
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
    }, [recordForEdit,setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Select
                        name="homepageId"
                        label="Homepage Id"
                        value={values.homepageId}
                        onChange={handleInputChange}
                        error={errors.homepageId}
                        options={homePageDatas ? homePageDatas : []}
                    />
                    <Controls.Input
                        label="User Id"
                        name="userId"
                        type="number"
                        value={values.userId}
                        onChange={handleInputNumberChange}
                        error={errors.userId}
                    />
                    <Controls.Input
                        label="User Name"
                        name="userName"
                        value={values.userName}
                        onChange={handleInputChange}
                        error={errors.userName}
                    />
                    <Controls.Input
                        label="Message"
                        name="message"
                        value={values.message}
                        onChange={handleInputChange}
                        error={errors.message}
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
                        label="Is Active"
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