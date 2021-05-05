import React, { useEffect } from 'react'
import Loading from '../../../../components/Loading/Loading';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { Form } from '../../../../components/UseForm/useForm';
import StripeCheckout from "react-stripe-checkout";

import {config} from "../../../../config";

const REACT_APP_STRIPE_KEY = config.REACT_APP_STRIPE_KEY

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
        border: 'none',
        borderRadius: '4px',
        margin: theme.spacing(1),
        background: '#32325d',
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
                                    // endIcon={<InputSharpIcon>Purchase</InputSharpIcon>}
                                    size="large"
                                    // style={{fontSize:'1.5rem'}}
                                >
                                    Pay ${createOrder?.rate} with Stripe
                                </Button>
                            </StripeCheckout>
                        }
                            
                        </div>
                        <div></div>
                        </div>
                        
                            
                        </Grid>
                    </Grid>
                </Form>
            }
        </>
    )
}
