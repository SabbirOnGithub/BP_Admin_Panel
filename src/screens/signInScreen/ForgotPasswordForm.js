import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
        userId: '',
        userEmail: '',
        passwordRecoveryCode: null,
        password: null,
        confirmPassword: null
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, roles } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
       
        // if ('username' in fieldValues)
        //     temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."
        if ('roleId' in fieldValues)
            temp.roleId = fieldValues.roleId ? "" : "This field is required."
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('email' in fieldValues)
            (temp.email = fieldValues.email ? "" : "This field is required.") || (temp.email = (/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})?$/).test(fieldValues.email) ? "" : "Email is not valid.")
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
        resetForm,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
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
                        name="email"
                        label="Email"
                        type="email"
                        value={values?.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                     <Controls.Input
                        name="passwordRecoveryCode"
                        label="Password Recovery Code"
                        type="passwordRecoveryCode"
                        value={values?.passwordRecoveryCode}
                        onChange={handleInputChange}
                        error={errors.passwordRecoveryCode}
                    />
                    <Controls.Input
                        name="password"
                        label="Password"
                        type="password"
                        value={values?.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <Controls.Input
                        name="confirmPassword"
                        label="Confirm Password"
                        type="confirmPassword"
                        value={values?.confirmPassword}
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
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
