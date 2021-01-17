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


// import { searchNameByIdFromArray } from '../helpers/search';

import { detailsRoleResource } from '../redux/actions/roleResourceActions';
// import { listResources } from '../redux/actions/resourceActions';


const DashboardScreensRoute = (props) => {


  const roleResourceDetails = useSelector(state => state.roleResourceDetails);
  const { roleResource, loading:loadingResource } = roleResourceDetails;

  const userSignIn = useSelector( state => state.userSignin );
  const {  userInfo  } = userSignIn;

  const dispatch = useDispatch();

  useEffect(() => {
    if(typeof roleResource === 'object' && roleResource !== null && Object.keys(roleResource).length === 0){
    // if(roleResource === undefined || roleResource.length === 0){
      dispatch(detailsRoleResource(userInfo.userId))
    }
    return () => {
        // 
    }
}, [dispatch, roleResource, userInfo.userId])

  return (<div> 
  {   loadingResource ? 'loading' : 
    <CustomLayout>
      <Switch>
        <Route exact path={`${props.match.path}/`} component={()=><HomeScreen test={roleResource}/> }/>
        {/* <Route exact path={`${props.match.path}/`} component={HomeScreen} /> */}
        <Route exact path={`${props.match.path}/submenu`} component={SubMenuScreen} />
        <Route exact path={`${props.match.path}/homePage`} component={HomePageScreen} />
        <Route exact path={`${props.match.path}/menu`} component={MenuScreen} />
        <Route exact path={`${props.match.path}/homePageSlider`} component={HomepageSliderScreen} />
        <Route exact path={`${props.match.path}/footerSection`} component={FooterSectionScreen} />
        <Route exact path={`${props.match.path}/homePageCoreValueDetail`} component={HomePageCoreValueDetailScreen} />
        <Route exact path={`${props.match.path}/homePageFunctionAreaDetail`} component={HomePageFunctionAreaDetailScreen} />
        <Route exact path={`${props.match.path}/homeConsultationTopic`} component={HomeConsultationTopicScreen} />
        <Route exact path={`${props.match.path}/trainingDetail`} component={TrainingDetailScreen} />
        <Route exact path={`${props.match.path}/testimonialDetail`} component={TestimonialDetailScreen} />
        <Route exact path={`${props.match.path}/user`} component={UserScreen} />
        <Route exact path={`${props.match.path}/submenuBestPractice`} component={SubmenuBestPracticeScreen} />
        <Route exact path={`${props.match.path}/subMenuOverView`} component={SubMenuOverViewScreen} />
        <Route exact path={`${props.match.path}/menuSubMenuMapItem`} component={MenuSubMenuMapItemScreen} />
        <Route exact path={`${props.match.path}/menuSubMenuMapItemListItem`} component={MenuSubMenuMapItemListItemScreen} />
        <Route exact path={`${props.match.path}/menuSubMenuMap`} component={MenuSubMenuMapScreen} />
        <Route exact path={`${props.match.path}/menuSection`} component={MenuSectionScreen} />
        <Route exact path={`${props.match.path}/menuHeroSlider`} component={MenuHeroSliderScreen} />
        <Route exact path={`${props.match.path}/menuSectionDetail`} component={MenuSectionDetailScreen} />
        <Route exact path={`${props.match.path}/menuSubMenuMapDetail`} component={MenuSubMenuMapDetailScreen} />
        <Route exact path={`${props.match.path}/blogCategory`} component={BlogCategoryScreen} />
        <Route exact path={`${props.match.path}/blogSubCategory`} component={BlogSubCategoryScreen} />
        <Route exact path={`${props.match.path}/blogPost`} component={BlogPostScreen} />
        <Route exact path={`${props.match.path}/modernTechDetail`} component={ModernTechDetailScreen} />
        <Route exact path={`${props.match.path}/personalizedServiceDetail`} component={PersonalizedServiceDetailScreen} />
        <Route exact path={`${props.match.path}/uniqueSolutionDetail`} component={UniqueSolutionDetailScreen} />
        <Route exact path={`${props.match.path}/subMenuBusinessContext`} component={SubMenuBusinessContextScreen} />
        {/* role routes */}
        <Route exact path={`${props.match.path}/role`} component={RoleScreen} />
        <Route exact path={`${props.match.path}/resource`} component={ResourceScreen} />
        <Route exact path={`${props.match.path}/roleResource`} test='tajul' component={RoleResourceScreen}  />


        <Route path="*">
          <Redirect to="/notFound" />
        </Route>

      </Switch>
    </CustomLayout>
  }
  </div>
  )
};

export default DashboardScreensRoute;



