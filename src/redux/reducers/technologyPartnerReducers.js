import { 
    TECHNOLOGY_PARTNER_DELETE_FAIL,
    TECHNOLOGY_PARTNER_DELETE_REQUEST,
    TECHNOLOGY_PARTNER_DELETE_SUCCESS,
    TECHNOLOGY_PARTNER_DETAILS_FAIL,
    TECHNOLOGY_PARTNER_DETAILS_REQUEST,
    TECHNOLOGY_PARTNER_DETAILS_SUCCESS,
    TECHNOLOGY_PARTNER_LIST_FAIL,
    TECHNOLOGY_PARTNER_LIST_REQUEST, 
    TECHNOLOGY_PARTNER_LIST_SUCCESS, 
    TECHNOLOGY_PARTNER_SAVE_FAIL, 
    TECHNOLOGY_PARTNER_SAVE_REQUEST, 
    TECHNOLOGY_PARTNER_SAVE_SUCCESS, 

} from '../constants/technologyPartnerConstants';



function technologyPartnerListReducer(state={technologyPartners:[]},action){
    switch(action.type){
        case TECHNOLOGY_PARTNER_LIST_REQUEST:
            return { loading:true, technologyPartners:[] };
        case TECHNOLOGY_PARTNER_LIST_SUCCESS:
            return { loading:false, technologyPartners:action.payload };
        case TECHNOLOGY_PARTNER_LIST_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};


function technologyPartnerDetailsReducer(state={technologyPartner:{}},action){
    switch(action.type){
        case TECHNOLOGY_PARTNER_DETAILS_REQUEST:
            return { loading:true };
        case TECHNOLOGY_PARTNER_DETAILS_SUCCESS:
            return { loading:false, technologyPartner:action.payload };
        case TECHNOLOGY_PARTNER_DETAILS_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
}

function technologyPartnerSaveReducer(state={technologyPartner:{}},action){
    switch(action.type){
        case TECHNOLOGY_PARTNER_SAVE_REQUEST:
            return { loading:true };
        case TECHNOLOGY_PARTNER_SAVE_SUCCESS:
            return { loading:false, success:true, technologyPartner:action.payload };
        case TECHNOLOGY_PARTNER_SAVE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

function technologyPartnerDeleteReducer(state={technologyPartner:{}},action){
    switch(action.type){
        case TECHNOLOGY_PARTNER_DELETE_REQUEST:
            return { loading:true };
        case TECHNOLOGY_PARTNER_DELETE_SUCCESS:
            return { loading:false, success:true, technologyPartner:action.payload };
        case TECHNOLOGY_PARTNER_DELETE_FAIL:
            return { loading:false, error: action.payload };
        default:
            return state;
    }
};

export { 
    technologyPartnerListReducer, 
    technologyPartnerDetailsReducer,
    technologyPartnerSaveReducer,
    technologyPartnerDeleteReducer
 }; 
