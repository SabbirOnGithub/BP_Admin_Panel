import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

    const { name, label, value, error=null, onChange, message, ...other } = props

    // console.log(typeof value)
    const convertToDefEventPara = (name, value) => ({
        target: {
            // name, value : value?.toISOString()?.substring(0, 10)
            name, value
        }
    })

    return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                    className={error && ' errorDatePickerArea'}
                    label={label}
                    format="MM/dd/yyyy"
                    name={name}
                    value={value}
                    onChange={date =>onChange(convertToDefEventPara(name,date))}
                    {...other}
                    {...(error && {error:true,helperText:error})}
                />
                <span style={{margin:'0px 20px 8px 0px', float:'right', fontSize:12}}>{message}</span>
            </MuiPickersUtilsProvider>
    )
}
