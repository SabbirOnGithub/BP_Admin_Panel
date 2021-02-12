import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";


export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [files, setFiles] = useState(null);
    // const [fileUrl, setFileUrl] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        // e.target.name === "file" && console.log(e.target.files[0]) 
        const { name, value } = e.target
        // console.log(typeof(e.target.value))
            setValues({
                ...values,
                [name]: value
            })
       
        if (validateOnChange)
            validate({ [name]: value })
    }
    const handleInputNumberChange = e => {
        // e.target.name === "file" && console.log(e.target.files[0]) 
        const { name, value } = e.target

        if(e.target.value){
            setValues({
                ...values,
                [name]: parseInt(value)
            })
        }else{
            setValues({
                ...values,
                [name]: ''
            })
        }
       
        if (validateOnChange)
            validate({ [name]: value })
    }

    const handleFileChange = e => {
        // for single file in one form
        // e.target.files[0] && setFiles(e.target.files[0])

        // for multiple image field in a form 
        const { name, files } = e.target
        if(name){
            setValues({
                ...values,
                [name]: files[0],
            })
        }

    }

    const handleEditorInput = (name, editorValue) =>{
        // console.log(name)
        // console.log(editorValue)
        setValues({
            ...values,
            // [name]: editorValue.getCurrentContent().getPlainText()
            // [name]: draftToHtml(convertToRaw(editorValue.getCurrentContent()))
            [name]: editorValue
        })
        if (validateOnChange)
            validate({ [name]: editorValue })
    }
    const resetForm = () => {
        // console.log(values)
        setValues(initialFValues);
        setFiles(null)
        // setFileUrl(null)
        setErrors({})
    }

    const resetFileInput = (name) => {
        
        if(name){
            setValues({
                ...values,
                [name]: null
            })
        }
        setErrors({})
    }


    return {
        values,
        files,
        resetFileInput,
        // fileUrl,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleInputNumberChange,
        handleFileChange,
        resetForm,
        handleEditorInput
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)
        },
        "& .MuiInputBase-root":{
            fontSize:18
        },
        "& .MuiFormLabel-root" :{
            fontSize:16
        },
        "& .MuiInputBase-input" :{
            fontSize:16
        },
        "& .MuiTypography-body1":{
            fontSize:16
        },
        minWidth:'80%',
        // fontSize:30
        
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

