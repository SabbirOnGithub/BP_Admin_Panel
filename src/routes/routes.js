import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFoundScreen from "../screens/notFoundScreen/NotFoundScreen";
import SignInScreen from "../screens/signInScreen/SignInScreen";
import DashboardScreensRoute from './dashboardScreens.route';
import WebsiteHomeScreen from '../screens/websiteScreens/WebsiteHomeScreen';
// import AccessDeniedScreen from '../screens/accessDeniedScreen/AccessDeniedScreen'

// protected routing wrapper component
import AdminProtected from './adminProtected.route';

const Baserouter = (props) => {

  return (

    <div>
        <Switch>
          <Route exact={true} path="/" component={WebsiteHomeScreen} />
          <Route exact={true} path="/signin" component={SignInScreen} />
          <AdminProtected  path="/admin" component={DashboardScreensRoute} />
          <Route path="/notFound" component={NotFoundScreen} />
          {/* <Route path="/accessDenied" component={AccessDeniedScreen} /> */}

          <Route path="*">
            <Redirect to="/notFound" />
          </Route>
          
        </Switch>
    </div>
  )
};



export default Baserouter;
