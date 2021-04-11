import React from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function InputAutoSize(props) {

    const { name, label, value, error=null, onChange, readOnly, minRow, placeholder, ...other } = props;
    return (
        <div className='AutoSizeAreaWrapper'>
            <p className={(error && 'ErrorColor')}>{label}</p>
            <TextareaAutosize  
                    className={'AutoSizeArea ' + (error && 'ErrorArea')}
                    name={name} 
                    value={value ? value :''} 
                    onChange={onChange}
                    {...other}
                    aria-label="minimum height" 
                    rowsMin={minRow ? minRow : 3} 
                    placeholder={placeholder? placeholder : ''}
            />
            <span className="ErrorMessage">{error && error }</span>
        </div>
    )
}