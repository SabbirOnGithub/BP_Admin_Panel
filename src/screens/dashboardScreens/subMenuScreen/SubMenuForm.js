import React, { useEffect } from 'react'
import { Grid, Button } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';

const initialFValues = {
    id: '',
    name: '',
    overViewTitle: '',
    overViewSubtitle: '',
    bestPracticeTitle: '',
    bestPracticeSubtitle: '',
    overViewBackgroundPicture: '',
    bestPracticeBackgroundPicture: '',
}

export default function SubMenuForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
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
        files,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, files, resetForm);
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
                    <div style={{ margin: 5, marginBottom: 10 }}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                         <input
                                name="overViewBackgroundPicture"
                                type="file"
                                onChange={handleFileChange}
                                hidden
                            />
                        </Button>
                        <span style={{ marginLeft: 5 }}>{values.overViewBackgroundPicture ? values.overViewBackgroundPicture.name : 'no file'}</span>
                        <span style={{ fontSize: 14, margin: 5 }}> OverView Background Picture </span>
                    </div>
                    <div style={{ margin: 5, marginBottom: 10 }}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                         <input
                                name="bestPracticeBackgroundPicture"
                                type="file"
                                onChange={handleFileChange}
                                hidden
                            />
                        </Button>
                        <span style={{ marginLeft: 5 }}>{values.bestPracticeBackgroundPicture ? values.bestPracticeBackgroundPicture.name : 'no file'}</span>
                        <span style={{ fontSize: 14, margin: 5 }}> Best Practice Background Picture</span>
                    </div>
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