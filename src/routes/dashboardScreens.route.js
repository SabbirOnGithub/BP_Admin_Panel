import React from "react";
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


const DashboardScreensRoute = (props) => {
  return (<div>
    <CustomLayout>
      <Switch>
        <Route exact path={`${props.match.path}/`} component={HomeScreen} />
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

        
        <Route path="*">
          <Redirect to="/notFound" />
        </Route>

      </Switch>
    </CustomLayout>
  </div>
  )
};

export default DashboardScreensRoute;



