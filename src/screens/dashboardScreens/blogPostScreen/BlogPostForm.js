import React, { useEffect } from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/UseForm/useForm';


const initialFValues = {
    id: '',
    title: '',
    content: '',
    tags: '',
    published: false,
    blogSubCategoryId: '',
}

export default function BlogPostForm(props) {
    const { addOrEdit, recordForEdit, loadingSave, blogSubCategorys } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('content' in fieldValues)
            temp.content = fieldValues.content ? "" : "This field is required."
        if ('tags' in fieldValues)
            temp.tags = fieldValues.tags ? "" : "This field is required."
        // if ('published' in fieldValues)
        //     temp.published = fieldValues.published ? "" : "This field is required."
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
        handleInputNumberChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        // console.log(values)
        if (validate()) {
            console.log(values)
            addOrEdit(values, resetForm);
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
                    <Controls.Input
                        name="content"
                        label="Content"
                        value={values.content}
                        onChange={handleInputChange}
                        error={errors.content}
                    />
                    <Controls.Input
                        name="tags"
                        label="Tags"
                        value={values.tags}
                        onChange={handleInputChange}
                        error={errors.tags}
                    />
                    {/* <Controls.Input
                        label="Published"
                        name="published"
                        type="number"
                        value={values.published}
                        onChange={handleInputNumberChange}
                        error={errors.published}
                    /> */}
                    <Controls.Checkbox
                        name="published"
                        label="published"
                        value={values.published}
                        onChange={handleInputChange}
                        error={errors.published}
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