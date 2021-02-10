import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';
import { EditorState, ContentState, convertToRaw  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const initialFValues = {
    id: '',
    homepageId:'',
    userId:'',
    userName:'',
    isActive: false,
    displayOrder: '',
    message:EditorState.createEmpty(),
}

export default function TestimonialDetailForm(props) {
    const { addOrEdit, recordForEdit, homePageDatas, users } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('homepageId' in fieldValues)
            temp.homepageId = fieldValues.homepageId ? "" : "This field is required."
        if ('userId' in fieldValues)
            temp.userId = fieldValues.userId ? "" : "This field is required."
         if ('userName' in fieldValues)
            temp.userName = fieldValues.userName ? "" : "This field is required."
        if ('displayOrder' in fieldValues)
            temp.displayOrder = fieldValues.displayOrder ? "" : "This field is required."
        // if ('message' in fieldValues)
        //     temp.message = fieldValues.message ? "" : "This field is required."
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
        resetForm,
        handleEditorInput
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        // console.log(values)
        if (validate()) {
            try{
                values['message'] = draftToHtml(convertToRaw(values.message.getCurrentContent()))
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
                const html = recordForEdit.message;
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const message = EditorState.createWithContent(contentState);
                setValues({
                    ...recordForEdit,
                    message
                })
                }

              }
        }
    }, [recordForEdit,setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Select
                        name="homepageId"
                        label="Homepage Id"
                        value={values.homepageId}
                        onChange={handleInputChange}
                        error={errors.homepageId}
                        options={homePageDatas ? homePageDatas : []}
                    />
                    {/* <Controls.Input
                        label="User Id"
                        name="userId"
                        type="number"
                        value={values.userId}
                        onChange={handleInputNumberChange}
                        error={errors.userId}
                    /> */}
                    <Controls.Select
                        name="userId"
                        label="User"
                        value={values.userId}
                        onChange={handleInputChange}
                        error={errors.userId}
                        options={users ? users : []}
                    />
                    <Controls.Input
                        label="User Name"
                        name="userName"
                        value={values.userName}
                        onChange={handleInputChange}
                        error={errors.userName}
                    />
                    {/* <Controls.Input
                        label="Message"
                        name="message"
                        value={values.message}
                        onChange={handleInputChange}
                        error={errors.message}
                    /> */}
                    <Controls.RichTextEditor
                        onEditorStateChange={value => handleEditorInput('message', value)} //handleEditorInput(name, value)
                        placeholder="Message here..."
                        editorState = {values.message}
                    />
                    <Controls.Input
                        label="Display Order"
                        name="displayOrder"
                        type="number"
                        value={values.displayOrder}
                        onChange={handleInputNumberChange}
                        error={errors.displayOrder}
                    />
                     <Controls.Checkbox
                        name="isActive"
                        label="Is Active"
                        value={values.isActive}
                        onChange={handleInputChange}
                        error={errors.isActive}
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