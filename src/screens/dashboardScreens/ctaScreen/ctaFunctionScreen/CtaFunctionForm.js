import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import HorizontalStepper from "../../../../components/Stepper/Stepper";
import {useForm} from "../../../../components/UseForm/useForm";
import {
	detailsCtaFunction,
	listCtaFunctionDocuments,
	listCtaFunctionModels,
} from "../../../../redux/actions/ctaFunctionActions";
import {listCtaPackageDailys} from "../../../../redux/actions/ctaPackageDailyActions";
import {listCtaPackageHourlys} from "../../../../redux/actions/ctaPackageHourlyActions";
import {listCtaPackageMonthlyYearlys} from "../../../../redux/actions/ctaPackageMonthlyYearlyActions";
import CtaFormStepFive from "./CtaFormStepFive";
import CtaFormStepFour from "./CtaFormStepFour";
import CtaFormStepOne from "./CtaFormStepOne";
import CtaFormStepThree from "./CtaFormStepThree";
import CtaFormStepTwo from "./CtaFormStepTwo";

const initialFValues = {
	id: "",
	subMenuId: null,
	name: "",
	firstName: "",
	lastName: "",
	companyName: "",
	email: "",
	phone: "",
	tellUsMore: null,
	estimation: null,
	description: null,
	companyTypeId: null,
	companySizeId: null,
	ctaDocuments: [],
	solutionSpecificity: null,
	serviceSpecificity: null,
	technologyPreference: null,
	goalsToAchieveSolution: "",
	goalsToAchieveService: "",
	goalsToAchieveTechnology: "",
};

export default function CtaFunctionForm(props) {
	const {
		addOrEdit,
		recordForEdit,
		addOrEditCtaFunctionDocument,
		setOpenPopup,
		ctaFunctionSaveData,
		loadingCtaFunctionDocumentSave,
		setConfirmDialog,
		onDeleteCtaFunctionDocument,
		loadingDeleteCtaFunctionDocument,
		loadingCtaFunctionSave,
		handleCtaPayment,
		loadingCtaPaymentSave,
		successCtaPaymentSave,
		loadingCtaPurchaseHistorySave,
		successCtaPurchaseHistorySave,
		paymentResponse,
	} = props;
	const userSignIn = useSelector((state) => state.userSignin);
	//eslint-disable-next-line
	const {userInfo} = userSignIn;

	const ctaPackageHourlyList = useSelector(
		(state) => state.ctaPackageHourlyList
	);
	//eslint-disable-next-line
	const {
		ctaPackageHourlys,
		loading: loadingCtaPackageHourlys,
		error: errorCtaPackageHourlys,
	} = ctaPackageHourlyList;

	const filteredCtaPackageHourlys = ctaPackageHourlys?.filter(
		(item) => item.companyTypeId === userInfo?.companyTypeId
	);

	const ctaPackageDailyList = useSelector((state) => state.ctaPackageDailyList);
	//eslint-disable-next-line
	const {
		ctaPackageDailys,
		loading: loadingCtaPackageDailys,
		error: errorCtaPackageDailys,
	} = ctaPackageDailyList;

	const filteredCtaPackageDailys = ctaPackageDailys?.filter(
		(item) => item.companyTypeId === userInfo?.companyTypeId
	);

	const ctaPackageMonthlyYearlyList = useSelector(
		(state) => state.ctaPackageMonthlyYearlyList
	);
	//eslint-disable-next-line
	const {
		ctaPackageMonthlyYearlys,
		loading: loadingCtaPackageMonthlyYearlys,
		error: errorCtaPackageMonthlyYearlys,
	} = ctaPackageMonthlyYearlyList;

	const filteredCtaPackageMonthlyYearlys = ctaPackageMonthlyYearlys?.filter(
		(item) => item.companyTypeId === userInfo?.companyTypeId
	);

	const ctaFunctionModelList = useSelector(
		(state) => state.ctaFunctionModelList
	);
	//eslint-disable-next-line
	const {ctaFunctionModels} = ctaFunctionModelList;

	const userData = {
		name: userInfo?.name,
		firstName: userInfo?.firstName,
		lastName: userInfo?.lastName,
		companyName: userInfo?.businessName,
		email: userInfo?.email,
		phone: userInfo?.mobile,
		businessIndustry: userInfo?.businessIndustry,
		companyTypeId: userInfo?.companyTypeId,
		companySizeId: userInfo?.companySizeId,
	};

	const ctaFunctionDocumentList = useSelector(
		(state) => state.ctaFunctionDocumentList
	);
	//eslint-disable-next-line
	const {
		ctaFunctionDocuments,
		loading: loadingCtaFunctionDocuments,
		error: errorCtaFunctionDocuments,
	} = ctaFunctionDocumentList;

	const ctaFunctionDetails = useSelector((state) => state.ctaFunctionDetails);
	//eslint-disable-next-line
	const {
		ctaFunction,
		loading: loadingCtaFunction,
		error: errorCtaFunction,
	} = ctaFunctionDetails;

	const ctaFunctionId = ctaFunctionSaveData?.data?.id;

	const validate = (fieldValues = values) => {
		let temp = {...errors};

		if (activeStep === 0) {
			// if ('name' in fieldValues)
			//     temp.name = fieldValues.name ? "" : "This field is required."
			// if ('firstName' in fieldValues)
			//     temp.firstName = fieldValues.firstName ? "" : "This field is required."
			// if ('lastName' in fieldValues)
			//     temp.lastName = fieldValues.lastName ? "" : "This field is required."
			// if ('companyName' in fieldValues)
			//     temp.companyName = fieldValues.companyName ? "" : "This field is required."
			// if ('email' in fieldValues)
			//     temp.email = fieldValues.email ? "" : "This field is required."
			// if ('phone' in fieldValues)
			//     temp.phone = fieldValues.phone ? "" : "This field is required."
			// if ('businessIndustry' in fieldValues)
			//     temp.businessIndustry = fieldValues.businessIndustry ? "" : "This field is required."
			// if ('companyTypeId' in fieldValues)
			//     temp.companyTypeId = fieldValues.companyTypeId ? "" : "This field is required."
			// if ('companySizeId' in fieldValues)
			//     temp.companySizeId = fieldValues.companySizeId ? "" : "This field is required."
			// ----
			if ("solutionSpecificity" in fieldValues)
				temp.solutionSpecificity = fieldValues.solutionSpecificity
					? ""
					: "This field is required.";
			if ("goalsToAchieveSolution" in fieldValues)
				temp.goalsToAchieveSolution = fieldValues.goalsToAchieveSolution
					? ""
					: "This field is required.";
			if ("serviceSpecificity" in fieldValues)
				temp.serviceSpecificity = fieldValues.serviceSpecificity
					? ""
					: "This field is required.";
			if ("goalsToAchieveService" in fieldValues)
				temp.goalsToAchieveService = fieldValues.goalsToAchieveService
					? ""
					: "This field is required.";
			if ("technologyPreference" in fieldValues)
				temp.technologyPreference = fieldValues.technologyPreference
					? ""
					: "This field is required.";
			if ("goalsToAchieveTechnology" in fieldValues)
				temp.goalsToAchieveTechnology = fieldValues.goalsToAchieveTechnology
					? ""
					: "This field is required.";
		}
		if (activeStep === 1) {
			if ("estimation" in fieldValues)
				temp.estimation = fieldValues.estimation
					? ""
					: "This field is required.";
			if ("tellUsMore" in fieldValues)
				temp.tellUsMore = fieldValues.tellUsMore
					? ""
					: "This field is required.";
			if ("description" in fieldValues)
				temp.description = fieldValues.description
					? ""
					: "This field is required.";
		}

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
		resetForm,
		handleMultipleSelectInputChange,
		handleFileChange,
		resetFileInput,
		handleDateInput,
	} = useForm({...initialFValues, ...userData}, true, validate);

	const dispatch = useDispatch();

	// stepper
	const [activeStep, setActiveStep] = useState(0);
	const [hideNext, setHideNext] = useState(false);
	const [createOrder, setCreateOrder] = useState({});

	const getSteps = () => {
		return [
			"Info",
			"Selection",
			"File Submit",
			"Purchase",
			"Payment",
			"Finish",
		];
	};

	const getStepContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				// step 1
				return (
					<CtaFormStepOne
						values={values}
						handleInputChange={handleInputChange}
						errors={errors}
						user={userInfo}
						recordForEdit={initialFValues}
						setValues={setValues}
						ctaFunctionModels={ctaFunctionModels}
						handleMultipleSelectInputChange={handleMultipleSelectInputChange}
						loadingCtaFunctionSave={loadingCtaFunctionSave}
					/>
				);
			case 1:
				// step 2
				return (
					<CtaFormStepTwo
						values={values}
						handleInputChange={handleInputChange}
						errors={errors}
						user={userInfo}
						recordForEdit={ctaFunction}
						setValues={setValues}
						ctaFunctionModels={ctaFunctionModels}
						handleMultipleSelectInputChange={handleMultipleSelectInputChange}
						setHideNext={setHideNext}
						loadingCtaFunctionSave={loadingCtaFunctionSave}
						handleDateInput={handleDateInput}
					/>
				);
			case 2:
				// step 3
				return (
					<CtaFormStepThree
						values={values}
						handleFileChange={handleFileChange}
						resetFileInput={resetFileInput}
						handleSubmitFile={handleSubmitFile}
						errors={errors}
						recordForEdit={ctaFunction}
						setValues={setValues}
						ctaFunctionDocuments={ctaFunctionDocuments}
						setConfirmDialog={setConfirmDialog}
						onDeleteCtaFunctionDocument={onDeleteCtaFunctionDocument}
						loadingCtaFunctionDocuments={loadingCtaFunctionDocuments}
						loadingDeleteCtaFunctionDocument={loadingDeleteCtaFunctionDocument}
						loadingCtaFunction={loadingCtaFunction}
						loadingCtaFunctionSave={loadingCtaFunctionSave}
						loadingCtaFunctionDocumentSave={loadingCtaFunctionDocumentSave}
						setHideNext={setHideNext}
					/>
				);
			case 3:
				// step 4
				return (
					<CtaFormStepFour
						values={values}
						handleFileChange={handleFileChange}
						resetFileInput={resetFileInput}
						// handleSubmitFile = {handleSubmitFile}
						errors={errors}
						recordForEdit={ctaFunction}
						setValues={setValues}
						ctaPackageHourlys={filteredCtaPackageHourlys}
						loadingCtaPackageHourlys={loadingCtaPackageHourlys}
						ctaPackageDailys={filteredCtaPackageDailys}
						loadingCtaPackageDailys={loadingCtaPackageDailys}
						ctaPackageMonthlyYearlys={filteredCtaPackageMonthlyYearlys}
						loadingCtaPackageMonthlyYearlys={loadingCtaPackageMonthlyYearlys}
						handleNextToPaymentScreen={handleNextToPaymentScreen}
						setHideNext={setHideNext}
						handleInputChange={handleInputChange}
					/>
				);
			case 4:
				// step 5
				return (
					<CtaFormStepFive
						values={values}
						recordForEdit={ctaFunction}
						setValues={setValues}
						createOrder={createOrder}
						setHideNext={setHideNext}
						handleCtaPayment={handleCtaPayment}
						loadingCtaPaymentSave={loadingCtaPaymentSave}
						successCtaPaymentSave={successCtaPaymentSave}
						loadingCtaPurchaseHistorySave={loadingCtaPurchaseHistorySave}
						successCtaPurchaseHistorySave={successCtaPurchaseHistorySave}
						setActiveStep={setActiveStep}
					/>
				);
			default:
				return "Finish";
		}
	};
	const handleNext = (e) => {
		e.preventDefault();
		// console.log(values)
		const formatData = {
			...values,
		};

		// before increment
		if (activeStep === 2 || activeStep === 3) {
			setHideNext(true);
		} else {
			setHideNext(false);
		}

		if (validate()) {
			formatData?.technologyPreference &&
				typeof formatData?.technologyPreference === "object" &&
				(formatData["technologyPreference"] = formatData?.technologyPreference
					?.map((item) => item.id)
					.toString());

			// if(activeStep ===0){
			//     (formatData?.technologyPreference && typeof (formatData?.technologyPreference) === 'object') && (formatData['technologyPreference'] = formatData?.technologyPreference?.map((item) => item.id).toString());

			//     formatData['name'] = user?.name
			//     formatData['firstName'] = user?.firstName
			//     formatData['lastName'] = user?.lastName
			//     formatData['companyName'] = user?.businessName
			//     formatData['email'] = user?.email
			//     formatData['phone'] = user?.mobile
			//     formatData['businessIndustry'] = user?.businessIndustry
			//     formatData['companyTypeId'] = user?.companyTypeId
			//     formatData['companySizeId'] = user?.companySizeId

			//     if(values.technologyPreference){
			//         let technologyPreference = values?.technologyPreference?.map((item) => item.id);
			//         values.technologyPreference = technologyPreference.toString();
			//     }

			// }

			// if(activeStep ===1){
			//     if(formatData.estimation){
			//         formatData.estimation = values.estimation.toISOString();
			//         formatData.estimation = values.estimation.toString();
			//     }
			// }

			if (activeStep < 2) {
				// for first 2 step use this
				addOrEdit(
					formatData,
					resetForm,
					values,
					activeStep,
					setActiveStep,
					setValues
				);
			} else {
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
			}
		}
	};

	const handleNextToPaymentScreen = (order) => {
		// console.log(order)
		// send to next step with product details
		setCreateOrder(order);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleSubmitFile = (e) => {
		e.preventDefault();
		if (validate()) {
			addOrEditCtaFunctionDocument(values, resetForm);
		}
	};

	const handleBack = () => {
		if (activeStep === 3 || activeStep === 4) {
			setHideNext(true);
		} else {
			setHideNext(false);
		}
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		// setRecordForEdit({
		//     ...values,
		// })
	};

	const handleReset = () => {
		// setActiveStep(0);
		resetForm();
		setOpenPopup(false);
	};

	useEffect(() => {
		try {
			if (recordForEdit != null) {
				setValues({
					...recordForEdit,
				});
			}

			if (ctaFunctionId) {
				dispatch(detailsCtaFunction(ctaFunctionId));
				dispatch(listCtaFunctionDocuments(ctaFunctionId));
			}
			if (!ctaFunctionModels?.id) {
				dispatch(listCtaFunctionModels());
				dispatch(listCtaPackageHourlys());
				dispatch(listCtaPackageDailys());
				dispatch(listCtaPackageMonthlyYearlys());
			}
			if (values?.id) {
				dispatch(listCtaFunctionDocuments(values?.id));
			}
		} catch (e) {
			console.log(e);
		}
		//eslint-disable-next-line
	}, [
		recordForEdit,
		setValues,
		ctaFunctionId,
		dispatch,
		values?.id,
		loadingCtaFunctionDocumentSave,
		loadingDeleteCtaFunctionDocument,
		ctaFunctionModels?.id,
		// successCtaPurchaseHistorySave
		// loadingCtaFunctionSave
	]);

	return (
		<Grid container>
			<Grid item xs={12}>
				<HorizontalStepper
					getSteps={getSteps}
					getStepContent={getStepContent}
					handleNext={handleNext}
					handleBack={handleBack}
					handleReset={handleReset}
					activeStep={activeStep}
					progressBar={true}
					loading={true}
					hideNext={hideNext}
					paymentResponse={paymentResponse}
				/>
			</Grid>
		</Grid>
	);
}
