import {Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PaymentIcon from "@material-ui/icons/Payment";
// import PageviewIcon from '@material-ui/icons/Pageview';
import ReceiptIcon from "@material-ui/icons/Receipt";
import ReplyIcon from "@material-ui/icons/Reply";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import classnames from "classnames";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Controls from "../../../components/controls/Controls";
import Loading from "../../../components/Loading/Loading";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import {Typography} from "../../../components/Wrappers/Wrappers";
// ../../../../redux/actions/ctaPaymentActions
import {isAdminUser} from "../../../helpers/search";
import {
	deleteCtaFunctionDocument,
	saveCtaFunction,
	saveCtaFunctionDocument,
} from "../../../redux/actions/ctaFunctionActions";
import {saveCtaPayment} from "../../../redux/actions/ctaPaymentActions";
import {saveCtaPurchaseHistory} from "../../../redux/actions/ctaPurchaseHistoryActions";
// redux actions
import {detailsUserDashboard} from "../../../redux/actions/dashboardActions";
import {ResponseMessage} from "../../../themes/responseMessage";
import CtaFunctionForm from "../ctaScreen/ctaFunctionScreen/CtaFunctionForm";
import PurchaseConsultancy from "../PurchaseConsultancy/PurchaseConsultancy";
// ../../../../redux/actions/ctaPurchaseHistoryActions
// styles
import useStyles from "./styles";

export default function UserDashboardScreen() {
	var classes = useStyles();
	//set state
	const [openPopup, setOpenPopup] = useState(false);
	const [purchase, setPurchase] = useState(false);
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [recordForDetails, setRecordForDetails] = useState(null);
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const [paymentResponse, setPaymentResponse] = useState({});

	//check is from payment true of false
	const fromPayment = localStorage.getItem("fromPayment");
	console.log(fromPayment);

	useEffect(() => {
		if (fromPayment) {
			setPurchase(true);
		}
	}, []);

	// if (fromPayment) {
	// 	useCallback( () => {
	// 		setPurchase(true);
	// 	}, [purchase])
	// }

	const userSignIn = useSelector((state) => state.userSignin);
	//eslint-disable-next-line
	const {userInfo} = userSignIn;

	const userDashboardDetails = useSelector(
		(state) => state.userDashboardDetails
	);

	//cta function save
	const ctaFunctionSave = useSelector((state) => state.ctaFunctionSave);
	//eslint-disable-next-line
	const {
		loading: loadingCtaFunctionSave,
		success: successCtaFunctionSave,
		error: errorCtaFunctionSave,
		ctaFunction: ctaFunctionSaveData,
	} = ctaFunctionSave;

	//cta function delete document
	const ctaFunctionDocumentDelete = useSelector(
		(state) => state.ctaFunctionDocumentDelete
	);
	//eslint-disable-next-line
	const {
		loading: loadingDeleteCtaFunctionDocument,
		success: successDeleteCtaFunctionDocument,
		error: errorDeleteCtaFunctionDocument,
	} = ctaFunctionDocumentDelete;

	//cta function document save
	const ctaFunctionDocumentSave = useSelector(
		(state) => state.ctaFunctionDocumentSave
	);
	//eslint-disable-next-line
	const {
		loading: loadingCtaFunctionDocumentSave,
		success: successCtaFunctionDocumentSave,
		error: errorCtaFunctionDocumentSave,
		ctaFunction: ctaFunctionDocumentSaveData,
	} = ctaFunctionDocumentSave;

	//cta payment save
	const ctaPaymentSave = useSelector((state) => state.ctaPaymentSave);
	//eslint-disable-next-line
	const {
		loading: loadingCtaPaymentSave,
		success: successCtaPaymentSave,
		error: errorCtaPaymentSave,
	} = ctaPaymentSave;

	//cta purches history
	const ctaPurchaseHistorySave = useSelector(
		(state) => state.ctaPurchaseHistorySave
	);
	//eslint-disable-next-line
	const {
		loading: loadingCtaPurchaseHistorySave,
		success: successCtaPurchaseHistorySave,
		error: errorCtaPurchaseHistorySave,
	} = ctaPurchaseHistorySave;

	//eslint-disable-next-line
	const {userDashboard, loading, error} = userDashboardDetails;
	const dispatch = useDispatch();
	// console.log(Math.max(...mainChartData.map(item=>item.count)))
	// console.log(userDashboard)
	useEffect(() => {
		try {
			userInfo?.userId && dispatch(detailsUserDashboard(userInfo?.userId));
		} catch (e) {
			console.log(e);
		}
		return () => {
			//
		};
	}, [dispatch, userInfo?.userId]);

	const convertPriceToUsd = (rate) => {
		if (rate) {
			return rate.toLocaleString("en-US", {
				currency: "USD",
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
		}
		return "0";
	};

	// add/update promise
	const saveItem = (item, id) =>
		new Promise((resolve, reject) => {
			dispatch(saveCtaFunction(item))
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					console.log("err occured" + err);
					reject(err);
				});
		});

	const addOrEdit = async (
		item,
		resetForm,
		values,
		activeStep,
		setActiveStep
	) => {
		// resetForm()
		console.log(item);
		return saveItem(item)
			.then((res) => {
				console.log(res);
				if (res?.status === true) {
					resetForm();
					setNotify({
						isOpen: true,
						message: "Submitted Successfully",
						type: "success",
					});
					setActiveStep && setActiveStep(activeStep + 1);
					delete item.id;
					setRecordForEdit({
						...values,
						id: res.data,
					});
				} else {
					setNotify({
						isOpen: true,
						message: "Submition Failed",
						type: "warning",
					});
				}
				return res;
			})
			.catch((err) => {
				console.log("err occured" + err);
			});
	};

	//add or edit function document
	const addOrEditCtaFunctionDocument = (item, resetForm) => {
		// console.log(item)
		if (item?.id && item?.file) {
			const formData = new FormData();
			formData.append("CtaFunctionId", item.id);
			formData.append("file", item.file);

			//  no update applied id send for applying condition toabove method
			dispatch(saveCtaFunctionDocument(formData)).then((res) => {
				if (res?.status === true) {
					resetForm();
					delete item["file"];

					setRecordForEdit(item);
					// setOpenPopup(false)
					if (successCtaFunctionDocumentSave) {
						setNotify({
							isOpen: true,
							message: "Submitted Successfully",
							type: "success",
						});
					}

					if (errorCtaFunctionDocumentSave) {
						setNotify({
							isOpen: true,
							message: "Submition Failed",
							type: "warning",
						});
					}
				}
			});
		}
	};

	// delete promise
	const deleteItem = (id) =>
		new Promise((resolve, reject) => {
			dispatch(deleteCtaFunctionDocument(id));
			resolve();
		});

	const onDeleteCtaFunctionDocument = (id) => {
		deleteItem(id).then(() => {
			if (successDeleteCtaFunctionDocument) {
				setNotify({
					isOpen: true,
					message: "Deleted Successfully",
					type: "success",
				});
			}
			if (errorDeleteCtaFunctionDocument) {
				setNotify({
					isOpen: true,
					message: ResponseMessage.errorDeleteMessage,
					type: "warning",
				});
			}
		});
	};

	//payment

	const handleCtaPayment = (token, item, resetActiveStep) => {
		// const tokenId = token?.id;
		// console.log(item)
		if (
			token &&
			(item?.getCtaHourlyId ||
				item?.getCtaDailyId ||
				item?.getCtaMonthlyYearlyId)
		) {
			try {
				if (item.paypal) {
					const paypalFormatPurchaseHistoryData = {
						transectionId: token?.paymentID,
						isPaid: token?.paid,
						amount: parseInt(item.rate),
						ctaFunctionId: item?.ctaFunctionId,
						paymentGateway: "paypal",
						userEmail: userInfo?.email,
					};

					var response = {
						...item,
					};

					setPaymentResponse(response);

					item.getCtaHourlyId &&
						(paypalFormatPurchaseHistoryData["ctaPackageHourlyId"] = item.id);
					item.getCtaDailyId &&
						(paypalFormatPurchaseHistoryData["ctaPackageDailyId"] = item.id);
					item.getCtaMonthlyYearlyId &&
						(paypalFormatPurchaseHistoryData["ctaPackageMonthlyYearlyId"] =
							item.id);

					item.isMonthlySubscription &&
						(paypalFormatPurchaseHistoryData["isMonthlySubscription"] =
							item.isMonthlySubscription);
					item.isYearlySubscription &&
						(paypalFormatPurchaseHistoryData["isYearlySubscription"] =
							item.isYearlySubscription);

					dispatch(
						saveCtaPurchaseHistory(paypalFormatPurchaseHistoryData)
					).then((res) => {
						if (res.status === true) {
							// stepper step auto increment
							resetActiveStep((prevActiveStep) => prevActiveStep + 1);
						}
					});
				} else {
					const formatData = {
						token: token?.id,
						amount: parseInt(item.rate),
						description: token.email,
					};

					dispatch(saveCtaPayment(formatData))
						.then((res) => {
							// console.log(res.data.id)
							if (res.status === true) {
								const formatePurchaseHistoryData = {
									transectionId: res.data.id,
									isPaid: res.data.paid,
									amount: parseInt(item.rate),
									ctaFunctionId: item?.ctaFunctionId,
									paymentGateway: "Card",
									userEmail: userInfo.email,
								};

								var response = {
									...res.data,
									...item,
								};

								setPaymentResponse(response);

								console.log("response: " + JSON.stringify(res, undefined, 2));

								// item.getCtaHourlyId && (formatePurchaseHistoryData['ctaPackageHourlyId'] = item.ctaHourId);
								// item.ctaHourly && (formatePurchaseHistoryData['ctaPackageDailyId'] = item.ctaDailyId);
								// item.ctaHourly && (formatePurchaseHistoryData['ctaPackageMonthlyYearlyId'] = item.ctaMonthlyYearlyId);

								item.getCtaHourlyId &&
									(formatePurchaseHistoryData["ctaPackageHourlyId"] = item.id);
								item.getCtaDailyId &&
									(formatePurchaseHistoryData["ctaPackageDailyId"] = item.id);
								item.getCtaMonthlyYearlyId &&
									(formatePurchaseHistoryData["ctaPackageMonthlyYearlyId"] =
										item.id);
								item.isMonthlySubscription &&
									(formatePurchaseHistoryData["isMonthlySubscription"] =
										item.isMonthlySubscription);
								item.isYearlySubscription &&
									(formatePurchaseHistoryData["isYearlySubscription"] =
										item.isYearlySubscription);

								dispatch(
									saveCtaPurchaseHistory(formatePurchaseHistoryData)
								).then((res) => {
									if (res.status === true) {
										// stepper step auto increment
										console.log("item: " + JSON.stringify(item, undefined, 2));
										resetActiveStep((prevActiveStep) => prevActiveStep + 1);
									}
								});
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handelCtaPaymentStripe = (
		intentObj,
		paymentMethodObj,
		item,
		consultationObj,
		setActiveStep
	) => {
		console.log("intentObj: " + JSON.stringify(intentObj, undefined, 4));
		console.log(
			"paymentMethodObj: " + JSON.stringify(paymentMethodObj, undefined, 4)
		);
		console.log("item: " + JSON.stringify(item, undefined, 4));
		console.log(
			"consultationObj" + JSON.stringify(consultationObj, undefined, 4)
		);

		const formatePurchaseHistoryData = {
			transectionId: intentObj?.id,
			isPaid: intentObj?.status === "succeeded",
			amount: parseInt(item.rate),
			ctaFunctionId: item?.ctaFunctionId,
			paymentGateway: "Card",
			userEmail: userInfo.email,
		};

		var response = {
			Paid: intentObj?.status === "succeeded",
			Last4: paymentMethodObj?.card?.last4,
			BalanceTransaction: intentObj?.id,
			Brand: paymentMethodObj?.card.brand,
			PaidAmount: (item?.rate ? item?.rate : 0).toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
			...item,
		};

		setPaymentResponse(response);

		console.log("response: " + JSON.stringify(response, undefined, 4));

		item.getCtaHourlyId &&
			(formatePurchaseHistoryData["ctaPackageHourlyId"] = item.id);
		item.getCtaDailyId &&
			(formatePurchaseHistoryData["ctaPackageDailyId"] = item.id);
		item.getCtaMonthlyYearlyId &&
			(formatePurchaseHistoryData["ctaPackageMonthlyYearlyId"] = item.id);
		item.isMonthlySubscription &&
			(formatePurchaseHistoryData["isMonthlySubscription"] =
				item.isMonthlySubscription);
		item.isYearlySubscription &&
			(formatePurchaseHistoryData["isYearlySubscription"] =
				item.isYearlySubscription);

		dispatch(saveCtaPurchaseHistory(formatePurchaseHistoryData)).then((res) => {
			if (res.status === true) {
				// stepper step auto increment
				// console.log("item: " + JSON.stringify(item, undefined, 2));
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
			}
		});
	};

	const handelStripeSubscription = (
		paymentIntent,
		subscriptionId,
		item,
		consultationObj,
		setActiveStep
	) => {
		console.log(
			"paymentIntent: " + JSON.stringify(paymentIntent, undefined, 4)
		);
		console.log(
			"subscriptionId: " + JSON.stringify(subscriptionId, undefined, 4)
		);
		console.log("item: " + JSON.stringify(item, undefined, 4));
		console.log(
			"consultationObj" + JSON.stringify(consultationObj, undefined, 4)
		);

		const formatePurchaseHistoryData = {
			transectionId: paymentIntent?.id,
			isPaid: paymentIntent?.status === "succeeded",
			amount: parseInt(item.rate),
			ctaFunctionId: item?.ctaFunctionId,
			paymentGateway: "Card",
			userEmail: userInfo.email,
			SubscriptionId: subscriptionId,
		};

		var response = {
			Paid: paymentIntent?.status === "succeeded",
			Last4: "",
			BalanceTransaction: paymentIntent?.id,
			Brand: "",
			PaymentMethod: "Card",
			PaidAmount: (item?.rate ? item?.rate : 0).toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
			subscriptionId: subscriptionId,
			...item,
		};

		setPaymentResponse(response);

		console.log("response: " + JSON.stringify(response, undefined, 4));

		item.getCtaHourlyId &&
			(formatePurchaseHistoryData["ctaPackageHourlyId"] = item.id);
		item.getCtaDailyId &&
			(formatePurchaseHistoryData["ctaPackageDailyId"] = item.id);
		item.getCtaMonthlyYearlyId &&
			(formatePurchaseHistoryData["ctaPackageMonthlyYearlyId"] = item.id);
		item.isMonthlySubscription &&
			(formatePurchaseHistoryData["isMonthlySubscription"] =
				item.isMonthlySubscription);
		item.isYearlySubscription &&
			(formatePurchaseHistoryData["isYearlySubscription"] =
				item.isYearlySubscription);

		dispatch(saveCtaPurchaseHistory(formatePurchaseHistoryData)).then((res) => {
			if (res.status === true) {
				// stepper step auto increment
				console.log("item: " + JSON.stringify(item, undefined, 2));
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
			}
		});
	};

	const handelPaypalSubscription = (
		subscriptionResult,
		item,
		consultationObj,
		setActiveStep
	) => {
		console.log(
			"paymentIntent: " + JSON.stringify(subscriptionResult, undefined, 4)
		);
		console.log("item: " + JSON.stringify(item, undefined, 4));
		console.log(
			"consultationObj" + JSON.stringify(consultationObj, undefined, 4)
		);

		const formatePurchaseHistoryData = {
			transectionId: subscriptionResult?.orderID,
			isPaid: true,
			amount: parseInt(item.rate),
			ctaFunctionId: item?.ctaFunctionId,
			paymentGateway: "paypal",
			userEmail: userInfo.email,
			SubscriptionId: subscriptionResult?.subscriptionID,
		};

		var response = {
			Paid: true,
			Last4: "",
			BalanceTransaction: subscriptionResult?.orderID,
			Brand: "",
			PaymentMethod: "PayPal",
			PaidAmount: (item?.rate ? item?.rate : 0).toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			}),
			subscriptionId: subscriptionResult?.subscriptionID,
			...item,
		};

		setPaymentResponse(response);

		console.log("response: " + JSON.stringify(response, undefined, 4));

		item.getCtaHourlyId &&
			(formatePurchaseHistoryData["ctaPackageHourlyId"] = item.id);
		item.getCtaDailyId &&
			(formatePurchaseHistoryData["ctaPackageDailyId"] = item.id);
		item.getCtaMonthlyYearlyId &&
			(formatePurchaseHistoryData["ctaPackageMonthlyYearlyId"] = item.id);
		item.isMonthlySubscription &&
			(formatePurchaseHistoryData["isMonthlySubscription"] =
				item.isMonthlySubscription);
		item.isYearlySubscription &&
			(formatePurchaseHistoryData["isYearlySubscription"] =
				item.isYearlySubscription);

		console.log(
			"formatePurchaseHistoryData" +
				JSON.stringify(formatePurchaseHistoryData, undefined, 4)
		);

		// setActiveStep((prevActiveStep) => prevActiveStep + 1);

		dispatch(saveCtaPurchaseHistory(formatePurchaseHistoryData)).then((res) => {
			if (res.status === true) {
				// stepper step auto increment
				console.log("item: " + JSON.stringify(item, undefined, 2));
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
			}
		});
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<PageTitle title="Dashboard" />
						</Grid>
						<Grid item xs={8}>
							{!isAdminUser() && (
								<>
									<Box
										display="flex"
										justifyContent="flex-end"
										alignItems="center"
										height="100%"
									>
										<Controls.Button
											text="purchase Consultation"
											onClick={() => {
												setPurchase(true);
												setOpenPopup(false);
											}}
										/>

										<Controls.Button
											text="Schedule a consult"
											onClick={() => {
												setOpenPopup(true);
												setPurchase(false);
											}}
										/>
									</Box>
								</>
							)}
						</Grid>
					</Grid>
					{/* <PurchaseConsultancy setPurchase={setPurchase}></PurchaseConsultancy> */}
					{purchase ? (
						<PurchaseConsultancy
							purchase={purchase}
							setPurchase={setPurchase}
						></PurchaseConsultancy>
					) : (
						<>
							{!openPopup ? (
								<Grid container spacing={4}>
									<Grid item lg={4} md={6} sm={6} xs={12}>
										<Widget
											title="Course Purchase"
											upperTitle
											bodyClass={classes.fullHeightBody}
											className={classes.card}
											disableWidgetMenu
										>
											<div className={classes.visitsNumberContainer}>
												<Grid container item alignItems={"center"}>
													<Grid item xs={6}>
														<Typography size="xl" weight="medium" noWrap>
															{userDashboard?.coursePurchase}
														</Typography>
													</Grid>
													<Grid item xs={6}>
														<Avatar
															className={classnames(
																classes.secondary,
																classes.avatarPosition
															)}
															variant="rounded"
														>
															<ReceiptIcon />
														</Avatar>
													</Grid>
												</Grid>
											</div>
										</Widget>
									</Grid>
									<Grid item lg={4} md={6} sm={6} xs={12}>
										<Widget
											title="Total Cta Requests"
											upperTitle
											bodyClass={classes.fullHeightBody}
											className={classes.card}
											disableWidgetMenu
										>
											<div className={classes.visitsNumberContainer}>
												<Grid container item alignItems={"center"}>
													<Grid item xs={6}>
														<Typography size="xl" weight="medium" noWrap>
															{userDashboard?.totalCtaRequest}
														</Typography>
													</Grid>
													<Grid item xs={6}>
														<Avatar
															className={classnames(
																classes.warning,
																classes.avatarPosition
															)}
															variant="rounded"
														>
															<ReplyAllIcon />
														</Avatar>
													</Grid>
												</Grid>
											</div>
										</Widget>
									</Grid>
									<Grid item lg={4} md={6} sm={6} xs={12}>
										<Widget
											title="Today Cta Requests"
											upperTitle
											bodyClass={classes.fullHeightBody}
											className={classes.card}
											disableWidgetMenu
										>
											<div className={classes.visitsNumberContainer}>
												<Grid container item alignItems={"center"}>
													<Grid item xs={6}>
														<Typography size="xl" weight="medium" noWrap>
															{userDashboard?.todayCtaRequest}
														</Typography>
													</Grid>
													<Grid item xs={6}>
														<Avatar
															className={classnames(
																classes.info,
																classes.avatarPosition
															)}
															variant="rounded"
														>
															<ReplyIcon />
														</Avatar>
													</Grid>
												</Grid>
											</div>
										</Widget>
									</Grid>
									<Grid item lg={4} md={6} sm={6} xs={12}>
										<Widget
											title="Total Payment"
											upperTitle
											bodyClass={classes.fullHeightBody}
											className={classes.card}
											disableWidgetMenu
										>
											<div className={classes.visitsNumberContainer}>
												<Grid container item alignItems={"center"}>
													<Grid item xs={6}>
														<Typography size="xl" weight="medium" noWrap>
															$ {convertPriceToUsd(userDashboard?.totalPayment)}
														</Typography>
													</Grid>
													<Grid item xs={6}>
														<Avatar
															className={classnames(
																classes.primary,
																classes.avatarPosition
															)}
															variant="rounded"
														>
															<PaymentIcon />
														</Avatar>
													</Grid>
												</Grid>
											</div>
										</Widget>
									</Grid>
									<Grid item lg={4} md={6} sm={6} xs={12}>
										<Widget
											title="Today Payment"
											upperTitle
											bodyClass={classes.fullHeightBody}
											className={classes.card}
											disableWidgetMenu
										>
											<div className={classes.visitsNumberContainer}>
												<Grid container item alignItems={"center"}>
													<Grid item xs={6}>
														<Typography size="xl" weight="medium" noWrap>
															$ {convertPriceToUsd(userDashboard?.todayPayment)}
														</Typography>
													</Grid>
													<Grid item xs={6}>
														<Avatar
															className={classnames(
																classes.secondary,
																classes.avatarPosition
															)}
															variant="rounded"
														>
															<AttachMoneyIcon />
														</Avatar>
													</Grid>
												</Grid>
											</div>
										</Widget>
									</Grid>
								</Grid>
							) : (
								<Grid container spacing={4}>
									<Grid item xs={12}>
										<Widget
											title="Schedule a consult"
											upperTitle
											disableWidgetMenu
											closePopup={() => {
												setOpenPopup(false);
											}}
										>
											<CtaFunctionForm
												recordForEdit={recordForEdit}
												addOrEdit={addOrEdit}
												addOrEditCtaFunctionDocument={
													addOrEditCtaFunctionDocument
												}
												setOpenPopup={setOpenPopup}
												ctaFunctionSaveData={ctaFunctionSaveData}
												setConfirmDialog={setConfirmDialog}
												onDeleteCtaFunctionDocument={
													onDeleteCtaFunctionDocument
												}
												loadingDeleteCtaFunctionDocument={
													loadingDeleteCtaFunctionDocument
												}
												loadingCtaFunctionDocumentSave={
													loadingCtaFunctionDocumentSave
												}
												loadingCtaFunctionSave={loadingCtaFunctionSave}
												handleCtaPayment={handleCtaPayment}
												loadingCtaPaymentSave={loadingCtaPaymentSave}
												successCtaPaymentSave={successCtaPaymentSave}
												loadingCtaPurchaseHistorySave={
													loadingCtaPurchaseHistorySave
												}
												successCtaPurchaseHistorySave={
													successCtaPurchaseHistorySave
												}
												paymentResponse={paymentResponse}
												handelCtaPaymentStripe={handelCtaPaymentStripe}
												handelStripeSubscription={handelStripeSubscription}
												handelPaypalSubscription={handelPaypalSubscription}
											/>
										</Widget>
									</Grid>
								</Grid>
							)}
						</>
					)}
				</>
			)}
		</>
	);
}
