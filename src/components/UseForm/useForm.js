import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [files, setFiles] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        // e.target.name === "file" && console.log(e.target.files[0]) 
        const { name, value } = e.target
            setValues({
                ...values,
                [name]: value
            })
       
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
        handleFileChange,
        resetForm
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
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

