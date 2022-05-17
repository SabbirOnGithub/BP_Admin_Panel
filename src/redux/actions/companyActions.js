import {config} from "../../config";
import {axiosWithoutToken, axiosWithToken} from "../../helpers/axios";
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

const BASE_API_URL = config.BASE_API_URL;

const listCompanies = () => async (dispatch) => {
	try {
		dispatch({type: COMPANY_LIST_REQUEST});
		const {data} = await axiosWithoutToken.get(`${BASE_API_URL}/Company`);
		if (data.status === true) {
			dispatch({
				type: COMPANY_LIST_SUCCESS,
				payload: data.data?.reverse() ? data.data : [],
			});
		} else {
			dispatch({type: COMPANY_LIST_FAIL, payload: data.message});
		}
		// console.log(data.data)
	} catch (error) {
		dispatch({type: COMPANY_LIST_FAIL, payload: error.message});
	}
};

const detailsCompany = (id) => async (dispatch) => {
	try {
		dispatch({type: COMPANY_DETAILS_REQUEST});
		const {data} = await axiosWithoutToken.get("/Company/" + id);
		dispatch({type: COMPANY_DETAILS_SUCCESS, payload: data});
	} catch (error) {
		dispatch({type: COMPANY_DETAILS_FAIL, payload: error.message});
	}
};

const saveCompany = (item, id) => async (dispatch) => {
	try {
		dispatch({type: COMPANY_SAVE_REQUEST, payload: item});

		if (!id) {
			//eslint-disable-next-line
			const formatHomePageData = delete item.id;
			// console.log(homePageData)
			const {data} = await axiosWithToken.post("/Company/Create", item);
			if (data.status === true) {
				dispatch({type: COMPANY_SAVE_SUCCESS, payload: data});
			} else {
				dispatch({type: COMPANY_SAVE_FAIL, payload: data.message});
			}
		} else {
			const {data} = await axiosWithToken.put("/Company/Update", item);
			if (data.status === true) {
				dispatch({type: COMPANY_SAVE_SUCCESS, payload: data});
			} else {
				dispatch({type: COMPANY_SAVE_FAIL, payload: data.message});
			}
		}
	} catch (error) {
		console.log(error);
		dispatch({type: COMPANY_SAVE_FAIL, payload: error.message});
	}
};

const deleteCompany = (id) => async (dispatch, getState) => {
	try {
		dispatch({type: COMPANY_DELETE_REQUEST});
		const {data} = await axiosWithToken.delete("/Company/" + id);
		if (data.status === true) {
			dispatch({type: COMPANY_DELETE_SUCCESS, payload: data, success: true});
		} else {
			dispatch({type: COMPANY_DELETE_FAIL, payload: data.message});
		}
	} catch (error) {
		dispatch({type: COMPANY_DELETE_FAIL, payload: error.message});
	}
};

export {listCompanies, detailsCompany, saveCompany, deleteCompany};
