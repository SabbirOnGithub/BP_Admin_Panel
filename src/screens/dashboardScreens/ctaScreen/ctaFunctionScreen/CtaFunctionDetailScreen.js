import {Chip, Grid, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Controls from "../../../../components/controls/Controls";
import DocumentsLink from "../../../../components/DocumentsLink/DocumentsLink";
import Loading from "../../../../components/Loading/Loading";
import Popup from "../../../../components/Popup/Popup";
import {timeConverter} from "../../../../helpers/converter";
// import useTable from "../../../components/UseTable/useTable";
import {
	isClientUser,
	searchNameByIdFromArray,
	searchTitleByIdFromArray,
} from "../../../../helpers/search";
import {ctaFunctionStatus} from "../../../../helpers/staticData";
import {listCtaCategoryModels} from "../../../../redux/actions/ctaCategoryActions";
import {
	detailsCtaFunction,
	listCtaFunctionModels,
} from "../../../../redux/actions/ctaFunctionActions";
import {listCtaPackageDailys} from "../../../../redux/actions/ctaPackageDailyActions";
import {listCtaPackageHourlys} from "../../../../redux/actions/ctaPackageHourlyActions";
import {listCtaPackageMonthlyYearlys} from "../../../../redux/actions/ctaPackageMonthlyYearlyActions";
import {listAcceptClientUsers} from "../../../../redux/actions/userActions";
import ConsultancyReceiveHistoryScreen from "../consultancyReceiveHistoryScreen/ConsultancyReceiveHistoryScreen";
import ConsultancyAssignmentForm from "./ConsultancyAssignmentForm";
import CtaFunctionPackageChangeForm from "./CtaFunctionPackageChangeForm";
import CtaFunctionStatusUpdateForm from "./CtaFunctionStatusUpdateForm";

const useStyles = makeStyles((theme) => ({
	detailsContent: {
		display: "flex",
		justifyContent: "space-between",
		flexWrap: "wrap",
		"& p": {
			flex: "0 0 50%",
			textAlign: "justify",
		},
	},
	customPharagraph: {
		...theme?.customPharagraph,
	},
	subHeadlineText: {
		...theme?.subHeadlineText,
	},
}));

// const headCells = [
//     { id: 'id', label: 'Id' },
//     { id: 'name', label: 'Name' },
// ]
// hard coded to both frontend and backend
// const ctaFunctionStatus = [
//     {
//         title: 'Requested',
//         value:1,
//         id:1,
//     },
//     {
//         title: 'Inprogress',
//         value:2,
//         id:2,

//     },
//     {
//         title: 'Done',
//         value:3,
//         id:3,
//     },
// ]

export default function CtaFunctionDetailScreen(props) {
	const {
		recordForDetails,
		//  setOpenPopup
		// ctaFunctionModels,
		createOperation,
		updateOperation,
		deleteOperation,
		addOrEdit,
		successCtaFunctionSave,
		loadingCtaFunctionSave,
		addOrEditConsultancyAssign,
		addOrEditConsultancyPackage,
	} = props;
	const classes = useStyles();
	const userSignIn = useSelector((state) => state.userSignin);
	//eslint-disable-next-line
	const {userInfo} = userSignIn;

	const ctaFunctionModelList = useSelector(
		(state) => state.ctaFunctionModelList
	);
	//eslint-disable-next-line
	const {ctaFunctionModels} = ctaFunctionModelList;

	const ctaCategoryModelList = useSelector(
		(state) => state.ctaCategoryModelList
	);
	//eslint-disable-next-line
	const {ctaCategoryModels} = ctaCategoryModelList;

	const [recordForEdit, setRecordForEdit] = useState(null);
	const [recordForEditPackage, setRecordForEditPackage] = useState(null);
	//eslint-disable-next-line
	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);
	const [openPopupForAssign, setOpenPopupForAssign] = useState(false);
	const [openPopupForPckageChange, setOpenPopupForPckageChange] =
		useState(false);
	const [fetched, setFetched] = useState(false);
	//eslint-disable-next-line
	// const {
	//     TblContainer,
	//     TblHead,
	//     TblPagination,
	//     recordsAfterPagingAndSorting
	// } = useTable(recordForDetails.ctaDocuments, headCells, filterFn);

	const userAcceptClientList = useSelector(
		(state) => state.userAcceptClientList
	);
	//eslint-disable-next-line
	const {
		userAcceptClients,
		loading: loadingUserAcceptClient,
		error: errorUserAcceptClient,
	} = userAcceptClientList;

	const ctaFunctionDetails = useSelector((state) => state.ctaFunctionDetails);
	//eslint-disable-next-line
	const {ctaFunction, loading, error} = ctaFunctionDetails;

	const [packageName, setPackageName] = useState("Free");

	const ctaPackageDailyList = useSelector((state) => state.ctaPackageDailyList);
	const {ctaPackageDailys} = ctaPackageDailyList;
	const filteredCtaPackageDailys = ctaPackageDailys?.filter(
		(item) => item.companyTypeId === userInfo?.companyTypeId
	);

	const ctaPackageHourlyList = useSelector(
		(state) => state.ctaPackageHourlyList
	);
	const {ctaPackageHourlys} = ctaPackageHourlyList;
	const filteredCtaPackageHourlys = ctaPackageHourlys?.filter(
		(item) => item.companyTypeId === userInfo?.companyTypeId
	);

	const ctaPackageMonthlyYearlyList = useSelector(
		(state) => state.ctaPackageMonthlyYearlyList
	);
	const {ctaPackageMonthlyYearlys} = ctaPackageMonthlyYearlyList;
	const filteredCtaPackageMonthlyYearlys = ctaPackageMonthlyYearlys?.filter(
		(item) => item.companyTypeId === userInfo?.companyTypeId
	);

	const consultancyReceiveHistorySave = useSelector(
		(state) => state.consultancyReceiveHistorySave
	);
	//eslint-disable-next-line
	const {
		loading: loadingSaveConsultancyReceiveHistory,
		success: successSaveConsultancyReceiveHistory,
		error: errorSaveConsultancyReceiveHistory,
	} = consultancyReceiveHistorySave;
	const consultancyReceiveHistoryDelete = useSelector(
		(state) => state.consultancyReceiveHistoryDelete
	);

	const ctaPurchaseHistoryPackageUpdate = useSelector(
		(state) => state.ctaPurchaseHistoryPackageUpdate
	);
	//eslint-disable-next-line
	const {
		loading: loadingCtaPurchaseHistoryPackageUpdate,
		success: successSaveCtaPurchaseHistoryPackageUpdate,
		error: errorSaveCtaPurchaseHistoryPackageUpdate,
	} = ctaPurchaseHistoryPackageUpdate;

	//eslint-disable-next-line
	const {
		loading: loadingDeleteConsultancyReceiveHistory,
		success: successDeleteConsultancyReceiveHistory,
		error: errorDeleteConsultancyReceiveHistory,
	} = consultancyReceiveHistoryDelete;

	const consultancyAssignmentSave = useSelector(
		(state) => state.consultancyAssignmentSave
	);
	//eslint-disable-next-line
	const {
		loading: loadingConsultancyAssignmentSave,
		success: successConsultancyAssignmentSave,
		error: errorConsultancyAssignmentSave,
	} = consultancyAssignmentSave;

	const openInPopup = (item) => {
		setRecordForEdit(item);
		setOpenPopup(true);
	};

	const openInPopupForChange = (item, typeName) => {
		setRecordForEditPackage(item);
		setPackageName(typeName);
		setOpenPopupForPckageChange(true);
	};

	const openInPopupForAssign = (item) => {
		dispatch(listAcceptClientUsers()).then((res) => {
			if (res?.status) {
				setRecordForEdit(item);
				setOpenPopupForAssign(true);
			}
		});
	};

	const convertPricetoUsd = (rate) => {
		return rate.toLocaleString("en-US", {
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const dispatch = useDispatch();

	useEffect(() => {
		// if (ctaFunction?.ctaPurchaseHistories?.length > 0) {
		// 	const element = ctaFunction.ctaPurchaseHistories[0];
		// 	if (element.ctaPackageHourly) {
		// 		setPackageName("Hourly");
		// 	}
		// 	if (element.ctaPackageDaily) {
		// 		setPackageName("Daily");
		// 	}
		// 	if (element.ctaPackageMonthlyYearly) {
		// 		setPackageName("Monthly");
		// 	}
		// }

		const ac = new AbortController();

		try {
			Promise.all([
				dispatch(listCtaFunctionModels()),
				dispatch(listCtaPackageDailys()),
				dispatch(listCtaPackageMonthlyYearlys()),
				dispatch(listCtaPackageHourlys()),
				dispatch(detailsCtaFunction(recordForDetails?.id, recordForDetails)),
			])
				.then(
					(res) =>
						res[1]?.data?.menuId &&
						dispatch(listCtaCategoryModels(res[1]?.data?.menuId))
				)
				//   .then((res) => console.log(res))
				.then(() => setFetched(true))
				.catch((ex) => console.error(ex));
			return () => ac.abort(); // Abort both fetches on unmount
		} catch (err) {
			console.log(err);
		}
		return () => {
			return fetched;
		};

		// eslint-disable-next-line
	}, [
		dispatch,
		recordForDetails.id,
		successSaveConsultancyReceiveHistory,
		successDeleteConsultancyReceiveHistory,
		successCtaFunctionSave,
		successConsultancyAssignmentSave,
		successSaveCtaPurchaseHistoryPackageUpdate,
	]);

	// console.log(ctaFunctionModels?.techStacks)
	// console.log(ctaFunction)
	return (
		<>
			{loading ||
			loadingCtaFunctionSave ||
			loadingConsultancyAssignmentSave ||
			loadingCtaPurchaseHistoryPackageUpdate ? (
				<Loading />
			) : (
				<Grid container>
					<Grid item xs={12}>
						<Paper
							style={{
								overflow: "auto",
								backgroundColor: "transparent",
								marginBottom: 20,
								padding: 20,
							}}
						>
							{
								<Grid container>
									<Grid
										item
										md={6}
										style={{display: "flex", justifyContent: "center"}}
									>
										{/* { ctaFunction?.status &&
                                                <Chip 
                                                    label= {searchTitleByIdFromArray(ctaFunctionStatus, ctaFunction?.status)}
                                                    color="secondary"
                                                    style={{fontSize:"1.6rem"}}
                                                />
                                            } */}
									</Grid>
									{isClientUser(userInfo) ? (
										""
									) : (
										<Grid
											item
											md={6}
											style={{display: "flex", justifyContent: "center"}}
										>
											<Controls.Button
												color="secondary"
												onClick={() => {
													openInPopup(ctaFunction);
												}}
												text={"Update Status"}
												variant="contained"
												size="large"
											></Controls.Button>
											<Controls.Button
												color="primary"
												onClick={() => {
													openInPopupForAssign(ctaFunction);
												}}
												text={"Assign to"}
												ariant="contained"
												size="large"
											></Controls.Button>
										</Grid>
									)}
								</Grid>
							}

							<h1 className={classes.subHeadlineText}>
								<Grid
									item
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<div>Details</div>
								</Grid>
							</h1>

							<Grid container>
								<Grid item md={6}>
									<Typography paragraph className={classes.customPharagraph}>
										<b>Name: </b> {ctaFunction?.firstName}{" "}
										{ctaFunction?.lastName}{" "}
									</Typography>
									<Typography paragraph className={classes.customPharagraph}>
										<b>Phone: </b> {ctaFunction?.phone}{" "}
									</Typography>
									<Typography paragraph className={classes.customPharagraph}>
										<b>Company Name: </b> {ctaFunction?.companyName}{" "}
									</Typography>
									{!recordForDetails.isCategory && (
										<Typography paragraph className={classes.customPharagraph}>
											<b>Service Specificity: </b>{" "}
											{searchNameByIdFromArray(
												ctaFunctionModels?.serviceSpecificities,
												ctaFunction?.serviceSpecificity
											)}{" "}
										</Typography>
									)}

									<Typography paragraph className={classes.customPharagraph}>
										{recordForDetails.isCategory ? (
											<>
												<b>Technology:</b>
												{/* {ctaFunction?.technologyPreference} */}
												{ctaFunction?.technologies &&
													(ctaFunction?.technologies)
														.split(",")
														.map((itemId, index) => {
															if (
																(ctaFunction?.technologies).split(",")
																	?.length ===
																index + 1
															) {
																return (
																	<span key={itemId}>
																		{" "}
																		{searchNameByIdFromArray(
																			ctaCategoryModels?.techStacks,
																			itemId
																		)}
																	</span>
																);
															} else {
																return (
																	<span key={itemId}>
																		{" "}
																		{searchNameByIdFromArray(
																			ctaCategoryModels?.techStacks,
																			itemId
																		)}
																		,{" "}
																	</span>
																);
															}
														})}
											</>
										) : (
											<>
												<b>Technology Preference:</b>
												{/* {ctaFunction?.technologyPreference} */}
												{ctaFunction?.technologyPreference &&
													(ctaFunction?.technologyPreference)
														.split(",")
														.map((itemId, index) => {
															if (
																(ctaFunction?.technologyPreference).split(",")
																	?.length ===
																index + 1
															) {
																return (
																	<span key={itemId}>
																		{" "}
																		{searchNameByIdFromArray(
																			ctaFunctionModels?.techStacks,
																			itemId
																		)}
																	</span>
																);
															} else {
																return (
																	<span key={itemId}>
																		{" "}
																		{searchNameByIdFromArray(
																			ctaFunctionModels?.techStacks,
																			itemId
																		)}
																		,{" "}
																	</span>
																);
															}
														})}
											</>
										)}
									</Typography>

									{recordForDetails.isCategory ? (
										<>
											<Typography
												paragraph
												className={classes.customPharagraph}
											>
												<b>Goals To Achieve: </b> {ctaFunction?.goalsToAchieve}{" "}
											</Typography>
										</>
									) : (
										<>
											<Typography
												paragraph
												className={classes.customPharagraph}
											>
												<b>Goals To Achieve Service: </b>{" "}
												{ctaFunction?.goalsToAchieveService}{" "}
											</Typography>
											<Typography
												paragraph
												className={classes.customPharagraph}
											>
												<b>Goals To Achieve Technology: </b>{" "}
												{ctaFunction?.goalsToAchieveTechnology}{" "}
											</Typography>
										</>
									)}

									<Typography paragraph className={classes.customPharagraph}>
										<b>Estimation: </b>{" "}
										{ctaFunction?.estimation &&
											new Date(
												`${ctaFunction?.estimation} UTC`
											).toLocaleDateString()}{" "}
									</Typography>
									{ctaFunction?.totalHour && (
										<Typography paragraph className={classes.customPharagraph}>
											<b>Total Hours: </b>{" "}
											{timeConverter(ctaFunction?.totalHour)}{" "}
										</Typography>
									)}
								</Grid>
								<Grid item md={6}>
									<Typography paragraph className={classes.customPharagraph}>
										<b>Email: </b> {ctaFunction?.email}{" "}
									</Typography>
									{recordForDetails.isCategory && (
										<Typography paragraph className={classes.customPharagraph}>
											<b>Category Name: </b> {ctaFunction?.categoryName}{" "}
										</Typography>
									)}

									<Typography paragraph className={classes.customPharagraph}>
										{recordForDetails.isCategory ? (
											<>
												<b>Specificity: </b>{" "}
												{searchNameByIdFromArray(
													ctaCategoryModels?.specificities,
													ctaFunction?.specificity
												)}{" "}
											</>
										) : (
											<>
												<b>Solution Specificity: </b>{" "}
												{searchNameByIdFromArray(
													ctaFunctionModels?.solutionSpecificities,
													ctaFunction?.solutionSpecificity
												)}{" "}
											</>
										)}
									</Typography>

									{!recordForDetails.isCategory && (
										<Typography paragraph className={classes.customPharagraph}>
											<b>Goals To Achieve Solution: </b>{" "}
											{ctaFunction?.goalsToAchieveSolution}{" "}
										</Typography>
									)}

									<Typography paragraph className={classes.customPharagraph}>
										<b>Tell Us More: </b> {ctaFunction?.tellUsMore}{" "}
									</Typography>
									{!recordForDetails.isCategory && (
										<>
											<Typography
												paragraph
												className={classes.customPharagraph}
											>
												<b>Description:</b> {ctaFunction?.description}{" "}
											</Typography>
											<Typography
												variant="h1"
												className={classes.customPharagraph}
											>
												<b>Status: </b>
												{/* variant are used to ignore nested div error for Chip*/}

												{ctaFunction?.status ? (
													<Chip
														label={searchTitleByIdFromArray(
															ctaFunctionStatus,
															ctaFunction?.status
														)}
														color="secondary"
														style={{fontSize: "1.6rem"}}
													/>
												) : (
													"No data found"
												)}
											</Typography>
										</>
									)}

									{ctaFunction?.totalHour && (
										<Typography paragraph className={classes.customPharagraph}>
											<b>Remaining Hours: </b>
											{ctaFunction?.hourRemaining
												? timeConverter(ctaFunction?.hourRemaining)
												: timeConverter(0)}
										</Typography>
									)}
									{ctaFunction?.hourUsed && (
										<Typography paragraph className={classes.customPharagraph}>
											<b>Used Hours: </b> {timeConverter(ctaFunction?.hourUsed)}{" "}
										</Typography>
									)}
								</Grid>
							</Grid>
							<h1 className={classes.subHeadlineText}> Assigned To </h1>

							{ctaFunction?.consultancyAssignments?.length > 0 ? (
								<>
									{/* {console.log(ctaFunction?.consultancyAssignments)} */}

									{ctaFunction?.consultancyAssignments?.map((item) => {
										return (
											<div key={item?.id}>
												<Typography
													paragraph
													className={classes.customPharagraph}
												>
													<b>Email: </b> {item?.userEmail} <b> Name: </b>{" "}
													{item?.userName}
												</Typography>
											</div>
										);
									})}
								</>
							) : (
								<Typography paragraph className={classes.customPharagraph}>
									{" "}
									No Assignment found{" "}
								</Typography>
							)}
							<h1 className={classes.subHeadlineText}> Attached Documents </h1>
							{ctaFunction?.ctaDocuments?.length > 0 ? (
								<>
									<DocumentsLink docList={ctaFunction?.ctaDocuments} />
								</>
							) : (
								<Typography paragraph className={classes.customPharagraph}>
									{" "}
									No documents found{" "}
								</Typography>
							)}

							{!recordForDetails.isCategory && (
								<>
									<h1 className={classes.subHeadlineText}>
										Payment Information
									</h1>

									{ctaFunction?.ctaPurchaseHistories?.length > 0 ? (
										ctaFunction?.ctaPurchaseHistories?.map((item) => (
											<div key={item.id}>
												<Grid container>
													<Grid item md={6}>
														<Typography
															paragraph
															className={classes.customPharagraph}
														>
															<b>Payment Status: </b>{" "}
															{item?.isPaid ? "Paid" : "Un-paid"}{" "}
														</Typography>
														<Typography
															paragraph
															className={classes.customPharagraph}
														>
															<b>Transection Id: </b> {item?.transectionId}{" "}
														</Typography>
														{/* <Typography paragraph className={classes.customPharagraph}><b>ctaPackageHourlyId:</b> {item?.ctaPackageHourlyId} </Typography>
                                                        <Typography paragraph className={classes.customPharagraph}><b>ctaPackageDailyId:</b> {item?.ctaPackageDailyId} </Typography>
                                                        <Typography paragraph className={classes.customPharagraph}><b>ctaPackageMonthlyYearlyId:</b> {item?.ctaPackageMonthlyYearlyId} </Typography> */}

														<Typography
															paragraph
															className={classes.customPharagraph}
														>
															<b>Consultation Type Name: </b>{" "}
															{item?.consultationTypeName}{" "}
														</Typography>

														{item?.ctaPackageHourly && (
															<Typography
																paragraph
																className={classes.customPharagraph}
															>
																<b>Package Name:</b>{" "}
																{item?.ctaPackageHourly?.name}{" "}
															</Typography>
														)}

														{item?.ctaPackageDaily && (
															<Typography
																paragraph
																className={classes.customPharagraph}
															>
																<b>Package Name:</b>
																{item?.ctaPackageDaily?.name}
															</Typography>
														)}

														{item?.ctaPackageMonthlyYearly && (
															<Typography
																paragraph
																className={classes.customPharagraph}
															>
																<b>Package Name:</b>{" "}
																{item?.ctaPackageMonthlyYearly?.name}
															</Typography>
														)}

														{isClientUser(userInfo) && (
															<Controls.Button
																style={{
																	borderRadius: 35,
																	backgroundColor: "#21b6ae",
																	padding: "18px 36px",
																	fontSize: "18px",
																}}
																onClick={() => {
																	openInPopupForChange(
																		item,
																		item?.consultationTypeName
																	);
																}}
																text={"Change Package"}
																ariant="contained"
																size="large"
															></Controls.Button>
														)}

														{item?.completionDate && (
															<Typography
																paragraph
																className={classes.customPharagraph}
															>
																<b>Completion Date: </b>{" "}
																{new Date(
																	`${item?.completionDate} UTC`
																).toLocaleDateString()}{" "}
															</Typography>
														)}
													</Grid>
													<Grid item md={6}>
														<Typography
															paragraph
															className={classes.customPharagraph}
														>
															<b>Amount: </b>$ {convertPricetoUsd(item?.amount)}
														</Typography>
														<Typography
															paragraph
															className={classes.customPharagraph}
														>
															<b>Payment Gateway: </b> {item?.paymentGateway}{" "}
														</Typography>
														<Typography
															paragraph
															className={classes.customPharagraph}
														>
															<b>Purchase Date: </b>
															{new Date(
																`${item?.purchaseDate} UTC`
															).toLocaleDateString()}
														</Typography>

														{item?.isYearlySubscription && (
															<Typography
																paragraph
																className={classes.customPharagraph}
															>
																<b>Subscription: </b>
																Yearly
															</Typography>
														)}

														{item?.isMonthlySubscription && (
															<Typography
																paragraph
																className={classes.customPharagraph}
															>
																<b>Subscription: </b>
																Monthly
															</Typography>
														)}

														{/* <Typography
															paragraph
															className={classes.customPharagraph}
														>
															<b>Subscription: </b>
															{item?.isYearlySubscription && "Yearly"}
															{item?.isMonthlySubscription && "Monthly"}
															{item?.ctaPackageDailyId && "Daily"}
															{item?.ctaPackageHourlyId && "Hourly"}
														</Typography> */}
													</Grid>
												</Grid>
											</div>
										))
									) : (
										<Typography paragraph className={classes.customPharagraph}>
											{" "}
											Payment history not found{" "}
										</Typography>
									)}
								</>
							)}

							{/* </Grid> */}
						</Paper>

						<ConsultancyReceiveHistoryScreen
							consultancyReceiveHistorys={
								ctaFunction?.consultancyReceiveHistories
									? ctaFunction?.consultancyReceiveHistories
									: []
							}
							loading={false}
							ctaFunctionId={ctaFunction?.id}
							// createOperation = {ctaFunction?.ctaPurchaseHistories?.length >0 ? true :false}
							createOperation={createOperation && !ctaFunction?.isCompleted}
							updateOperation={updateOperation}
							deleteOperation={deleteOperation}
							hourRemaining={ctaFunction?.hourRemaining}
						/>

						<Popup
							title="Update Cta Function Status"
							openPopup={openPopup}
							setOpenPopup={setOpenPopup}
						>
							<CtaFunctionStatusUpdateForm
								recordForEdit={recordForEdit}
								addOrEdit={addOrEdit}
								// loadingSave={loadingSave}
								setRecordForEdit={setRecordForEdit}
								setOpenPopup={setOpenPopup}
								ctaFunctionStatus={ctaFunctionStatus}
							/>
						</Popup>

						<Popup
							title="Change Cta Package"
							openPopup={openPopupForPckageChange}
							setOpenPopup={setOpenPopupForPckageChange}
						>
							<CtaFunctionPackageChangeForm
								recordForEdit={recordForEditPackage}
								addOrEditConsultancyPackage={addOrEditConsultancyPackage}
								// loadingSave={loadingSave}
								packageName={packageName}
								setRecordForEdit={setRecordForEdit}
								setOpenPopupForPckageChange={setOpenPopupForPckageChange}
								ctaPackageDailys={filteredCtaPackageDailys}
								ctaPackageHourlys={filteredCtaPackageHourlys}
								ctaPackageMonthlyYearlys={filteredCtaPackageMonthlyYearlys}
							/>
						</Popup>

						<Popup
							title="Assign consultancy"
							openPopup={openPopupForAssign}
							setOpenPopup={setOpenPopupForAssign}
						>
							<ConsultancyAssignmentForm
								recordForEdit={recordForEdit}
								addOrEditConsultancyAssign={addOrEditConsultancyAssign}
								// loadingSave={loadingSave}
								setRecordForEdit={setRecordForEdit}
								setOpenPopupForAssign={setOpenPopupForAssign}
								ctaFunctionStatus={ctaFunctionStatus}
								userAcceptClients={userAcceptClients}
							/>
						</Popup>

						{/* <div>
                        <>
                            <Controls.Button
                                text="Back"
                                color="default"
                                onClick={()=>{setOpenPopup(false)}}
                            />
                        </>
                    </div> */}
					</Grid>
				</Grid>
			)}
		</>
	);
}
