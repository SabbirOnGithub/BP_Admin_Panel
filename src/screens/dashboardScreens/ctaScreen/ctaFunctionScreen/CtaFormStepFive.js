import React, { useEffect } from 'react'
import Loading from '../../../../components/Loading/Loading';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { Form } from '../../../../components/UseForm/useForm';
import StripeCheckout from "react-stripe-checkout";
import PaypalExpressBtn from "react-paypal-express-checkout";

import {config} from "../../../../config";

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
        background: '#5469d4',
        textTransform: 'none',
        fontSize: 16,
        // padding:10,
        '&:hover': {
            background: '#43458b',
        },
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
                        <div>
                            {createOrder?.rate && 
                            <StripeCheckout
                                stripeKey={REACT_APP_STRIPE_KEY}
                                token={(token)=>handleCtaPayment(token, createOrder, setActiveStep)}
                                amount={createOrder?.rate * 100}
                                name="Tesla Roadster"
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    // startIcon={<img src={process.env.PUBLIC_URL+"/stripe_icon.png"}  height='25px' width='25px' alt='stripe logo' />}
                                    // endIcon={<InputSharpIcon>Purchase</InputSharpIcon>}
                                    size="medium"
                                >
                                    Pay with Stripe
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
