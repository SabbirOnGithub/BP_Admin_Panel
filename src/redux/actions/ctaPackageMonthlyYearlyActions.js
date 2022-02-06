import {config} from "../../config";
import {axiosWithoutToken, axiosWithToken} from "../../helpers/axios";
import {
	CTA_PACKAGE_MONTHLY_YEARLY_DELETE_FAIL,
	CTA_PACKAGE_MONTHLY_YEARLY_DELETE_REQUEST,
	CTA_PACKAGE_MONTHLY_YEARLY_DELETE_SUCCESS,
	CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_FAIL,
	CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_REQUEST,
	CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_SUCCESS,
	CTA_PACKAGE_MONTHLY_YEARLY_LIST_FAIL,
	CTA_PACKAGE_MONTHLY_YEARLY_LIST_REQUEST,
	CTA_PACKAGE_MONTHLY_YEARLY_LIST_SUCCESS,
	CTA_PACKAGE_MONTHLY_YEARLY_SAVE_FAIL,
	CTA_PACKAGE_MONTHLY_YEARLY_SAVE_REQUEST,
	CTA_PACKAGE_MONTHLY_YEARLY_SAVE_SUCCESS,
} from "../constants/ctaPackageMonthlyYearlyConstants";

const BASE_API_URL = config.BASE_API_URL;

const listCtaPackageMonthlyYearlys = () => async (dispatch) => {
	try {
		dispatch({type: CTA_PACKAGE_MONTHLY_YEARLY_LIST_REQUEST});
		const {data} = await axiosWithoutToken.get(
			`${BASE_API_URL}/CtaPackageMonthlyYearly/searchAll`
		);
		if (data.status === true) {
			dispatch({
				type: CTA_PACKAGE_MONTHLY_YEARLY_LIST_SUCCESS,
				// payload: data.data?.reverse() ? data.data.item1 : [],
				payload: data.data.item1,
			});
		} else {
			dispatch({
				type: CTA_PACKAGE_MONTHLY_YEARLY_LIST_FAIL,
				payload: data.message,
			});
		}
		// console.log(data.data)
	} catch (error) {
		dispatch({
			type: CTA_PACKAGE_MONTHLY_YEARLY_LIST_FAIL,
			payload: error.message,
		});
	}
};

const detailsCtaPackageMonthlyYearly = (id) => async (dispatch) => {
	try {
		dispatch({type: CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_REQUEST});
		const {data} = await axiosWithoutToken.get(
			"/CtaPackageMonthlyYearly/" + id
		);
		dispatch({type: CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_SUCCESS, payload: data});
	} catch (error) {
		dispatch({
			type: CTA_PACKAGE_MONTHLY_YEARLY_DETAILS_FAIL,
			payload: error.message,
		});
	}
};

const saveCtaPackageMonthlyYearly = (item) => async (dispatch) => {
	try {
		dispatch({type: CTA_PACKAGE_MONTHLY_YEARLY_SAVE_REQUEST, payload: item});
		if (!item.id) {
			//eslint-disable-next-line
			const formatHomePageData = delete item.id;
			// console.log(homePageData)
			const {data} = await axiosWithToken.post(
				"/CtaPackageMonthlyYearly",
				item
			);
			if (data.status === true) {
				dispatch({
					type: CTA_PACKAGE_MONTHLY_YEARLY_SAVE_SUCCESS,
					payload: data,
				});
			} else {
				dispatch({
					type: CTA_PACKAGE_MONTHLY_YEARLY_SAVE_FAIL,
					payload: data.message,
				});
			}
		} else {
			const {data} = await axiosWithToken.put(
				"/CtaPackageMonthlyYearly/",
				item
			);
			if (data.status === true) {
				dispatch({
					type: CTA_PACKAGE_MONTHLY_YEARLY_SAVE_SUCCESS,
					payload: data,
				});
			} else {
				dispatch({
					type: CTA_PACKAGE_MONTHLY_YEARLY_SAVE_FAIL,
					payload: data.message,
				});
			}
		}
	} catch (error) {
		console.log(error);
		dispatch({
			type: CTA_PACKAGE_MONTHLY_YEARLY_SAVE_FAIL,
			payload: error.message,
		});
	}
};

const deleteCtaPackageMonthlyYearly = (id) => async (dispatch, getState) => {
	try {
		dispatch({type: CTA_PACKAGE_MONTHLY_YEARLY_DELETE_REQUEST});
		const {data} = await axiosWithToken.delete(
			"/CtaPackageMonthlyYearly/" + id
		);
		if (data.status === true) {
			dispatch({
				type: CTA_PACKAGE_MONTHLY_YEARLY_DELETE_SUCCESS,
				payload: data,
				success: true,
			});
		} else {
			dispatch({
				type: CTA_PACKAGE_MONTHLY_YEARLY_DELETE_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		dispatch({
			type: CTA_PACKAGE_MONTHLY_YEARLY_DELETE_FAIL,
			payload: error.message,
		});
	}
};

export {
	listCtaPackageMonthlyYearlys,
	detailsCtaPackageMonthlyYearly,
	saveCtaPackageMonthlyYearly,
	deleteCtaPackageMonthlyYearly,
};
