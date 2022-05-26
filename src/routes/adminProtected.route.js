import React from "react";
import {Redirect, Route} from "react-router-dom";
import * as Auth from "../helpers/auth";

//
const Adminprotected = ({component: Component, ...rest}) => (
	<Route
		{...rest}
		render={(props) =>
			Auth.validAdmin() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/signin",
					}}
				/>
			)
		}
	/>
);
export default Adminprotected;
