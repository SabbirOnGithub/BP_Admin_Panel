import {CircularProgress, Grid} from "@material-ui/core";
import React, {useEffect} from "react";
import Controls from "../../../../components/controls/Controls";
import {Form, useForm} from "../../../../components/UseForm/useForm";

const initialFValues = {
	id: "",
	status: 1,
	statusChangeNote: "",
};
// hard coded to both frontend and backend
// const ctaFunctionStatus = [
//     {
//         title: 'Requested',
//         value:1
//     },
//     {
//         title: 'Inprogress',
//         value:2
//     },
//     {
//         title: 'Done',
//         value:3
//     },
// ]

export default function CtaFunctionStatusUpdateForm(props) {
	const {
		addOrEdit,
		recordForEdit,
		loadingSave,
		setRecordForEdit,
		setOpenPopup,
		ctaFunctionStatus,
	} = props;

	// console.log("recordForEdit: " + JSON.stringify(recordForEdit, undefined, 4));
	const validate = (fieldValues = values) => {
		let temp = {...errors};
		if ("status" in fieldValues)
			temp.status = fieldValues.status ? "" : "This field is required.";
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
			addOrEdit(values, resetForm).then((res) => {
				if (res?.status) {
					setRecordForEdit(null);
					setOpenPopup(false);
				}
			});
		}
	};

	useEffect(() => {
		if (recordForEdit != null)
			setValues({
				id: recordForEdit.id,
				status: recordForEdit.status,
			});
	}, [recordForEdit, setValues]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={12}>
					<Controls.Select
						name="status"
						label="Status"
						value={values?.status ? values?.status : ""}
						onChange={handleInputChange}
						error={errors.status}
						// options={consultancyReceiveHistoryStatuses ? consultancyReceiveHistoryStatuses : []}
						options={ctaFunctionStatus}
						// disabled = {!isAdminUser() ? true : false}
					/>
					<Controls.InputAutoSize
						name="statusChangeNote"
						label="Note"
						placeholder="Write note here"
						value={values?.statusChangeNote ? values?.statusChangeNote : ""}
						onChange={handleInputChange}
						error={errors.statusChangeNote}
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
