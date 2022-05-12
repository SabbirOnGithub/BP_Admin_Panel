import {Grid} from "@material-ui/core";
import React, {useState} from "react";
import Controls from "../../../components/controls/Controls";
import {Form, useForm} from "../../../components/UseForm/useForm";

const initialFValues = {
	userId: "",
	tempPass: "",
	newPassword: "",
	newPasswordCopy: "",
};

const ChangePasswordForm = (props) => {
	const {addOrEdit, loadingSave, userInfo} = props;

	const [password, setPassword] = useState("");

	const validate = (fieldValues = values) => {
		let temp = {...errors};

		// console.log("fieldValues: ", fieldValues);

		if ("tempPass" in fieldValues)
			temp.tempPass = fieldValues.tempPass ? "" : "This field is required.";
		if ("newPassword" in fieldValues) {
			temp.newPassword = fieldValues.newPassword
				? ""
				: "This field is required.";

			setPassword(fieldValues.newPassword);
		}

		if ("newPasswordCopy" in fieldValues) {
			temp.newPasswordCopy = fieldValues.newPasswordCopy
				? ""
				: "This field is required.";

			if (password.length > 0) {
				temp.newPasswordCopy =
					fieldValues.newPasswordCopy === password
						? ""
						: "Password Does not match";
			} else {
				temp.newPasswordCopy = "This field is required.";
			}
		}

		setErrors({
			...temp,
		});
		if (fieldValues === values)
			return Object.values(temp).every((x) => x === "");
	};

	const {values, setValues, errors, setErrors, handleInputChange, resetForm} =
		useForm(initialFValues, true, validate);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			try {
				// console.log(values)
				addOrEdit(values, resetForm);
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item>
					<Controls.Input
						name="tempPass"
						label="Old password"
						type="password"
						value={values?.tempPass}
						onChange={handleInputChange}
						error={errors.tempPass}
					/>
					<Controls.Input
						name="newPassword"
						label="New password"
						type="password"
						value={values?.newPassword}
						onChange={handleInputChange}
						error={errors.newPassword}
					/>
					<Controls.Input
						name="newPasswordCopy"
						label="Confirm new password"
						type="password"
						value={values?.newPasswordCopy}
						onChange={handleInputChange}
						error={errors.newPasswordCopy}
					/>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item>
					<Controls.Button type="submit" text="Submit" />
					<Controls.Button text="Reset" color="default" onClick={resetForm} />
				</Grid>
			</Grid>
		</Form>
	);
};

export default ChangePasswordForm;
