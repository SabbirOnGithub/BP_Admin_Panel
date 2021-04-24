import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { useForm } from '../../../../components/UseForm/useForm';
import HorizontalStepper from '../../../../components/Stepper/Stepper';
import CtaFormStepOne from './CtaFormStepOne';
import CtaFormStepTwo from './CtaFormStepTwo';
import CtaFormStepThree from './CtaFormStepThree';
import CtaFormStepFour from './CtaFormStepFour';

import { useSelector, useDispatch } from 'react-redux';

import { listCtaFunctionModels, detailsCtaFunction, listCtaFunctionDocuments } from '../../../../redux/actions/ctaFunctionActions';

const initialFValues = {
    id: '',
    subMenuId: null,
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    // businessIndustry: '',
    // businessStage: null,
    // category: null,
    // specificity: null,
    // technologies: null,
    // technologySerivceType: null,
    // goalsToAchieve: null,
    tellUsMore: null,
    estimation: null,
    description: null,
    companyTypeId:null,
    companySizeId: null,
    ctaDocuments:[],
    solutionSpecificity: null,
    serviceSpecificity: null,
    technologyPreference:null,
    goalsToAchieveSolution:'',
    goalsToAchieveService:'',
    goalsToAchieveTechnology:'',

}

export default function CtaFunctionForm(props) {

    const { addOrEdit, recordForEdit,  
            user,  setOpenPopup,  
            ctaFunctionSaveData, 
            loadingCtaFunctionDocumentSave, 
            setConfirmDialog, 
            onDeleteCtaFunctionDocument, 
            loadingDeleteCtaFunctionDocument, 
            loadingCtaFunctionSave,
            ctaPackageHourlys,
            loadingCtaPackageHourlys,
            ctaPackageDailys,
            loadingCtaPackageDailys,
            ctaPackageMonthlyYearlys,
            loadingCtaPackageMonthlyYearlys
         } = props;
    
    const ctaFunctionDocumentList = useSelector(state => state.ctaFunctionDocumentList);
    //eslint-disable-next-line
    const { ctaFunctionDocuments, loading: loadingCtaFunctionDocuments, error: errorCtaFunctionDocuments } = ctaFunctionDocumentList;

    const ctaFunctionDetails = useSelector(state => state.ctaFunctionDetails);
    //eslint-disable-next-line
    const { ctaFunction, loading: loadingCtaFunction, error: errorCtaFunction } = ctaFunctionDetails;

    const ctaFunctionId = ctaFunctionSaveData?.data?.id;

    const ctaFunctionModelList = useSelector(state => state.ctaFunctionModelList);
    //eslint-disable-next-line
    const { ctaFunctionModels } = ctaFunctionModelList;


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if (activeStep === 0) {
            // if ('menuId' in fieldValues)
            //     temp.menuId = fieldValues.menuId.length !== 0 ? "" : "This field is required."
            // if ('firstName' in fieldValues)
            //     temp.firstName = fieldValues.firstName ? "" : "This field is required."
            // if ('companyName' in fieldValues)
            //     temp.companyName = fieldValues.companyName ? "" : "This field is required."
            // if ('email' in fieldValues)
            //     temp.email = fieldValues.email ? "" : "This field is required."
            // if ('phone' in fieldValues)
            //     temp.phone = fieldValues.phone ? "" : "This field is required."
            if ('solutionSpecificity' in fieldValues)
                temp.solutionSpecificity = fieldValues.solutionSpecificity ? "" : "This field is required."
            if ('goalsToAchieveSolution' in fieldValues)
                temp.goalsToAchieveSolution = fieldValues.goalsToAchieveSolution ? "" : "This field is required."
            if ('serviceSpecificity' in fieldValues)
                temp.serviceSpecificity = fieldValues.serviceSpecificity ? "" : "This field is required."
            if ('goalsToAchieveService' in fieldValues)
                temp.goalsToAchieveService = fieldValues.goalsToAchieveService ? "" : "This field is required."
            if ('technologyPreference' in fieldValues)
                temp.technologyPreference = fieldValues.technologyPreference ? "" : "This field is required."
            if ('goalsToAchieveTechnology' in fieldValues)
                temp.goalsToAchieveTechnology = fieldValues.goalsToAchieveTechnology ? "" : "This field is required."
        }

        setErrors({
            ...temp
        })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        handleMultipleSelectInputChange,
        handleFileChange,
        resetFileInput
    } = useForm(initialFValues, true, validate);

    const dispatch = useDispatch();

    // stepper
    const [activeStep, setActiveStep] = React.useState(0);

    const getSteps = () => {
        return ['Info', 'Selection', 'File Submit', 'Purchase', 'Finish'];
    }

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                // step 1
                return <CtaFormStepOne
                            values={values}
                            handleInputChange={handleInputChange}
                            errors={errors}
                            user={user}
                            recordForEdit={initialFValues}
                            setValues={setValues}
                            ctaFunctionModels={ctaFunctionModels}
                            handleMultipleSelectInputChange = {handleMultipleSelectInputChange}
                        />;
            case 1:
                // step 2
                return <CtaFormStepTwo
                            values={values}
                            handleInputChange={handleInputChange}
                            errors={errors}
                            user={user}
                            recordForEdit={ctaFunction}
                            setValues={setValues}
                            ctaFunctionModels={ctaFunctionModels}
                            handleMultipleSelectInputChange= {handleMultipleSelectInputChange}
                        />;
            case 2:
                // step 3
                return  <CtaFormStepThree
                            values={values}
                            handleFileChange= {handleFileChange}
                            resetFileInput= {resetFileInput}
                            handleSubmitFile = {handleSubmitFile}
                            errors={errors}
                            recordForEdit={ctaFunction}
                            setValues={setValues}
                            ctaFunctionDocuments = {ctaFunctionDocuments}
                            setConfirmDialog={setConfirmDialog}
                            onDeleteCtaFunctionDocument= {onDeleteCtaFunctionDocument}
                            loadingCtaFunctionDocuments = {loadingCtaFunctionDocuments}
                            loadingDeleteCtaFunctionDocument = {loadingDeleteCtaFunctionDocument}
                            loadingCtaFunction= {loadingCtaFunction}
                            loadingCtaFunctionSave ={loadingCtaFunctionSave}
                            loadingCtaFunctionDocumentSave = {loadingCtaFunctionDocumentSave}
                        />;
            case 3:
                return <CtaFormStepFour 
                            values={values}
                            handleFileChange= {handleFileChange}
                            resetFileInput= {resetFileInput}
                            handleSubmitFile = {handleSubmitFile}
                            errors={errors}
                            recordForEdit={ctaFunction}
                            setValues={setValues}
                            ctaPackageHourlys = {ctaPackageHourlys}
                            loadingCtaPackageHourlys = {loadingCtaPackageHourlys}
                            ctaPackageDailys ={ctaPackageDailys}
                            loadingCtaPackageDailys ={loadingCtaPackageDailys}
                            ctaPackageMonthlyYearlys ={ctaPackageMonthlyYearlys}
                            loadingCtaPackageMonthlyYearlys ={loadingCtaPackageMonthlyYearlys}

                        />
            default:
                return 'Finish';
        }
    }
    const handleNext = (e) => {
        e.preventDefault();

        if (validate()) {
            if(activeStep ===0){
                if(values.technologyPreference){
                    let technologyPreference = values?.technologyPreference?.map((item) => item.id);
                    values.technologyPreference = technologyPreference.toString();
                }
            }
            addOrEdit(values, resetForm);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        // setActiveStep(0);
        resetForm();
        setOpenPopup(false);

    };

    useEffect(() => {
        try {
            if (ctaFunctionId) {
                dispatch(detailsCtaFunction(ctaFunctionId))
                dispatch(listCtaFunctionDocuments(ctaFunctionId))
            }
           if(!ctaFunctionModels?.id){
                dispatch(listCtaFunctionModels());
           }
           if(values?.id){
                dispatch(listCtaFunctionDocuments(values?.id))
           }
        } catch (e) {
            console.log(e)
        }
    }, [
        recordForEdit, 
        setValues, 
        ctaFunctionId, 
        dispatch, 
        values?.id, 
        loadingCtaFunctionDocumentSave, 
        loadingDeleteCtaFunctionDocument, 
        ctaFunctionModels?.id
    ])

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
                    loading = {true}
                />
            </Grid>
        </Grid>
    )
}
