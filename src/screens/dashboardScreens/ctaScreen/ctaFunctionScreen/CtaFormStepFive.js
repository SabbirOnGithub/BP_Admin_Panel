import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardElement, Elements, useElements, useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import StripeCheckout from "react-stripe-checkout";
import Loading from "../../../../components/Loading/Loading";
import { Form } from "../../../../components/UseForm/useForm";
import { config } from "../../../../config";

// const REACT_APP_STRIPE_KEY = config.REACT_APP_STRIPE_KEY
const {
  REACT_APP_STRIPE_KEY,
  REACT_APP_PAYPAL_SANDBOX_APP_ID,
  REACT_APP_PAYPAL_PRODUCTION_APP_ID,
  REACT_APP_PAYPAL_ENV,
} = config;


const stripePromise = loadStripe("pk_test_51JH9oLJ708iVAZsoxMt8YdGnYBxxyAbI65tct1LbKy5kWenz6E8CTzJlWr4eOnADslmwaqfTMVqiyZKvlHYJdxX800JOYkQTcB");

const handleSubmit = (stripe, elements) => async () => {
  const cardElement = elements.getElement(CardElement);

  const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    console.log('[error]', error);
  } else {
    console.log('[PaymentMethod]', paymentMethod);
    // ... SEND to your API server to process payment intent
  }
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <>
      <h1>stripe form</h1>
      <CardElement />
      <button onClick={handleSubmit(stripe, elements)}>Buy</button>
    </>
  );
}

const appearance = {
  theme: 'stripe',
};
const clientSecret = {
  clientSecret: 'sk_test_51JH9oLJ708iVAZsoFVngRW8H9UTSd9RXQv2tScPoNhdkQ1mqZ3Jw7Mb0JOGKxhDqPcfytGejEz1ZxJOo6sEmlWVy00NVHupHYu',
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

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
  tagline: true,
  size: "medium",
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
        <Form>
          <Grid container>
            <Grid item xs={6}>
            <h1 style={{ alignSelf: "center", textAlign: "center" }}>
                        Packege Name : {createOrder?.name}
                      </h1> 
                      <h1 style={{ alignSelf: "center", textAlign: "center" }}>
                          Amount : USD {amountString}{" "}
                      </h1>
                    {/* <pre>
                    createOrder : {JSON.stringify(createOrder, undefined, 4)}
                  </pre>
                  <pre>values: {JSON.stringify(values, undefined, 4)}</pre> */}
            </Grid>
            <Grid item xs={6}>
              <div className={classes.paymentArea}>


              <div >
                  <PaypalExpressBtn
                    env={REACT_APP_PAYPAL_ENV}
                    client={client}
                    currency={"USD"}
                    total={createOrder?.rate}
                    onError={(err) => console.log(err)}
                    onSuccess={(paymentAsToken) =>
                      handleCtaPayment(
                        paymentAsToken,
                        { ...createOrder, paypal: true },
                        setActiveStep
                      )
                    }
                    onCancel={(data) => console.log(data)}
                    style={stylePaypal}
                  />
                </div>

                

                <div style={{marginTop:15, width:"45%", }}>
                  <Elements stripe={stripePromise}>
                      <PaymentForm />
                    </Elements>
                </div>

                <div style={{ marginTop: 15 }}>
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
                        <span className="paypal-button-text" optional="" style={{color:"#fff"}}>
                          Pay with Card
                        </span>
                      </Button>
                    </StripeCheckout>
                  )}
                </div>

                
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </>
  );
}
