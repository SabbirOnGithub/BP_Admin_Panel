import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';

const initialFValues = {
    id: '',
    homepageId: '',
    name: '',
    overViewTitle: '',
    overViewSubtitle: '',
    bestPracticeTitle: '',
    bestPracticeSubtitle: '',
    pictureUrl:null,
    overViewBackgroundPicture: null,
    bestPracticeBackgroundPicture: null,
}

export default function SubMenuForm(props) {
    const { addOrEdit, recordForEdit, homePageDatas } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('homepageId' in fieldValues)
            temp.homepageId = fieldValues.homepageId ? "" : "This field is required."
        // if ('overViewTitle' in fieldValues)
        //     temp.overViewTitle = fieldValues.overViewTitle ? "" : "This field is required."


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
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                <Controls.Select
                        name="homepageId"
                        label="Homepage"
                        value={values.homepageId}
                        onChange={handleInputChange}
                        error={errors.homepageId}
                        options={homePageDatas ? homePageDatas : []}
                    />
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        readOnly
                    />
                    

                    <Controls.Input
                        name="overViewTitle"
                        label="Over View Title"
                        value={values.overViewTitle}
                        onChange={handleInputChange}
                        error={errors.overViewTitle}
                    />
                    <Controls.Input
                        name="overViewSubtitle"
                        label="Over View Subtitle"
                        value={values.overViewSubtitle}
                        onChange={handleInputChange}
                        error={errors.overViewSubtitle}
                    />
                    <Controls.Input
                        name="bestPracticeTitle"
                        label="Best Practice Title"
                        value={values.bestPracticeTitle}
                        onChange={handleInputChange}
                        error={errors.bestPracticeTitle}
                    />
                    <Controls.Input
                        name="bestPracticeSubtitle"
                        label="Best Practice Subtitle"
                        value={values.bestPracticeSubtitle}
                        onChange={handleInputChange}
                        error={errors.bestPracticeSubtitle}
                    />
                    <Controls.FileInput
                        name="pictureUrl"
                        label="Sub Menu Picture"
                        value={values.pictureUrl}
                        onChange={handleFileChange}
                        error={errors.pictureUrl}
                        resetFileInput = {resetFileInput}
                    />

                    <Controls.FileInput
                        name="overViewBackgroundPicture"
                        label="OverView Background Picture"
                        value={values.overViewBackgroundPicture}
                        onChange={handleFileChange}
                        error={errors.overViewBackgroundPicture}
                        resetFileInput = {resetFileInput}
                    />

                    <Controls.FileInput
                        name="bestPracticeBackgroundPicture"
                        label="BestPractice Background Picture"
                        value={values.bestPracticeBackgroundPicture}
                        onChange={handleFileChange}
                        error={errors.bestPracticeBackgroundPicture}
                        resetFileInput = {resetFileInput}
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