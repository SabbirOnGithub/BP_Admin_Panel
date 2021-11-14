import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import PaypalExpressBtn from "react-paypal-express-checkout";
import StripeCheckout from "react-stripe-checkout";
import Loading from '../../../../components/Loading/Loading';
import { Form } from '../../../../components/UseForm/useForm';
import { config } from "../../../../config";


// const REACT_APP_STRIPE_KEY = config.REACT_APP_STRIPE_KEY
const { REACT_APP_STRIPE_KEY, 
        REACT_APP_PAYPAL_SANDBOX_APP_ID, 
        REACT_APP_PAYPAL_PRODUCTION_APP_ID,
        REACT_APP_PAYPAL_ENV 
    } = config

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        minWidth:'245px',
        border: 'none',
        fontStyle:'14px',
        // borderRadius: '4px',
        borderRadius: '20px',
        margin: theme.spacing(1),
        marginBottom: theme.spacing(3),
        // background: '#32325d',
        background: '#0096ff',
        textTransform: 'none',
        fontSize: 12,
        // padding:10,
        '&:hover': {
            background: '#09a2ad',
        },
        // '& span':{
        // },
        color:'#000 !important',

    },
    ctaHourName: {
        color: '#9999a5',
        fontSize: '18px',
        textTransform: 'uppercase',
    },
    subText: {
        fontSize: '16px',
        padding: 10,
    },
    validity: {
        color: '#666',
        display: 'inline-block',
        fontSize: '40px',
        fontWeight: 'normal',
        lineHeight: 'normal',
    },
    paymentArea:{
        display:'flex',
        justifyContent:'space-around',
        flexWrap:'wrap',
        flexDirection:'column',
        alignItems:'center',
    }

}));

const stylePaypal = {
    'label':'pay', 
    'tagline': true, 
    'size':'medium', 
    'shape':'pill', 
    'color':'gold'
};
export default function CtaFormStepFive (props) {

    const { values,
        // errors,
        recordForEdit,
        setValues,
        createOrder,
        setHideNext,
        handleCtaPayment,
        loadingCtaPaymentSave,
        // successCtaPaymentSave,
        loadingCtaPurchaseHistorySave,
        setActiveStep
        
    } = props;

    const classes = useStyles();

    const client = {
        sandbox: REACT_APP_PAYPAL_SANDBOX_APP_ID,
        production: REACT_APP_PAYPAL_PRODUCTION_APP_ID
      };

      const paymentDesc = createOrder?.name +"   $"+createOrder?.rate;
      const amount = (createOrder?createOrder.rate : 0) * 100;
    

    useEffect(() => {
        setHideNext(true)
        
        if (recordForEdit != null) {
            try {
                setValues({
                    ...recordForEdit,
                })
            } catch (e) {
                console.warn(e);
            }
        }
        
    }, [recordForEdit, setValues, setHideNext])

    return (
        <>
            {
                !values.id || loadingCtaPaymentSave || loadingCtaPurchaseHistorySave ? <Loading /> :
                <Form>
                <Grid container>
                    <Grid item xs={12}>
                        <h1 style={{alignSelf:'center', textAlign:'center'}}> Amount : $ {createOrder?.rate} </h1>

                        <div className={classes.paymentArea}>
                        {/* <pre>{JSON.stringify(createOrder, undefined, 4)}</pre> */}
                        <div>
                            {createOrder?.rate && 
                            <StripeCheckout
                                stripeKey={REACT_APP_STRIPE_KEY}
                                token={(token)=>handleCtaPayment(token, createOrder, setActiveStep)}
                                amount={amount}
                                name="Best Practicify, LLC"
                                billingAddress
                                description={paymentDesc}
                                locale="auto"
                                currency="USD"
                                image="https://www.bestpracticify.co/BP_logo.svg"
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    // startIcon={<img src={process.env.PUBLIC_URL+"/stripe_icon.png"}  height='25px' width='25px' alt='stripe logo' />}
                                    // endIcon={<InputSharpIcon>Purchase</InputSharpIcon>}
                                    endIcon={
                                        <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" width="60" height="25" className="UserLogo variant-- "><title>Stripe logo</title><path fill="var(--userLogoColor, #fff)" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z" fillRule="evenodd"></path></svg>
                                    }
                                    size="medium"
                                    // color="inherit"
                                >
                                   <span className="paypal-button-text" optional="">Pay with </span>
                                </Button>
                            </StripeCheckout>
                        }
                            
                        </div>
                        <div style={{marginTop:15}}>
                            <PaypalExpressBtn
                                env={REACT_APP_PAYPAL_ENV}
                                client={client}
                                currency={'USD'}
                                total={createOrder?.rate}
                                onError={(err)=>console.log(err)}
                                onSuccess={(paymentAsToken)=>handleCtaPayment(paymentAsToken, {...createOrder, paypal:true}, setActiveStep)}
                                onCancel={(data)=>console.log(data)}
                                style={stylePaypal}
                            />
                        </div>
                        </div>
                        </Grid>
                    </Grid>
                </Form>
            }
        </>
    )
}
