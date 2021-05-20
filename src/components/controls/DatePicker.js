import React from 'react'
import { 
    MuiPickersUtilsProvider, 
    // KeyboardDatePicker,
    DatePicker,
    DateTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// 

function DatePickerCustom(props) {

    const { name, label, value, error=null, onChange, message, readOnly, ...other } = props

    // const convertToDefEventPara = (name, value) => ({
    //     target: {
    //         name, value
    //     }
    // })

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <DatePicker 
                    inputVariant="outlined"
                    label={label}
                    format="MM/dd/yyyy"
                    name={name}
                    // value={new Date()}
                    value={value}
                    // onChange={date =>onChange(name,date.toISOString())}
                    onChange={date =>onChange(name,date)}
                    {...other}
                    {...(error && {error:true,helperText:error})}
                    InputProps={{ readOnly: readOnly }}
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}


function DateTimePickerCustom(props) {

    const { name, label, value, error=null, onChange, message, readOnly, ...other } = props
    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <DateTimePicker 
                    inputVariant="outlined"
                    label={label}
                    // onChange = {(dateTime)=>onChange(name, dateTime.toISOString())}
                    onChange = {(dateTime)=>onChange(name, dateTime)}
                    format="MM/dd/yyyy HH:mm:ss"
                    value={value}
                    {...other}
                    {...(error && {error:true,helperText:error})}
                    InputProps={{ readOnly: readOnly }}
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}


export {DatePickerCustom, DateTimePickerCustom}