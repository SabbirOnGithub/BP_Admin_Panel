import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import Notification from "../../../../components/Notification/Notification";
import {config} from "../../../../config";
import {useMessages} from "../../../../helpers/StatusMessages";

const StripeSubscriptionForm = ({
	consultancyObj,
	item,
	setActiveStep,
	handelStripeSubscription,
}) => {
	const userSignIn = useSelector((state) => state.userSignin);
	//eslint-disable-next-line
	const {userInfo} = userSignIn;
	const baseURL = config.BASE_API_URL;
	const stripe = useStripe();
	const elements = useElements();
	const [messages, addMessage] = useMessages();

	const [priceId, setPriceId] = useState(item.stripePriceId);
	const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
	// const [customer, setCustomer] = useState(null);
	// const [subscriptionData, setSubscriptionData] = useState(null);
	// const [paymentIntent, setPaymentIntent] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setPaymentLoading(true);
		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			addMessage("Stripe.js has not yet loaded.");
			return;
		}
		const cardElement = elements.getElement(CardElement);

		console.log("Calling create-customer...");
		const {customer} = await fetch(baseURL + "/payment/create-customer", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userInfo?.email,
			}),
		}).then((r) => r.json());

		console.log("finished create-customer...");
		console.log(customer);
		// setCustomer(customer);

		if (customer) {
			console.log("Calling create-subscription...");
			const {
				error: backendError,
				subscriptionId,
				clientSecret,
			} = await fetch(baseURL + "/payment/create-subscription", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					priceId: priceId,
					customerId: customer,
				}),
			}).then((r) => r.json());

			if (backendError) {
				addMessage(backendError.message);
				console.log(backendError.message);
				setPaymentLoading(false);
				setNotify({
					isOpen: true,
					message: backendError?.message,
					type: "error",
				});
				return;
			}

			console.log("finished create-subscription...");

			// setSubscriptionData({subscriptionId, clientSecret});

			if (subscriptionId && clientSecret) {
				console.log("Calling confirmCardPayment...");
				console.log(clientSecret);
				// Use card Element to tokenize payment details
				const {error: stripeError, paymentIntent} =
					await stripe.confirmCardPayment(clientSecret, {
						payment_method: {
							card: cardElement,
							billing_details: {
								name: userInfo.name,
								email: userInfo.email,
							},
						},
					});

				if (stripeError) {
					// show error and collect new card details.
					console.log("Subscrition Confirm error: ", stripeError.message);
					setPaymentLoading(false);
					setNotify({
						isOpen: true,
						message: stripeError?.message,
						type: "error",
					});
					return;
				}

				console.log(paymentIntent);
				// setPaymentIntent(paymentIntent);

				if (paymentIntent && paymentIntent.status === "succeeded") {
					// todo : add action after subscription successfull
					setPaymentLoading(false);
					if (paymentIntent.id) {
						handelStripeSubscription(
							paymentIntent,
							subscriptionId,
							item,
							consultancyObj,
							setActiveStep
						);
					}
					// alert(paymentIntent.status);
				}
			}
		} else {
			console.log("Failed to call create-subscription...");
		}
	};

	const [isPaymentLoading, setPaymentLoading] = useState(false);

	return (
		<>
			<form onSubmit={handleSubmit}>
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
					{isPaymentLoading ? "Loading..." : "Subscribe"}
				</button>
			</form>
			<Notification notify={notify} setNotify={setNotify} />
			{/* <StatusMessages messages={messages} /> */}
		</>
	);
};

export default StripeSubscriptionForm;
