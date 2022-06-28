import {Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {useEffect, useState} from "react";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Controls from "../../../components/controls/Controls";
import Loading from "../../../components/Loading/Loading";
import Notification from "../../../components/Notification/Notification";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Popup from "../../../components/Popup/Popup";
import useTable from "../../../components/UseTable/useTable";
import Widget from "../../../components/Widget/Widget";
import {ResponseMessage} from "../../../themes/responseMessage";
import MenuForm from "./MenuForm";

import {useDispatch, useSelector} from "react-redux";
// permissions
import {usePermission} from "../../../components/UsePermission/usePermission";
import {accessDeniedRoute} from "../../../routes/routeConstants";

// redux actions
import {
	deleteMenu,
	listMenus,
	saveMenu,
} from "../../../redux/actions/menuActions";

const headCells = [
	{id: "id", label: "Id"},
	{id: "name", label: "Name"},
	{id: "slug", label: "Slug"},
	{id: "isActive", label: "Active"},
	{id: "actions", label: "Actions", disableSorting: true},
];

export default function MenuScreen() {
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

	const menuList = useSelector((state) => state.menuList);
	//eslint-disable-next-line
	const {menus, loading, error} = menuList;
	const menuSave = useSelector((state) => state.menuSave);
	//eslint-disable-next-line
	const {
		loading: loadingSave,
		success: successSave,
		error: errorSave,
	} = menuSave;
	const menuDelete = useSelector((state) => state.menuDelete);
	//eslint-disable-next-line
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = menuDelete;

	const [recordForEdit, setRecordForEdit] = useState(null);
	// const [records, setRecords] = useState([])
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

	const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting} =
		useTable(menus, headCells, filterFn);

	const dispatch = useDispatch();

	// add/update promise
	const saveItem = (item) =>
		new Promise((resolve, reject) => {
			dispatch(saveMenu(item));
			resolve();
		});

	// delete promise
	const deleteItem = (id) =>
		new Promise((resolve, reject) => {
			dispatch(deleteMenu(id));
			resolve();
		});

	const addOrEdit = async (item, resetForm) => {
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		saveItem(item).then(() => {
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
				dispatch(listMenus());
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
				menus.length >= 0 && (
					<>
						<PageTitle title="Menus" />

						<Grid container spacing={4}>
							<Grid item xs={12}>
								<Widget
									title="Menu List Table"
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
														<TableCell>{item.name}</TableCell>
														<TableCell>{item.slug}</TableCell>
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
												))}
											</TableBody>
										</TblContainer>
										<TblPagination />
									</Paper>
									<Popup
										title="Menu Form"
										openPopup={openPopup}
										setOpenPopup={setOpenPopup}
									>
										<MenuForm
											recordForEdit={recordForEdit}
											addOrEdit={addOrEdit}
											loadingSave={loadingSave}
										/>
									</Popup>

									<ConfirmDialog
										confirmDialog={confirmDialog}
										setConfirmDialog={setConfirmDialog}
									/>
								</Widget>
							</Grid>
						</Grid>
						<Notification notify={notify} setNotify={setNotify} />
					</>
				)
			)}
		</>
	);
}
