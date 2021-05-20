import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';

const initialFValues = {
    id: '',
    username: '',
    name: '',
    firstName:'',
    lastName:'',
    address: '',
    email: '',
    mobile: '',
    photo: '',
    businessIndustry:'',
    businessName:'',
    companySizeId : '',
    companyTypeId:'', 
    currentConsultingTypeId:'',
}

export default function UserProfileForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, setOpenPopup, openPopup } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        // if ('businessIndustry' in fieldValues)
        //     temp.businessIndustry = fieldValues.businessIndustry ? "" : "This field is required."
        // if ('businessName' in fieldValues)
        //     temp.businessName = fieldValues.businessName ? "" : "This field is required."
        // if ('lastName' in fieldValues)
        //     temp.lastName = fieldValues.lastName ? "" : "This field is required."
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
                console.log(values)
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
                        value={values?.username}
                        onChange={handleInputChange}
                        error={errors.username}
                        disabled={openPopup}

                    />
                    <Controls.Input
                        name="firstName"
                        label="First Name"
                        value={values?.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                        disabled={openPopup}
                    />
                     <Controls.Input
                        name="lastName"
                        label="Last Name"
                        value={values?.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                        disabled={openPopup}
                    />
                     {/* <Controls.Input
                        name="businessIndustry"
                        label="Business Industry"
                        value={values?.businessIndustry}
                        onChange={handleInputChange}
                        error={errors.businessIndustry}
                        disabled={openPopup}
                    />
                     <Controls.Input
                        name="businessName"
                        label="Business Name"
                        value={values?.businessName}
                        onChange={handleInputChange}
                        error={errors.businessName}
                        disabled={openPopup}
                    /> */}
                    
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

                    {/* <Controls.Select
                        name="companySizeId"
                        label="companySizeId"
                        value={values?.companySizeId}
                        onChange={handleInputChange}
                        error={errors.companySizeId}
                        // options={roles ? roles : []}
                        options={[]}
                    /> */}

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

                </Grid>

                <Grid item md={6}>
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
            </Grid>
        </Form>
    )
}
