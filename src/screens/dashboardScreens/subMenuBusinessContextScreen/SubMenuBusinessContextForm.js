import React, { useEffect } from 'react'
import { Grid, Button } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';
import { EditorState } from 'draft-js';


const initialFValues = {
    id: '',
    subMenuId:'',
    title: '',
    description: EditorState.createEmpty(),
    pictureUrl: '',
}

export default function SubMenuBusinessContextForm(props) {
    const { addOrEdit, recordForEdit, subMenus } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('subMenuId' in fieldValues)
            temp.subMenuId = fieldValues.subMenuId ? "" : "This field is required."
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        // if ('description' in fieldValues)
        //     temp.description = fieldValues.description ? "" : "This field is required."
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
        handleEditorInput
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
                    <Controls.Select
                        name="subMenuId"
                        label="SubMenu"
                        value={values.subMenuId}
                        onChange={handleInputChange}
                        error={errors.subMenuId}
                        options={subMenus ? subMenus : []}
                    />
                    <Controls.Input
                        label="Title"
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                    {/* <Controls.Input
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    /> */}
                    <Controls.RichTextEditor
                        onEditorStateChange={value => handleEditorInput('description', value)} //handleEditorInput(name, value)
                        placeholder="Description here..."
                    />
                    <div style={{ margin: 5 }}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                         <input
                                type="file"
                                onChange={handleFileChange}
                                hidden
                            />
                        </Button>
                        <span style={{ marginLeft: 5 }}>{files ? files.name : 'no file'}</span>
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