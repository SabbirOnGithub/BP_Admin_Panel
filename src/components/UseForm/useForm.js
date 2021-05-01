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
        // console.log(value)
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

        if (e.target.value) {
            setValues({
                ...values,
                [name]: parseInt(value)
            })
        } else {
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
        if (name) {
            setValues({
                ...values,
                [name]: files[0],
            })
        }

    }

    const handleEditorInput = (name, editorValue) => {
        setValues({
            ...values,
            [name]: editorValue
        })
        if (validateOnChange)
            validate({ [name]: editorValue })
    }

    const handleMultipleSelectInputChange = (e, value, name) => {
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })

    };
    const resetForm = () => {
        setValues(initialFValues);
        setFiles(null)
        // setFileUrl(null)
        setErrors({})
    }

    const resetFileInput = (name) => {

        if (name) {
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
        handleEditorInput,
        handleMultipleSelectInputChange
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            // width: '90%',
            width: '98%',
            margin: theme.spacing(1)
        },
        "& .MuiInputBase-root": {
            fontSize: 18
        },
        "& .MuiFormLabel-root": {
            fontSize: 16
        },
        "& .MuiInputBase-input": {
            fontSize: 16
        },
        "& .MuiTypography-body1": {
            fontSize: 16
        },
        minWidth: '80%',
        // fontSize:30,
        "& .AutoSizeAreaWrapper" : {
            margin:8,
            width: '98%',
            '& p' :{
                fontSize:16, 
                padding:2, 
                margin:2
            },
            "& .AutoSizeArea" : {
                width:'99.7%', 
                fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
                fontSize:16, 
                padding:'18.5px 14px',
                border:'1px solid lightgray', 
                borderRadius:5, 
                outline:'none',
            },
            "& .AutoSizeArea:hover" : {
                border:'1px solid black',
            },
            "& .AutoSizeArea:focus" : {
                border:'2px solid #536DFE',
            },
            "& .ErrorMessage" : {
                color:'#f44336',
            },
            "& .ErrorArea":{
                border: "1px solid #f44336",
            },
            "& .ErrorArea::placeholder":{
                color: "#f44336",
            },
            "& .ErrorArea:focus":{
                border: "2px solid #f44336",
            },
            "& .ErrorArea:hover":{
                borderColor:'#f44336'
            },
            "& .ErrorColor" : {
                color:'#f44336'
            },
        },
        
        

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

