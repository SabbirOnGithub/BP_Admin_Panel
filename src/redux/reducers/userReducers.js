const {
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_FAIL,
	USER_SIGNIN_SUCCESS,
	USER_SAVE_REQUEST,
	USER_SAVE_SUCCESS,
	USER_SAVE_FAIL,
	USER_LOGOUT,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_UPDATE_SUCCESS,
	USER_ACCEPT_CLIENT_LIST_REQUEST,
	USER_ACCEPT_CLIENT_LIST_SUCCESS,
	USER_ACCEPT_CLIENT_LIST_FAIL,
	USER_DEACTIVATE_REQUEST,
	USER_DEACTIVATE_SUCCESS,
	USER_DEACTIVATE_FAIL,
	USER_PASSWORD_CHANGE_REQUEST,
	USER_PASSWORD_CHANGE_SUCCESS,
	USER_PASSWORD_CHANGE_FAIL,
} = require("../constants/userConstants");

function userListReducer(state = {users: []}, action) {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return {loading: true, users: []};
		case USER_LIST_SUCCESS:
			return {loading: false, users: action.payload};
		case USER_LIST_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}
function userAcceptClientListReducer(state = {userAcceptClients: []}, action) {
	switch (action.type) {
		case USER_ACCEPT_CLIENT_LIST_REQUEST:
			return {loading: true, userAcceptClients: []};
		case USER_ACCEPT_CLIENT_LIST_SUCCESS:
			return {loading: false, userAcceptClients: action.payload};
		case USER_ACCEPT_CLIENT_LIST_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}
const userSaveReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_SAVE_REQUEST:
			return {loading: true};
		case USER_SAVE_SUCCESS:
			return {loading: false, success: true, user: action.payload};
		case USER_SAVE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
};

function userDetailsReducer(state = {user: {}}, action) {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {loading: true};
		case USER_DETAILS_SUCCESS:
			return {loading: false, user: action.payload};
		case USER_DETAILS_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function userDeleteReducer(state = {user: {}}, action) {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return {loading: true};
		case USER_DELETE_SUCCESS:
			return {loading: false, success: true, user: action.payload};
		case USER_DELETE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

const userSigninReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_SIGNIN_REQUEST:
			return {loading: true};
		case USER_SIGNIN_SUCCESS:
			return {loading: false, userInfo: action.payload};
		case USER_UPDATE_SUCCESS:
			return {
				loading: false,
				userInfo: {
					...state.userInfo,
					...action.payload,
					userImage: action?.payload?.photo,
				},
			};
		case USER_SIGNIN_FAIL:
			return {loading: false, error: action.payload};
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

const userDeactivateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DEACTIVATE_REQUEST:
			return {loading: true};
		case USER_DEACTIVATE_SUCCESS:
			return {
				// loading: false,
				// userInfo: {
				// 	...state.userInfo,
				// 	...action.payload,
				// 	userImage: action?.payload?.photo,
				// },
			};
		case USER_DEACTIVATE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
};

const userPasswordChangeReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PASSWORD_CHANGE_REQUEST:
			return {loading: true};
		case USER_PASSWORD_CHANGE_SUCCESS:
			return {loading: false, userInfo: action.payload};
		case USER_UPDATE_SUCCESS:
			return {
				loading: false,
				userInfo: {
					...state.userInfo,
					...action.payload,
					userImage: action?.payload?.photo,
				},
			};
		case USER_PASSWORD_CHANGE_FAIL:
			return {loading: false, error: action.payload};
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export {
	userSigninReducer,
	userSaveReducer,
	userListReducer,
	userDeleteReducer,
	userDetailsReducer,
	userAcceptClientListReducer,
	userDeactivateReducer,
	userPasswordChangeReducer,
};
