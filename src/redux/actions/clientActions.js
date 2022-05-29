import {config} from "../../config";
import {axiosWithoutToken, axiosWithToken} from "../../helpers/axios";
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

const BASE_API_URL = config.BASE_API_URL;

const listClients = () => async (dispatch) => {
	try {
		dispatch({type: CLIENT_LIST_REQUEST});
		const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/Client`);
		if (data.status === true) {
			dispatch({
				type: CLIENT_LIST_SUCCESS,
				payload: data.data?.reverse() ? data.data : [],
			});
		} else {
			dispatch({type: CLIENT_LIST_FAIL, payload: data.message});
		}
		// console.log(data.data)
	} catch (error) {
		dispatch({type: CLIENT_LIST_FAIL, payload: error.message});
	}
};

const detailsClient = (id) => async (dispatch) => {
	try {
		dispatch({type: CLIENT_DETAILS_REQUEST});
		const {data} = await axiosWithoutToken.get("/Client/" + id);
		dispatch({type: CLIENT_DETAILS_SUCCESS, payload: data});
	} catch (error) {
		dispatch({type: CLIENT_DETAILS_FAIL, payload: error.message});
	}
};

const saveClient = (item, id) => async (dispatch) => {
	try {
		dispatch({type: CLIENT_SAVE_REQUEST, payload: item});

		if (!id) {
			//eslint-disable-next-line
			const formatHomePageData = delete item.id;
			// console.log(homePageData)
			const {data} = await axiosWithToken.post("/Client/Create", item);
			if (data.status === true) {
				dispatch({type: CLIENT_SAVE_SUCCESS, payload: data});
			} else {
				dispatch({type: CLIENT_SAVE_FAIL, payload: data.message});
			}
		} else {
			const {data} = await axiosWithToken.put("/Client/Update", item);
			if (data.status === true) {
				dispatch({type: CLIENT_SAVE_SUCCESS, payload: data});
			} else {
				dispatch({type: CLIENT_SAVE_FAIL, payload: data.message});
			}
		}
	} catch (error) {
		console.log(error);
		dispatch({type: CLIENT_SAVE_FAIL, payload: error.message});
	}
};

const deleteClient = (id) => async (dispatch, getState) => {
	try {
		dispatch({type: CLIENT_DELETE_REQUEST});
		const {data} = await axiosWithToken.delete("/Client/" + id);
		if (data.status === true) {
			dispatch({type: CLIENT_DELETE_SUCCESS, payload: data, success: true});
		} else {
			dispatch({type: CLIENT_DELETE_FAIL, payload: data.message});
		}
	} catch (error) {
		dispatch({type: CLIENT_DELETE_FAIL, payload: error.message});
	}
};

export {listClients, detailsClient, saveClient, deleteClient};
