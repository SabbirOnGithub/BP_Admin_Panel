import {
	COMPANY_SIZE_DELETE_FAIL,
	COMPANY_SIZE_DELETE_REQUEST,
	COMPANY_SIZE_DELETE_SUCCESS,
	COMPANY_SIZE_DETAILS_FAIL,
	COMPANY_SIZE_DETAILS_REQUEST,
	COMPANY_SIZE_DETAILS_SUCCESS,
	COMPANY_SIZE_LIST_FAIL,
	COMPANY_SIZE_LIST_REQUEST,
	COMPANY_SIZE_LIST_SUCCESS,
	COMPANY_SIZE_SAVE_FAIL,
	COMPANY_SIZE_SAVE_REQUEST,
	COMPANY_SIZE_SAVE_SUCCESS,
} from "../constants/companySizeConstants";

function companySizeListReducer(state = {companySizes: []}, action) {
	switch (action.type) {
		case COMPANY_SIZE_LIST_REQUEST:
			return {loading: true, companySizes: []};
		case COMPANY_SIZE_LIST_SUCCESS:
			return {loading: false, companySizes: action.payload};
		case COMPANY_SIZE_LIST_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function companySizeDetailsReducer(state = {companySize: {}}, action) {
	switch (action.type) {
		case COMPANY_SIZE_DETAILS_REQUEST:
			return {loading: true};
		case COMPANY_SIZE_DETAILS_SUCCESS:
			return {loading: false, companySize: action.payload};
		case COMPANY_SIZE_DETAILS_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function companySizeSaveReducer(state = {companySize: {}}, action) {
	switch (action.type) {
		case COMPANY_SIZE_SAVE_REQUEST:
			return {loading: true};
		case COMPANY_SIZE_SAVE_SUCCESS:
			return {loading: false, success: true, companySize: action.payload};
		case COMPANY_SIZE_SAVE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function companySizeDeleteReducer(state = {companySize: {}}, action) {
	switch (action.type) {
		case COMPANY_SIZE_DELETE_REQUEST:
			return {loading: true};
		case COMPANY_SIZE_DELETE_SUCCESS:
			return {loading: false, success: true, companySize: action.payload};
		case COMPANY_SIZE_DELETE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

export {
	companySizeListReducer,
	companySizeDetailsReducer,
	companySizeSaveReducer,
	companySizeDeleteReducer,
};
