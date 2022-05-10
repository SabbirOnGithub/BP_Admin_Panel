import PasswordField from "material-ui-password-field";
import React from "react";

export default function PasswordInput(props) {
	const {
		name,
		label,
		value,
		error = null,
		onChange,
		readOnly,
		max,
		size,
		variant,
		...other
	} = props;
	return (
		<PasswordField
			// size= {size ? size :"medium"} // "medium" "large" "small"
			variant={variant ? variant : "outlined"}
			label={label}
			name={name}
			value={value ? value : ""}
			// value={value}
			onChange={onChange}
			{...other}
			{...(error && {error: true, helperText: error})}
			// classes={readOnly ? { root: 'Mui-disabled' } : {}}
			inputProps={{
				readOnly,
				max: max,
			}}
			InputProps={{
				className: readOnly ? "Mui-disabled" : undefined,
			}}
			// onInput = {(e) =>{
			//     // set max input 10 digit
			//     if(e.target.type === 'number'){
			//         e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
			//     }
			// }}
		/>
	);
}
