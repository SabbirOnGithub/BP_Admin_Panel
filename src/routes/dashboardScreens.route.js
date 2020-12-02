import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CustomLayout from "../components/Layout/CustomLayout";
import HomeScreen from "../screens/dashboardScreens/HomeScreen";
import SubMenuScreen from "../screens/dashboardScreens/subMenuScreen/SubMenuScreen";
import HomePageScreen from '../screens/dashboardScreens/homePageScreen/HomePageScreen';
import MenuScreen from '../screens/dashboardScreens/menuScreen/MenuScreen';
import FooterSectionScreen from '../screens/dashboardScreens/footerSectionScreen/FooterSectionScreen';
import HomepageSliderScreen from '../screens/dashboardScreens/homePageSliderScreen/HomePageSliderScreen';

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
        
        <Route path="*">
          <Redirect to="/notFound" />
        </Route>

      </Switch>
    </CustomLayout>
  </div>
  )
};

export default DashboardScreensRoute;



