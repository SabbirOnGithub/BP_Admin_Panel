import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { useForm, Form } from '../../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    status:1,
}
// hard coded to both frontend and backend
// const ctaFunctionStatus = [
//     {
//         title: 'Requested',
//         value:1
//     },
//     {
//         title: 'Inprogress',
//         value:2
//     },
//     {
//         title: 'Done',
//         value:3
//     },
// ]

export default function CtaFunctionStatusUpdateForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, setRecordForEdit, setOpenPopup, ctaFunctionStatus} = props
    // console.log(recordForEdit)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('status' in fieldValues)
            temp.status = fieldValues.status ? "" : "This field is required."
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
             addOrEdit(values, resetForm)
             .then(res=>{
                 if(res.status){
                    setRecordForEdit(null)
                    setOpenPopup(false)
                 }
             })
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                id: recordForEdit.id, 
                status:recordForEdit.status
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Select
                        name="status"
                        label="Status"
                        value={values?.status ? values?.status : ''}
                        onChange={handleInputChange}
                        error={errors.status}
                        // options={consultancyReceiveHistoryStatuses ? consultancyReceiveHistoryStatuses : []}
                        options={ctaFunctionStatus}
                        // disabled = {!isAdminUser() ? true : false}

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
