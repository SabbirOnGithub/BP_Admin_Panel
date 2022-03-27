import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { useDispatch, useSelector } from "react-redux";
import PaymentSuccessDialog from "../../../components/SuccessDialog/PaymentSuccessDialog";
import { Form } from "../../../components/UseForm/useForm";
import { config } from "../../../config";
import { saveCtaPayment } from "../../../redux/actions/ctaPaymentActions";
import { saveCtaPurchaseHistory } from "../../../redux/actions/ctaPurchaseHistoryActions";
import StripeCardForm from "./StripeCardForm";
import StripeSubscriptionForm from "./StripeSubscriptionForm";

// const REACT_APP_STRIPE_KEY = config.REACT_APP_STRIPE_KEY
const {
	REACT_APP_STRIPE_KEY,
	REACT_APP_PAYPAL_SANDBOX_APP_ID,
	REACT_APP_PAYPAL_PRODUCTION_APP_ID,
	REACT_APP_PAYPAL_ENV,
} = config;

const stripePromise = loadStripe(REACT_APP_STRIPE_KEY);
const paypalKey = REACT_APP_PAYPAL_SANDBOX_APP_ID;

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
		minWidth: "245px",
		border: "none",
		fontStyle: "14px",
		// borderRadius: '4px',
		borderRadius: "20px",
		margin: theme.spacing(1),
		marginBottom: theme.spacing(3),
		// background: '#32325d',
		background: "#0096ff",
		textTransform: "none",
		fontSize: 12,
		// padding:10,
		"&:hover": {
			background: "#09a2ad",
		},
		// '& span':{
		// },
		color: "#000 !important",
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
	paymentArea: {
		display: "flex",
		justifyContent: "space-around",
		flexWrap: "wrap",
		flexDirection: "column",
		alignItems: "center",
	},
}));

const stylePaypal = {
	label: "pay",
	tagline: false,
	size: "large",
	shape: "rect",
	color: "blue",
};
export default function PaymentPurchaseConsultancy(props) {
	const [paymentResponse, setPaymentResponse] = useState({});
	const [activeStep, setActiveStep] = useState(0);
	const [hideNext, setHideNext] = useState(false);
	const dispatch = useDispatch();
	const [paymeneSuccess, setPaymeneSuccess] = useState(false);

	const {values, createOrder, closePurchaseScreen} = props;

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
			paymentGateway: "stripe",
			userEmail: userInfo.email,
			SubscriptionId: subscriptionId,
		};

		var response = {
			Paid: paymentIntent?.status === "succeeded",
			Last4: "",
			BalanceTransaction: paymentIntent?.id,
			Brand: "",
			PaymentMethod: "Card",
			PaidAmount: (item?.rate ? item?.rate : 0)?.toLocaleString("en-US", {
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
				setPaymeneSuccess(true);
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
			PaidAmount: (item?.rate ? item?.rate : 0)?.toLocaleString("en-US", {
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
				setPaymeneSuccess(true);
			}
		});
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
			paymentGateway: "stripe",
			userEmail: userInfo.email,
		};

		var response = {
			Paid: intentObj?.status === "succeeded",
			Last4: paymentMethodObj?.card?.last4,
			BalanceTransaction: intentObj?.id,
			Brand: paymentMethodObj?.card.brand,
			PaidAmount: (item?.rate ? item?.rate : 0)?.toLocaleString("en-US", {
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
				setPaymeneSuccess(true);
			}
		});
	};

	const classes = useStyles();

	const client = {
		sandbox: REACT_APP_PAYPAL_SANDBOX_APP_ID,
		production: REACT_APP_PAYPAL_PRODUCTION_APP_ID,
	};

	const userSignIn = useSelector((state) => state.userSignin);
	const {userInfo} = userSignIn;
	const amount = (createOrder ? createOrder.rate : 0) * 100;
	const amountString = (createOrder ? createOrder.rate : 0)?.toLocaleString(
		"en-US",
		{
			style: "currency",
			currency: "USD",
		}
	);

	const paymentDesc = createOrder?.name + "   USD " + amountString;
	const paypalPlanId = createOrder?.paypalPlanId;

	const paypalSubscribe = (data, actions) => {
		return actions.subscription.create({
			plan_id: paypalPlanId,
		});
	};
	const paypalOnError = (err) => {
		console.log("Error");
	};
	const paypalOnApprove = (data, detail) => {
		// call the backend api to store transaction details

		console.log("Payapl approved");
		console.log("data: ", data);
		console.log(data.subscriptionID);
		handelPaypalSubscription(data, createOrder, values, setActiveStep);
	};

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
							setPaymeneSuccess(true);
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
									paymentGateway: "stripe",
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
										setPaymeneSuccess(true);
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

	const ctaPaymentSave = useSelector((state) => state.ctaPaymentSave);
	//eslint-disable-next-line
	const {
		loading: loadingCtaPaymentSave,
		success: successCtaPaymentSave,
		error: errorCtaPaymentSave,
	} = ctaPaymentSave;

	const ctaPurchaseHistorySave = useSelector(
		(state) => state.ctaPurchaseHistorySave
	);
	//eslint-disable-next-line
	const {
		loading: loadingCtaPurchaseHistorySave,
		success: successCtaPurchaseHistorySave,
		error: errorCtaPurchaseHistorySave,
	} = ctaPurchaseHistorySave;

	return (
		<>
		{!paymeneSuccess ? 
			<Grid container>
				<Grid item xs={6}>
					<div className="card shadow-sm checkout-details-card">
						<div className="card-body">
							<h1 style={{alignSelf: "center", textAlign: "center"}}>
								Consulting Type : {createOrder?.consultingType}
							</h1>
							<h1 style={{alignSelf: "center", textAlign: "center"}}>
								Business Type : {createOrder?.companyTypeName}
							</h1>
							<h1 style={{alignSelf: "center", textAlign: "center"}}>
								Packege Name : {createOrder?.name}
							</h1>
							{createOrder?.validityTime && (
								<h1 style={{alignSelf: "center", textAlign: "center"}}>
									Validity : {createOrder?.validityTime}
								</h1>
							)}
							{createOrder?.subscriptionType && (
								<h1 style={{alignSelf: "center", textAlign: "center"}}>
									Subscription : {createOrder?.subscriptionType}
								</h1>
							)}

							<h1 style={{alignSelf: "center", textAlign: "center"}}>
								Amount : USD {amountString}{" "}
							</h1>
							{/* <pre>
								createOrder : {JSON.stringify(createOrder, undefined, 4)}
							</pre>
							<pre>userInfo : {JSON.stringify(userInfo, undefined, 4)}</pre>
							<pre>values: {JSON.stringify(values, undefined, 4)}</pre> */}
						</div>
					</div>
				</Grid>
				<Grid item xs={6}>
					{createOrder?.isSubscription ? (
						<div style={{margin: 15}} className={classes.paymentArea}>
							<div style={{width: "100%", textAlign: "center"}}>
								<PayPalButton
									amount={amount}
									currency="USD"
									createSubscription={(data, details) =>
										paypalSubscribe(data, details)
									}
									onApprove={(data, details) => paypalOnApprove(data, details)}
									onError={(err) => paypalOnError(err)}
									catchError={(err) => paypalOnError(err)}
									onCancel={(err) => paypalOnError(err)}
									options={{
										clientId: paypalKey,
										vault: true,
									}}
									style={{
										shape: "rect",
										color: "blue",
										size: "large",
										layout: "horizontal",
										label: "subscribe",
									}}
								/>
								{/* <PaypalSubscriptionBtn
                                    amount="100"
                                    currency="USD"
                                    clientId={REACT_APP_PAYPAL_SANDBOX_APP_ID}
                                    env={REACT_APP_PAYPAL_ENV}
                                    createSubscription={paypalSubscribe}
                                    onApprove={paypalOnApprove}
                                    catchError={paypalOnError}
                                    onError={paypalOnError}
                                    onCancel={paypalOnError}
                                /> */}
							</div>

							<p className="payment-option-separator">
								<span>Or pay with card</span>
							</p>

							<div style={{margin: 15, width: "100%", textAlign: "center"}}>
								<Elements stripe={stripePromise}>
									<StripeSubscriptionForm
										consultancyObj={values}
										item={createOrder}
										setActiveStep={setActiveStep}
										handelStripeSubscription={handelStripeSubscription}
									/>
								</Elements>
							</div>
						</div>
					) : (
						<div>
							<Form>
								<div className={classes.paymentArea}>
									<PaypalExpressBtn
										env={REACT_APP_PAYPAL_ENV}
										client={client}
										currency={"USD"}
										total={createOrder?.rate}
										onError={(err) => console.log(err)}
										onSuccess={(paymentAsToken) =>
											handleCtaPayment(
												paymentAsToken,
												{...createOrder, paypal: true},
												setActiveStep
											)
										}
										onCancel={(data) => console.log(data)}
										style={stylePaypal}
										className="paypal-btn"
									/>
								</div>
							</Form>
							<p className="payment-option-separator">
								{" "}
								<span>Or pay with card</span>{" "}
							</p>
							<div style={{margin: 0, width: "100%"}}>
								<Elements stripe={stripePromise}>
									<StripeCardForm
										consultancyObj={values}
										item={createOrder}
										setActiveStep={setActiveStep}
										handelCtaPaymentStripe={handelCtaPaymentStripe}
									/>
								</Elements>
							</div>
						</div>
					)}
				</Grid>
			</Grid>
			: 
			<>
			<div>
            <PaymentSuccessDialog
              title="Your Order has been submitted successfully. "
              subTitle="Please visit your consultancy dashboard to schedule a consultation and for more details."
              details={paymentResponse}
            />
            <div style={{ marginTop: 10 }}>
              <Button
                variant="contained"
                color="primary"
                className="btn-finish"
                onClick={()=>{closePurchaseScreen(false)}}
                style={{ display: "flex", margin: "auto" }}
              >
                Finish
              </Button>
            </div>
          </div>
			</>}
		</>
	);
}
