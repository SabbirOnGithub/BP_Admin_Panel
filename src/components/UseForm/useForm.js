import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [files, setFiles] = useState(null);
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
        e.target.files[0] && setFiles(e.target.files[0])
    }
    const resetForm = () => {
        setValues(initialFValues);
        setFiles(null)
        setErrors({})
    }


    return {
        values,
        files,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleInputNumberChange,
        handleFileChange,
        resetForm
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

