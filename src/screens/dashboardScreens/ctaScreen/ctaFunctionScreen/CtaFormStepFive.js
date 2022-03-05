import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import React, {useEffect} from "react";
import {PayPalButton} from "react-paypal-button-v2";
import PaypalExpressBtn from "react-paypal-express-checkout";
import {useSelector} from "react-redux";
import Loading from "../../../../components/Loading/Loading";
import {Form} from "../../../../components/UseForm/useForm";
import {config} from "../../../../config";
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
export default function CtaFormStepFive(props) {
	const {
		values,
		// errors,
		recordForEdit,
		setValues,
		createOrder,
		setHideNext,
		handleCtaPayment,
		loadingCtaPaymentSave,
		// successCtaPaymentSave,
		loadingCtaPurchaseHistorySave,
		setActiveStep,
		handelCtaPaymentStripe,
		handelStripeSubscription,
		handelPaypalSubscription,
	} = props;

	const classes = useStyles();

	const client = {
		sandbox: REACT_APP_PAYPAL_SANDBOX_APP_ID,
		production: REACT_APP_PAYPAL_PRODUCTION_APP_ID,
	};

	const userSignIn = useSelector((state) => state.userSignin);
	const {userInfo} = userSignIn;
	const amount = (createOrder ? createOrder.rate : 0) * 100;
	const amountString = (createOrder ? createOrder.rate : 0).toLocaleString(
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

	useEffect(() => {
		setHideNext(true);

		if (recordForEdit != null) {
			try {
				setValues({
					...recordForEdit,
				});
			} catch (e) {
				console.warn(e);
			}
		}
	}, [recordForEdit, setValues, setHideNext]);

	return (
		<>
			{!values.id || loadingCtaPaymentSave || loadingCtaPurchaseHistorySave ? (
				<Loading />
			) : (
				<>
					<Grid container>
						<Grid item xs={6}>
							<div className="card shadow-sm checkout-details-card">
								<div className="card-body">
									<h1 style={{alignSelf: "center", textAlign: "center"}}>
										Current Consultancy Status :{" "}
										{userInfo?.currentConsultancyName}
									</h1>
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
											onApprove={(data, details) =>
												paypalOnApprove(data, details)
											}
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
				</>
			)}
		</>
	);
}
