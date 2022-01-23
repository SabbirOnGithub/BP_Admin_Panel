import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
export function PaypalSubscriptionBtn(props) {
  const {
    amount,
    currency,
    clientId,
    createSubscription,
    onApprove,
    catchError,
    onError,
    onCancel,
  } = props;
  const paypalKey = "AcLhes-GT14dVUDxhSMGLk-1bbk1H-MiXnLnuygg4MmyrIkLVrK5NCMKWrVAKMkq6l-dHFqYqILAGJO_";
  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      createSubscription={(data, details) => createSubscription(data, details)}
      onApprove={(data, details) => onApprove(data, details)}
      onError={(err) => onError(err)}
      catchError={(err) => catchError(err)}
      onCancel={(err) => onCancel(err)}
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
  );
}
export default PaypalSubscriptionBtn;
