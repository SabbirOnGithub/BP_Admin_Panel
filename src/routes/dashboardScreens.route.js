import React from "react";
import { Route, Switch } from "react-router-dom";
import CustomLayout from "../components/Layout/CustomLayout";
import HomeScreen from "../screens/dashboardScreens/HomeScreen";
import SubMenuScreen from "../screens/dashboardScreens/subMenuScreen/SubMenuScreen";
import HomePageScreen from '../screens/dashboardScreens/homePageScreen/HomePageScreen';
import MenuScreen from '../screens/dashboardScreens/menuPageScreen/MenuScreen';

const DashboardScreensRoute = (props) => {
  return (<div>
    <CustomLayout>
      <Switch>
        <Route exact path={`${props.match.path}/`} component={HomeScreen} />
        <Route exact path={`${props.match.path}/submenu`} component={SubMenuScreen} />
        <Route exact path={`${props.match.path}/homePage`} component={HomePageScreen} />
        <Route exact path={`${props.match.path}/menu`} component={MenuScreen} />

      </Switch>
    </CustomLayout>
  </div>
  )
};

export default DashboardScreensRoute;



