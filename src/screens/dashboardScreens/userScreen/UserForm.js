import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    username: "",
    password: "",
    roleId: "",
    name: "",
    // isActive: false,
    email: "",
    mobile: "",
    address: "",
    photo:"",
    isActive: false,
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, roles } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        if ('roleId' in fieldValues)
            temp.roleId = fieldValues.roleId ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
            // temp.email = fieldValues.email ? "" : "This field is required."
        if ('mobile' in fieldValues)
            // temp.mobile = fieldValues.mobile ? "" : "This field is required."
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."
        
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
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            !recordForEdit.password ? setValues({
                ...recordForEdit, password:''
            }) :
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input
                        name="username"
                        label="User Name"
                        value={values?.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <Controls.Input
                        name="password"
                        label="Password"
                        type="password"
                        value={values?.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <Controls.Select
                        name="roleId"
                        label="Role"
                        value={values?.roleId}
                        onChange={handleInputChange}
                        error={errors.roleId}
                        options={roles ? roles : []}
                    />
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values?.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="email"
                        label="Email"
                        type="email"
                        value={values?.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        name="mobile"
                        label="Mobile"
                        type="tel"
                        value={values?.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        name="address"
                        label="Address"
                        value={values?.address}
                        onChange={handleInputChange}
                        error={errors.address}
                    />
                    <Controls.Checkbox
                        name="isActive"
                        label="Is Active"
                        value={values?.isActive ? values?.isActive : false}
                        onChange={handleInputChange}
                        error={errors.isActive}
                    />
                   
                    <Controls.FileInput
                        name="photo"
                        label="Photo"
                        value={values.photo}
                        onChange={handleFileChange}
                        error={errors.photo}
                        resetFileInput = {resetFileInput}
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
