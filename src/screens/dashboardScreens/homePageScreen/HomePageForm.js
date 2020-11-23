import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    heroText: "",
    heroSectionDescription: "",
    videoUrl: "",
    heroSectionBackgroundImage: "",
    shortIntroTitle: "",
    shortIntroSubTitle: "",
    functionAreaWalkthroughTitle: "",
    functionAreaWalkthroughSubTitle: "",
    consultingTitle: "",
    consultingSubTitle: "",
    coreValueTitle: "",
    coreValueSubtitle: "",
    trainingTitle: "",
    trainingSubtitile: "",
    testimonialTitle: "",
    testimonialSubTitle: ""

}

export default function HomePageForm(props) {
    const { addOrEdit, recordForEdit, loadingSave } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('heroText' in fieldValues)
            temp.heroText = fieldValues.heroText ? "" : "This field is required."
        if ('heroSectionDescription' in fieldValues)
            temp.heroSectionDescription = fieldValues.heroSectionDescription ? "" : "This field is required."
        if ('videoUrl' in fieldValues)
            temp.videoUrl = fieldValues.videoUrl ? "" : "This field is required."
        if ('heroSectionBackgroundImage' in fieldValues)
            temp.heroSectionBackgroundImage = fieldValues.heroSectionBackgroundImage ? "" : "This field is required."
        if ('shortIntroTitle' in fieldValues)
            temp.shortIntroTitle = fieldValues.shortIntroTitle ? "" : "This field is required."
        if ('shortIntroSubTitle' in fieldValues)
            temp.shortIntroSubTitle = fieldValues.shortIntroSubTitle ? "" : "This field is required."
        if ('functionAreaWalkthroughTitle' in fieldValues)
            temp.functionAreaWalkthroughTitle = fieldValues.functionAreaWalkthroughTitle ? "" : "This field is required."
        if ('functionAreaWalkthroughSubTitle' in fieldValues)
            temp.functionAreaWalkthroughSubTitle = fieldValues.functionAreaWalkthroughSubTitle ? "" : "This field is required."
        if ('consultingTitle' in fieldValues)
            temp.consultingTitle = fieldValues.consultingTitle ? "" : "This field is required."
        if ('consultingSubTitle' in fieldValues)
            temp.consultingSubTitle = fieldValues.consultingSubTitle ? "" : "This field is required."
        if ('coreValueTitle' in fieldValues)
            temp.coreValueTitle = fieldValues.coreValueTitle ? "" : "This field is required."
        if ('coreValueSubtitle' in fieldValues)
            temp.coreValueSubtitle = fieldValues.coreValueSubtitle ? "" : "This field is required."
        if ('trainingTitle' in fieldValues)
            temp.trainingTitle = fieldValues.trainingTitle ? "" : "This field is required."
        if ('trainingSubtitile' in fieldValues)
            temp.trainingSubtitile = fieldValues.trainingSubtitile ? "" : "This field is required."
        if ('testimonialTitle' in fieldValues)
            temp.testimonialTitle = fieldValues.testimonialTitle ? "" : "This field is required."
        if ('testimonialSubTitle' in fieldValues)
            temp.testimonialSubTitle = fieldValues.testimonialSubTitle ? "" : "This field is required."
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
                <Grid item xs={6}>
                    <Controls.Input
                        name="heroText"
                        label="heroText"
                        value={values.heroText}
                        onChange={handleInputChange}
                        error={errors.heroText}
                    />
                    <Controls.Input
                        name="heroSectionDescription"
                        label="heroSectionDescription"
                        value={values.heroSectionDescription}
                        onChange={handleInputChange}
                        error={errors.heroSectionDescription}
                    />
                    <Controls.Input
                        label="videoUrl"
                        name="videoUrl"
                        value={values.videoUrl}
                        onChange={handleInputChange}
                        error={errors.videoUrl}
                    />
                    <Controls.Input
                        name="heroSectionBackgroundImage"
                        label="heroSectionBackgroundImage"
                        value={values.heroSectionBackgroundImage}
                        onChange={handleInputChange}
                        error={errors.heroSectionBackgroundImage}
                    />
                    <Controls.Input
                        label="shortIntroTitle"
                        name="shortIntroTitle"
                        value={values.shortIntroTitle}
                        onChange={handleInputChange}
                        error={errors.shortIntroTitle}
                    />
                    <Controls.Input
                        label="PicshortIntroSubTitleture"
                        name="shortIntroSubTitle"
                        value={values.shortIntroSubTitle}
                        onChange={handleInputChange}
                        error={errors.shortIntroSubTitle}
                    /><Controls.Input
                        name="functionAreaWalkthroughTitle"
                        label="functionAreaWalkthroughTitle"
                        value={values.functionAreaWalkthroughTitle}
                        onChange={handleInputChange}
                        error={errors.functionAreaWalkthroughTitle}
                    />
                    <Controls.Input
                        label="functionAreaWalkthroughSubTitle"
                        name="functionAreaWalkthroughSubTitle"
                        value={values.functionAreaWalkthroughSubTitle}
                        onChange={handleInputChange}
                        error={errors.functionAreaWalkthroughSubTitle}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="consultingTitle"
                        name="consultingTitle"
                        value={values.consultingTitle}
                        onChange={handleInputChange}
                        error={errors.consultingTitle}
                    /><Controls.Input
                        name="consultingSubTitle"
                        label="consultingSubTitle"
                        value={values.consultingSubTitle}
                        onChange={handleInputChange}
                        error={errors.consultingSubTitle}
                    />
                    <Controls.Input
                        label="coreValueTitle"
                        name="coreValueTitle"
                        value={values.coreValueTitle}
                        onChange={handleInputChange}
                        error={errors.coreValueTitle}
                    />
                    <Controls.Input
                        label="coreValueSubtitle"
                        name="coreValueSubtitle"
                        value={values.coreValueSubtitle}
                        onChange={handleInputChange}
                        error={errors.coreValueSubtitle}
                    /><Controls.Input
                        name="trainingTitle"
                        label="trainingTitle"
                        value={values.trainingTitle}
                        onChange={handleInputChange}
                        error={errors.trainingTitle}
                    />
                    <Controls.Input
                        label="trainingSubtitile"
                        name="trainingSubtitile"
                        value={values.trainingSubtitile}
                        onChange={handleInputChange}
                        error={errors.trainingSubtitile}
                    />
                    <Controls.Input
                        label="testimonialTitle"
                        name="testimonialTitle"
                        value={values.testimonialTitle}
                        onChange={handleInputChange}
                        error={errors.testimonialTitle}
                    /><Controls.Input
                        name="testimonialSubTitle"
                        label="testimonialSubTitle"
                        value={values.testimonialSubTitle}
                        onChange={handleInputChange}
                        error={errors.testimonialSubTitle}
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
