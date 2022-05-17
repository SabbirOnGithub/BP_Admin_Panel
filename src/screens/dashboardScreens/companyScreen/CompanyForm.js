import {CircularProgress, Grid} from "@material-ui/core";
import React, {useEffect} from "react";
import Controls from "../../../components/controls/Controls";
import {Form, useForm} from "../../../components/UseForm/useForm";

const initialFValues = {
	id: "",
	name: "",
	pictureUrl: "",
	isActive: false,
	displayOrder: "",
};

export default function CompanyForm(props) {
	const {addOrEdit, recordForEdit, loadingSave} = props;

	const validate = (fieldValues = values) => {
		let temp = {...errors};
		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "This field is required.";
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
		handleFileChange,
		resetFileInput,
		handleInputChange,
		handleInputNumberChange,
		resetForm,
	} = useForm(initialFValues, true, validate);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(values);
		if (validate()) {
			console.log(values);
			addOrEdit(values, resetForm);
		}
	};

	useEffect(() => {
		if (recordForEdit != null)
			setValues({
				...recordForEdit,
			});
	}, [recordForEdit, setValues]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={12}>
					<Controls.Input
						name="name"
						label="Name"
						value={values.name}
						onChange={handleInputChange}
						error={errors.name}
					/>

					<Controls.Input
						name="webAddress"
						label="Web Address"
						value={values.webAddress}
						onChange={handleInputChange}
						error={errors.webAddress}
					/>
					<Controls.Checkbox
						name="isActive"
						label="Active"
						value={values.isActive}
						onChange={handleInputChange}
						error={errors.isActive}
					/>

					<Controls.Input
						label="Display Order"
						name="displayOrder"
						type="number"
						value={values.displayOrder}
						onChange={handleInputNumberChange}
						error={errors.displayOrder}
					/>

					<Controls.FileInput
						name="pictureUrl"
						label="Picture"
						value={values.pictureUrl}
						onChange={handleFileChange}
						error={errors.pictureUrl}
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
