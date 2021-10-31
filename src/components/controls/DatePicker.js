import React from 'react'
import { 
    MuiPickersUtilsProvider, 
    // KeyboardDatePicker,
    DatePicker,
    DateTimePicker,
    TimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// 
// import { alpha } from '@material-ui/core/styles';

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
                    value={value ? value : new Date()}
                    // onChange={date =>onChange(name,date.toISOString())}
                    onChange={date =>onChange(name,date)}
                    {...other}
                    {...(error && {error:true,helperText:error})}
                    InputProps={{ readOnly: true }}
                    readOnly={readOnly ? readOnly : false} 
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

function TimePickerCustom(props) {

    const { name, label, value, error=null, onChange, message, readOnly, ...other } = props

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <TimePicker
                    clearable
                    ampm={false}
                    label={label}
                    value={value ? value: new Date()}
                    onChange={(time)=>onChange(name, time)}
                    inputVariant="outlined"
                    {...other}
                    {...(error && {error:true,helperText:error})}
                    InputProps={{ readOnly: readOnly }}

                />
            </MuiPickersUtilsProvider>
        
        </div>
    )
}


export {DatePickerCustom, DateTimePickerCustom , TimePickerCustom}