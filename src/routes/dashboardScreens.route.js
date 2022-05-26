// import React from "react";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import CustomLayout from "../components/Layout/CustomLayout";
import {detailsRoleResource} from "../redux/actions/roleResourceActions";
import AccessDeniedScreen from "../screens/accessDeniedScreen/AccessDeniedScreen";
import BlogCategoryScreen from "../screens/dashboardScreens/blogCategoryScreen/BlogCategoryScreen";
import BlogPostScreen from "../screens/dashboardScreens/blogPostScreen/BlogPostScreen";
import BlogSubCategoryScreen from "../screens/dashboardScreens/blogSubCategoryScreen/BlogSubCategoryScreen";
import BusinessPrincipalDescriptorScreen from "../screens/dashboardScreens/businessPrincipalDescriptorScreen/BusinessPrincipalDescriptorScreen";
import {ChangePasswordScreen} from "../screens/dashboardScreens/changePasswordScreen/ChangePasswordScreen";
import CompanyScreen from "../screens/dashboardScreens/clientScreen/ClientScreen";
import CompanySizeScreen from "../screens/dashboardScreens/companySizeScreen/CompanySizeScreen";
import CompanyTypeScreen from "../screens/dashboardScreens/companyTypeScreen/CompanyTypeScreen";
import ConsultancyReportScreen from "../screens/dashboardScreens/consultancyReportScreen/ConsultancyReportScreen";
import ConsultationOverviewScreen from "../screens/dashboardScreens/consultationOverviewScreen/ConsultationOverviewScreen";
import ConsultingTypeScreen from "../screens/dashboardScreens/consultingTypeScreen/ConsultingTypeScreen";
import ContactUsMessageScreen from "../screens/dashboardScreens/contactUsMessageScreen/ContactUsMessageScreen";
import CourseBenefitScreen from "../screens/dashboardScreens/courseBenefitScreen/CourseBenefitScreen";
import CourseContentScreen from "../screens/dashboardScreens/courseContentScreen/CourseContentScreen";
import CoursePurchaseScreen from "../screens/dashboardScreens/coursePurchaseScreen/CoursePurchaseScreen";
import CourseRequirementScreen from "../screens/dashboardScreens/courseRequirementScreen/CourseRequirementScreen";
import CtaHourScreen from "../screens/dashboardScreens/ctaHourScreen/CtaHourScreen";
import CtaPackageDailyScreen from "../screens/dashboardScreens/ctaPackageDailyScreen/CtaPackageDailyScreen";
import CtaPackageHourlyScreen from "../screens/dashboardScreens/ctaPackageHourlyScreen/CtaPackageHourlyScreen";
import CtaPackageMonthlyYearlyScreen from "../screens/dashboardScreens/ctaPackageMonthlyYearlyScreen/CtaPackageMonthlyYearlyScreen";
import CtaScreen from "../screens/dashboardScreens/ctaScreen/CtaScreen";
import EmbaddedDashboardScreen from "../screens/dashboardScreens/embeddedDashboardScreen/EmbaddedDashboardScreen";
import FooterSectionScreen from "../screens/dashboardScreens/footerSectionScreen/FooterSectionScreen";
import HomeConsultationTopicScreen from "../screens/dashboardScreens/homeConsultationTopicScreen/HomeConsultationTopicScreen";
import HomePageCoreValueDetailScreen from "../screens/dashboardScreens/homePageCoreValueDetailScreen/HomePageCoreValueDetailScreen";
import HomePageFunctionAreaDetailScreen from "../screens/dashboardScreens/homePageFunctionAreaDetailScreen/HomePageFunctionAreaDetailScreen";
import HomePageScreen from "../screens/dashboardScreens/homePageScreen/HomePageScreen";
import HomepageSliderScreen from "../screens/dashboardScreens/homePageSliderScreen/HomePageSliderScreen";
import HomeScreen from "../screens/dashboardScreens/HomeScreen";
import MenuHeroSliderScreen from "../screens/dashboardScreens/menuHeroSliderScreen/MenuHeroSliderScreen";
import MenuScreen from "../screens/dashboardScreens/menuScreen/MenuScreen";
import MenuSectionDetailScreen from "../screens/dashboardScreens/menuSectionDetailScreen/MenuSectionDetailScreen";
import MenuSectionScreen from "../screens/dashboardScreens/menuSectionScreen/MenuSectionScreen";
import MenuSubMenuMapDetailScreen from "../screens/dashboardScreens/menuSubMenuMapDetailScreen/MenuSubMenuMapDetailScreen";
import MenuSubMenuMapItemListItemScreen from "../screens/dashboardScreens/menuSubMenuMapItemListItemScreen/MenuSubMenuMapItemListItemScreen";
import MenuSubMenuMapItemScreen from "../screens/dashboardScreens/menuSubMenuMapItemScreen/MenuSubMenuMapItemScreen";
import MenuSubMenuMapScreen from "../screens/dashboardScreens/menuSubMenuMapScreen/MenuSubMenuMapScreen";
import ModernTechDetailScreen from "../screens/dashboardScreens/modernTechDetailScreen/ModernTechDetailScreen";
import PaymentPackageScreen from "../screens/dashboardScreens/paymentPackageScreen/PaymentPackageScreen";
import PersonalizedServiceDetailScreen from "../screens/dashboardScreens/personalizedServiceDetailScreen/PersonalizedServiceDetailScreen";
import ResourceScreen from "../screens/dashboardScreens/resourceScreen/ResourceScreen";
import RoleResourceScreen from "../screens/dashboardScreens/roleResourceScreen/RoleResourceScreen";
import RoleScreen from "../screens/dashboardScreens/roleScreen/RoleScreen";
import ShortIntroScreen from "../screens/dashboardScreens/shortIntroScreen/ShortIntroScreen";
import SoftwareScreen from "../screens/dashboardScreens/softwareScreen/SoftwareScreen";
import SoftwareTrainingPriceScreen from "../screens/dashboardScreens/softwareTrainingPriceScreen/SoftwareTrainingPriceScreen";
import SoftwareTrainingSummaryScreen from "../screens/dashboardScreens/softwareTrainingSummaryScreen/SoftwareTrainingSummaryScreen";
import SoftwareTrainingTypeAndLengthScreen from "../screens/dashboardScreens/softwareTrainingTypeAndLengthScreen/SoftwareTrainingTypeAndLengthScreen";
import SubmenuBestPracticeScreen from "../screens/dashboardScreens/submenuBestPracticeScreen/SubmenuBestPracticeScreen";
import SubMenuBusinessContextScreen from "../screens/dashboardScreens/subMenuBusinessContextScreen/SubMenuBusinessContextScreen";
import SubMenuOverViewScreen from "../screens/dashboardScreens/subMenuOverViewScreen/SubMenuOverViewScreen";
import SubMenuScreen from "../screens/dashboardScreens/subMenuScreen/SubMenuScreen";
import SubscriptionScreen from "../screens/dashboardScreens/subscriptionScreen/SubscriptionScreen";
import TechCategoryScreen from "../screens/dashboardScreens/techCategoryScreen/TechCategoryScreen";
import TechnologyPartnerScreen from "../screens/dashboardScreens/technologyPartnerScreen/TechnologyPartnerScreen";
import TechnologyServiceScreen from "../screens/dashboardScreens/technologyServiceScreen/TechnologyServiceScreen";
import TechStackScreen from "../screens/dashboardScreens/techStackScreen/TechStackScreen";
import TestimonialDetailScreen from "../screens/dashboardScreens/testimonialDetailScreen/TestimonialDetailScreen";
import TrainingCandidateDescriptorScreen from "../screens/dashboardScreens/trainingCandidateDescriptorScreen/TrainingCandidateDescriptorScreen";
import TrainingDetailScreen from "../screens/dashboardScreens/trainingDetailScreen/TrainingDetailScreen";
import TrainingOverviewScreen from "../screens/dashboardScreens/trainingOverviewScreen/TrainingOverviewScreen";
import TrainingTypeScreen from "../screens/dashboardScreens/trainingTypeScreen/TrainingTypeScreen";
import UniqueSolutionDetailScreen from "../screens/dashboardScreens/uniqueSolutionDetailScreen/UniqueSolutionDetailScreen";
import UserProfileScreen from "../screens/dashboardScreens/userProfileScreen/UserProfileScreen";
import UserScreen from "../screens/dashboardScreens/userScreen/UserScreen";

const DashboardScreensRoute = (props) => {
	const roleResourceDetails = useSelector((state) => state.roleResourceDetails);
	const {roleResource} = roleResourceDetails;

	const userSignIn = useSelector((state) => state.userSignin);
	const {userInfo} = userSignIn;

	const dispatch = useDispatch();

	useEffect(() => {
		try {
			dispatch(detailsRoleResource(userInfo?.userRole));
		} catch (error) {
			console.warn(error);
		}

		return () => {
			//
		};
	}, [dispatch, userInfo?.userRole]);

	return (
		<div>
			<CustomLayout>
				<Switch>
					<Route
						exact
						path={`${props.match.path}/`}
						component={() => <HomeScreen test={roleResource} />}
					/>
					<Route
						exact
						path={`${props.match.path}/homePage`}
						component={HomePageScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/homePageSlider`}
						component={HomepageSliderScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/footerSection`}
						component={FooterSectionScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/homePageCoreValueDetail`}
						component={HomePageCoreValueDetailScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/homePageFunctionAreaDetail`}
						component={HomePageFunctionAreaDetailScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/homeConsultationTopic`}
						component={HomeConsultationTopicScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/trainingDetail`}
						component={TrainingDetailScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/testimonialDetail`}
						component={TestimonialDetailScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/user`}
						component={UserScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/submenu`}
						component={SubMenuScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/submenuBestPractice`}
						component={SubmenuBestPracticeScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/subMenuOverView`}
						component={SubMenuOverViewScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/subMenuBusinessContext`}
						component={SubMenuBusinessContextScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/menuSubMenuMapItem`}
						component={MenuSubMenuMapItemScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/menuSubMenuMapItemListItem`}
						component={MenuSubMenuMapItemListItemScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/menuSubMenuMap`}
						component={MenuSubMenuMapScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/menuSubMenuMapDetail`}
						component={MenuSubMenuMapDetailScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/menu`}
						component={MenuScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/menuSection`}
						component={MenuSectionScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/menuHeroSlider`}
						component={MenuHeroSliderScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/menuSectionDetail`}
						component={MenuSectionDetailScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/blogCategory`}
						component={BlogCategoryScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/blogSubCategory`}
						component={BlogSubCategoryScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/blogPost`}
						component={BlogPostScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/modernTechDetail`}
						component={ModernTechDetailScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/personalizedServiceDetail`}
						component={PersonalizedServiceDetailScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/uniqueSolutionDetail`}
						component={UniqueSolutionDetailScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/shortIntro`}
						component={ShortIntroScreen}
					/>
					<Route exact path={`${props.match.path}/cta`} component={CtaScreen} />
					<Route
						exact
						path={`${props.match.path}/contactUs`}
						component={ContactUsMessageScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/paymentPackage`}
						component={PaymentPackageScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/consultingType`}
						component={ConsultingTypeScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/ctaHour`}
						component={CtaHourScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/ctaPackageDaily`}
						component={CtaPackageDailyScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/client`}
						component={CompanyScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/companyType`}
						component={CompanyTypeScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/companySize`}
						component={CompanySizeScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/ctaPackageHourly`}
						component={CtaPackageHourlyScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/ctaPackageMonthlyYearly`}
						component={CtaPackageMonthlyYearlyScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/businessPrincipalDescriptor`}
						component={BusinessPrincipalDescriptorScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/consultationOverview`}
						component={ConsultationOverviewScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/trainingCandidateDescriptor`}
						component={TrainingCandidateDescriptorScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/trainingOverview`}
						component={TrainingOverviewScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/trainingType`}
						component={TrainingTypeScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/software`}
						component={SoftwareScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/courseBenefit`}
						component={CourseBenefitScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/courseContent`}
						component={CourseContentScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/courseRequirement`}
						component={CourseRequirementScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/softwareTrainingSummary`}
						component={SoftwareTrainingSummaryScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/softwareTrainingPrice`}
						component={SoftwareTrainingPriceScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/softwareTrainingTypeAndLength`}
						component={SoftwareTrainingTypeAndLengthScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/coursePurchase`}
						component={CoursePurchaseScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/subscription`}
						component={SubscriptionScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/techCategory`}
						component={TechCategoryScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/technologyPartner`}
						component={TechnologyPartnerScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/technologyService`}
						component={TechnologyServiceScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/techStack`}
						component={TechStackScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/embaddedDashboard`}
						component={EmbaddedDashboardScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/consultancyReport`}
						component={ConsultancyReportScreen}
					/>

					{/* role routes */}
					<Route
						exact
						path={`${props.match.path}/role`}
						component={RoleScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/resource`}
						component={ResourceScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/roleResource`}
						component={RoleResourceScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/userProfile`}
						component={UserProfileScreen}
					/>
					<Route
						exact
						path={`${props.match.path}/changePassword`}
						component={ChangePasswordScreen}
					/>

					<Route
						path={`${props.match.path}/accessDenied`}
						component={AccessDeniedScreen}
					/>

					<Route path="*">
						<Redirect to="/notFound" />
					</Route>
				</Switch>
			</CustomLayout>
		</div>
	);
};

export default DashboardScreensRoute;
