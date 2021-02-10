import React, { useEffect } from 'react'
import { Grid, Button } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';
import { EditorState, ContentState, convertToRaw  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const initialFValues = {
    id: '',
    homepageId: '',
    name: '',
    shortDescription: EditorState.createEmpty(),
    pictureName: '',
    isActive: false,
    displayOrder: '',
    pictureUrl:'',
}

export default function ShortIntroForm(props) {
    const { addOrEdit, recordForEdit, homePageDatas } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('homepageId' in fieldValues)
            temp.homepageId = fieldValues.homepageId ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.fullName = fieldValues.name ? "" : "This field is required."
        // if ('shortDescription' in fieldValues)
        //     temp.shortDescription = fieldValues.shortDescription ? "" : "This field is required."
        if ('displayOrder' in fieldValues)
            // temp.displayOrder = fieldValues.displayOrder && typeof(fieldValues.displayOrder)==='number'? "" : "This field is required."
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
        handleInputNumberChange,
        resetForm,
        files,
        handleEditorInput

    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        // if (validate()) {
        //     addOrEdit(values, files, resetForm);
        // }
        if (validate()) {
            try{
                values['shortDescription'] = draftToHtml(convertToRaw(values.shortDescription.getCurrentContent()))
            }
            catch(e){
                console.log(e)
            }
            finally{
                addOrEdit(values, files, resetForm);
            }
        }
    }

    useEffect(() => {
        // if (recordForEdit != null)
        //     setValues({
        //         ...recordForEdit
        //     })
        if (recordForEdit != null){
            try {    
                setValues({
                    ...recordForEdit
                })
              } catch (e) {
                console.warn(e);
              } finally {
                console.log('state set done')
                const html = recordForEdit.shortDescription;
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const shortDescription = EditorState.createWithContent(contentState);
                setValues({
                    ...recordForEdit,
                    shortDescription
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
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    
                    <Controls.RichTextEditor
                        onEditorStateChange={value => handleEditorInput('shortDescription', value)} //handleEditorInput(name, value)
                        placeholder="shortDescription here..."
                        editorState = {values.shortDescription}
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
                        label="isActive"
                        value={values.isActive}
                        onChange={handleInputChange}
                        error={errors.isActive}
                    />
                    <div style={{ margin: 5 }}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                         <input
                                name='pictureUrl'
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