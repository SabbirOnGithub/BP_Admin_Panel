import {Divider, Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import Widget from "../../../components/Widget/Widget";
import {config} from "../../../config";
import {isClientUser} from "../../../helpers/search";
import {listCompanySizes} from "../../../redux/actions/companySizeActions";
import {listCompanyTypes} from "../../../redux/actions/companyTypeActions";
import {listConsultingTypes} from "../../../redux/actions/consultingTypeActions";
import {listRoles} from "../../../redux/actions/roleActions";
// import { useHistory } from 'react-router';
// redux actions
import {
	deActivateUser,
	detailsUser,
	saveUser,
} from "../../../redux/actions/userActions";
import UserProfileForm from "./UserProfileForm";

const BASE_ROOT_URL = config.BASE_ROOT_URL;

const useStyles = makeStyles((theme) => ({
	headerContainer: {
		position: "relative",
		height: "100px",
	},
	header: {
		display: "flex",
		flexWrap: "wrap",
		position: "absolute",
		width: "calc(100%)",
		top: "-150px",
		alignItems: "flex-end",
		"& > *": {
			margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
		},
	},
	spacer: {
		flexGrow: "1",
	},
	avatar: {
		background: "#fff",
		border: `3px solid white`,
		width: theme.spacing(25),
		height: theme.spacing(25),
		boxShadow: theme.shadows[3],
	},
	actionGroup: {
		display: "flex",
		// width: "330px",
		justifyContent: "space-between",
		marginRight: 0,
	},
	nameStyle: {
		fontSize: 24,
		// fontFamily: "Oxanium, cursive",
		fontWeight: 400,
		lineHeight: 1.5,
	},
}));

function UserProfileScreen() {
	const history = useHistory();

	const userSignIn = useSelector((state) => state.userSignin);
	//eslint-disable-next-line
	const {userInfo} = userSignIn;
	// console.log(userInfo)
	// const userDetails = useSelector(state => state.userDetails);
	// //eslint-disable-next-line
	// const { user, loading, error } = userDetails;

	const avaterPath = (imageUrl) => {
		return BASE_ROOT_URL + "/" + imageUrl?.split("\\").join("/");
	};

	const userSave = useSelector((state) => state.userSave);
	//eslint-disable-next-line
	const {
		loading: loadingSave,
		success: successSave,
		error: errorSave,
	} = userSave;
	// console.log(user)

	const companySizeList = useSelector((state) => state.companySizeList);
	//eslint-disable-next-line
	const {
		companySizes,
		loading: loadingCompanySize,
		error: errorCompanySize,
	} = companySizeList;

	const companyTypeList = useSelector((state) => state.companyTypeList);
	//eslint-disable-next-line
	const {
		companyTypes,
		loading: loadingCompanyType,
		error: errorCompanyType,
	} = companyTypeList;

	const consultingTypeList = useSelector((state) => state.consultingTypeList);
	//eslint-disable-next-line
	const {
		consultingTypes,
		loading: loadingConsultingType,
		error: errorConsultingType,
	} = consultingTypeList;

	const roleList = useSelector((state) => state.roleList);
	//eslint-disable-next-line
	const {roles} = roleList;

	const getUserRoleName = (id) => {
		const roleDetails = roles.find((item) => item.id === id);
		if (roleDetails) {
			return roleDetails.name;
		} else {
			return "role not found";
		}
	};

	const deactiveUser = useSelector((state) => state.userDeactivate);
	const {loading: loadingDeactiveUser, error: errorDeactiveUser} = deactiveUser;

	const classes = useStyles();

	//eslint-disable-next-line
	const [recordForEdit, setRecordForEdit] = useState(null);
	//eslint-disable-next-line
	const [openPopup, setOpenPopup] = useState(true);
	//eslint-disable-next-line
	const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
	//eslint-disable-next-line
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	const dispatch = useDispatch();
	// add/update promise
	//   const saveItem = (item, id) => new Promise((resolve, reject) => {
	//     dispatch(saveUser(item, id));
	//     resolve();
	// })

	//eslint-disable-next-line
	const addOrEdit = (item, resetForm) => {
		// console.log(item)
		const formData = new FormData();
		item.id && formData.append("Id", item?.id);
		item?.firstName && formData.append("FirstName", item?.firstName);
		item?.lastName && formData.append("LastName", item?.lastName);
		item?.roleId && formData.append("RoleId", item?.roleId);
		// formData.append('Name', item?.name)
		item?.isActive && formData.append("IsActive", item?.isActive); // true or false
		item?.companySizeId &&
			formData.append("CompanySizeId", item?.companySizeId);
		item?.companyTypeId &&
			formData.append("CompanyTypeId", item?.companyTypeId);
		item?.mobile && formData.append("Mobile", item?.mobile);
		item?.username && formData.append("Username", item?.username);
		item?.address && formData.append("Address", item?.address);
		item?.businessIndustry &&
			formData.append("BusinessIndustry", item?.businessIndustry);
		item?.businessName && formData.append("BusinessName", item?.businessName);
		item?.currentConsultingTypeId &&
			formData.append(
				"CurrentConsultationTypeId",
				item?.currentConsultingTypeId
			);
		// append for add/update image
		if (typeof item.photo === "object") {
			formData.append("file", item.photo);
		}
		// eslint-disable-next-line
		if (typeof item.photo === "null" || typeof item.pictureUrl === "string") {
			formData.append("photo", item.photo);
		}

		if (formData) {
			resetForm();
			// setRecordForEdit(null)
			// setOpenPopup(true)
			// saveItem(formData, item.id)
			dispatch(saveUser(formData, item.id)).then((res) => {
				setOpenPopup(true);
				// console.log(res)
				if (res?.status) {
					// history.go(0);
					setNotify({
						isOpen: true,
						message: "Successfull",
						type: "success",
					});
				} else {
					setNotify({
						isOpen: true,
						message: "Submition Failed",
						type: "warning",
					});
				}
			});
		}
	};

	// const logout = () => (dispatch) => {
	// 	Cookie.remove("userInfo");
	// 	Cookie.remove("userToken");
	// 	dispatch({type: USER_LOGOUT});
	// };

	const handleLogout = () => {
		// console.log('logout');
		// dispatch(logout());
		history.push("/signin");
	};

	const removeUser = (id) => {
		dispatch(deActivateUser(id)).then(() => {
			setOpenPopup(false);
			setNotify({
				isOpen: true,
				message: "DeActivate Successful",
				type: "success",
			});
			handleLogout();
		});
	};

	// console.log(user)

	useEffect(() => {
		try {
			dispatch(listCompanySizes());
			dispatch(listCompanyTypes());
			dispatch(listConsultingTypes());
			dispatch(listRoles());
			// userInfo?.userId && dispatch(detailsUser(userInfo.userId));
			dispatch(detailsUser(userInfo.userId));
		} catch (e) {
			// console.log(e)
		}
		return () => {
			//
		};
	}, [dispatch, userInfo?.userId, successSave]);
	return (
		<div>
			{loadingSave ||
			loadingCompanySize ||
			loadingCompanyType ||
			loadingConsultingType ||
			loadingDeactiveUser ? (
				<Loading />
			) : (
				<>
					<div>
						<div
							style={{
								height: "250px",
								backgroundPosition: "center",
								backgroundSize: "cover",
								filter: "contrast(75%)",
								backgroundImage: "url(/user-bg.jpg)",
							}}
						></div>
						<div className={classes.headerContainer}>
							<div className={classes.header}>
								{userInfo?.photo ? (
									<Avatar
										alt="Profile"
										src={avaterPath(userInfo?.photo)}
										classes={{root: classes.avatar, circle: classes.circle}}
									/>
								) : (
									<Avatar
										alt="Profile"
										src={avaterPath(userInfo?.userImage)}
										classes={{root: classes.avatar, circle: classes.circle}}
									/>
								)}

								<Typography className={classes.nameStyle} variant={"h5"}>
									{userInfo?.userName}
								</Typography>
								{!isClientUser(userInfo) && (
									<>
										<Chip
											variant={"outlined"}
											avatar={<Avatar>{}</Avatar>}
											label={getUserRoleName(userInfo?.userId)}
											size="medium"
										/>
									</>
								)}
							</div>
						</div>
					</div>
					<Grid container spacing={4}>
						<Grid item xs={12}>
							{userInfo && (
								<Widget
									title="Profile"
									upperTitle
									// noBodyPadding
									disableWidgetMenu
									editOne={() => {
										setOpenPopup(false);
									}}
									displayEdit={openPopup}
								>
									<Divider style={{marginBottom: 16}} />
									<UserProfileForm
										recordForEdit={userInfo}
										removeUser={removeUser}
										// recordForEdit = {recordForEdit}
										addOrEdit={addOrEdit}
										loadingSave={loadingSave}
										setOpenPopup={setOpenPopup}
										openPopup={openPopup}
										companySizes={companySizes}
										companyTypes={companyTypes}
										consultingTypes={consultingTypes}
										userInfo={userInfo}
									/>
								</Widget>
							)}
						</Grid>
					</Grid>
				</>
			)}
		</div>
	);
}

export default UserProfileScreen;
