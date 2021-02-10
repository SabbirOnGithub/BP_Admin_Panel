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
    pictureUrl: '',
    description: EditorState.createEmpty(),
}

export default function HomeConsultationTopicForm(props) {

    const { addOrEdit, recordForEdit, homePageDatas } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('homepageId' in fieldValues)
            temp.homepageId = fieldValues.homepageId ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
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
            try{
                values['description'] = draftToHtml(convertToRaw(values.description.getCurrentContent()))
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
        if (recordForEdit != null){
            try {    
                setValues({
                    ...recordForEdit
                })
              } catch (e) {
                console.warn(e);
              } finally {
                console.log('state set done')
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
                    {/* <div style={{maxWidth:'90%',border:'1px solid lightGrey', padding:5, borderRadius:5}} className='MuiFormControl-root'>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="rich-editor demo-wrapper"	          
                        editorClassName="demo-editor"	          
                        onEditorStateChange={editorState => setEditorState(editorState)}	          
                        placeholder="The message goes here..."
                        
                    />
                </div> */}



                    <Controls.Select
                        name="homepageId"
                        label="Homepage"
                        value={values.homepageId}
                        onChange={handleInputChange}
                        error={errors.homepageId}
                        options={homePageDatas ? homePageDatas : []}
                    />
                    <Controls.Input
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />

                    <Controls.RichTextEditor
                        onEditorStateChange={value => handleEditorInput('description', value)} //handleEditorInput(name, value)
                        placeholder="Description here..."
                        editorState = {values.description}
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