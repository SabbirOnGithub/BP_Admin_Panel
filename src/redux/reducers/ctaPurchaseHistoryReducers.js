import {
	CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_FAIL,
	CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_REQUEST,
	CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_SUCCESS,
	CTA_PURCHASE_HISTORY_SAVE_FAIL,
	CTA_PURCHASE_HISTORY_SAVE_REQUEST,
	CTA_PURCHASE_HISTORY_SAVE_SUCCESS,
} from "../constants/ctaPurchaseHistoryConstants";

function ctaPurchaseHistorySaveReducer(
	state = {ctaPurchaseHistory: {}},
	action
) {
	switch (action.type) {
		case CTA_PURCHASE_HISTORY_SAVE_REQUEST:
			return {loading: true};
		case CTA_PURCHASE_HISTORY_SAVE_SUCCESS:
			return {
				loading: false,
				success: true,
				ctaPurchaseHistory: action.payload,
			};
		case CTA_PURCHASE_HISTORY_SAVE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

function ctaPurchaseHistoryPackageUpdateReducer(
	state = {ctaPurchaseHistory: {}},
	action
) {
	switch (action.type) {
		case CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_REQUEST:
			return {loading: true};
		case CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				ctaPurchaseHistory: action.payload,
			};
		case CTA_PURCHASE_HISTORY_PACKAGE_UPDATE_FAIL:
			return {loading: false, error: action.payload};
		default:
			return state;
	}
}

export {ctaPurchaseHistorySaveReducer, ctaPurchaseHistoryPackageUpdateReducer};
