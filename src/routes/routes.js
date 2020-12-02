import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFoundScreen from "../screens/notFoundScreen/NotFoundScreen";
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
          <Route path="/notFound" component={NotFoundScreen} />

          <Route path="*">
            <Redirect to="/notFound" />
          </Route>
          
        </Switch>
    </div>
  )
};



export default Baserouter;
