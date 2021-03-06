import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';
import { EditorState, ContentState, convertToRaw  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const initialFValues = {
    id: '',
    title: '',
    content: EditorState.createEmpty(),
    tags: '',
    published: false,
    blogSubCategoryId: '',
    pictureUrl: '',
}

export default function BlogPostForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, blogSubCategorys, setOpenPopup } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('tags' in fieldValues)
            temp.tags = fieldValues.tags ? "" : "This field is required."
        if ('blogSubCategoryId' in fieldValues)
            temp.blogSubCategoryId = fieldValues.blogSubCategoryId ? "" : "This field is required."
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
                values['content'] = draftToHtml(convertToRaw(values.content.getCurrentContent()))
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
                console.log('state set done')
                const html = recordForEdit.content;
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const content = EditorState.createWithContent(contentState);
                setValues({
                    ...recordForEdit,
                    content
                })
                }

              }
        }
            
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Select
                        name="blogSubCategoryId"
                        label="Blog SubCategory"
                        value={values.blogSubCategoryId}
                        onChange={handleInputChange}
                        error={errors.blogSubCategoryId}
                        options={blogSubCategorys ? blogSubCategorys : []}
                    />
                    <Controls.Input
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                    <Controls.RichTextEditor
                        onEditorStateChange={value => handleEditorInput('content', value)} //handleEditorInput(name, value)
                        placeholder="Content here..."
                        editorState = {values.content}
                    />
                    <Controls.Input
                        name="tags"
                        label="Tags"
                        value={values.tags}
                        onChange={handleInputChange}
                        error={errors.tags}
                    />
                    <Controls.Checkbox
                        name="published"
                        label="Published"
                        value={values.published}
                        onChange={handleInputChange}
                        error={errors.published}
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
                            <Controls.Button
                                text="Close"
                                color="default"
                                onClick={()=>{setOpenPopup(false)}}
                            />
                        </>
                            )
                        }
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
