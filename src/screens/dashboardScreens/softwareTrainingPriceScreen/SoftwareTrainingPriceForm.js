import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    softwareId: '',
    trainingTypeId: '',
    price: '',
    discountPrice: '',
}

export default function SoftwareTrainingPriceForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, trainingTypes, softwares } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('softwareId' in fieldValues)
            temp.softwareId = fieldValues.softwareId ? "" : "This field is required."
        if ('trainingTypeId' in fieldValues)
            temp.trainingTypeId = fieldValues.trainingTypeId ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "This field is required."
        if ('discountPrice' in fieldValues)
            temp.discountPrice = fieldValues.discountPrice ? "" : "This field is required."
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
        resetForm
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
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                <Controls.Select
                        name="softwareId"
                        label="Software"
                        value={values.softwareId}
                        onChange={handleInputChange}
                        error={errors.softwareId}
                        options={softwares ? softwares : []}
                    />
                    <Controls.Select
                        name="trainingTypeId"
                        label="Training Type"
                        value={values.trainingTypeId}
                        onChange={handleInputChange}
                        error={errors.trainingTypeId}
                        options={trainingTypes ? trainingTypes : []}
                    />
                    <Controls.Input
                        label="Price"
                        name="price"
                        type="number"
                        value={values.price}
                        onChange={handleInputNumberChange}
                        error={errors.price}
                       
                    />
                    <Controls.Input
                        label="DiscountPrice"
                        name="discountPrice"
                        type="number"
                        value={values.discountPrice}
                        onChange={handleInputNumberChange}
                        error={errors.discountPrice}
                       
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
