import React from "react";
import { Route, Switch } from "react-router-dom";
import ErrorScreen from "../screens/errorScreen/ErrorScreen";
import SignInScreen from "../screens/signInScreen/SignInScreen";
import DashboardScreensRoute from './dashboardScreens.route';
import WebsiteHomeScreen from '../screens/websiteScreens/WebsiteHomeScreen'

// protected routing wrapper component
import AdminProtected from './adminProtected.route';

const Baserouter = (props) => {

  return (

    <div>
        <Switch>
        <Route exact={true} path="/" component={WebsiteHomeScreen} />
        <Route exact={true} path="/signin" component={SignInScreen} />
        <AdminProtected  path="/dashboard" component={DashboardScreensRoute} />
        <AdminProtected  path="/" component={DashboardScreensRoute} /> 
        <Route component={ErrorScreen} />
        </Switch>
    </div>
  )
};



export default Baserouter;
