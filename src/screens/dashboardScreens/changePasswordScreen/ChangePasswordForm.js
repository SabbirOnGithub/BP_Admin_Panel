import {Grid} from "@material-ui/core";
import React, {useEffect} from "react";
import Controls from "../../../components/controls/Controls";
import {Form, useForm} from "../../../components/UseForm/useForm";
import {isClientUser} from "../../../helpers/search";

const initialFValues = {
	userId: "",
	tempPass: "",
	newPassword: "",
	newPasswordClone: "",
};

const ChangePasswordForm = (props) => {
	const {addOrEdit, recordForEdit, loadingSave, userInfo} = props;

	const validate = (fieldValues = values) => {
		let temp = {...errors};

		if ("username" in fieldValues)
			temp.username = fieldValues.username ? "" : "This field is required.";
		// if ('email' in fieldValues)
		//     (temp.email = fieldValues.email ? "" : "This field is required.") || (temp.email = (/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})?$/).test(fieldValues.email) ? "" : "Email is not valid.")
		if ("firstName" in fieldValues)
			temp.firstName = fieldValues.firstName ? "" : "This field is required.";
		if ("businessIndustry" in fieldValues)
			isClientUser(userInfo) &&
				(temp.businessIndustry = fieldValues.businessIndustry
					? ""
					: "This field is required.");
		if ("businessName" in fieldValues)
			temp.businessName = fieldValues.businessName
				? ""
				: "This field is required.";
		// if ('lastName' in fieldValues)
		//     temp.lastName = fieldValues.lastName ? "" : "This field is required."
		if ("address" in fieldValues)
			temp.address = fieldValues.address ? "" : "This field is required.";
		if ("mobile" in fieldValues)
			temp.mobile = fieldValues.mobile ? "" : "This field is required.";
		if ("companySizeId" in fieldValues)
			isClientUser(userInfo) &&
				(temp.companySizeId = fieldValues.companySizeId
					? ""
					: "This field is required.");
		if ("companyTypeId" in fieldValues)
			isClientUser(userInfo) &&
				(temp.companyTypeId = fieldValues.companyTypeId
					? ""
					: "This field is required.");
		if ("currentConsultingTypeId" in fieldValues)
			isClientUser(userInfo) &&
				(temp.currentConsultingTypeId = fieldValues.currentConsultingTypeId
					? ""
					: "This field is required.");

		setErrors({
			...temp,
		});
		if (fieldValues === values)
			return Object.values(temp).every((x) => x === "");
	};

	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		handleFileChange,
		resetForm,
		resetFileInput,
	} = useForm(initialFValues, true, validate);

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
	useEffect(() => {
		if (recordForEdit != null) {
			// console.log(recordForEdit)
			try {
				setValues({
					...recordForEdit,
					photo: recordForEdit.userImage,
					username: recordForEdit.userName,
					id: recordForEdit.userId,
					roleId: recordForEdit.userRole,
					// isActive: true
				});
			} catch (e) {
				console.warn(e);
			}
		}
	}, [recordForEdit, setValues]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item>
					<Controls.Input
						name="tempPass"
						label="Old password"
						type="password"
						value={values?.firstName}
						onChange={handleInputChange}
						error={errors.firstName}
					/>
					<Controls.Input
						name="newPassword"
						label="New password"
						type="password"
						value={values?.lastName}
						onChange={handleInputChange}
						error={errors.lastName}
					/>
					<Controls.Input
						name="newPasswordClone"
						label="Confirm new password"
						type="password"
						value={values?.businessName}
						onChange={handleInputChange}
						error={errors.businessName}
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
