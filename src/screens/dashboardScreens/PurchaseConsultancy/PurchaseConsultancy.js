import {Grid} from "@material-ui/core";
// import { Box } from '@mui/system';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import InputSharpIcon from "@material-ui/icons/InputSharp";
import {makeStyles} from "@material-ui/styles";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Loading from "../../../components/Loading/Loading";
import PopOver from "../../../components/PopOver/PopOver";
import {Form, useForm} from "../../../components/UseForm/useForm";
import useTab from "../../../components/UseTab/useTab";
import Widget from "../../../components/Widget/Widget";
import {config} from "../../../config";
import PaymentPurchaseConsultancy from "./PaymentPurchaseConsultancy";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(0),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	button: {
		margin: theme.spacing(1),
		background: "#666",
		textTransform: "none",
		fontSize: 16,
		border: "none",
		borderRadius: 0,
		// padding:10,
		"&:hover": {
			background: "#282828",
		},
	},
	ctaHourName: {
		color: "#9999a5",
		fontSize: "18px",
		textTransform: "uppercase",
	},
	subText: {
		fontSize: "16px",
		padding: 10,
	},
	validity: {
		color: "#666",
		display: "inline-block",
		fontSize: "40px",
		fontWeight: "normal",
		lineHeight: "normal",
	},
	tabs: {
		"& .MuiTabs-indicator": {
			backgroundColor: "none",
			height: 0,
		},
		"& .MuiTab-root.Mui-selected": {
			color: "#fff",
			backgroundColor: "#09a2ad",
		},
	},
}));

const initialFValues = {
	id: "",
	subMenuId: null,
	name: "",
	firstName: "",
	lastName: "",
	companyName: "",
	email: "",
	phone: "",
	tellUsMore: null,
	estimation: new Date(),
	description: null,
	companyTypeId: null,
	companySizeId: null,
	ctaDocuments: [],
	solutionSpecificity: null,
	serviceSpecificity: null,
	technologyPreference: null,
	goalsToAchieveSolution: "",
	goalsToAchieveService: "",
	goalsToAchieveTechnology: "",
};

// const PurchaseConsultancy = (props) => {
//     const {setPurchase} = props;
//     return (
// <>
//     <Grid container spacing={4}>
//         <Grid item xs={12}>
//             <Widget
//                 title="Purchase Consultancy"
//                 upperTitle
//                 // noBodyPadding
//                 disableWidgetMenu
//                 closePopup={() => {
//                     setPurchase(false);
//                 }}
//             >
//             </Widget>
//         </Grid>
//     </Grid>

//     <Grid container spacing={4}>
//         <Grid item xs={12}>

//         </Grid>
//     </Grid>

// </>
//     );
// };

// export default PurchaseConsultancy;

// useEffect(() => {
// 	try {
// 		if (recordForEdit != null) {
// 			setValues({
// 				...recordForEdit,
// 			});
// 		}

// 		if (ctaFunctionId) {
// 			dispatch(detailsCtaFunction(ctaFunctionId));
// 			dispatch(listCtaFunctionDocuments(ctaFunctionId));
// 		}
// 		if (!ctaFunctionModels?.id) {
// 			dispatch(listCtaFunctionModels());
// 			dispatch(listCtaPackageHourlys());
// 			dispatch(listCtaPackageDailys());
// 			dispatch(listCtaPackageMonthlyYearlys());
// 		}
// 		if (values?.id) {
// 			dispatch(listCtaFunctionDocuments(values?.id));
// 		}
// 	} catch (e) {
// 		console.log(e);
// 	}
// 	//eslint-disable-next-line
// }, [
// 	recordForEdit,
// 	setValues,
// 	ctaFunctionId,
// 	dispatch,
// 	values?.id,
// 	loadingCtaFunctionDocumentSave,
// 	loadingDeleteCtaFunctionDocument,
// 	ctaFunctionModels?.id,
// 	// successCtaPurchaseHistorySave
// 	// loadingCtaFunctionSave
// ]);

export default function PurchaseConsultancy(props) {
	const BASE_API_URL = config.BASE_API_URL;

	const [hideNext, setHideNext] = useState(false);
	const [createOrder, setCreateOrder] = useState({});
	const [activeStep, setActiveStep] = useState(0);

	const userSignIn = useSelector((state) => state.userSignin);

	const {userInfo} = userSignIn;
	console.log("userInfo", userInfo);

	const userData = {
		name: userInfo?.name,
		firstName: userInfo?.firstName,
		lastName: userInfo?.lastName,
		companyName: userInfo?.businessName,
		email: userInfo?.email,
		phone: userInfo?.mobile,
		businessIndustry: userInfo?.businessIndustry,
		companyTypeId: userInfo?.companyTypeId,
		companySizeId: userInfo?.companySizeId,
	};

	const [ctaPackageHourlys, setCtaPackageHourlys] = useState([]);
	const [ctaPackageDailys, setCtaPackageDailys] = useState([]);
	const [ctaPackageMonthlyYearlys, setCtaPackageMonthlyYearlys] = useState([]);
	const [loading, setLoading] = useState([]);
	const [paymentScreen, setPaymentScreen] = useState(false);
	const [values, setValues] = useState({});

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${BASE_API_URL}/CtaPackageMonthlyYearly/searchAll`)
			.then((res) => {
				setLoading(false);
				setCtaPackageMonthlyYearlys(res.data.data.item1);
			});

		setLoading(true);
		axios.get(`${BASE_API_URL}/CtaPackageHourly/searchAll`).then((res) => {
			setLoading(false);
			setCtaPackageHourlys(res.data.data.item1);
		});

		setLoading(true);
		axios.get(`${BASE_API_URL}/CtaPackageDaily/searchAll`).then((res) => {
			setLoading(false);
			setCtaPackageDailys(res.data.data.item1);
		});
	}, [props.purchase]);

	const filteredCtaPackageHourlys = ctaPackageHourlys?.filter(
		(item) => item.companyTypeId === userInfo?.companyTypeId
	);

	const filteredCtaPackageDailys = ctaPackageDailys?.filter(
		(item) => item.companyTypeId === userInfo?.companyTypeId
	);

	const filteredCtaPackageMonthlyYearlys = ctaPackageMonthlyYearlys?.filter(
		(item) => item.companyTypeId === userInfo?.companyTypeId
	);

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

	const ctaFunctionSave = useSelector((state) => state.ctaFunctionSave);
	//eslint-disable-next-line
	const {
		loading: loadingCtaFunctionSave,
		success: successCtaFunctionSave,
		error: errorCtaFunctionSave,
		ctaFunction: ctaFunctionSaveData,
	} = ctaFunctionSave;

	const validate = (fieldValues = values) => {
		let temp = {...errors};

		if (activeStep === 0) {
			if ("solutionSpecificity" in fieldValues)
				temp.solutionSpecificity = fieldValues.solutionSpecificity
					? ""
					: "This field is required.";
			if ("goalsToAchieveSolution" in fieldValues)
				temp.goalsToAchieveSolution = fieldValues.goalsToAchieveSolution
					? ""
					: "This field is required.";
			if ("serviceSpecificity" in fieldValues)
				temp.serviceSpecificity = fieldValues.serviceSpecificity
					? ""
					: "This field is required.";
			if ("goalsToAchieveService" in fieldValues)
				temp.goalsToAchieveService = fieldValues.goalsToAchieveService
					? ""
					: "This field is required.";
			if ("technologyPreference" in fieldValues)
				temp.technologyPreference = fieldValues.technologyPreference
					? ""
					: "This field is required.";
			if ("goalsToAchieveTechnology" in fieldValues)
				temp.goalsToAchieveTechnology = fieldValues.goalsToAchieveTechnology
					? ""
					: "This field is required.";
		}
		if (activeStep === 1) {
			if ("estimation" in fieldValues)
				temp.estimation = fieldValues.estimation
					? ""
					: "This field is required.";
			if ("tellUsMore" in fieldValues)
				temp.tellUsMore = fieldValues.tellUsMore
					? ""
					: "This field is required.";
			if ("description" in fieldValues)
				temp.description = fieldValues.description
					? ""
					: "This field is required.";
		}

		setErrors({
			...temp,
		});
		if (fieldValues === values)
			return Object.values(temp).every((x) => x === "");
	};

	const {
		errors,
		setErrors,
		handleInputChange,
		resetForm,
		handleMultipleSelectInputChange,
		handleFileChange,
		resetFileInput,
		handleDateInput,
	} = useForm({...initialFValues, ...userData}, true, validate);

	const ctaFunctionDetails = useSelector((state) => state.ctaFunctionDetails);
	//eslint-disable-next-line
	const {
		ctaFunction,
		loading: loadingCtaFunction,
		error: errorCtaFunction,
	} = ctaFunctionDetails;

	const classes = useStyles();
	// Tab
	const {
		Tab,
		AppBar,
		Tabs,
		TabPanel,
		value,
		TabLayout,
		handleTabChange,
		a11yPropsFullwidth,
	} = useTab();

	// useEffect(() => {
	// 	setHideNext(true);

	// 	if (ctaFunction != null) {
	// 		try {
	// 			setValues({
	// 				...ctaFunction,
	// 			});
	// 		} catch (e) {
	// 			console.warn(e);
	// 		}
	// 	}
	// }, [ctaFunction, setValues, setHideNext]);

	const cnvertPricetoUsd = (rate) => {
		return rate.toLocaleString("en-US", {
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const renderHourlySubtitle1 = (companyTypeId) => {
		switch (companyTypeId) {
			case 1:
				return "Tailored business technology";
			case 2:
				return "Business-enabling technology";
			case 3:
				return "Tech solutions to support online businesses";
			case 4:
				return "Enterprise technology solutions";
			default:
				return "";
		}
	};

	const renderSolutionDiscoverySubtitle1 = (companyTypeId) => {
		switch (companyTypeId) {
			case 1:
				return "Receive a solutions document with tailored enterprise tech solutions";
			case 2:
				return "Receive a solutions document to grow your startup";
			case 3:
				return "Receive a solutions document tailored to grow your online store";
			case 4:
				return "Receive a solutions document with tailored enterprise tech solutions";
			default:
				return "";
		}
	};

	const columnCount = (itemcount) => {
		if (itemcount) {
			// alert(itemcount);
			switch (itemcount) {
				case 3:
					return 4;
				case 4:
					return 3;
				default:
					return 3;
			}
		}
	};

	const handleNextToPaymentScreen = (order) => {
		setCreateOrder(order);

		const data = {
			id: 0,
			firstName: userInfo?.firstName,
			lastName: userInfo?.lastName,
			companyName: userInfo?.businessName,
			email: userInfo?.email,
			phone: userInfo?.mobile,
			companyTypeId: userInfo?.companyTypeId,
			companySizeId: userInfo?.companySizeId,
		};
		axios
			.post(`${BASE_API_URL}/CtaFunction`, data, {
				headers: {Authorization: `Bearer ${userInfo?.token}`},
			})
			.then((res) => {
				console.log("data");
				console.log(res);
				if (res.data?.status) {
					setValues({
						...data,
						id: res.data?.data,
					});
					setPaymentScreen(true);
				}
			});
	};

	return (
		<>
			<>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<Widget
							title="Purchase Consultancy"
							upperTitle
							disableWidgetMenu
							closePopup={() => {
								props.setPurchase(false);
							}}
						>
							{!paymentScreen ? (
								<Form>
									<TabLayout>
										<AppBar position="static" color="default">
											<Tabs
												value={value}
												onChange={handleTabChange}
												variant="fullWidth" //"standard" or "scrollable" or "fullWidth"
												scrollButtons="on"
												// indicatorColor="primary"
												className={classes.tabs}
												// textColor="primary"
												aria-label="scrollable force tabs example"
												centered={true}
											>
												<Tab
													label="Hourly Support"
													{...a11yPropsFullwidth(0)}
												/>
												<Tab
													label="Solutions Discovery"
													{...a11yPropsFullwidth(1)}
												/>
												<Tab label="Concierge" {...a11yPropsFullwidth(2)} />
											</Tabs>
										</AppBar>
										{/* ==== payment package Lists =====*/}
										<TabPanel value={value} index={0}>
											{loading ? (
												<Loading></Loading>
											) : (
												<>
													{filteredCtaPackageHourlys?.length > 0 ? (
														<div className={classes.root}>
															<Grid container spacing={1}>
																<Grid container item md={12} spacing={3}>
																	{filteredCtaPackageHourlys?.map(
																		(item) =>
																			item.id && (
																				<Grid
																					item
																					md={columnCount(
																						filteredCtaPackageHourlys.length
																					)}
																					xs={12}
																					key={item.id}
																				>
																					<Paper className={classes.paper}>
																						<div className="pricingTable">
																							<div className="pricingTable-header">
																								<Typography
																									variant="subtitle1"
																									className={
																										classes.ctaHourName
																									}
																								>
																									{item?.ctaHourName}
																								</Typography>
																							</div>
																							<Typography
																								variant="subtitle1"
																								className={classes.subText}
																							>
																								On-demand, hourly consulting
																							</Typography>
																							<Typography
																								variant="subtitle1"
																								className={classes.subText}
																							>
																								{renderHourlySubtitle1(
																									item?.companyTypeId
																								)}
																							</Typography>
																							<div className="price-value">
																								<Typography
																									variant="subtitle1"
																									className={classes.subText}
																								>
																									Price
																								</Typography>
																								<sup>
																									<AttachMoneyIcon
																										style={{fontSize: 30}}
																									/>
																								</sup>
																								<Typography
																									variant="subtitle1"
																									className={classes.validity}
																								>
																									{cnvertPricetoUsd(item?.rate)}
																								</Typography>
																							</div>

																							<div className="price-value">
																								<Typography
																									variant="subtitle1"
																									className={classes.subText}
																								>
																									Validity
																								</Typography>
																								<Typography
																									variant="subtitle1"
																									className={classes.validity}
																								>
																									{item?.validity}
																								</Typography>
																								<Typography
																									variant="subtitle1"
																									className={classes.subText}
																									style={{fontStyle: "italic"}}
																								>
																									days
																								</Typography>
																							</div>
																							<div className="pricingTable-sign-up">
																								<Button
																									variant="contained"
																									color="primary"
																									className={classes.button}
																									endIcon={
																										<InputSharpIcon>
																											Purchase
																										</InputSharpIcon>
																									}
																									size="large"
																									onClick={() =>
																										handleNextToPaymentScreen({
																											...item,
																											ctaFunctionId: values?.id,
																											getCtaHourlyId: item.id,
																											consultingType:
																												"Hourly Support",
																											isSubscription: false,
																											validityTime:
																												item?.validity +
																												" Days",
																										})
																									}
																								>
																									Purchase
																								</Button>
																							</div>
																						</div>
																					</Paper>
																				</Grid>
																			)
																	)}
																</Grid>
															</Grid>
														</div>
													) : (
														"No data found"
													)}
												</>
											)}
										</TabPanel>

										{/*----------- solution discovery ---------- */}
										<TabPanel value={value} index={1}>
											{filteredCtaPackageDailys?.length > 0 ? (
												<div className={classes.root}>
													{/* <pre>{JSON.stringify(ctaPackageDailys, undefined, 4)}</pre> */}
													<Grid container spacing={1}>
														<Grid container item md={12} spacing={3}>
															{filteredCtaPackageDailys?.map((item) => (
																<Grid
																	item
																	md={columnCount(
																		filteredCtaPackageDailys.length
																	)}
																	xs={12}
																	key={item.id}
																>
																	<Paper className={classes.paper}>
																		<div className="pricingTable">
																			<div className="pricingTable-header">
																				<Typography
																					variant="subtitle1"
																					className={classes.ctaHourName}
																				>
																					{item?.submenuName}
																				</Typography>
																			</div>
																			<Typography
																				variant="subtitle1"
																				className={classes.subText}
																			>
																				One-day discovery workshop
																			</Typography>
																			<Typography
																				variant="subtitle1"
																				className={classes.subText}
																			>
																				{renderSolutionDiscoverySubtitle1(
																					item?.companyTypeId
																				)}
																			</Typography>
																			<div className="price-value">
																				<Typography
																					variant="subtitle1"
																					className={classes.subText}
																				>
																					Price
																				</Typography>
																				<sup>
																					<AttachMoneyIcon
																						style={{fontSize: 30}}
																					/>
																				</sup>
																				<Typography
																					variant="subtitle1"
																					className={classes.validity}
																				>
																					{cnvertPricetoUsd(item?.rate)}
																					{/* {item?.rate} */}
																				</Typography>
																			</div>

																			<div className="price-value">
																				<Typography
																					variant="subtitle1"
																					className={classes.subText}
																					style={{fontStyle: "italic"}}
																				>
																					per workshop
																				</Typography>
																			</div>
																			<div className="pricingTable-sign-up">
																				<Button
																					variant="contained"
																					color="primary"
																					className={classes.button}
																					endIcon={
																						<InputSharpIcon>
																							Purchase
																						</InputSharpIcon>
																					}
																					size="large"
																					onClick={() =>
																						handleNextToPaymentScreen({
																							...item,
																							ctaFunctionId: values?.id,
																							getCtaDailyId: item.id,
																							consultingType:
																								"Solutions Discovery",
																							validity: 0,
																							isSubscription: false,
																						})
																					}
																				>
																					Purchase
																				</Button>
																			</div>
																		</div>
																	</Paper>
																</Grid>
															))}
														</Grid>
													</Grid>
												</div>
											) : (
												"No data found"
											)}
										</TabPanel>
										{/* concireage */}
										<TabPanel value={value} index={2}>
											{filteredCtaPackageMonthlyYearlys?.length > 0 ? (
												<div className={classes.root}>
													{/* <pre>
                                                    {JSON.stringify(ctaPackageMonthlyYearlys, undefined, 4)}
                                                </pre> */}
													<Grid container spacing={1}>
														<Grid container item md={12} spacing={3}>
															{filteredCtaPackageMonthlyYearlys?.map((item) => (
																<Grid
																	item
																	md={columnCount(
																		filteredCtaPackageMonthlyYearlys.length
																	)}
																	xs={12}
																	key={item.id}
																>
																	<Paper className={classes.paper}>
																		<div className="pricingTable">
																			<div className="pricingTable-header">
																				<Typography
																					variant="subtitle1"
																					className={classes.ctaHourName}
																				>
																					{item?.submenuName}
																				</Typography>
																			</div>
																			{/* <Typography
                                                                            variant="subtitle1"
                                                                            className={classes.subText}
                                                                        >
                                                                            One-day Workshop
                                                                        </Typography> */}
																			<Typography
																				variant="subtitle1"
																				className={classes.subText}
																			>
																				Receive on-demand, white-glove
																				consulting services for a monthly fee
																			</Typography>
																			<div className="price-value">
																				<Typography
																					variant="subtitle1"
																					className={classes.subText}
																				>
																					Price
																				</Typography>
																				<sup>
																					<AttachMoneyIcon
																						style={{fontSize: 30}}
																					/>
																				</sup>
																				<Typography
																					variant="subtitle1"
																					className={classes.validity}
																				>
																					{cnvertPricetoUsd(item?.monthlyRate)}
																					{/* {item?.monthlyRate} */}
																				</Typography>
																				<Typography
																					variant="subtitle1"
																					className={classes.subText}
																					style={{fontStyle: "italic"}}
																				>
																					per month
																				</Typography>
																			</div>

																			<div className="price-value">
																				<sup>
																					<AttachMoneyIcon
																						style={{fontSize: 30}}
																					/>
																				</sup>
																				<Typography
																					variant="subtitle1"
																					className={classes.validity}
																				>
																					{cnvertPricetoUsd(item?.yearlyRate)}
																					{/* {item?.yearlyRate} */}
																				</Typography>
																				<Typography
																					variant="subtitle1"
																					className={classes.subText}
																					style={{fontStyle: "italic"}}
																				>
																					per year
																				</Typography>
																			</div>

																			<div className="notes">
																				<ul>
																					<li className="list-group-item">
																						Each call: 30 min (max)
																					</li>
																					<li className="list-group-item">
																						Monthly Limit: 3 hours (max)
																					</li>
																				</ul>
																			</div>
																			<div className="pricingTable-sign-up">
																				<PopOver
																					variant="contained"
																					color="primary"
																					className={classes.button}
																					endIcon={
																						<InputSharpIcon>
																							Purchase
																						</InputSharpIcon>
																					}
																					size="large"
																				>
																					<Button
																						variant="contained"
																						color="primary"
																						className={classes.button}
																						endIcon={
																							<InputSharpIcon>
																								Monthly
																							</InputSharpIcon>
																						}
																						size="small"
																						onClick={() =>
																							handleNextToPaymentScreen({
																								...item,
																								rate: item.monthlyRate,
																								ctaFunctionId: values?.id,
																								isMonthlySubscription: true,
																								getCtaMonthlyYearlyId: item.id,
																								consultingType: "Concierge",
																								subscriptionType: "Monthly",
																								isSubscription: true,
																								stripePriceId:
																									item.monthlyPriceId,
																								paypalPlanId:
																									item.paypalMonthlyPlanId,
																							})
																						}
																					>
																						Monthly
																					</Button>
																					<Button
																						variant="contained"
																						color="primary"
																						className={classes.button}
																						endIcon={
																							<InputSharpIcon>
																								Yearly
																							</InputSharpIcon>
																						}
																						size="small"
																						onClick={() =>
																							handleNextToPaymentScreen({
																								...item,
																								rate: item.yearlyRate,
																								ctaFunctionId: values?.id,
																								isYearlySubscription: true,
																								getCtaMonthlyYearlyId: item.id,
																								consultingType: "Concierge",
																								subscriptionType: "Yearly",
																								isSubscription: true,
																								stripePriceId:
																									item.yearlyPriceId,
																								paypalPlanId:
																									item.paypalYearlyPlanId,
																							})
																						}
																					>
																						Yearly
																					</Button>
																				</PopOver>
																			</div>
																		</div>
																	</Paper>
																</Grid>
															))}
														</Grid>
													</Grid>
												</div>
											) : (
												"No data found"
											)}
										</TabPanel>
									</TabLayout>
								</Form>
							) : (
								<PaymentPurchaseConsultancy
									values={values}
									createOrder={createOrder}
									closePurchaseScreen={props.setPurchase}
								/>
							)}
						</Widget>
					</Grid>
				</Grid>
				{/* <Grid container spacing={4}>
					<Grid item xs={12}>
						<Box my={2}></Box>
					</Grid>
				</Grid> */}
			</>
		</>
	);
}
