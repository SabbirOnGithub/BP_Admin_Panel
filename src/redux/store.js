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
import { roleResourceDeleteReducer, roleResourceDetailsReducer, roleResourceListReducer, roleResourceSaveReducer } from './reducers/roleResourceReducers';
import { blogPostDeleteReducer, blogPostDetailsReducer, blogPostListReducer, blogPostSaveReducer } from './reducers/blogPostReducers';
import { modernTechDetailDeleteReducer, modernTechDetailDetailsReducer, modernTechDetailListReducer, modernTechDetailSaveReducer } from './reducers/modernTechDetailReducers';
import { personalizedServiceDetailDeleteReducer, personalizedServiceDetailDetailsReducer, personalizedServiceDetailListReducer, personalizedServiceDetailSaveReducer } from './reducers/personalizedServiceDetailReducers';
import { uniqueSolutionDetailDeleteReducer, uniqueSolutionDetailDetailsReducer, uniqueSolutionDetailListReducer, uniqueSolutionDetailSaveReducer } from './reducers/uniqueSolutionDetailReducers';
import { subMenuBusinessContextDeleteReducer, subMenuBusinessContextDetailsReducer, subMenuBusinessContextListReducer, subMenuBusinessContextSaveReducer } from './reducers/subMenuBusinessContextReducers';
import { ctaCategoryDetailsReducer, ctaCategoryDocumentSaveReducer, ctaCategoryListReducer, ctaCategoryModelListReducer, ctaCategorySaveReducer } from './reducers/ctaCategoryReducers';
import { contactUsMessageListReducer } from './reducers/contactUsMessageReducers';
import { paymentPackageDeleteReducer, paymentPackageDetailsReducer, paymentPackageListReducer, paymentPackageSaveReducer } from './reducers/paymentPackageReducers';
import { ctaFunctionDetailsReducer, ctaFunctionDocumentDeleteReducer, ctaFunctionDocumentListReducer, ctaFunctionDocumentSaveReducer, ctaFunctionListReducer, ctaFunctionModelListReducer, ctaFunctionSaveReducer } from './reducers/ctaFunctionReducers';
import { consultingTypeDeleteReducer, consultingTypeDetailsReducer, consultingTypeListReducer, consultingTypeSaveReducer } from './reducers/consultingTypeReducers';
import { ctaHourDeleteReducer, ctaHourDetailsReducer, ctaHourListReducer, ctaHourSaveReducer } from './reducers/ctaHourReducers';
import { ctaPackageDailyDeleteReducer, ctaPackageDailyDetailsReducer, ctaPackageDailyListReducer, ctaPackageDailySaveReducer } from './reducers/ctaPackageDailyReducers';
import { companyTypeDeleteReducer, companyTypeDetailsReducer, companyTypeListReducer, companyTypeSaveReducer } from './reducers/companyTypeReducers';
import { ctaPackageHourlyDeleteReducer, ctaPackageHourlyDetailsReducer, ctaPackageHourlyListReducer, ctaPackageHourlySaveReducer } from './reducers/ctaPackageHourlyReducers';
import { ctaPackageMonthlyYearlyListReducer, ctaPackageMonthlyYearlyDetailsReducer, ctaPackageMonthlyYearlySaveReducer, ctaPackageMonthlyYearlyDeleteReducer } from './reducers/ctaPackageMonthlyYearlyReducers';
import { businessPrincipalDescriptorDeleteReducer, businessPrincipalDescriptorDetailsReducer, businessPrincipalDescriptorListReducer, businessPrincipalDescriptorSaveReducer } from './reducers/businessPrincipalDescriptorReducers';
import { consultationOverviewDeleteReducer, consultationOverviewDetailsReducer, consultationOverviewListReducer, consultationOverviewSaveReducer } from './reducers/consultationOverviewReducers';
import { trainingCandidateDescriptorDeleteReducer, trainingCandidateDescriptorDetailsReducer, trainingCandidateDescriptorListReducer, trainingCandidateDescriptorSaveReducer } from './reducers/trainingCandidateDescriptorReducers';
import { trainingOverviewDeleteReducer, trainingOverviewDetailsReducer, trainingOverviewListReducer, trainingOverviewSaveReducer } from './reducers/trainingOverviewReducers';
import { trainingTypeDeleteReducer, trainingTypeDetailsReducer, trainingTypeListReducer, trainingTypeSaveReducer } from './reducers/trainingTypeReducers';
import { softwareDeleteReducer, softwareDetailsReducer, softwareListReducer, softwareSaveReducer } from './reducers/softwareReducers';
import { courseBenefitDeleteReducer, courseBenefitDetailsReducer, courseBenefitListReducer, courseBenefitSaveReducer } from './reducers/courseBenefitReducers';
import { courseContentDeleteReducer, courseContentDetailsReducer, courseContentListReducer, courseContentSaveReducer } from './reducers/courseContentReducers';
import { courseRequirementDeleteReducer, courseRequirementDetailsReducer, courseRequirementListReducer, courseRequirementSaveReducer } from './reducers/courseRequirementReducers';
import { softwareTrainingSummaryDeleteReducer, softwareTrainingSummaryDetailsReducer, softwareTrainingSummaryListReducer, softwareTrainingSummarySaveReducer } from './reducers/softwareTrainingSummaryReducers';
import { softwareTrainingPriceDeleteReducer, softwareTrainingPriceDetailsReducer, softwareTrainingPriceListReducer, softwareTrainingPriceSaveReducer } from './reducers/softwareTrainingPriceReducers';
import { softwareTrainingTypeAndLengthDeleteReducer, softwareTrainingTypeAndLengthDetailsReducer, softwareTrainingTypeAndLengthListReducer, softwareTrainingTypeAndLengthSaveReducer } from './reducers/softwareTrainingTypeAndLengthReducers';
import { coursePurchaseDetailsReducer, coursePurchaseListReducer } from './reducers/coursePurchaseReducers';
import { ctaPaymentSaveReducer } from './reducers/ctaPaymentReducers';
import { ctaPurchaseHistorySaveReducer } from './reducers/ctaPurchaseHistoryReducers';
import { courseAvailabilityDateSaveReducer } from './reducers/courseAvailabilityDateReducers';
import { subscriptionDeleteReducer, subscriptionDetailsReducer, subscriptionListReducer, subscriptionSaveReducer } from './reducers/subscriptionReducers';
import { companySizeDeleteReducer, companySizeDetailsReducer, companySizeListReducer, companySizeSaveReducer } from './reducers/companySizeReducers';
import { consultancyReceiveHistoryDeleteReducer, consultancyReceiveHistorySaveReducer, consultancyReceiveHistoryStatusListReducer } from './reducers/consultancyReceiveHistoryReducers';
import { adminDashboardDetailsReducer, userDashboardDetailsReducer } from './reducers/dashboardReducers';
import { techCategoryDeleteReducer, techCategoryDetailsReducer, techCategoryListReducer, techCategorySaveReducer } from './reducers/techCategoryReducers';

const userInfo = Cookie.getJSON("userInfo") || null;
const roleResource = null;
// const loadingRoleResource = true;

const initialState={ 
    userSignin:{ userInfo },
    roleResourceDetails : { roleResource }
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
    roleResourceList:roleResourceListReducer,
    roleResourceDetails: roleResourceDetailsReducer,
    roleResourceSave: roleResourceSaveReducer,
    roleResourceDelete: roleResourceDeleteReducer,
    blogPostList:blogPostListReducer,
    blogPostDetails: blogPostDetailsReducer,
    blogPostSave: blogPostSaveReducer,
    blogPostDelete: blogPostDeleteReducer,
    modernTechDetailList:modernTechDetailListReducer,
    modernTechDetailDetails: modernTechDetailDetailsReducer,
    modernTechDetailSave: modernTechDetailSaveReducer,
    modernTechDetailDelete: modernTechDetailDeleteReducer,
    personalizedServiceDetailList:personalizedServiceDetailListReducer,
    personalizedServiceDetailDetails: personalizedServiceDetailDetailsReducer,
    personalizedServiceDetailSave: personalizedServiceDetailSaveReducer,
    personalizedServiceDetailDelete: personalizedServiceDetailDeleteReducer,
    uniqueSolutionDetailList:uniqueSolutionDetailListReducer,
    uniqueSolutionDetailDetails: uniqueSolutionDetailDetailsReducer,
    uniqueSolutionDetailSave: uniqueSolutionDetailSaveReducer,
    uniqueSolutionDetailDelete: uniqueSolutionDetailDeleteReducer,
    subMenuBusinessContextList:subMenuBusinessContextListReducer,
    subMenuBusinessContextDetails: subMenuBusinessContextDetailsReducer,
    subMenuBusinessContextSave: subMenuBusinessContextSaveReducer,
    subMenuBusinessContextDelete: subMenuBusinessContextDeleteReducer,
    ctaCategoryList:ctaCategoryListReducer,
    ctaCategoryModelList:ctaCategoryModelListReducer,
    ctaCategoryDetails: ctaCategoryDetailsReducer,
    ctaCategorySave:ctaCategorySaveReducer,
    ctaCategoryDocumentSave : ctaCategoryDocumentSaveReducer,
    ctaFunctionList:ctaFunctionListReducer,
    ctaFunctionModelList:ctaFunctionModelListReducer,
    ctaFunctionDetails: ctaFunctionDetailsReducer,
    ctaFunctionSave:ctaFunctionSaveReducer,
    ctaFunctionDocumentSave : ctaFunctionDocumentSaveReducer,
    ctaFunctionDocumentList:ctaFunctionDocumentListReducer,
    ctaFunctionDocumentDelete: ctaFunctionDocumentDeleteReducer,
    contactUsMessageList:contactUsMessageListReducer,
    // contactUsMessageDetails: contactUsMessageDetailsReducer,
    paymentPackageList:paymentPackageListReducer,
    paymentPackageDetails: paymentPackageDetailsReducer,
    paymentPackageSave: paymentPackageSaveReducer,
    paymentPackageDelete: paymentPackageDeleteReducer,
    consultingTypeList:consultingTypeListReducer,
    consultingTypeDetails: consultingTypeDetailsReducer,
    consultingTypeSave: consultingTypeSaveReducer,
    consultingTypeDelete: consultingTypeDeleteReducer,
    ctaHourList:ctaHourListReducer,
    ctaHourDetails: ctaHourDetailsReducer,
    ctaHourSave: ctaHourSaveReducer,
    ctaHourDelete: ctaHourDeleteReducer,
    ctaPackageDailyList:ctaPackageDailyListReducer,
    ctaPackageDailyDetails: ctaPackageDailyDetailsReducer,
    ctaPackageDailySave: ctaPackageDailySaveReducer,
    ctaPackageDailyDelete: ctaPackageDailyDeleteReducer,
    companyTypeList:companyTypeListReducer,
    companyTypeDetails: companyTypeDetailsReducer,
    companyTypeSave: companyTypeSaveReducer,
    companyTypeDelete: companyTypeDeleteReducer,
    ctaPackageHourlyList:ctaPackageHourlyListReducer,
    ctaPackageHourlyDetails: ctaPackageHourlyDetailsReducer,
    ctaPackageHourlySave: ctaPackageHourlySaveReducer,
    ctaPackageHourlyDelete: ctaPackageHourlyDeleteReducer,
    ctaPackageMonthlyYearlyList:ctaPackageMonthlyYearlyListReducer,
    ctaPackageMonthlyYearlyDetails: ctaPackageMonthlyYearlyDetailsReducer,
    ctaPackageMonthlyYearlySave: ctaPackageMonthlyYearlySaveReducer,
    ctaPackageMonthlyYearlyDelete: ctaPackageMonthlyYearlyDeleteReducer,
    businessPrincipalDescriptorList:businessPrincipalDescriptorListReducer,
    businessPrincipalDescriptorDetails: businessPrincipalDescriptorDetailsReducer,
    businessPrincipalDescriptorSave: businessPrincipalDescriptorSaveReducer,
    businessPrincipalDescriptorDelete: businessPrincipalDescriptorDeleteReducer,
    consultationOverviewList:consultationOverviewListReducer,
    consultationOverviewDetails: consultationOverviewDetailsReducer,
    consultationOverviewSave: consultationOverviewSaveReducer,
    consultationOverviewDelete: consultationOverviewDeleteReducer,
    trainingCandidateDescriptorList:trainingCandidateDescriptorListReducer,
    trainingCandidateDescriptorDetails: trainingCandidateDescriptorDetailsReducer,
    trainingCandidateDescriptorSave: trainingCandidateDescriptorSaveReducer,
    trainingCandidateDescriptorDelete: trainingCandidateDescriptorDeleteReducer,
    trainingOverviewList:trainingOverviewListReducer,
    trainingOverviewDetails: trainingOverviewDetailsReducer,
    trainingOverviewSave: trainingOverviewSaveReducer,
    trainingOverviewDelete: trainingOverviewDeleteReducer,
    trainingTypeList:trainingTypeListReducer,
    trainingTypeDetails: trainingTypeDetailsReducer,
    trainingTypeSave: trainingTypeSaveReducer,
    trainingTypeDelete: trainingTypeDeleteReducer,
    softwareList:softwareListReducer,
    softwareDetails: softwareDetailsReducer,
    softwareSave: softwareSaveReducer,
    softwareDelete: softwareDeleteReducer,
    courseBenefitList:courseBenefitListReducer,
    courseBenefitDetails: courseBenefitDetailsReducer,
    courseBenefitSave: courseBenefitSaveReducer,
    courseBenefitDelete: courseBenefitDeleteReducer,
    courseContentList:courseContentListReducer,
    courseContentDetails: courseContentDetailsReducer,
    courseContentSave: courseContentSaveReducer,
    courseContentDelete: courseContentDeleteReducer,
    courseRequirementList:courseRequirementListReducer,
    courseRequirementDetails: courseRequirementDetailsReducer,
    courseRequirementSave: courseRequirementSaveReducer,
    courseRequirementDelete: courseRequirementDeleteReducer,
    softwareTrainingSummaryList:softwareTrainingSummaryListReducer,
    softwareTrainingSummaryDetails: softwareTrainingSummaryDetailsReducer,
    softwareTrainingSummarySave: softwareTrainingSummarySaveReducer,
    softwareTrainingSummaryDelete: softwareTrainingSummaryDeleteReducer,
    softwareTrainingPriceList:softwareTrainingPriceListReducer,
    softwareTrainingPriceDetails: softwareTrainingPriceDetailsReducer,
    softwareTrainingPriceSave: softwareTrainingPriceSaveReducer,
    softwareTrainingPriceDelete: softwareTrainingPriceDeleteReducer,
    softwareTrainingTypeAndLengthList:softwareTrainingTypeAndLengthListReducer,
    softwareTrainingTypeAndLengthDetails: softwareTrainingTypeAndLengthDetailsReducer,
    softwareTrainingTypeAndLengthSave: softwareTrainingTypeAndLengthSaveReducer,
    softwareTrainingTypeAndLengthDelete: softwareTrainingTypeAndLengthDeleteReducer,
    coursePurchaseList:coursePurchaseListReducer,
    coursePurchaseDetails: coursePurchaseDetailsReducer,
    ctaPaymentSave: ctaPaymentSaveReducer,
    ctaPurchaseHistorySave: ctaPurchaseHistorySaveReducer,
    courseAvailabilityDateSave: courseAvailabilityDateSaveReducer,
    subscriptionList:subscriptionListReducer,
    subscriptionDetails: subscriptionDetailsReducer,
    subscriptionSave: subscriptionSaveReducer,
    subscriptionDelete: subscriptionDeleteReducer,
    companySizeList:companySizeListReducer,
    companySizeDetails: companySizeDetailsReducer,
    companySizeSave: companySizeSaveReducer,
    companySizeDelete: companySizeDeleteReducer,
    consultancyReceiveHistorySave: consultancyReceiveHistorySaveReducer,
    consultancyReceiveHistoryDelete: consultancyReceiveHistoryDeleteReducer,
    consultancyReceiveHistoryStatusList:consultancyReceiveHistoryStatusListReducer,
    adminDashboardDetails: adminDashboardDetailsReducer,
    userDashboardDetails: userDashboardDetailsReducer,
    techCategoryList:techCategoryListReducer,
    techCategoryDetails: techCategoryDetailsReducer,
    techCategorySave: techCategorySaveReducer,
    techCategoryDelete: techCategoryDeleteReducer,

    
});
const composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk))); 

export default store;