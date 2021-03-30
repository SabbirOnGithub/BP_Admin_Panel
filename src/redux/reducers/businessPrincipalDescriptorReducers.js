import { 
    BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_REQUEST, 
    BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_FAIL, 
    BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_SUCCESS,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_REQUEST,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_SUCCESS,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_FAIL,
    BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_REQUEST,
    BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_SUCCESS,
    BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_FAIL,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_REQUEST,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_SUCCESS,
    BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_FAIL, 

 } from '../constants/businessPrincipalDescriptorConstants';


function businessPrincipalDescriptorListReducer(state={businessPrincipalDescriptors:[]},action){
    switch(action.type){
        case BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_REQUEST:
            return { loading:true, businessPrincipalDescriptors:[] };
        case BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_SUCCESS:
            return { loading:false, businessPrincipalDescriptors:action.payload };
        case BUSINESS_PRINCIPAL_DESCRIPTOR_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function businessPrincipalDescriptorDetailsReducer(state={businessPrincipalDescriptor:{}},action){
    switch(action.type){
        case BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_REQUEST:
            return { loading:true };
        case BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_SUCCESS:
            return { loading:false, businessPrincipalDescriptor:action.payload };
        case BUSINESS_PRINCIPAL_DESCRIPTOR_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function businessPrincipalDescriptorSaveReducer(state={businessPrincipalDescriptor:{}},action){
    switch(action.type){
        case BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_REQUEST:
            return { loading:true };
        case BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_SUCCESS:
            return { loading:false, success:true, businessPrincipalDescriptor:action.payload };
        case BUSINESS_PRINCIPAL_DESCRIPTOR_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function businessPrincipalDescriptorDeleteReducer(state={businessPrincipalDescriptor:{}},action){
    switch(action.type){
        case BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_REQUEST:
            return { loading:true };
        case BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_SUCCESS:
            return { loading:false, success:true, businessPrincipalDescriptor:action.payload };
        case BUSINESS_PRINCIPAL_DESCRIPTOR_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


export {  businessPrincipalDescriptorListReducer, businessPrincipalDescriptorDetailsReducer, businessPrincipalDescriptorSaveReducer, businessPrincipalDescriptorDeleteReducer }; 
