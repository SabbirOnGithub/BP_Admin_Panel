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
        if ('uniqueSolutionTitle' in fieldValues)
            temp.uniqueSolutionTitle = fieldValues.uniqueSolutionTitle ? "" : "This field is required."
        if ('uniqueSolutionSubTitle' in fieldValues)
            temp.uniqueSolutionSubTitle = fieldValues.uniqueSolutionSubTitle ? "" : "This field is required."
        if ('personalizedServiceTitle' in fieldValues)
            temp.personalizedServiceTitle = fieldValues.personalizedServiceTitle ? "" : "This field is required."
        if ('personalizedServiceSubTitle' in fieldValues)
            temp.personalizedServiceSubTitle = fieldValues.personalizedServiceSubTitle ? "" : "This field is required."
        if ('modernTechTitle' in fieldValues)
            temp.modernTechTitle = fieldValues.modernTechTitle ? "" : "This field is required."
        if ('modernTechSubTitle' in fieldValues)
            temp.modernTechSubTitle = fieldValues.modernTechSubTitle ? "" : "This field is required."
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
                        label="Hero Text"
                        value={values.heroText}
                        onChange={handleInputChange}
                        error={errors.heroText}
                    />
                    <Controls.Input
                        name="heroSectionDescription"
                        label="Hero Section Description"
                        value={values.heroSectionDescription}
                        onChange={handleInputChange}
                        error={errors.heroSectionDescription}
                    />
                    <Controls.Input
                        name="videoUrl"
                        label="Video Url"
                        value={values.videoUrl}
                        onChange={handleInputChange}
                        error={errors.videoUrl}
                    />
                    <Controls.Input
                        name="heroSectionBackgroundImage"
                        label="Hero Section Background Image"
                        value={values.heroSectionBackgroundImage}
                        onChange={handleInputChange}
                        error={errors.heroSectionBackgroundImage}
                    />
                    <Controls.Input
                        name="shortIntroTitle"
                        label="Short Intro Title"
                        value={values.shortIntroTitle}
                        onChange={handleInputChange}
                        error={errors.shortIntroTitle}
                    />
                    <Controls.Input
                        name="shortIntroSubTitle"
                        label="Picshort Intro Sub Title"
                        value={values.shortIntroSubTitle}
                        onChange={handleInputChange}
                        error={errors.shortIntroSubTitle}
                    /><Controls.Input
                        name="functionAreaWalkthroughTitle"
                        label="Function Area Walkthrough Title"
                        value={values.functionAreaWalkthroughTitle}
                        onChange={handleInputChange}
                        error={errors.functionAreaWalkthroughTitle}
                    />
                    <Controls.Input
                        name="functionAreaWalkthroughSubTitle"
                        label="Function Area Walkthrough Sub Title"
                        value={values.functionAreaWalkthroughSubTitle}
                        onChange={handleInputChange}
                        error={errors.functionAreaWalkthroughSubTitle}
                    />
                    <Controls.Input
                        name="modernTechTitle"
                        label="Modern Tech Title"
                        value={values.modernTechTitle}
                        onChange={handleInputChange}
                        error={errors.modernTechTitle}
                    />
                    <Controls.Input
                        name="modernTechSubTitle"
                        label="Modern Tech Sub Title"
                        value={values.modernTechSubTitle}
                        onChange={handleInputChange}
                        error={errors.modernTechSubTitle}
                    />
                    <Controls.Input
                        name="personalizedServiceTitle"
                        label="Personalized Service Title"
                        value={values.personalizedServiceTitle}
                        onChange={handleInputChange}
                        error={errors.personalizedServiceTitle}
                    />
                    <Controls.Input
                        name="personalizedServiceSubTitle"
                        label="Personalized Service Sub Title"
                        value={values.personalizedServiceSubTitle}
                        onChange={handleInputChange}
                        error={errors.personalizedServiceSubTitle}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="consultingTitle"
                        label="Consulting Title"
                        value={values.consultingTitle}
                        onChange={handleInputChange}
                        error={errors.consultingTitle}
                    /><Controls.Input
                        name="consultingSubTitle"
                        label="Consulting Sub Title"
                        value={values.consultingSubTitle}
                        onChange={handleInputChange}
                        error={errors.consultingSubTitle}
                    />
                    <Controls.Input
                        name="coreValueTitle"
                        label="Core Value Title"
                        value={values.coreValueTitle}
                        onChange={handleInputChange}
                        error={errors.coreValueTitle}
                    />
                    <Controls.Input
                        name="coreValueSubtitle"
                        label="Core Value Sub Title"
                        value={values.coreValueSubtitle}
                        onChange={handleInputChange}
                        error={errors.coreValueSubtitle}
                    /><Controls.Input
                        name="trainingTitle"
                        label="Training Title"
                        value={values.trainingTitle}
                        onChange={handleInputChange}
                        error={errors.trainingTitle}
                    />
                    <Controls.Input
                        name="trainingSubtitile"
                        label="Training Sub Titile"
                        value={values.trainingSubtitile}
                        onChange={handleInputChange}
                        error={errors.trainingSubtitile}
                    />
                    <Controls.Input
                        name="testimonialTitle"
                        label="Testimonial Title"
                        value={values.testimonialTitle}
                        onChange={handleInputChange}
                        error={errors.testimonialTitle}
                    /><Controls.Input
                        name="testimonialSubTitle"
                        label="Testimonial Sub Title"
                        value={values.testimonialSubTitle}
                        onChange={handleInputChange}
                        error={errors.testimonialSubTitle}
                    />

                    <Controls.Input
                        name="uniqueSolutionTitle"
                        label="Unique Solution Title"
                        value={values.uniqueSolutionTitle}
                        onChange={handleInputChange}
                        error={errors.uniqueSolutionTitle}
                    />
                    <Controls.Input
                        name="uniqueSolutionSubTitle"
                        label="Unique Solution Sub Title"
                        value={values.uniqueSolutionSubTitle}
                        onChange={handleInputChange}
                        error={errors.uniqueSolutionSubTitle}
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
