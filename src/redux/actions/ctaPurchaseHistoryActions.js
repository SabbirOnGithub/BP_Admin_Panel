import {axiosWithToken} from "../../helpers/axios";
import {
	CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_FAIL,
	CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_REQUEST,
	CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_SUCCESS,
	CTA_PURCHASE_HISTORY_SAVE_FAIL,
	CTA_PURCHASE_HISTORY_SAVE_REQUEST,
	CTA_PURCHASE_HISTORY_SAVE_SUCCESS,
} from "../constants/ctaPurchaseHistoryConstants";

const saveCtaPurchaseHistory = (item) => async (dispatch) => {
	// console.log(item)

	try {
		dispatch({type: CTA_PURCHASE_HISTORY_SAVE_REQUEST, payload: item});
		if (!item.id) {
			//eslint-disable-next-line
			const formatHomePageData = delete item.id;
			// console.log(homePageData)
			const {data} = await axiosWithToken.post("/CtaPurchaseHistory", item);
			if (data.status === true) {
				dispatch({type: CTA_PURCHASE_HISTORY_SAVE_SUCCESS, payload: data});
				return data;
			} else {
				dispatch({type: CTA_PURCHASE_HISTORY_SAVE_FAIL, payload: data.message});
			}
			// console.log(data)
		}
		// else{
		//     const { data } = await axiosWithToken.put("/CtaPurchaseHistory/", item);
		//     if (data.status === true) {
		//         dispatch({type: CTA_PURCHASE_HISTORY_SAVE_SUCCESS, payload: data });
		//     }else{
		//         dispatch({ type: CTA_PURCHASE_HISTORY_SAVE_FAIL, payload: data.message });
		//     }
		// }
	} catch (error) {
		console.log(error);
		dispatch({type: CTA_PURCHASE_HISTORY_SAVE_FAIL, payload: error.message});
	}
};

const updateCtaPurchaseHistoryPackage = (item) => async (dispatch) => {
	console.log("item from action: ", item);

	try {
		dispatch({
			type: CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_REQUEST,
			payload: item,
		});
		const {data} = await axiosWithToken.put(
			"/CtaPurchaseHistory/UpdatePackage",
			item
		);
		if (data.status === true) {
			dispatch({
				type: CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_SUCCESS,
				payload: data,
			});
			return data;
		} else {
			dispatch({
				type: CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_FAIL,
				payload: data.message,
			});
		}
	} catch (error) {
		console.log(error);
		dispatch({
			type: CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_FAIL,
			payload: error.message,
		});
	}
};

export {saveCtaPurchaseHistory, updateCtaPurchaseHistoryPackage};
