import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';

const initialFValues = {
    id: '',
    username: '',
    name: '',
    address: '',
    email: '',
    mobile: '',
    photo: ''
}

export default function UserProfileForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, setOpenPopup, openPopup } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
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
            try {
                addOrEdit(values, resetForm);
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        if (recordForEdit != null) {
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
                <Grid item md={6}>
                    <Controls.Input
                        name="username"
                        label="Username"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                        disabled={openPopup}

                    />
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        disabled={openPopup}
                    />
                    {!openPopup &&

                        <Controls.FileInput
                            name="photo"
                            label="Photo"
                            value={values.photo}
                            onChange={handleFileChange}
                            error={errors.photo}
                            resetFileInput={resetFileInput}
                        />
                    }

                    {!openPopup &&
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
                                <Controls.Button
                                    text="Back"
                                    color="default"
                                    onClick={() => { setOpenPopup(!openPopup) }}
                                />
                            </>
                                )
                            }
                        </div>
                    }
                </Grid>
                <Grid item md={6}>


                    <Controls.Input
                        name="address"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address}
                        disabled={openPopup}
                    />
                    <Controls.Input
                        name="mobile"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                        disabled={openPopup}
                    />




                </Grid>

            </Grid>
        </Form>
    )
}
