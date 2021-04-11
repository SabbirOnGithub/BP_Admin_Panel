import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';
import { EditorState, ContentState, convertToRaw  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

const initialFValues = {
    id: '',
    softwareId: '',
    trainingTypeId: '',
    description: EditorState.createEmpty(),
    displayOrder: '',
}

export default function SoftwareTrainingSummaryForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, trainingTypes, softwares } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('softwareId' in fieldValues)
            temp.softwareId = fieldValues.softwareId ? "" : "This field is required."
        if ('trainingTypeId' in fieldValues)
            temp.trainingTypeId = fieldValues.trainingTypeId ? "" : "This field is required."
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
        handleInputNumberChange,
        handleEditorInput,
        resetForm
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
                        name="softwareId"
                        label="Software"
                        value={values.softwareId}
                        onChange={handleInputChange}
                        error={errors.softwareId}
                        options={softwares ? softwares : []}
                    />
                    <Controls.Select
                        name="trainingTypeId"
                        label="Training Type"
                        value={values.trainingTypeId}
                        onChange={handleInputChange}
                        error={errors.trainingTypeId}
                        options={trainingTypes ? trainingTypes : []}
                    />
                    {/* <Controls.Input
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    /> */}
                    <Controls.RichTextEditor
                        onEditorStateChange={value => handleEditorInput('description', value)} //handleEditorInput(name, value)
                        placeholder="Description here..."
                        editorState = {values.description}
                    />
                    <Controls.Input
                        label="Display Order"
                        name="displayOrder"
                        type="number"
                        value={values.displayOrder}
                        onChange={handleInputNumberChange}
                        error={errors.displayOrder}
                       
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
                        </>
                            )
                        }
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
