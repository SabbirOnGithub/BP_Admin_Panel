import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Controls from "../../../components/controls/Controls";
import { Form, useForm } from "../../../components/UseForm/useForm";
import { isClientUser } from "../../../helpers/search";
const initialFValues = {
	id: "",
	username: "",
	name: "",
	firstName: "",
	lastName: "",
	address: "",
	email: "",
	mobile: "",
	photo: "",
	businessIndustry: "",
	businessName: "",
	isActive: true,
	companySizeId: "",
	companyTypeId: "",
	currentConsultingTypeId: "",
};

export default function UserProfileForm(props) {
	const {
		addOrEdit,
		removeUser,
		recordForEdit,
		loadingSave,
		setOpenPopup,
		openPopup,
		companySizes,
		companyTypes,
		consultingTypes,
		userInfo,
	} = props;

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

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});

		if (validate()) {
			try {
				removeUser(id);
			} catch (e) {
				console.log(e);
			}
		}
	};

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
				<Grid item md={6}>
					<Controls.Input
						name="username"
						label="Username"
						value={values?.username}
						onChange={handleInputChange}
						error={errors.username}
						// disabled={openPopup}
						disabled
					/>
					<Controls.Input
						name="email"
						label="Email"
						value={values?.email}
						onChange={handleInputChange}
						error={errors.email}
						// disabled={openPopup}
						disabled
					/>
					<Controls.Input
						name="firstName"
						label="First Name"
						value={values?.firstName}
						onChange={handleInputChange}
						error={errors.firstName}
						disabled={openPopup}
					/>
					<Controls.Input
						name="lastName"
						label="Last Name"
						value={values?.lastName}
						onChange={handleInputChange}
						error={errors.lastName}
						disabled={openPopup}
					/>
					<Controls.Input
						name="businessName"
						label="Business Name"
						value={values?.businessName}
						onChange={handleInputChange}
						error={errors.businessName}
						disabled={openPopup}
					/>

					{isClientUser(userInfo) && (
						<>
							<Controls.Input
								name="businessIndustry"
								label="Business Industry"
								value={values?.businessIndustry}
								onChange={handleInputChange}
								error={errors.businessIndustry}
								disabled={openPopup}
							/>
						</>
					)}
				</Grid>
				<Grid item md={6}>
					<Controls.Input
						name="address"
						label="Address"
						value={values.address}
						onChange={handleInputChange}
						error={errors.address}
						disabled={openPopup}
					/>
					<Controls.Input
						name="mobile"
						label="Mobile"
						value={values.mobile}
						onChange={handleInputChange}
						error={errors.mobile}
						disabled={openPopup}
					/>

					{!openPopup && isClientUser(userInfo) && (
						<>
							<Controls.Select
								name="companySizeId"
								label="Company Size"
								value={values?.companySizeId ? values?.companySizeId : ""}
								onChange={handleInputChange}
								error={errors.companySizeId}
								options={companySizes ? companySizes : []}
							/>
							<Controls.Select
								name="companyTypeId"
								label="Company Type"
								value={values?.companyTypeId ? values?.companyTypeId : ""}
								onChange={handleInputChange}
								error={errors.companyTypeId}
								options={companyTypes ? companyTypes : []}
							/>

							<Controls.Select
								name="currentConsultingTypeId"
								label="Current Consulting Type"
								value={
									values?.currentConsultingTypeId
										? values?.currentConsultingTypeId
										: ""
								}
								onChange={handleInputChange}
								error={errors.currentConsultingTypeId}
								options={consultingTypes ? consultingTypes : []}
							/>
						</>
					)}
				</Grid>

				<Grid item md={6}>
					{!openPopup && (
						<div>
							<Controls.FileInput
								name="photo"
								label="Photo"
								value={values.photo}
								onChange={handleFileChange}
								error={errors.photo}
								resetFileInput={resetFileInput}
							/>
							
						</div>
					)}

					
				</Grid>
				<Grid item md={12}>
					{loadingSave ? (
						<CircularProgress size={26} />
					) : (
						<>
							<Controls.Button type="submit" text="Update" />
							
							<Controls.Button
								text="Back"
								color="default"
								onClick={() => {
									setOpenPopup(!openPopup);
								}}
							/>

							<Controls.Button
								className="deactivate-btn"
								variant="outlined"
								text="DeActivate"
								color="primary"
								onClick={() => {
									setConfirmDialog({
										isOpen: true,
										title: "Are you sure to deactivate yourself?",
										subTitle: "You can't undo this operation",
										onConfirm: () => {
											onDelete(userInfo?.userId);
										},
									});
								}}
							/>
						</>
					)}
					
					<ConfirmDialog
						confirmDialog={confirmDialog}
						setConfirmDialog={setConfirmDialog}
					/>
				</Grid>
			</Grid>
		</Form>
	);
}
