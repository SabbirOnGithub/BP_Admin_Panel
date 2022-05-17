import {
	COMPANY_DELETE_FAIL,
	COMPANY_DELETE_REQUEST,
	COMPANY_DELETE_SUCCESS,
	COMPANY_DETAILS_FAIL,
	COMPANY_DETAILS_REQUEST,
	COMPANY_DETAILS_SUCCESS,
	COMPANY_LIST_FAIL,
	COMPANY_LIST_REQUEST,
	COMPANY_LIST_SUCCESS,
	COMPANY_SAVE_FAIL,
	COMPANY_SAVE_REQUEST,
	COMPANY_SAVE_SUCCESS,
} from "../constants/companyConstants";

function companyListReducer(state = {companies: []}, action) {
	switch (action.type) {
		case COMPANY_LIST_REQUEST:
			return {loading: true, companies: []};
		case COMPANY_LIST_SUCCESS:
			return {loading: false, companies: action.payload};
		case COMPANY_LIST_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function companyDetailsReducer(state = {company: {}}, action) {
	switch (action.type) {
		case COMPANY_DETAILS_REQUEST:
			return {loading: true};
		case COMPANY_DETAILS_SUCCESS:
			return {loading: false, company: action.payload};
		case COMPANY_DETAILS_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function companySaveReducer(state = {company: {}}, action) {
	switch (action.type) {
		case COMPANY_SAVE_REQUEST:
			return {loading: true};
		case COMPANY_SAVE_SUCCESS:
			return {loading: false, success: true, company: action.payload};
		case COMPANY_SAVE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function companyDeleteReducer(state = {company: {}}, action) {
	switch (action.type) {
		case COMPANY_DELETE_REQUEST:
			return {loading: true};
		case COMPANY_DELETE_SUCCESS:
			return {loading: false, success: true, company: action.payload};
		case COMPANY_DELETE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

export {
	companyListReducer,
	companyDetailsReducer,
	companySaveReducer,
	companyDeleteReducer,
};
