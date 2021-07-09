import React, { useState, useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { useForm, Form } from '../../../../components/UseForm/useForm';
import Alert from '@material-ui/lab/Alert';

const initialFValues = {
    id: '',
    ctaFunctionId: '',
    userEmail:'',
}

export default function ConsultancyAssignmentForm(props) {
    const { addOrEditConsultancyAssign, recordForEdit, loadingSave, setRecordForEdit, setOpenPopupForAssign } = props

    const [errorMessage, setErrorMessage] = useState(null)

    // console.log(recordForEdit)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('userEmail' in fieldValues)
            temp.userEmail = (/$^|.+@.+..+/).test(fieldValues.userEmail) ? "" : "Email is not valid."

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
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(values)
        if (validate()) {
             addOrEditConsultancyAssign(values, resetForm)
             .then(res=>{
                 if(res.status){
                    resetForm();
                    setRecordForEdit(null);
                    setOpenPopupForAssign(false);
                 }else{
                    setErrorMessage(res?.message)
                 }
                //  console.log(res)
             })
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ctaFunctionId: recordForEdit.id, 
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input
                        name="userEmail"
                        label="Assign by email"
                        value={values?.userEmail}
                        onChange={handleInputChange}
                        error={errors.userEmail}
                    />
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

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
