import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';
import { EditorState, ContentState, convertToRaw  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const initialFValues = {
    id: '',
    menuId:'',
    subMenuId:'',
    title: '',
    subTitle: '',
    sectionTitle:'',
    sectionSubTitle:'',
    sectionOrder:'',
    header:'',
    description: EditorState.createEmpty(),
    pictureUrl: '',
    sectionPictureUrl: '',
}

export default function MenuSubMenuMapForm(props) {
    const { addOrEdit, recordForEdit, menus, subMenus } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('menuId' in fieldValues)
            temp.menuId = fieldValues.menuId ? "" : "This field is required."
        if ('subMenuId' in fieldValues)
            temp.subMenuId = fieldValues.subMenuId ? "" : "This field is required."
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('subTitle' in fieldValues)
            temp.subTitle = fieldValues.subTitle ? "" : "This field is required."
        if ('header' in fieldValues)
            temp.header = fieldValues.header ? "" : "This field is required."
        if ('sectionOrder' in fieldValues)
            temp.sectionOrder = fieldValues.sectionOrder ? "" : "This field is required."
        if ('sectionTitle' in fieldValues)
            temp.sectionTitle = fieldValues.sectionTitle ? "" : "This field is required."
        if ('sectionSubTitle' in fieldValues)
            temp.sectionSubTitle = fieldValues.sectionSubTitle ? "" : "This field is required."
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
                values['description'] = draftToHtml(convertToRaw(values.description.getCurrentContent()))
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
                const html = recordForEdit.description;
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const description = EditorState.createWithContent(contentState);
                setValues({
                    ...recordForEdit,
                    description
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
                        name="menuId"
                        label="Menu Name"
                        value={values.menuId}
                        onChange={handleInputChange}
                        error={errors.menuId}
                        options={menus ? menus : []}
                    />
                     <Controls.Select
                        name="subMenuId"
                        label="Sub Menu Name"
                        value={values.subMenuId}
                        onChange={handleInputChange}
                        error={errors.subMenuId}
                        options={subMenus ? subMenus : []}
                    />
                    <Controls.Input
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                    <Controls.Input
                        label="Sub-Title"
                        name="subTitle"
                        value={values.subTitle}
                        onChange={handleInputChange}
                        error={errors.subTitle}
                    />
                    <Controls.Input
                        name="sectionTitle"
                        label="Section Title"
                        value={values.sectionTitle}
                        onChange={handleInputChange}
                        error={errors.sectionTitle}
                    />
                    <Controls.Input
                        label="Section Subtitle"
                        name="sectionSubTitle"
                        value={values.sectionSubTitle}
                        onChange={handleInputChange}
                        error={errors.sectionSubTitle}
                    />
                    <Controls.Input
                        label="Section Order"
                        name="sectionOrder"
                        type="number"
                        value={values.sectionOrder}
                        onChange={handleInputChange}
                        error={errors.sectionOrder}
                       
                    />
                    <Controls.Input
                        label="Header"
                        name="header"
                        value={values.header}
                        onChange={handleInputChange}
                        error={errors.header}
                    />
                    <Controls.RichTextEditor
                        onEditorStateChange={value => handleEditorInput('description', value)} //handleEditorInput(name, value)
                        placeholder="Description here..."
                        editorState = {values.description}
                    />
                    <Controls.FileInput
                        name="pictureUrl"
                        label="Picture"
                        value={values.pictureUrl}
                        onChange={handleFileChange}
                        error={errors.pictureUrl}
                        resetFileInput = {resetFileInput}
                    />
                    <Controls.FileInput
                        name="sectionPictureUrl"
                        label="Section Picture"
                        value={values.sectionPictureUrl}
                        onChange={handleFileChange}
                        error={errors.sectionPictureUrl}
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