import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import Loading from "../../components/Loading/Loading";
// import AccessDeniedScreen from '../accessDeniedScreen/AccessDeniedScreen'
import {usePermission} from "../../components/UsePermission/usePermission";
import {isAdminUser} from "../../helpers/search";
import AdminDashboardScreen from "./adminDashboardScreen/AdminDashboardScreen";
import UserDashboardScreen from "./userDashboardScreen/UserDashboardScreen";

function HomeScreen() {
	const {
		permission,
		setPermission,
		recievedPermission,
		loadingRoleResource,
		history,
		initialPermission,
	} = usePermission();

	//eslint-disable-next-line
	const {createOperation, readOperation, updateOperation, deleteOperation} =
		permission;

	const userSignIn = useSelector((state) => state.userSignin);
	//eslint-disable-next-line
	const {userInfo} = userSignIn;

	useEffect(() => {
		try {
			if (recievedPermission) {
				setPermission({...recievedPermission});
			}
			if (readOperation === false) {
				history.push("/admin/accessDenied");
			}
			if (loadingRoleResource === false && !recievedPermission) {
				setPermission({...initialPermission});
			}
		} catch (e) {
			console.log(e);
		}
		return () => {
			//
		};
	}, [
		setPermission,
		recievedPermission,
		readOperation,
		history,
		initialPermission,
		loadingRoleResource,
	]);

	return (
		<>
			{loadingRoleResource ? (
				<Loading />
			) : (
				<>
					{userInfo?.isTempPass && (
						<div
							style={{
								textAlign: "center",
								display: "flex",
								justifyContent: "center",
								backgroundColor: "red",
								color: "#fff",
								fontSize: "15px",
								padding: "10px",
							}}
						>
							Please change you temporary password
						</div>
					)}

					<h1
						style={{
							textAlign: "center",
							display: "flex",
							justifyContent: "center",
						}}
					>
						{" "}
						{"Welcome to Best Practicify Dashboard"}{" "}
					</h1>
					{isAdminUser(userInfo) ? (
						<AdminDashboardScreen />
					) : (
						<UserDashboardScreen />
					)}
				</>
			)}
		</>
	);
}

export default HomeScreen;
