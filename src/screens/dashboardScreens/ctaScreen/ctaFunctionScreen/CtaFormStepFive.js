import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import StripeCheckout from "react-stripe-checkout";
import Loading from "../../../../components/Loading/Loading";
import { Form } from "../../../../components/UseForm/useForm";
import { config } from "../../../../config";
import store from "../../../../redux/store";
import CardForm from "./CardForm";

// const REACT_APP_STRIPE_KEY = config.REACT_APP_STRIPE_KEY
const {
	REACT_APP_STRIPE_KEY,
	REACT_APP_PAYPAL_SANDBOX_APP_ID,
	REACT_APP_PAYPAL_PRODUCTION_APP_ID,
	REACT_APP_PAYPAL_ENV,
} = config;

const stripePromise = loadStripe(REACT_APP_STRIPE_KEY);

const { userSignin } = store.getState();


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
	shape: "pill",
	color: "gold",
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
	} = props;

	const classes = useStyles();

	const client = {
		sandbox: REACT_APP_PAYPAL_SANDBOX_APP_ID,
		production: REACT_APP_PAYPAL_PRODUCTION_APP_ID,
	};

	const amount = (createOrder ? createOrder.rate : 0) * 100;
	const amountString = (createOrder ? createOrder.rate : 0).toLocaleString(
		"en-US",
		{
			style: "currency",
			currency: "USD",
		}
	);

	const paymentDesc = createOrder?.name + "   USD " + amountString;

	const validity = () => {};

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
									<h2 style={{alignSelf: "center", textAlign: "center", fontSize:"20px"}}>
										Consulting Type : {createOrder?.consultingType}
									</h2>
									<h2 style={{alignSelf: "center", textAlign: "center", fontSize:"20px"}}>
										Business Name : {userSignin?.userInfo?.businessName}
									</h2>
									<h2 style={{alignSelf: "center", textAlign: "center", fontSize:"20px"}}>
										Business Type : {userSignin?.userInfo?.companyTypeName}
									</h2>
									<h2 style={{alignSelf: "center", textAlign: "center", fontSize:"20px"}}>
										Packege Name : {createOrder?.name}
									</h2>
									{createOrder.validity > 0 ? (<h2 style={{alignSelf: "center", textAlign: "center", fontSize:"20px"}}>
										Validity : {createOrder?.validity} days
									</h2>) : "" }

									{createOrder?.subscriptionType ? (<h2 style={{alignSelf: "center", textAlign: "center", fontSize:"20px"}}>
										Subscription Type : {createOrder?.subscriptionType} 
									</h2>): ""}
									
									<h2 style={{alignSelf: "center", textAlign: "center", fontSize:"20px"}}>
										Amount : USD {amountString}{" "}
									</h2>
									{/* <pre>
										createOrder : {JSON.stringify(createOrder, undefined, 4)}
									</pre>
									<pre>
									userSignin : {JSON.stringify(userSignin, undefined, 4)}
									</pre>
									<pre> values: {JSON.stringify(values, undefined, 4)}</pre> */}
								</div>
							</div>
						</Grid>
						<Grid item xs={6}>
							<Form>
								<div className={classes.paymentArea}>
									<div>
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

									<p className="payment-option-separator">
										{" "}
										<span>Or pay with card</span>{" "}
									</p>

									<div style={{marginTop: 15, display: "none"}}>
										{createOrder?.rate && (
											<StripeCheckout
												stripeKey={REACT_APP_STRIPE_KEY}
												token={(token) =>
													handleCtaPayment(token, createOrder, setActiveStep)
												}
												amount={amount}
												name="Best Practicify"
												billingAddress
												description={paymentDesc}
												locale="auto"
												currency="USD"
												image="https://www.bestpracticify.co/images/BP_logo_Straight.png"
											>
												<Button
													variant="contained"
													color="primary"
													className={classes.button}
												>
													<span
														className="paypal-button-text"
														optional=""
														style={{color: "#fff"}}
													>
														Pay with Card
													</span>
												</Button>
											</StripeCheckout>
										)}
									</div>
								</div>
							</Form>
							<div style={{margin: 15, width: "100%"}}>
								<Elements stripe={stripePromise}>
									<CardForm
										consultancyObj={values}
										item={createOrder}
										setActiveStep={setActiveStep}
										handelCtaPaymentStripe={handelCtaPaymentStripe}
									/>
								</Elements>
							</div>
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
}
