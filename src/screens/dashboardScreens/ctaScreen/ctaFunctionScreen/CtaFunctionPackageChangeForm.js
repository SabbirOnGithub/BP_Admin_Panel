import {CircularProgress, Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Controls from "../../../../components/controls/Controls";
import {Form, useForm} from "../../../../components/UseForm/useForm";

const initialValues = {
	id: "",
	packageId: "",
	changeNote: "",
};

export default function CtaFunctionPackageChangeForm(props) {
	const {
		recordForEdit,
		addOrEditConsultancyPackage,
		loadingSave,
		packageName,
		setRecordForEdit,
		setOpenPopupForPckageChange,
		ctaPackageDailys,
		ctaPackageHourlys,
		ctaPackageMonthlyYearlys,
	} = props;

	// console.log("addOrEditConsultancyPackage: " + JSON.stringify(addOrEditConsultancyPackage, undefined, 4));
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

	const [packages, setPackages] = useState(null);

	const {values, setValues, errors, setErrors, handleInputChange, resetForm} =
		useForm(initialValues, true, validate);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Values: ", values);
		if (validate()) {
			addOrEditConsultancyPackage(values, resetForm).then(() => {
				setRecordForEdit(null);
				setOpenPopupForPckageChange(false);
			});
		}
	};

	useEffect(() => {
		let ctaPackageId = 0;
		if (packageName.toLowerCase() === "hourly support") {
			setPackages(ctaPackageHourlys);
			ctaPackageId = recordForEdit?.ctaPackageHourlyId;
		}
		if (packageName.toLowerCase() === "solutions discovery") {
			setPackages(ctaPackageDailys);
			ctaPackageId = recordForEdit?.ctaPackageDailyId;
		}
		if (packageName.toLowerCase() === "concierge") {
			setPackages(ctaPackageMonthlyYearlys);
			ctaPackageId = recordForEdit?.ctaPackageMonthlyYearlyId;
		}

		console.log("packageName: ", packageName);
		console.log("recordForEdit", recordForEdit);
		console.log("packages: ", packages);
		if (recordForEdit != null) {
			setValues({
				id: recordForEdit.id,
				packageId: ctaPackageId,
				packageName: packageName,
			});
		}
	}, [
		ctaPackageDailys,
		ctaPackageHourlys,
		ctaPackageMonthlyYearlys,
		packageName,
		packages,
		recordForEdit,
		setValues,
	]);

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Grid container>
					<Grid item xs={12}>
						<Controls.Select
							name="packageId"
							label="Packages"
							value={values?.packageId ? values?.packageId : ""}
							onChange={handleInputChange}
							error={errors.packageId}
							options={packages ? packages : []}
							// disabled = {!isAdminUser() ? true : false}
						/>
						<Controls.InputAutoSize
							name="changeNote"
							label="Note"
							placeholder="Write note here"
							value={values?.changeNote ? values?.changeNote : ""}
							onChange={handleInputChange}
							error={errors.changeNote}
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
		</>
	);
}
