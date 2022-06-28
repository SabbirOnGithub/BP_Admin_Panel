import {Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Controls from "../../../components/controls/Controls";
import Loading from "../../../components/Loading/Loading";
import Notification from "../../../components/Notification/Notification";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Popup from "../../../components/Popup/Popup";
// permissions
import {usePermission} from "../../../components/UsePermission/usePermission";
// import useTable from "../../../components/UseTable/useTable";
import useTableServerSide from "../../../components/UseTable/useTableServerSide";
import Widget from "../../../components/Widget/Widget";
import {config} from "../../../config";
import {listRoles} from "../../../redux/actions/roleActions";
// redux actions
import {
	deleteUser,
	listUsers,
	saveUser,
} from "../../../redux/actions/userActions";
import {accessDeniedRoute} from "../../../routes/routeConstants";
import {ResponseMessage} from "../../../themes/responseMessage";
import UserForm from "./UserForm";

const BASE_ROOT_URL = config.BASE_ROOT_URL;

// const headCells = [
// 	{id: "id", label: "Id"},
// 	{id: "photo", label: "Photo"},
// 	{id: "username", label: "User Name"},
// 	{id: "name", label: "Name"},
// 	{id: "email", label: "Email"},
// 	{id: "mobile", label: "Mobile"},
// 	{id: "address", label: "Address"},
// 	{id: "roleName", label: "Role Name"},
// 	{id: "isActive", label: "Is Active"},
// 	{id: "actions", label: "Actions", disableSorting: true},
// ];

const headCells = [
	{id: "photo", label: "Photo"},
	{id: "name", label: "Name & Phone"},
	{id: "email", label: "Username/Email"},
	{id: "roleName", label: "Role"},
	{id: "isActive", label: "Active"},
	{id: "actions", label: "Actions", disableSorting: true},
];

export default function UserScreen() {
	// permission get
	const {
		permission,
		setPermission,
		recievedPermission,
		loadingRoleResource,
		history,
		initialPermission,
	} = usePermission();
	const {createOperation, readOperation, updateOperation, deleteOperation} =
		permission;
	// permission get end

	const roleList = useSelector((state) => state.roleList);
	//eslint-disable-next-line
	const {roles, loading: roleListLoading} = roleList;

	const userList = useSelector((state) => state.userList);
	//eslint-disable-next-line
	const {users, loading, error} = userList;
	const userSave = useSelector((state) => state.userSave);
	//eslint-disable-next-line
	const {
		loading: loadingSave,
		success: successSave,
		error: errorSave,
	} = userSave;

	const successSaveMessage = userSave.user
		? userSave.user.message
		: ResponseMessage.successSaveMessage;

	const userDelete = useSelector((state) => state.userDelete);
	//eslint-disable-next-line
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = userDelete;

	//eslint-disable-next-line
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [searchValue, setSearchValue] = useState("");

	//eslint-disable-next-line
	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);
	const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
		pageDataConfig,
		setPageDataConfig,
	} = useTableServerSide(users?.item1, headCells, filterFn, users?.item2);

	const dispatch = useDispatch();
	// search from table
	const handleSearch = (e) => {
		e.persist();
		const recievedSearchValue = e.target.value;
		setSearchValue(recievedSearchValue);
		// --------------------
		// server side search
		// --------------------
		setPageDataConfig((prevState) => {
			return {...prevState, keyword: recievedSearchValue};
		});
		// --------------------
		// client side search
		// --------------------
		// setFilterFn({
		//     fn: items => {
		//         if (recievedSearchValue) {
		//             return items.filter(x => {
		//                 const makeStringInRow = (
		//                     (x?.roleId && x?.roleId) +
		//                     (x?.resourceId && (' ' + x?.resourceId)) +
		//                     (x?.createOperation ? ' yes' : 'no') +
		//                     (x?.updateOperation ? ' yes' : 'no') +
		//                     (x?.deleteOperation ? ' yes' : 'no')
		//                 )?.toString()?.toLowerCase();
		//                 return makeStringInRow.indexOf(recievedSearchValue.toString().toLowerCase()) > -1;
		//             });
		//         }
		//         else {
		//             return items;
		//         }
		//     }
		// });

		// --------------------
		// client side search end
		// --------------------
	};

	// add/update promise
	const saveItem = (item, id) =>
		new Promise((resolve, reject) => {
			dispatch(saveUser(item, id));
			resolve();
		});

	// delete promise
	const deleteItem = (id) =>
		new Promise((resolve, reject) => {
			dispatch(deleteUser(id));
			resolve();
		});
	//eslint-disable-next-line
	const addOrEdit = async (item, resetForm) => {
		// console.log("userItem: ", item);
		try {
			const formData = new FormData();
			item.id && formData.append("Id", item.id);
			formData.append("Username", item.email);
			formData.append("Password", item.password);
			formData.append("RoleId", item.roleId);
			formData.append("firstName", item.firstName);
			formData.append("lastName", item.lastName);
			formData.append("IsActive", item.isActive);
			formData.append("Mobile", item.mobile);
			formData.append("Email", item.email);
			formData.append("Address", item.address);
			formData.append("BusinessName", item.businessName);
			// append for add/update image
			if (typeof item.photo === "object") {
				formData.append("file", item.photo);
			}
			// eslint-disable-next-line
			if (typeof item.photo === "null") {
				formData.append("photo", item.photo);
			}

			if (formData) {
				resetForm();
				setRecordForEdit(null);
				setOpenPopup(false);
				await saveItem(formData, item.id).then(() => {
					// resetForm()
					// setRecordForEdit(null)
					// setOpenPopup(false)
					if (successSave) {
						setNotify({
							isOpen: true,
							message: successSaveMessage,
							type: "success",
						});
					}

					if (errorSave) {
						setNotify({
							isOpen: true,
							message: errorSave,
							type: "error",
						});
					}
				});
			}
		} catch (error) {
			console.log("UserForm-Error: ", error);
		}
	};

	const getUserRoleName = (id) => {
		const roleDetails = roles.find((item) => item.id === id);
		if (roleDetails) {
			return roleDetails.name;
		} else {
			return "role not found";
		}
	};
	const openInPopup = (item) => {
		// console.log(item)
		setRecordForEdit({...item, password: ""});
		setOpenPopup(true);
	};

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		//call delete item promise
		deleteItem(id).then(() => {
			if (successDelete) {
				setNotify({
					isOpen: true,
					message: "Deleted Successfully",
					type: "success",
				});
			}
			if (errorDelete) {
				setNotify({
					isOpen: true,
					message: ResponseMessage.errorDeleteMessage,
					type: "warning",
				});
			}
		});
	};

	useEffect(() => {
		try {
			if (recievedPermission) {
				setPermission({...recievedPermission});
			}
			if (recievedPermission?.readOperation) {
				dispatch(listUsers(pageDataConfig));
				dispatch(listRoles());
			}
			if (readOperation === false) {
				history.push(accessDeniedRoute);
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
		dispatch,
		successSave,
		successDelete,
		setPermission,
		recievedPermission,
		readOperation,
		history,
		initialPermission,
		loadingRoleResource,
		pageDataConfig,
	]);
	return (
		<>
			{
				// (loadingRoleResource || loading || loadingSave || loadingDelete || roleListLoading) ? <Loading /> :
				<>
					<PageTitle title="Users" />

					<Grid container spacing={4}>
						<Grid item xs={12}>
							<Widget
								title="User List Table"
								upperTitle
								noBodyPadding
								setOpenPopup={setOpenPopup}
								setRecordForEdit={setRecordForEdit}
								threeDotDisplay={false}
								disableWidgetMenu
								addNew={() => {
									setOpenPopup(true);
									setRecordForEdit(null);
								}}
								createOperation={createOperation}
								handleSearch={handleSearch}
								searchLabel="Search here.."
								searchValue={searchValue}
							>
								<Paper
									style={{overflow: "auto", backgroundColor: "transparent"}}
								>
									<TblContainer>
										<TblHead />
										<TableBody>
											{loadingRoleResource ||
											loading ||
											loadingSave ||
											loadingDelete ||
											roleListLoading ? (
												<TableRow key={0}>
													<TableCell style={{borderBottom: "none"}}>
														<Loading />
													</TableCell>
												</TableRow>
											) : (
												recordsAfterPagingAndSorting().map((item) => (
													<TableRow key={item.id}>
														{/* <TableCell>{item.id}</TableCell> */}
														<TableCell>
															{item.photo ? (
																<img
																	className="userPhoto"
																	src={BASE_ROOT_URL + "/" + item.photo}
																	alt="logo"
																/>
															) : (
																"No image uploaded"
															)}
														</TableCell>
														{/* <TableCell>{item.username}</TableCell> */}
														<TableCell>
															{item.name}
															<br />
															<small>{item.mobile}</small>
														</TableCell>
														<TableCell>{item.email}</TableCell>
														{/* <TableCell>{item.mobile}</TableCell> */}
														{/* <TableCell>{item.address}</TableCell> */}

														<TableCell>
															{getUserRoleName(item.roleId)}
														</TableCell>
														<TableCell>
															{item.isActive ? "yes" : "no"}
														</TableCell>
														<TableCell>
															{updateOperation && (
																<Controls.ActionButton
																	color="primary"
																	onClick={() => {
																		openInPopup(item);
																	}}
																>
																	<EditOutlinedIcon fontSize="small" />
																</Controls.ActionButton>
															)}
															{deleteOperation && (
																<Controls.ActionButton
																	color="secondary"
																	onClick={() => {
																		setConfirmDialog({
																			isOpen: true,
																			title:
																				"Are you sure to delete this record?",
																			subTitle: "You can't undo this operation",
																			onConfirm: () => {
																				onDelete(item.id);
																			},
																		});
																	}}
																>
																	<CloseIcon fontSize="small" />
																</Controls.ActionButton>
															)}
															{!updateOperation && !deleteOperation && (
																<>Access Denied</>
															)}
														</TableCell>
													</TableRow>
												))
											)}
										</TableBody>
									</TblContainer>
									<TblPagination />
								</Paper>
								<Popup
									title="User Form"
									openPopup={openPopup}
									setOpenPopup={setOpenPopup}
								>
									<UserForm
										recordForEdit={recordForEdit}
										addOrEdit={addOrEdit}
										loadingSave={loadingSave}
										roles={roles}
									/>
								</Popup>
								<Notification notify={notify} setNotify={setNotify} />
								<ConfirmDialog
									confirmDialog={confirmDialog}
									setConfirmDialog={setConfirmDialog}
								/>
							</Widget>
						</Grid>
					</Grid>
				</>
			}
		</>
	);
}
