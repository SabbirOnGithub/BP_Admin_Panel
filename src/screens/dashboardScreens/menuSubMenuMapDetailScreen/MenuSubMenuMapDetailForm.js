import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';
import { EditorState, ContentState, convertToRaw  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';


const initialFValues = {
    id: '',
    menuSubMenuMapId: '',
    title: '',
    subTitle: '',
    description: EditorState.createEmpty(),
    pictureUrl: '',
    menuId: '',
    subMenuId: '',
}

export default function MenuSubMenuMapDetailForm(props) {
    const { addOrEdit, recordForEdit, menuSubMenuMaps, menus, subMenus } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('menuSubMenuMapId' in fieldValues)
            temp.menuSubMenuMapId = fieldValues.menuSubMenuMapId ? "" : "This field is required."
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('subTitle' in fieldValues)
            temp.subTitle = fieldValues.subTitle ? "" : "This field is required."
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

    const felteredMenuSubMenuMaps = menuSubMenuMaps.filter(item => item.menuId === values.menuId && item.subMenuId === values.subMenuId)


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
                        label="Menu Title"
                        value={values.menuId}
                        onChange={handleInputChange}
                        error={errors.menuId}
                        options={menus ? menus : []}
                    />
                    <Controls.Select
                        name="subMenuId"
                        label="Sub Menu Title"
                        value={values.subMenuId}
                        onChange={handleInputChange}
                        error={errors.subMenuId}
                        options={subMenus ? subMenus : []}
                    />
                    <Controls.Select
                        name="menuSubMenuMapId"
                        label="Menu Sub Menu Map Title"
                        value={values.menuSubMenuMapId}
                        onChange={handleInputChange}
                        error={errors.menuSubMenuMapId}
                        options={menuSubMenuMaps && felteredMenuSubMenuMaps ? felteredMenuSubMenuMaps : []}
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