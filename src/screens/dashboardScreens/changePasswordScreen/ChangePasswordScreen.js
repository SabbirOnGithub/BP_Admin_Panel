import {Divider, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Widget from "../../../components/Widget/Widget";
import {config} from "../../../config";
import {listCompanySizes} from "../../../redux/actions/companySizeActions";
import {listCompanyTypes} from "../../../redux/actions/companyTypeActions";
import {listConsultingTypes} from "../../../redux/actions/consultingTypeActions";
// import { useHistory } from 'react-router';
// redux actions
import {detailsUser, saveUser} from "../../../redux/actions/userActions";
import ChangePasswordForm from "./ChangePasswordForm";

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
		top: "-70px",
		alignItems: "flex-end",
		"& > *": {
			margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
		},
	},
	spacer: {
		flexGrow: "1",
	},
	avatar: {
		border: `3px solid white`,
		width: theme.spacing(13),
		height: theme.spacing(13),
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
		fontFamily: "Oxanium, cursive",
		fontWeight: 400,
		lineHeight: 1.5,
	},
}));

export const ChangePasswordScreen = () => {
	// const history = useHistory();

	const userSignIn = useSelector((state) => state.userSignin);
	//eslint-disable-next-line
	const {userInfo} = userSignIn;
	// console.log(userInfo)
	// const userDetails = useSelector(state => state.userDetails);
	// //eslint-disable-next-line
	// const { user, loading, error } = userDetails;
	const userSave = useSelector((state) => state.userSave);
	//eslint-disable-next-line
	const {
		loading: loadingSave,
		success: successSave,
		error: errorSave,
	} = userSave;

	const classes = useStyles();

	//eslint-disable-next-line
	const [recordForEdit, setRecordForEdit] = useState(null);

	//eslint-disable-next-line
	const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
	//eslint-disable-next-line
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	const dispatch = useDispatch();

	//eslint-disable-next-line
	const addOrEdit = (item, resetForm) => {
		// console.log(item)
		const formData = new FormData();
		item.userId && formData.append("UserId", item?.userId);
		item?.tempPass && formData.append("TempPass", item?.tempPass);
		item?.newPassword && formData.append("NewPassword", item?.newPassword);

		if (formData) {
			resetForm();
			// setRecordForEdit(null)
			// setOpenPopup(true)
			// saveItem(formData, item.id)
			dispatch(saveUser(formData, item.id)).then((res) => {
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
	// console.log(user)

	useEffect(() => {
		try {
			dispatch(listCompanySizes());
			dispatch(listCompanyTypes());
			dispatch(listConsultingTypes());
			// userInfo?.userId && dispatch(detailsUser(userInfo.userId));
			dispatch(detailsUser(userInfo.userId));
		} catch (e) {
			// console.log(e)
		}
		return () => {
			//
		};
	}, [dispatch, userInfo.userId]);

	return (
		<>
			{loadingSave ? (
				<Loading />
			) : (
				<>
					<Grid container spacing={4}>
						<Grid item xs={12}>
							{userInfo && (
								<Widget title="Change Password" disableWidgetMenu upperTitle>
									<Divider style={{marginBottom: 16}} />

									<ChangePasswordForm
										recordForEdit={userInfo}
										// recordForEdit = {recordForEdit}
										addOrEdit={addOrEdit}
										loadingSave={loadingSave}
										userInfo={userInfo}
									/>
								</Widget>
							)}
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};
