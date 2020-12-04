import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { subMenuDeleteReducer, subMenuDetailsReducer, subMenuListReducer, subMenuSaveReducer } from './reducers/subMenuReducers';
import { homePageDataListReducer, homePageDataDetailsReducer, homePageDataSaveReducer,homePageDataDeleteReducer } from './reducers/homePageReducers';
import { menuListReducer, menuDetailsReducer, menuSaveReducer,menuDeleteReducer } from './reducers/menuReducers';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import { userSigninReducer, userRegisterReducer, userUpdateReducer, userListReducer, userDeleteReducer, userDetailsReducer } from './reducers/userReducers';
import { homePageSliderDeleteReducer, homePageSliderDetailsReducer, homePageSliderListReducer, homePageSliderSaveReducer } from './reducers/homePageSliderReducers';
import { footerSectionDeleteReducer, footerSectionDetailsReducer, footerSectionListReducer, footerSectionSaveReducer } from './reducers/footerSectionReducers';
import { homePageCoreValueDetailDeleteReducer, homePageCoreValueDetailDetailsReducer, homePageCoreValueDetailListReducer, homePageCoreValueDetailSaveReducer } from './reducers/homePageCoreValueDetailReducers';
import { homePageFunctionAreaDetailDeleteReducer, homePageFunctionAreaDetailDetailsReducer, homePageFunctionAreaDetailListReducer, homePageFunctionAreaDetailSaveReducer } from './reducers/homePageFunctionAreaDetailReducers';
import { homeConsultationTopicDeleteReducer, homeConsultationTopicDetailsReducer, homeConsultationTopicListReducer, homeConsultationTopicSaveReducer } from './reducers/homeConsultationTopicReducers';

const userInfo = Cookie.getJSON("userInfo") || null;


const initialState={ 
    userSignin:{ userInfo }
};
const reducer = combineReducers({
    userList:userListReducer,
    userDetails: userDetailsReducer,
    userSignin:userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    subMenuList:subMenuListReducer,
    subMenuDetails: subMenuDetailsReducer,
    subMenuSave: subMenuSaveReducer,
    subMenuDelete: subMenuDeleteReducer,
    homePageDataList:homePageDataListReducer,
    homePageDataDetails: homePageDataDetailsReducer,
    homePageDataSave: homePageDataSaveReducer,
    homePageDataDelete: homePageDataDeleteReducer,
    menuList:menuListReducer,
    menuDetails: menuDetailsReducer,
    menuSave: menuSaveReducer,
    menuDelete: menuDeleteReducer,
    homePageSliderList:homePageSliderListReducer,
    homePageSliderDetails: homePageSliderDetailsReducer,
    homePageSliderSave: homePageSliderSaveReducer,
    homePageSliderDelete: homePageSliderDeleteReducer,
    footerSectionList:footerSectionListReducer,
    footerSectionDetails: footerSectionDetailsReducer,
    footerSectionSave: footerSectionSaveReducer,
    footerSectionDelete: footerSectionDeleteReducer,
    homePageCoreValueDetailList:homePageCoreValueDetailListReducer,
    homePageCoreValueDetailDetails: homePageCoreValueDetailDetailsReducer,
    homePageCoreValueDetailSave: homePageCoreValueDetailSaveReducer,
    homePageCoreValueDetailDelete: homePageCoreValueDetailDeleteReducer,
    homePageFunctionAreaDetailList:homePageFunctionAreaDetailListReducer,
    homePageFunctionAreaDetailDetails: homePageFunctionAreaDetailDetailsReducer,
    homePageFunctionAreaDetailSave: homePageFunctionAreaDetailSaveReducer,
    homePageFunctionAreaDetailDelete: homePageFunctionAreaDetailDeleteReducer,
    homeConsultationTopicList:homeConsultationTopicListReducer,
    homeConsultationTopicDetails: homeConsultationTopicDetailsReducer,
    homeConsultationTopicSave: homeConsultationTopicSaveReducer,
    homeConsultationTopicDelete: homeConsultationTopicDeleteReducer,

});
const composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk))); 

export default store;