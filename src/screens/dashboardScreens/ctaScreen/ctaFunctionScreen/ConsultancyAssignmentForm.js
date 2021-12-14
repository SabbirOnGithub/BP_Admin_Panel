import {CircularProgress, Grid} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, {useEffect, useState} from "react";
import Controls from "../../../../components/controls/Controls";
import {Form, useForm} from "../../../../components/UseForm/useForm";

const initialFValues = {
	id: "",
	ctaFunctionId: "",
	userEmail: "",
};

export default function ConsultancyAssignmentForm(props) {
	const {
		addOrEditConsultancyAssign,
		recordForEdit,
		loadingSave,
		setRecordForEdit,
		setOpenPopupForAssign,
		userAcceptClients,
	} = props;

	const [errorMessage, setErrorMessage] = useState(null);

	// console.log(userAcceptClients)
	const validate = (fieldValues = values) => {
		let temp = {...errors};
		// if ('userEmail' in fieldValues)
		//     temp.userEmail = (/$^|.+@.+..+/).test(fieldValues.userEmail) ? "" : "Email is not valid."
		if ("userEmail" in fieldValues)
			temp.userEmail = fieldValues.userEmail ? "" : "This field is required.";

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
		// console.log(values)
		if (validate()) {
			const userEmail = userAcceptClients?.find(
				(item) => item.id === values.userEmail
			)?.email;
			// console.log(userEmail)

			if (userEmail) {
				//  console.log(userEmail)
				addOrEditConsultancyAssign(
					{...values, userEmail},
					resetForm,
					setRecordForEdit,
					setOpenPopupForAssign
				)
					.then((res) => {
						if (res.status) {
							//    resetForm();
							//    setRecordForEdit(null);
							//    setOpenPopupForAssign(false);
						} else {
							setErrorMessage(res?.message);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	};

	useEffect(() => {
		if (recordForEdit != null)
			setValues({
				ctaFunctionId: recordForEdit.id,
			});
	}, [recordForEdit, setValues]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={12}>
					{/* <Controls.Input
                        name="userEmail"
                        label="Assign by email"
                        value={values?.userEmail}
                        onChange={handleInputChange}
                        error={errors.userEmail}
                    /> */}
					<Controls.Select
						name="userEmail"
						label="Assign To"
						value={values?.userEmail ? values?.userEmail : ""}
						onChange={handleInputChange}
						error={errors.userEmail}
						// options={consultancyReceiveHistoryStatuses ? consultancyReceiveHistoryStatuses : []}
						options={userAcceptClients}
						// disabled = {!isAdminUser() ? true : false}
					/>
					{errorMessage && <Alert severity="error">{errorMessage}</Alert>}

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
