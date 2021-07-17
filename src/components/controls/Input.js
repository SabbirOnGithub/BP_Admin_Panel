import React from 'react'
import { TextField } from '@material-ui/core';


export default function Input(props) {

    const { name, label, value, error=null, onChange, readOnly, max, size,variant, ...other } = props;
    return (
        <TextField
            // size= {size ? size :"medium"} // "medium" "large" "small"
            variant={variant ? variant : "outlined" }
            label={label}
            name={name}
            value={value ? value :''}
            // value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
            // classes={readOnly ? { root: 'Mui-disabled' } : {}}
            inputProps={{
                readOnly,
                max : max
            }}
            InputProps={{
                className: (readOnly) ? 'Mui-disabled' : undefined,
            }}
            // onInput = {(e) =>{
            //     // set max input 10 digit
            //     if(e.target.type === 'number'){
            //         e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
            //     }
            // }}
        />
    )
}
