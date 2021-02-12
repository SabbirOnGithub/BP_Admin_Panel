import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';
import { EditorState, ContentState, convertToRaw  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';


const initialFValues = {
    id: '',
    title: EditorState.createEmpty(),
    subTitle: '',
    pictureUrl: '',
    isActive: false,
    displayOrder:'',
}

export default function HomepageSliderForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('subTitle' in fieldValues)
            temp.subTitle = fieldValues.subTitle ? "" : "This field is required."
        if ('displayOrder' in fieldValues)
            temp.displayOrder = fieldValues.displayOrder ? "" : "This field is required."
        
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
        handleEditorInput,
        resetFileInput

    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        
        if (validate()) {
            try{
                values['title'] = draftToHtml(convertToRaw(values.title.getCurrentContent()))
            }
            catch(e){
                console.log(e)
            }
            finally{
                addOrEdit(values, resetForm);
            }
        }
    }

    useEffect(() => {

        if (recordForEdit != null){
            try {    
                setValues({
                    ...recordForEdit
                })
              } catch (e) {
                console.warn(e);
              } finally {
                // console.log('state set done')
                const html = recordForEdit.title;
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const title = EditorState.createWithContent(contentState);
                    setValues({
                        ...recordForEdit,
                        title
                    })
                }

              }
        }
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.RichTextEditor
                        onEditorStateChange={value => handleEditorInput('title', value)} //handleEditorInput(name, value)
                        placeholder="Title here..."
                        editorState = {values.title}
                    />
                    <Controls.Input
                        label="Sub-Title"
                        name="subTitle"
                        value={values.subTitle}
                        onChange={handleInputChange}
                        error={errors.subTitle}
                    />
                    <Controls.Input
                        label="Display Order"
                        name="displayOrder"
                        type="number"
                        value={values.displayOrder}
                        onChange={handleInputChange}
                        error={errors.displayOrder}
                       
                    />
                    <Controls.Checkbox
                        name="isActive"
                        label="isActive"
                        value={values.isActive}
                        onChange={handleInputChange}
                        error={errors.isActive}
                    />
                    <Controls.FileInput
                        name="pictureUrl"
                        label="Picture"
                        value={values.pictureUrl}
                        onChange={handleFileChange}
                        error={errors.pictureUrl}
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