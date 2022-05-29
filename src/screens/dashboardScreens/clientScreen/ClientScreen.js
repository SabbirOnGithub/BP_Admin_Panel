import {Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Controls from "../../../components/controls/Controls";
import Loading from "../../../components/Loading/Loading";
import Notification from "../../../components/Notification/Notification";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Popup from "../../../components/Popup/Popup";
import {usePermission} from "../../../components/UsePermission/usePermission";
import useTable from "../../../components/UseTable/useTable";
import Widget from "../../../components/Widget/Widget";
import {config} from "../../../config";
// redux actions
import {
	deleteClient,
	listClients,
	saveClient,
} from "../../../redux/actions/clientActions";
import {accessDeniedRoute} from "../../../routes/routeConstants";
import {ResponseMessage} from "../../../themes/responseMessage";
import CompanyForm from "./ClientForm";

const BASE_ROOT_URL = config.BASE_ROOT_URL;

const headCells = [
	{id: "id", label: "Id"},
	{id: "image", label: "Image"},
	{id: "name", label: "Name"},
	{id: "webAddress", label: "WebAddress"},
	{id: "isActive", label: "IsActive"},
	{id: "displayOrder", label: "Display Order"},
	{id: "actions", label: "Actions", disableSorting: true},
];

function ClientScreen() {
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

	const clientList = useSelector((state) => state.clientList);
	const {clients, loading, error} = clientList;

	const clientSave = useSelector((state) => state.clientSave);
	const {
		loading: loadingSave,
		success: successSave,
		error: errorSave,
	} = clientSave;

	const clientDelete = useSelector((state) => state.clientDelete);
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = clientDelete;

	const [recordForEdit, setRecordForEdit] = useState(null);
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

	const imageSource = (source) => {
		return BASE_ROOT_URL + "/" + source.split("\\").join("/");
	};

	const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting} =
		useTable(clients, headCells, filterFn);

	const dispatch = useDispatch();

	// add/update promise

	const saveItem = (item, id) =>
		new Promise((resolve, reject) => {
			dispatch(saveClient(item, id));
			resolve();
		});

	// delete promise
	const deleteItem = (id) =>
		new Promise((resolve, reject) => {
			dispatch(deleteClient(id));
			resolve();
		});

	const addOrEdit = (item, resetForm) => {
		const formData = new FormData();
		// append form data
		item.id && formData.append("Id", item.id);
		formData.append("Name", item.name);
		formData.append("WebAddress", item.webAddress);
		formData.append("displayOrder", item.displayOrder);
		formData.append("IsActive", item.isActive);
		// append for add/update image
		if (typeof item.pictureUrl === "object") {
			formData.append("file", item.pictureUrl);
		}
		// eslint-disable-next-line
		if (
			typeof item.pictureUrl === "null" ||
			typeof item.pictureUrl === "string"
		) {
			formData.append("pictureUrl", item.pictureUrl);
		}
		if (formData) {
			resetForm();
			setRecordForEdit(null);
			setOpenPopup(false);
			saveItem(formData, item.id).then(() => {
				// resetForm()
				// setRecordForEdit(null)
				// setOpenPopup(false)
				if (successSave) {
					setNotify({
						isOpen: true,
						message: "Submitted Successfully",
						type: "success",
					});
				}

				if (errorSave) {
					setNotify({
						isOpen: true,
						message: "Submition Failed",
						type: "warning",
					});
				}
			});
		}
	};

	const openInPopup = (item) => {
		setRecordForEdit(item);
		setOpenPopup(true);
	};

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
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
				dispatch(listClients());
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
	]);

	return (
		<>
			{loadingRoleResource || loading || loadingSave || loadingDelete ? (
				<Loading />
			) : (
				clients.length >= 0 && (
					<>
						<PageTitle title="Clients" />

						<Grid container spacing={4}>
							<Grid item xs={12}>
								<Widget
									title="CLient List Table"
									upperTitle
									noBodyPadding
									setOpenPopup={setOpenPopup}
									setRecordForEdit={setRecordForEdit}
									threeDotDisplay={true}
									disableWidgetMenu
									addNew={() => {
										setOpenPopup(true);
										setRecordForEdit(null);
									}}
									createOperation={createOperation}
								>
									<Paper
										style={{overflow: "auto", backgroundColor: "transparent"}}
									>
										<TblContainer>
											<TblHead />
											<TableBody>
												{recordsAfterPagingAndSorting().map((item) => (
													<TableRow key={item.id}>
														<TableCell>{item.id}</TableCell>
														<TableCell>
															{item.pictureUrl ? (
																<img
																	src={imageSource(item.pictureUrl)}
																	alt="logo"
																/>
															) : (
																"No image uploaded"
															)}
														</TableCell>
														<TableCell>{item.name}</TableCell>
														<TableCell>{item.webAddress}</TableCell>
														<TableCell>
															{item.isActive ? "Yes" : "No"}
														</TableCell>
														<TableCell>{item.displayOrder}</TableCell>
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
												))}
											</TableBody>
										</TblContainer>
										<TblPagination />
									</Paper>
									<Popup
										title="Company Size Form"
										openPopup={openPopup}
										setOpenPopup={setOpenPopup}
									>
										<CompanyForm
											recordForEdit={recordForEdit}
											addOrEdit={addOrEdit}
											loadingSave={loadingSave}
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
				)
			)}
		</>
	);
}

export default ClientScreen;
