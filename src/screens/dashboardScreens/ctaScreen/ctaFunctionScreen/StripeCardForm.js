import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { config } from "../../../../config";
import StatusMessages, { useMessages } from "../../../../helpers/StatusMessages";

const StripeCardForm = ({
	consultancyObj,
	item,
	setActiveStep,
	handelCtaPaymentStripe,
}) => {
	const userSignIn = useSelector((state) => state.userSignin);
	//eslint-disable-next-line
	const {userInfo} = userSignIn;
	const baseURL = config.BASE_API_URL;
	const stripe = useStripe();
	const elements = useElements();
	const [messages, addMessage] = useMessages();
	const [isPaymentLoading, setPaymentLoading] = useState(false);

	const handleSubmit = async (e) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		e.preventDefault();
		setPaymentLoading(true);
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			addMessage("Stripe.js has not yet loaded.");
			return;
		}

		const cardElement = elements.getElement(CardElement);
		// ----------- (1) create payment method
		console.log("payment: stripe.createPaymentMethod");
		const {error, paymentMethod} = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
			billing_details: {
				name: userInfo.name,
				email: userInfo.email,
			},
		});

		if (error) {
			console.log("[error]", error);
			setPaymentLoading(false);
		} else {
			console.log("[PaymentMethod]", paymentMethod);
			// ... SEND to your API server to process payment intent
		}

		// ----------- (2) create payment intent
		console.log("payment: payment/create-payment-intent");
		const {error: backendError, clientSecret} = await fetch(
			baseURL + "/payment/create-payment-intent",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					paymentMethodType: "card",
					currency: "usd",
					paymentMethod: paymentMethod.id,
					amount: item?.rate,
				}),
			}
		).then((r) => r.json());

		if (backendError) {
			addMessage(backendError.message);
			setPaymentLoading(false);
			return;
		}

		addMessage("Client secret returned");

		// ----------- (3) create payment intent
		console.log("payment: stripe.confirmCardPayment");
		const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
			clientSecret,
			{
				payment_method: {
					card: elements.getElement(CardElement),
					billing_details: {
						name: userInfo.name,
						email: userInfo.email,
					},
				},
			}
		);

		if (stripeError) {
			// Show error to your customer (e.g., insufficient funds)
			addMessage(stripeError.message);
			setPaymentLoading(false);
			return;
		}

		// Show a success message to your customer
		// There's a risk of the customer closing the window before callback
		// execution. Set up a webhook or plugin to listen for the
		// payment_intent.succeeded event that handles any business critical
		// post-payment actions.
		addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);

		if (paymentIntent.id) {
			handelCtaPaymentStripe(
				paymentIntent,
				paymentMethod,
				item,
				consultancyObj,
				setActiveStep
			);
		}
	};

	return (
		<>
			<form id="payment-form" onSubmit={handleSubmit}>
				{/* <label htmlFor="card">Card</label>
				<CardElement id="card" />

				<button type="submit">Pay</button> */}
				<div
					style={{
						padding: "1.5rem",
					}}
				>
					<div
						style={{
							maxWidth: "500px",
							margin: "0 auto",
						}}
					>
						<div
							style={{
								display: "block",
								width: "100%",
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<CardElement
									className="card payment-card"
									options={{
										style: {
											base: {
												backgroundColor: "white",
											},
										},
									}}
								/>
								<button
									className="pay-button"
									type="submit"
									disabled={isPaymentLoading}
								>
									{isPaymentLoading ? "Loading..." : "Pay"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<StatusMessages messages={messages} />
		</>
	);
};

export default StripeCardForm;
