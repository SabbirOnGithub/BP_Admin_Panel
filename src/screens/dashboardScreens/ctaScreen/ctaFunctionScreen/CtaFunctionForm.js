import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { useForm } from '../../../../components/UseForm/useForm';
import HorizontalStepper from '../../../../components/Stepper/Stepper';
import CtaFormStepOne from './CtaFormStepOne';
import CtaFormStepTwo from './CtaFormStepTwo';
import CtaFormStepThree from './CtaFormStepThree';
import CtaFormStepFour from './CtaFormStepFour';
import CtaFormStepFive from './CtaFormStepFive';

import { useSelector, useDispatch } from 'react-redux';

import { listCtaFunctionModels, detailsCtaFunction, listCtaFunctionDocuments } from '../../../../redux/actions/ctaFunctionActions';

const initialFValues = {
    id: '',
    subMenuId: null,
    name:'',
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
            // setRecordForEdit, 
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
            loadingCtaPackageMonthlyYearlys,
            handleCtaPayment,
            loadingCtaPaymentSave,
            successCtaPaymentSave,
            loadingCtaPurchaseHistorySave,
            successCtaPurchaseHistorySave,
         } = props;

    // const { email, mobile: phone, name: firstName } = user
    
    
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
        if (activeStep === 1) {
            if ('estimation' in fieldValues)
                temp.estimation = fieldValues.estimation ? "" : "This field is required."
            if ('tellUsMore' in fieldValues)
                temp.tellUsMore = fieldValues.tellUsMore ? "" : "This field is required."
            if ('description' in fieldValues)
                temp.description = fieldValues.description ? "" : "This field is required."
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
    const [activeStep, setActiveStep] = useState(0);
    const [hideNext, setHideNext] = useState(false);
    const [createOrder, setCreateOrder] = useState({});

    const getSteps = () => {
        return ['Info', 'Selection', 'File Submit', 'Purchase', 'Payment', 'Finish'];
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
                            loadingCtaFunctionSave ={loadingCtaFunctionSave}
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
                            setHideNext = {setHideNext}
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
                            setHideNext = {setHideNext}

                        />;
            case 3:
                // step 4
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
                            handleNextToPaymentScreen = {handleNextToPaymentScreen}
                            setHideNext ={setHideNext}
                            handleInputChange ={handleInputChange}
                        />
            case 4:
                // step 5
                return <CtaFormStepFive
                            values={values}
                            recordForEdit={ctaFunction}
                            setValues={setValues}
                            createOrder = {createOrder}
                            setHideNext ={setHideNext}
                            handleCtaPayment = {handleCtaPayment}
                            loadingCtaPaymentSave = {loadingCtaPaymentSave}
                            successCtaPaymentSave={successCtaPaymentSave}
                            loadingCtaPurchaseHistorySave = {loadingCtaPurchaseHistorySave}
                            successCtaPurchaseHistorySave ={successCtaPurchaseHistorySave}
                            setActiveStep ={setActiveStep}
                            
                            
                        />
            default:
                return 'Finish';
        }
    }
    const handleNext = (e) => {
        e.preventDefault();
        // before increment
        if(activeStep ===2 || activeStep ===3){
            setHideNext(true)
        }
        else{
            setHideNext(false)
        }

        if (validate()) {
            const formatData = {
                ...values
            }
            if(activeStep ===0){
                (formatData?.technologyPreference && typeof (formatData?.technologyPreference) === 'object') && (formatData['technologyPreference'] = formatData?.technologyPreference?.map((item) => item.id).toString());
                formatData['name'] = user?.name
                formatData['firstName'] = user?.firstName
                formatData['lastName'] = user?.lastName
                formatData['businessName'] = user?.companyName
                formatData['email'] = user?.email
                formatData['phone'] = user?.mobile
                // if(values.technologyPreference){
                //     let technologyPreference = values?.technologyPreference?.map((item) => item.id);
                //     values.technologyPreference = technologyPreference.toString();
                // }
            }
            if(activeStep ===1){
                if(formatData.estimation){
                    // console.log(values.estimation)
                    formatData.estimation = values.estimation.toISOString();
                }
            }
            // console.log(user)
            // console.log(formatData)
            addOrEdit(formatData, values, resetForm, activeStep, setActiveStep, setValues);
            // setActiveStep((prevActiveStep) => prevActiveStep + 1);
            
        }
    };

    const handleNextToPaymentScreen = (order) => {
        // send to next step with product details
        setCreateOrder(order)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    };

    const handleBack = () => {
        if(activeStep ===3 || activeStep ===4){
            setHideNext(true)
        }else{
            setHideNext(false)
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
            // if (recordForEdit != null){
            //     setValues({
            //         ...recordForEdit
            //     })
            // }
            
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
        ctaFunctionModels?.id,
        // successCtaPurchaseHistorySave
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
                    hideNext ={hideNext}
                />
            </Grid>
        </Grid>
    )
}
