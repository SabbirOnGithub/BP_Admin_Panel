import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { subMenuDeleteReducer, subMenuDetailsReducer, subMenuListReducer, subMenuSaveReducer } from './reducers/subMenuReducers';
import { homePageDataListReducer, homePageDataDetailsReducer, homePageDataSaveReducer,homePageDataDeleteReducer } from './reducers/homePageReducers';
import { menuListReducer, menuDetailsReducer, menuSaveReducer,menuDeleteReducer } from './reducers/menuReducers';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import { userSigninReducer, userListReducer, userDeleteReducer, userDetailsReducer, userSaveReducer } from './reducers/userReducers';
import { homePageSliderDeleteReducer, homePageSliderDetailsReducer, homePageSliderListReducer, homePageSliderSaveReducer } from './reducers/homePageSliderReducers';
import { footerSectionDeleteReducer, footerSectionDetailsReducer, footerSectionListReducer, footerSectionSaveReducer } from './reducers/footerSectionReducers';
import { homePageCoreValueDetailDeleteReducer, homePageCoreValueDetailDetailsReducer, homePageCoreValueDetailListReducer, homePageCoreValueDetailSaveReducer } from './reducers/homePageCoreValueDetailReducers';
import { homePageFunctionAreaDetailDeleteReducer, homePageFunctionAreaDetailDetailsReducer, homePageFunctionAreaDetailListReducer, homePageFunctionAreaDetailSaveReducer } from './reducers/homePageFunctionAreaDetailReducers';
import { homeConsultationTopicDeleteReducer, homeConsultationTopicDetailsReducer, homeConsultationTopicListReducer, homeConsultationTopicSaveReducer } from './reducers/homeConsultationTopicReducers';
import { trainingDetailDeleteReducer, trainingDetailDetailsReducer, trainingDetailListReducer, trainingDetailSaveReducer } from './reducers/trainingDetailReducers';
import { testimonialDetailDeleteReducer, testimonialDetailDetailsReducer, testimonialDetailListReducer, testimonialDetailSaveReducer } from './reducers/testimonialDetailReducers';
import { roleDeleteReducer, roleDetailsReducer, roleListReducer, roleSaveReducer } from './reducers/roleReducers';
import { submenuBestPracticeDeleteReducer, submenuBestPracticeDetailsReducer, submenuBestPracticeListReducer, submenuBestPracticeSaveReducer } from './reducers/submenuBestPracticeReducers';
import { subMenuOverViewDeleteReducer, subMenuOverViewDetailsReducer, subMenuOverViewListReducer, subMenuOverViewSaveReducer } from './reducers/subMenuOverViewReducers';
import { menuSubMenuMapItemDeleteReducer, menuSubMenuMapItemDetailsReducer, menuSubMenuMapItemListReducer, menuSubMenuMapItemSaveReducer } from './reducers/menuSubMenuMapItemReducers';
import { menuSubMenuMapItemListItemDeleteReducer, menuSubMenuMapItemListItemDetailsReducer, menuSubMenuMapItemListItemListReducer, menuSubMenuMapItemListItemSaveReducer } from './reducers/menuSubMenuMapItemListItemReducers';
import { menuSubMenuMapDeleteReducer, menuSubMenuMapDetailsReducer, menuSubMenuMapListReducer, menuSubMenuMapSaveReducer } from './reducers/menuSubMenuMapReducers';
import { menuSectionDeleteReducer, menuSectionDetailsReducer, menuSectionListReducer, menuSectionSaveReducer } from './reducers/menuSectionReducers';
import { menuHeroSliderDeleteReducer, menuHeroSliderDetailsReducer, menuHeroSliderListReducer, menuHeroSliderSaveReducer } from './reducers/menuHeroSliderReducers';
import { menuSectionDetailDeleteReducer, menuSectionDetailDetailsReducer, menuSectionDetailListReducer, menuSectionDetailSaveReducer } from './reducers/menuSectionDetailReducers';
import { menuSubMenuMapDetailDeleteReducer, menuSubMenuMapDetailDetailsReducer, menuSubMenuMapDetailListReducer, menuSubMenuMapDetailSaveReducer } from './reducers/menuSubMenuMapDetailReducers';
import { resourceDeleteReducer, resourceDetailsReducer, resourceListReducer, resourceSaveReducer } from './reducers/resourceReducers';
import { blogCategoryDeleteReducer, blogCategoryDetailsReducer, blogCategoryListReducer, blogCategorySaveReducer } from './reducers/blogCategoryReducers';
import { blogSubCategoryDeleteReducer, blogSubCategoryDetailsReducer, blogSubCategoryListReducer, blogSubCategorySaveReducer } from './reducers/blogSubCategoryReducers';

const userInfo = Cookie.getJSON("userInfo") || null;


const initialState={ 
    userSignin:{ userInfo }
};
const reducer = combineReducers({
    userSignin:userSigninReducer,
    userList:userListReducer,
    userSave: userSaveReducer,
    userDetails: userDetailsReducer,
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
    trainingDetailList:trainingDetailListReducer,
    trainingDetailDetails: trainingDetailDetailsReducer,
    trainingDetailSave: trainingDetailSaveReducer,
    trainingDetailDelete: trainingDetailDeleteReducer,
    testimonialDetailList:testimonialDetailListReducer,
    testimonialDetailDetails: testimonialDetailDetailsReducer,
    testimonialDetailSave: testimonialDetailSaveReducer,
    testimonialDetailDelete: testimonialDetailDeleteReducer,
    roleList:roleListReducer,
    roleDetails: roleDetailsReducer,
    roleSave: roleSaveReducer,
    roleDelete: roleDeleteReducer,
    submenuBestPracticeList:submenuBestPracticeListReducer,
    submenuBestPracticeDetails: submenuBestPracticeDetailsReducer,
    submenuBestPracticeSave: submenuBestPracticeSaveReducer,
    submenuBestPracticeDelete: submenuBestPracticeDeleteReducer,
    subMenuOverViewList:subMenuOverViewListReducer,
    subMenuOverViewDetails: subMenuOverViewDetailsReducer,
    subMenuOverViewSave: subMenuOverViewSaveReducer,
    subMenuOverViewDelete: subMenuOverViewDeleteReducer,
    menuSubMenuMapItemList:menuSubMenuMapItemListReducer,
    menuSubMenuMapItemDetails: menuSubMenuMapItemDetailsReducer,
    menuSubMenuMapItemSave: menuSubMenuMapItemSaveReducer,
    menuSubMenuMapItemDelete: menuSubMenuMapItemDeleteReducer,
    menuSubMenuMapItemListItemList:menuSubMenuMapItemListItemListReducer,
    menuSubMenuMapItemListItemDetails: menuSubMenuMapItemListItemDetailsReducer,
    menuSubMenuMapItemListItemSave: menuSubMenuMapItemListItemSaveReducer,
    menuSubMenuMapItemListItemDelete: menuSubMenuMapItemListItemDeleteReducer,
    menuSubMenuMapList:menuSubMenuMapListReducer,
    menuSubMenuMapDetails: menuSubMenuMapDetailsReducer,
    menuSubMenuMapSave: menuSubMenuMapSaveReducer,
    menuSubMenuMapDelete: menuSubMenuMapDeleteReducer,
    menuSectionList:menuSectionListReducer,
    menuSectionDetails: menuSectionDetailsReducer,
    menuSectionSave: menuSectionSaveReducer,
    menuSectionDelete: menuSectionDeleteReducer,
    menuHeroSliderList:menuHeroSliderListReducer,
    menuHeroSliderDetails: menuHeroSliderDetailsReducer,
    menuHeroSliderSave: menuHeroSliderSaveReducer,
    menuHeroSliderDelete: menuHeroSliderDeleteReducer,
    menuSectionDetailList:menuSectionDetailListReducer,
    menuSectionDetailDetails: menuSectionDetailDetailsReducer,
    menuSectionDetailSave: menuSectionDetailSaveReducer,
    menuSectionDetailDelete: menuSectionDetailDeleteReducer,
    menuSubMenuMapDetailList:menuSubMenuMapDetailListReducer,
    menuSubMenuMapDetailDetails: menuSubMenuMapDetailDetailsReducer,
    menuSubMenuMapDetailSave: menuSubMenuMapDetailSaveReducer,
    menuSubMenuMapDetailDelete: menuSubMenuMapDetailDeleteReducer,
    resourceList:resourceListReducer,
    resourceDetails: resourceDetailsReducer,
    resourceSave: resourceSaveReducer,
    resourceDelete: resourceDeleteReducer,
    blogCategoryList:blogCategoryListReducer,
    blogCategoryDetails: blogCategoryDetailsReducer,
    blogCategorySave: blogCategorySaveReducer,
    blogCategoryDelete: blogCategoryDeleteReducer,
    blogSubCategoryList:blogSubCategoryListReducer,
    blogSubCategoryDetails: blogSubCategoryDetailsReducer,
    blogSubCategorySave: blogSubCategorySaveReducer,
    blogSubCategoryDelete: blogSubCategoryDeleteReducer,
});
const composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk))); 

export default store;