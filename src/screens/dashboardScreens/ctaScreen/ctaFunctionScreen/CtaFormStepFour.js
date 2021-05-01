import React, { useEffect } from 'react'
import { Form } from '../../../../components/UseForm/useForm';
import Loading from '../../../../components/Loading/Loading';
import useTab from '../../../../components/UseTab/useTab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import InputSharpIcon from '@material-ui/icons/InputSharp';
import Button from '@material-ui/core/Button';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Typography from '@material-ui/core/Typography';


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
        margin: theme.spacing(1),
        background: '#666',
        textTransform: 'none',
        fontSize: 16,
        border: 'none',
        borderRadius: 0,
        // padding:10,
        '&:hover': {
            background: '#282828',
        },
    },
    ctaHourName:{
        color: '#9999a5',
        fontSize: '18px',
        textTransform: 'uppercase',
    },
    subText:{
        fontSize: '16px',
        padding:10,
    },
    validity:{
        color: '#666',
        display: 'inline-block',
        fontSize: '40px',
        fontWeight: 'normal',
        lineHeight: 'normal',
    },

}));


export default function CtaFormStepFour(props) {

    const { values,
        // errors,
        recordForEdit,
        setValues,
        // handleSubmitFile,
        loadingCtaFunction,
        loadingCtaFunctionSave,
        loadingCtaFunctionDocumentSave,
        ctaPackageHourlys,
        loadingCtaPackageHourlys,
        ctaPackageDailys,
        loadingCtaPackageDailys,
        ctaPackageMonthlyYearlys,
        loadingCtaPackageMonthlyYearlys,
        handleNextToPaymentScreen,
        setHideNext
    } = props;

    const classes = useStyles();
    // Tab 
    const {
        Tab,
        AppBar,
        Tabs,
        TabPanel,
        value,
        TabLayout,
        handleTabChange,
        a11yPropsFullwidth
    } = useTab();
    

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
                !values.id || loadingCtaFunction || loadingCtaFunctionSave || loadingCtaFunctionDocumentSave || loadingCtaPackageHourlys || loadingCtaPackageDailys || loadingCtaPackageMonthlyYearlys ? <Loading /> :
                    <Form>
                        <TabLayout>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={value}
                                    onChange={handleTabChange}
                                    variant="fullWidth" //"standard" or "scrollable" or "fullWidth"
                                    scrollButtons="on"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="scrollable force tabs example"
                                    centered={true}
                                >
                                    <Tab label="Hourly Solution"  {...a11yPropsFullwidth(0)} />
                                    <Tab label="Solution Discover"  {...a11yPropsFullwidth(1)} />
                                    <Tab label="Access Retainer" {...a11yPropsFullwidth(2)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                {
                                    ctaPackageHourlys?.length >0 ?
                                    (
                                    <div className={classes.root}>
                                        <Grid container spacing={1}>
                                            <Grid container item md={12} spacing={3}>
                                                {
                                                    ctaPackageHourlys?.map(item => (
                                                        <Grid item md={4} xs={12} key={item.id}>
                                                            <Paper className={classes.paper}>
                                                                        
                                                                <div className="pricingTable">
                                                                    <div className="pricingTable-header">
                                                                    <Typography variant="subtitle1" className={classes.ctaHourName}>
                                                                        {item?.ctaHourName}
                                                                    </Typography>
                                                                    </div>
                                                                    <Typography variant="subtitle1"  className={classes.subText}>
                                                                        Buy as many hours as needed
                                                                    </Typography>
                                                                    <Typography variant="subtitle1" className={classes.subText}>
                                                                        On-Demand
                                                                    </Typography>
                                                                    <div className="price-value">
                                                                    <Typography  variant="subtitle1" className={classes.subText}>
                                                                         Price
                                                                    </Typography>
                                                                        <small>
                                                                            <AttachMoneyIcon />
                                                                        </small>
                                                                        <Typography variant="subtitle1" className={classes.validity}>
                                                                             {item?.rate}
                                                                        </Typography>
                                                                    </div>

                                                                    <div className="price-value">
                                                                        <Typography variant="subtitle1" className={classes.subText}>
                                                                            Validity
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" className={classes.validity}>
                                                                            {item?.validity}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1"className={classes.subText}>
                                                                             days
                                                                        </Typography>
                                                                    </div>
                                                                    <div className="pricingTable-sign-up">
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            className={classes.button}
                                                                            endIcon={<InputSharpIcon>Purchase</InputSharpIcon>}
                                                                            size="large"
                                                                            onClick = {()=>handleNextToPaymentScreen(item)}
                                                                        >
                                                                            Purchase
                                                                        </Button>
                                                                        
                                                                    </div>
                                                                </div>
                                                            </Paper>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>

                                        </Grid>
                                    </div>
                                    )
                                    : "No data found"
                                }
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                            {       
                                    ctaPackageDailys?.length >0 ?
                                    (
                                    <div className={classes.root}>
                                        <Grid container spacing={1}>
                                            <Grid container item md={12} spacing={3}>
                                                
                                                {
                                                    ctaPackageDailys?.map(item => (
                                                        <Grid item md={3} xs={12} key={item.id}>
                                                            <Paper className={classes.paper}>
                                                                <div className="pricingTable">
                                                                    <div className="pricingTable-header" pt={5} >
                                                                        <h3>{item?.submenuName}</h3>
                                                                    </div>
                                                                    <p pt={4} >Buy as many hours as needed</p>
                                                                    <p>On-Demand</p>
                                                                    <div className="price-value">
                                                                        <p className="">Price</p>
                                                                        <small>
                                                                            <AttachMoneyIcon />

                                                                        </small>
                                                                        <span>{item?.rate}</span>
                                                                       
                                                                    </div>

                                                                    <div className="price-value">
                                                                        <span className="subtitle"> per day</span>
                                                                    </div>
                                                                    <div className="pricingTable-sign-up">
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            className={classes.button}
                                                                            endIcon={<InputSharpIcon>Purchase</InputSharpIcon>}
                                                                            size="large"
                                                                        >
                                                                            Purchase
                                                                </Button>
                                                                    </div>
                                                                </div>
                                                            </Paper>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>

                                        </Grid>
                                    </div>
                                    )
                                    : "No data found"
                                }
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                            {       
                                ctaPackageDailys?.length >0 ?
                                (
                                    <div className={classes.root}>
                                        <Grid container spacing={1}>
                                            <Grid container item md={12} spacing={3}>
                                                
                                                {
                                                    ctaPackageMonthlyYearlys?.map(item => (
                                                        <Grid item md={3} xs={12} key={item.id}>
                                                            <Paper className={classes.paper}>
                                                                <div className="pricingTable">
                                                                    <div className="pricingTable-header" pt={5} >
                                                                        <h3>{item?.submenuName}</h3>
                                                                    </div>
                                                                    <p pt={4} >One-day Workshop</p>
                                                                    <p>Get a personalized solution defined in one day</p>
                                                                    <div className="price-value">
                                                                        <p className="">Price</p>
                                                                        <small className="fa fa-usd"></small>
                                                                        <span>{item?.monthlyRate}</span>
                                                                        <span class="subtitle">per month</span>
                                                                    </div>
                                                                    <div className="price-value">
                                                                        <small>
                                                                            <AttachMoneyIcon />
                                                                        </small>
                                                                        <span>{item?.monthlyRate}</span>
                                                                        <span class="subtitle">per year</span>
                                                                    </div>
                                                                    <div className="pricingTable-sign-up">
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            className={classes.button}
                                                                            endIcon={<InputSharpIcon>Purchase</InputSharpIcon>}
                                                                            size="large"
                                                                        >
                                                                            Purchase
                                                                </Button>
                                                                    </div>
                                                                </div>
                                                            </Paper>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>

                                        </Grid>
                                    </div>
                                 )
                                 : "No data found"
                                }
                            </TabPanel>
                        </TabLayout>
                    </Form>
            }
        </>
    )
}
