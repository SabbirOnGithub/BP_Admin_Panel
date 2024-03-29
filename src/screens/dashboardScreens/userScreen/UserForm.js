import {CircularProgress, Grid} from "@material-ui/core";
import React, {useEffect} from "react";
import Controls from "../../../components/controls/Controls";
import {Form, useForm} from "../../../components/UseForm/useForm";

const initialFValues = {
	id: "",
	// username: "",
	password: "",
	roleId: "",
	firstName: "",
	lastName: "",
	email: "",
	mobile: "",
	address: "",
	photo: "",
	isActive: true,
	businessName: "",
};

export default function UserForm(props) {
	const {addOrEdit, recordForEdit, loadingSave, roles} = props;

	const validate = (fieldValues = values) => {
		let temp = {...errors};

		// if ('username' in fieldValues)
		//     temp.username = fieldValues.username ? "" : "This field is required."
		// if ("password" in fieldValues)
		// 	temp.password = fieldValues.password ? "" : "This field is required.";
		if ("roleId" in fieldValues)
			temp.roleId = fieldValues.roleId ? "" : "This field is required.";
		if ("firstName" in fieldValues)
			temp.firstName = fieldValues.firstName ? "" : "This field is required.";
		if ("email" in fieldValues)
			(temp.email = fieldValues.email ? "" : "This field is required.") ||
				(temp.email =
					/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})?$/.test(
						fieldValues.email
					)
						? ""
						: "Email is not valid.");
		if ("mobile" in fieldValues)
			// temp.mobile = fieldValues.mobile ? "" : "This field is required."
			temp.mobile =
				fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
		if ("address" in fieldValues)
			temp.address = fieldValues.address ? "" : "This field is required.";

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
			addOrEdit(values, resetForm);
		}
	};

	const [isCreate, setIsCreate] = React.useState(true);

	useEffect(() => {
		if (recordForEdit != null) {
			!recordForEdit.password
				? setValues({
						...recordForEdit,
						password: "",
				  })
				: setValues({
						...recordForEdit,
				  });

			if (recordForEdit.id) {
				setIsCreate(false);
			}
		}
	}, [recordForEdit, setValues]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={12}>
					<Controls.Input
						name="firstName"
						label="FirstName"
						value={values?.firstName}
						onChange={handleInputChange}
						error={errors.firstName}
					/>
					<Controls.Input
						name="lastName"
						label="LastName"
						value={values?.lastName}
						onChange={handleInputChange}
						error={errors.lastName}
					/>
					<Controls.Input
						name="email"
						label="Email"
						type="email"
						value={values?.email}
						onChange={handleInputChange}
						error={errors.email}
					/>
					{!isCreate && (
						<Controls.Input
							name="username"
							label="User Name"
							value={values?.username}
							onChange={handleInputChange}
							error={errors.username}
						/>
					)}

					<Controls.Input
						name="password"
						label="Password"
						type="password"
						value={values?.password}
						onChange={handleInputChange}
						error={errors.password}
					/>
					<Controls.Select
						name="roleId"
						label="Role"
						value={values?.roleId}
						onChange={handleInputChange}
						error={errors.roleId}
						options={roles ? roles : []}
					/>
					<Controls.Input
						name="businessName"
						label="Business Name"
						value={values?.businessName}
						onChange={handleInputChange}
						error={errors.businessName}
					/>

					<Controls.Input
						name="mobile"
						label="Mobile"
						type="tel"
						value={values?.mobile}
						onChange={handleInputChange}
						error={errors.mobile}
					/>
					<Controls.Input
						name="address"
						label="Address"
						value={values?.address}
						onChange={handleInputChange}
						error={errors.address}
					/>
					<Controls.Checkbox
						name="isActive"
						label="Is Active"
						value={values.isActive}
						onChange={handleInputChange}
						error={errors.isActive}
					/>

					<Controls.FileInput
						name="photo"
						label="Photo"
						value={values.photo}
						onChange={handleFileChange}
						error={errors.photo}
						resetFileInput={resetFileInput}
					/>
					<div>
						{loadingSave ? (
							<CircularProgress size={26} />
						) : (
							<>
								<Controls.Button type="submit" text="Submit" />
								<Controls.Button
									text="Reset"
									color="default"
									onClick={resetForm}
								/>
							</>
						)}
					</div>
				</Grid>
			</Grid>
		</Form>
	);
}
