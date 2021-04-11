import { 
    SOFTWARE_TRAINING_PRICE_LIST_REQUEST, 
    SOFTWARE_TRAINING_PRICE_LIST_FAIL, 
    SOFTWARE_TRAINING_PRICE_LIST_SUCCESS, 
    SOFTWARE_TRAINING_PRICE_DETAILS_SUCCESS, 
    SOFTWARE_TRAINING_PRICE_DETAILS_REQUEST, 
    SOFTWARE_TRAINING_PRICE_DETAILS_FAIL,
    SOFTWARE_TRAINING_PRICE_SAVE_REQUEST,
    SOFTWARE_TRAINING_PRICE_SAVE_SUCCESS,
    SOFTWARE_TRAINING_PRICE_SAVE_FAIL,
    SOFTWARE_TRAINING_PRICE_DELETE_REQUEST,
    SOFTWARE_TRAINING_PRICE_DELETE_SUCCESS,
    SOFTWARE_TRAINING_PRICE_DELETE_FAIL,

 } from '../constants/softwareTrainingPriceConstants';


function softwareTrainingPriceListReducer(state={softwareTrainingPrices:[]},action){
    switch(action.type){
        case SOFTWARE_TRAINING_PRICE_LIST_REQUEST:
            return { loading:true, softwareTrainingPrices:[] };
        case SOFTWARE_TRAINING_PRICE_LIST_SUCCESS:
            return { loading:false, softwareTrainingPrices:action.payload };
        case SOFTWARE_TRAINING_PRICE_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function softwareTrainingPriceDetailsReducer(state={softwareTrainingPrice:{}},action){
    switch(action.type){
        case SOFTWARE_TRAINING_PRICE_DETAILS_REQUEST:
            return { loading:true };
        case SOFTWARE_TRAINING_PRICE_DETAILS_SUCCESS:
            return { loading:false, softwareTrainingPrice:action.payload };
        case SOFTWARE_TRAINING_PRICE_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function softwareTrainingPriceSaveReducer(state={softwareTrainingPrice:{}},action){
    switch(action.type){
        case SOFTWARE_TRAINING_PRICE_SAVE_REQUEST:
            return { loading:true };
        case SOFTWARE_TRAINING_PRICE_SAVE_SUCCESS:
            return { loading:false, success:true, softwareTrainingPrice:action.payload };
        case SOFTWARE_TRAINING_PRICE_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function softwareTrainingPriceDeleteReducer(state={softwareTrainingPrice:{}},action){
    switch(action.type){
        case SOFTWARE_TRAINING_PRICE_DELETE_REQUEST:
            return { loading:true };
        case SOFTWARE_TRAINING_PRICE_DELETE_SUCCESS:
            return { loading:false, success:true, softwareTrainingPrice:action.payload };
        case SOFTWARE_TRAINING_PRICE_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    softwareTrainingPriceListReducer, 
    softwareTrainingPriceDetailsReducer,
    softwareTrainingPriceSaveReducer,
    softwareTrainingPriceDeleteReducer

 }; 
