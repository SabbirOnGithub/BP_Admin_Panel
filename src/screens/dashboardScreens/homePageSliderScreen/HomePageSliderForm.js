import React, { useEffect } from 'react'
import { Grid, Button} from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';
import { EditorState, ContentState, convertToRaw  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
// import { fileToBase64 } from '../../../helpers/converter';

// import { config } from "../../../config";
// const BASE_ROOT_URL = config.BASE_ROOT_URL

const initialFValues = {
    id: '',
    homepageId:'',
    // title: '',
    title: EditorState.createEmpty(),
    subTitle: '',
    pictureUrl: '',
    isActive: false,
    displayOrder:'',
}

export default function HomepageSliderForm(props) {
    const { addOrEdit, recordForEdit, homePageDatas } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('homepageId' in fieldValues)
            temp.homepageId = fieldValues.homepageId ? "" : "This field is required."
        // if ('title' in fieldValues)
        //     temp.title = fieldValues.title ? "" : "This field is required."
        if ('subTitle' in fieldValues)
            temp.subTitle = fieldValues.subTitle ? "" : "This field is required."
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
                values['title'] = draftToHtml(convertToRaw(values.title.getCurrentContent()))
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
                const html = recordForEdit.title;
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const title = EditorState.createWithContent(contentState);
                // this.state = {
                //     editorState,
                // };
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
                <Controls.Select
                        name="homepageId"
                        label="Homepage"
                        value={values.homepageId}
                        onChange={handleInputChange}
                        error={errors.homepageId}
                        options={homePageDatas ? homePageDatas : []}
                    />
                    {/* <Controls.Input
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    /> */}
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
                    <div style={{margin:5}}>
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
                    <span style={{marginLeft:5}}>{files ? files.name : 'no file'}</span>
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