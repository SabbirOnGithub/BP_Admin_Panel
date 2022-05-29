import {
	CLIENT_DELETE_FAIL,
	CLIENT_DELETE_REQUEST,
	CLIENT_DELETE_SUCCESS,
	CLIENT_DETAILS_FAIL,
	CLIENT_DETAILS_REQUEST,
	CLIENT_DETAILS_SUCCESS,
	CLIENT_LIST_FAIL,
	CLIENT_LIST_REQUEST,
	CLIENT_LIST_SUCCESS,
	CLIENT_SAVE_FAIL,
	CLIENT_SAVE_REQUEST,
	CLIENT_SAVE_SUCCESS,
} from "../constants/clientConstants";

function clientListReducer(state = {clients: []}, action) {
	switch (action.type) {
		case CLIENT_LIST_REQUEST:
			return {loading: true, clients: []};
		case CLIENT_LIST_SUCCESS:
			return {loading: false, clients: action.payload};
		case CLIENT_LIST_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function clientDetailsReducer(state = {client: {}}, action) {
	switch (action.type) {
		case CLIENT_DETAILS_REQUEST:
			return {loading: true};
		case CLIENT_DETAILS_SUCCESS:
			return {loading: false, client: action.payload};
		case CLIENT_DETAILS_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function clientSaveReducer(state = {client: {}}, action) {
	switch (action.type) {
		case CLIENT_SAVE_REQUEST:
			return {loading: true};
		case CLIENT_SAVE_SUCCESS:
			return {loading: false, success: true, client: action.payload};
		case CLIENT_SAVE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function clientDeleteReducer(state = {client: {}}, action) {
	switch (action.type) {
		case CLIENT_DELETE_REQUEST:
			return {loading: true};
		case CLIENT_DELETE_SUCCESS:
			return {loading: false, success: true, client: action.payload};
		case CLIENT_DELETE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

export {
	clientListReducer,
	clientDetailsReducer,
	clientSaveReducer,
	clientDeleteReducer,
};
