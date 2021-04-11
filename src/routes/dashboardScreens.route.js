// import React from "react";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";
import CustomLayout from "../components/Layout/CustomLayout";
import HomeScreen from "../screens/dashboardScreens/HomeScreen";
import SubMenuScreen from "../screens/dashboardScreens/subMenuScreen/SubMenuScreen";
import HomePageScreen from '../screens/dashboardScreens/homePageScreen/HomePageScreen';
import MenuScreen from '../screens/dashboardScreens/menuScreen/MenuScreen';
import FooterSectionScreen from '../screens/dashboardScreens/footerSectionScreen/FooterSectionScreen';
import HomepageSliderScreen from '../screens/dashboardScreens/homePageSliderScreen/HomePageSliderScreen';
import HomePageCoreValueDetailScreen from "../screens/dashboardScreens/homePageCoreValueDetailScreen/HomePageCoreValueDetailScreen";
import HomePageFunctionAreaDetailScreen from "../screens/dashboardScreens/homePageFunctionAreaDetailScreen/HomePageFunctionAreaDetailScreen";
import HomeConsultationTopicScreen from "../screens/dashboardScreens/homeConsultationTopicScreen/HomeConsultationTopicScreen";
import TrainingDetailScreen from "../screens/dashboardScreens/trainingDetailScreen/TrainingDetailScreen";
import TestimonialDetailScreen from "../screens/dashboardScreens/testimonialDetailScreen/TestimonialDetailScreen";
import UserScreen from "../screens/dashboardScreens/userScreen/UserScreen";
import SubmenuBestPracticeScreen from "../screens/dashboardScreens/submenuBestPracticeScreen/SubmenuBestPracticeScreen";
import SubMenuOverViewScreen from "../screens/dashboardScreens/subMenuOverViewScreen/SubMenuOverViewScreen";
import MenuSubMenuMapItemScreen from '../screens/dashboardScreens/menuSubMenuMapItemScreen/MenuSubMenuMapItemScreen';
import MenuSubMenuMapItemListItemScreen from '../screens/dashboardScreens/menuSubMenuMapItemListItemScreen/MenuSubMenuMapItemListItemScreen';
import MenuSubMenuMapScreen from '../screens/dashboardScreens/menuSubMenuMapScreen/MenuSubMenuMapScreen';
import MenuSectionScreen from '../screens/dashboardScreens/menuSectionScreen/MenuSectionScreen';
import MenuHeroSliderScreen from '../screens/dashboardScreens/menuHeroSliderScreen/MenuHeroSliderScreen';
import MenuSectionDetailScreen from '../screens/dashboardScreens/menuSectionDetailScreen/MenuSectionDetailScreen';
import MenuSubMenuMapDetailScreen from '../screens/dashboardScreens/menuSubMenuMapDetailScreen/MenuSubMenuMapDetailScreen';
import RoleScreen from '../screens/dashboardScreens/roleScreen/RoleScreen';
import ResourceScreen from '../screens/dashboardScreens/resourceScreen/ResourceScreen';
import BlogCategoryScreen from '../screens/dashboardScreens/blogCategoryScreen/BlogCategoryScreen';
import BlogSubCategoryScreen from '../screens/dashboardScreens/blogSubCategoryScreen/BlogSubCategoryScreen';
import RoleResourceScreen from '../screens/dashboardScreens/roleResourceScreen/RoleResourceScreen';
import BlogPostScreen from '../screens/dashboardScreens/blogPostScreen/BlogPostScreen';
import ModernTechDetailScreen from "../screens/dashboardScreens/modernTechDetailScreen/ModernTechDetailScreen";
import PersonalizedServiceDetailScreen from "../screens/dashboardScreens/personalizedServiceDetailScreen/PersonalizedServiceDetailScreen";
import UniqueSolutionDetailScreen from "../screens/dashboardScreens/uniqueSolutionDetailScreen/UniqueSolutionDetailScreen";
import SubMenuBusinessContextScreen from "../screens/dashboardScreens/subMenuBusinessContextScreen/SubMenuBusinessContextScreen";
import ShortIntroScreen from "../screens/dashboardScreens/shortIntroScreen/ShortIntroScreen";
import CtaScreen from "../screens/dashboardScreens/ctaScreen/CtaScreen";
import ContactUsMessageScreen from "../screens/dashboardScreens/contactUsMessageScreen/ContactUsMessageScreen";
import PaymentPackageScreen from "../screens/dashboardScreens/paymentPackageScreen/PaymentPackageScreen";
import AccessDeniedScreen from '../screens/accessDeniedScreen/AccessDeniedScreen'
import UserProfileScreen from '../screens/dashboardScreens/userProfileScreen/UserProfileScreen'
import ConsultingTypeScreen from '../screens/dashboardScreens/consultingTypeScreen/ConsultingTypeScreen'
import CtaHourScreen from '../screens/dashboardScreens/ctaHourScreen/CtaHourScreen'
import CtaPackageDailyScreen from '../screens/dashboardScreens/ctaPackageDailyScreen/CtaPackageDailyScreen'
import CompanyTypeScreen from '../screens/dashboardScreens/companyTypeScreen/CompanyTypeScreen'
import CtaPackageHourlyScreen from '../screens/dashboardScreens/ctaPackageHourlyScreen/CtaPackageHourlyScreen'
import CtaPackageMonthlyYearlyScreen from '../screens/dashboardScreens/ctaPackageMonthlyYearlyScreen/CtaPackageMonthlyYearlyScreen'
import BusinessPrincipalDescriptorScreen from '../screens/dashboardScreens/businessPrincipalDescriptorScreen/BusinessPrincipalDescriptorScreen'
import ConsultationOverviewScreen from '../screens/dashboardScreens/consultationOverviewScreen/ConsultationOverviewScreen'
import TrainingCandidateDescriptorScreen from '../screens/dashboardScreens/trainingCandidateDescriptorScreen/TrainingCandidateDescriptorScreen'
import TrainingOverviewScreen from '../screens/dashboardScreens/trainingOverviewScreen/TrainingOverviewScreen'
import TrainingTypeScreen from '../screens/dashboardScreens/trainingTypeScreen/TrainingTypeScreen'
import SoftwareScreen from '../screens/dashboardScreens/softwareScreen/SoftwareScreen'
import CourseBenefitScreen from '../screens/dashboardScreens/courseBenefitScreen/CourseBenefitScreen'
import CourseContentScreen from '../screens/dashboardScreens/courseContentScreen/CourseContentScreen'
import CourseRequirementScreen from '../screens/dashboardScreens/courseRequirementScreen/CourseRequirementScreen'
import SoftwareTrainingSummaryScreen from '../screens/dashboardScreens/softwareTrainingSummaryScreen/SoftwareTrainingSummaryScreen'
import SoftwareTrainingPriceScreen from '../screens/dashboardScreens/softwareTrainingPriceScreen/SoftwareTrainingPriceScreen'





import { detailsRoleResource } from '../redux/actions/roleResourceActions';

const DashboardScreensRoute = (props) => {

  const roleResourceDetails = useSelector(state => state.roleResourceDetails);
  const { roleResource } = roleResourceDetails;

  const userSignIn = useSelector( state => state.userSignin );
  const {  userInfo  } = userSignIn;

  const dispatch = useDispatch();

  useEffect(() => {
    try{
      dispatch(detailsRoleResource(userInfo.userRole))
    }
    catch(error){
      console.warn(error)
    }
    
    return () => {
        // 
    }
}, [dispatch, userInfo.userRole])

  return (<div> 
    <CustomLayout>
      <Switch>
      <Route exact path={`${props.match.path}/`} component={()=><HomeScreen test={roleResource}/>}/>
      <Route exact path={`${props.match.path}/homePage`} component={HomePageScreen} />
      <Route exact path={`${props.match.path}/homePageSlider`} component={HomepageSliderScreen} />
      <Route exact path={`${props.match.path}/footerSection`} component={FooterSectionScreen} />
      <Route exact path={`${props.match.path}/homePageCoreValueDetail`} component={HomePageCoreValueDetailScreen} />
      <Route exact path={`${props.match.path}/homePageFunctionAreaDetail`} component={HomePageFunctionAreaDetailScreen} />
      <Route exact path={`${props.match.path}/homeConsultationTopic`} component={HomeConsultationTopicScreen} />
      <Route exact path={`${props.match.path}/trainingDetail`} component={TrainingDetailScreen} />
      <Route exact path={`${props.match.path}/testimonialDetail`} component={TestimonialDetailScreen} />
      <Route exact path={`${props.match.path}/user`} component={UserScreen} />
      <Route exact path={`${props.match.path}/submenu`} component={SubMenuScreen} />
      <Route exact path={`${props.match.path}/submenuBestPractice`} component={SubmenuBestPracticeScreen} />
      <Route exact path={`${props.match.path}/subMenuOverView`} component={SubMenuOverViewScreen} />
      <Route exact path={`${props.match.path}/subMenuBusinessContext`} component={SubMenuBusinessContextScreen} />
      <Route exact path={`${props.match.path}/menuSubMenuMapItem`} component={MenuSubMenuMapItemScreen} />
      <Route exact path={`${props.match.path}/menuSubMenuMapItemListItem`} component={MenuSubMenuMapItemListItemScreen} />
      <Route exact path={`${props.match.path}/menuSubMenuMap`} component={MenuSubMenuMapScreen} />
      <Route exact path={`${props.match.path}/menuSubMenuMapDetail`} component={MenuSubMenuMapDetailScreen} />
      <Route exact path={`${props.match.path}/menu`} component={MenuScreen} />
      <Route exact path={`${props.match.path}/menuSection`} component={MenuSectionScreen} />
      <Route exact path={`${props.match.path}/menuHeroSlider`} component={MenuHeroSliderScreen} />
      <Route exact path={`${props.match.path}/menuSectionDetail`} component={MenuSectionDetailScreen} />
      <Route exact path={`${props.match.path}/blogCategory`} component={BlogCategoryScreen} />
      <Route exact path={`${props.match.path}/blogSubCategory`} component={BlogSubCategoryScreen} />
      <Route exact path={`${props.match.path}/blogPost`} component={BlogPostScreen} />
      <Route exact path={`${props.match.path}/modernTechDetail`} component={ModernTechDetailScreen} />
      <Route exact path={`${props.match.path}/personalizedServiceDetail`} component={PersonalizedServiceDetailScreen} />
      <Route exact path={`${props.match.path}/uniqueSolutionDetail`} component={UniqueSolutionDetailScreen} />
      <Route exact path={`${props.match.path}/shortIntro`} component={ShortIntroScreen} />
      <Route exact path={`${props.match.path}/cta`} component={CtaScreen} />
      <Route exact path={`${props.match.path}/contactUs`} component={ContactUsMessageScreen} />
      <Route exact path={`${props.match.path}/paymentPackage`} component={PaymentPackageScreen} />
      <Route exact path={`${props.match.path}/consultingType`} component={ConsultingTypeScreen} />
      <Route exact path={`${props.match.path}/ctaHour`} component={CtaHourScreen} />
      <Route exact path={`${props.match.path}/ctaPackageDaily`} component={CtaPackageDailyScreen} />
      <Route exact path={`${props.match.path}/companyType`} component={CompanyTypeScreen} />
      <Route exact path={`${props.match.path}/ctaPackageHourly`} component={CtaPackageHourlyScreen} />
      <Route exact path={`${props.match.path}/ctaPackageMonthlyYearly`} component={CtaPackageMonthlyYearlyScreen} />
      <Route exact path={`${props.match.path}/businessPrincipalDescriptor`} component={BusinessPrincipalDescriptorScreen} />
      <Route exact path={`${props.match.path}/consultationOverview`} component={ConsultationOverviewScreen} />
      <Route exact path={`${props.match.path}/trainingCandidateDescriptor`} component={TrainingCandidateDescriptorScreen} />
      <Route exact path={`${props.match.path}/trainingOverview`} component={TrainingOverviewScreen} />
      <Route exact path={`${props.match.path}/trainingType`} component={TrainingTypeScreen} />
      <Route exact path={`${props.match.path}/software`} component={SoftwareScreen} />
      <Route exact path={`${props.match.path}/courseBenefit`} component={CourseBenefitScreen} />
      <Route exact path={`${props.match.path}/courseContent`} component={CourseContentScreen} />
      <Route exact path={`${props.match.path}/courseRequirement`} component={CourseRequirementScreen} />
      <Route exact path={`${props.match.path}/softwareTrainingSummary`} component={SoftwareTrainingSummaryScreen} />
      <Route exact path={`${props.match.path}/softwareTrainingPrice`} component={SoftwareTrainingPriceScreen} />





      {/* role routes */}
      <Route exact path={`${props.match.path}/role`} component={RoleScreen} />
      <Route exact path={`${props.match.path}/resource`} component={ResourceScreen} />
      <Route exact path={`${props.match.path}/roleResource`} component={RoleResourceScreen}  />
      <Route exact path={`${props.match.path}/userProfile`} component={UserProfileScreen}  />

      <Route path={`${props.match.path}/accessDenied`} component={AccessDeniedScreen} />

      <Route path="*">
        <Redirect to="/notFound" />
      </Route>

    </Switch>
    </CustomLayout>
  </div>
  )
};

export default DashboardScreensRoute;



