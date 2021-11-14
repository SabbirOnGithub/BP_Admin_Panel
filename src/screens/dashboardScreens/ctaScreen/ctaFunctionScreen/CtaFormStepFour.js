import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InputSharpIcon from '@material-ui/icons/InputSharp';
import React, { useEffect } from 'react';
import Loading from '../../../../components/Loading/Loading';
import PopOver from '../../../../components/PopOver/PopOver';
import { Form } from '../../../../components/UseForm/useForm';
import useTab from '../../../../components/UseTab/useTab';

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
        recordForEdit,
        setValues,
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
                                    <Tab label="Hourly Support"  {...a11yPropsFullwidth(0)} />
                                    <Tab label="Solutions Discovery"  {...a11yPropsFullwidth(1)} />
                                    <Tab label="Concierge" {...a11yPropsFullwidth(2)} />
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
                                                    ctaPackageHourlys?.map(item => ( item.id &&
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
                                                                        <sup>
                                                                            <AttachMoneyIcon style={{ fontSize: 30 }}/>
                                                                        </sup>
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
                                                                        <Typography variant="subtitle1"className={classes.subText} style={{fontStyle:'italic'}}>
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
                                                                            onClick = {()=>handleNextToPaymentScreen({...item, ctaFunctionId: values?.id, getCtaHourlyId:item.id})}
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
                                                       
                                                        <Grid item md={4} xs={12} key={item.id}>
                                                            <Paper className={classes.paper}>
                                                                <div className="pricingTable">
                                                                    <div className="pricingTable-header">
                                                                    <Typography variant="subtitle1" className={classes.ctaHourName}>
                                                                        {item?.submenuName}
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
                                                                        <sup>
                                                                            <AttachMoneyIcon style={{ fontSize: 30 }}/>
                                                                        </sup>
                                                                        <Typography variant="subtitle1" className={classes.validity}>
                                                                             {item?.rate}
                                                                        </Typography>
                                                                    </div>

                                                                    <div className="price-value">
                                                                        <Typography variant="subtitle1"className={classes.subText} style={{fontStyle:'italic'}}>
                                                                             per day
                                                                        </Typography>
                                                                    </div>
                                                                    <div className="pricingTable-sign-up">
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            className={classes.button}
                                                                            endIcon={<InputSharpIcon>Purchase</InputSharpIcon>}
                                                                            size="large"
                                                                            onClick = {()=>handleNextToPaymentScreen({...item, ctaFunctionId: values?.id, getCtaDailyId:item.id})}
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
                                                        <Grid item md={4} xs={12} key={item.id}>
                                                            <Paper className={classes.paper}>
                                                                        
                                                                <div className="pricingTable">
                                                                    <div className="pricingTable-header">
                                                                    <Typography variant="subtitle1" className={classes.ctaHourName}>
                                                                        {item?.submenuName}
                                                                    </Typography>
                                                                    </div>
                                                                    <Typography variant="subtitle1"  className={classes.subText}>
                                                                         One-day Workshop
                                                                    </Typography>
                                                                    <Typography variant="subtitle1" className={classes.subText}>
                                                                         Get a personalized solution defined in one day
                                                                    </Typography>
                                                                    <div className="price-value">
                                                                    <Typography  variant="subtitle1" className={classes.subText}>
                                                                         Price
                                                                    </Typography>
                                                                        <sup>
                                                                            <AttachMoneyIcon style={{ fontSize: 30 }}/>
                                                                        </sup>
                                                                        <Typography variant="subtitle1" className={classes.validity}>
                                                                            {item?.monthlyRate}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1"className={classes.subText} style={{fontStyle:'italic'}}>
                                                                            per month
                                                                        </Typography>
                                                                    </div>

                                                                    <div className="price-value">
                                                                        <sup>
                                                                            <AttachMoneyIcon style={{ fontSize: 30 }}/>
                                                                        </sup>
                                                                        <Typography variant="subtitle1" className={classes.validity}>
                                                                            {item?.yearlyRate}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1"className={classes.subText} style={{fontStyle:'italic'}}>
                                                                            per year
                                                                        </Typography>
                                                                    </div>
                                                                   
                                                                   
                                                                    <div className="pricingTable-sign-up">
                                                                        <PopOver 
                                                                         variant="contained"
                                                                         color="primary"
                                                                         className={classes.button}
                                                                         endIcon={<InputSharpIcon>Purchase</InputSharpIcon>}
                                                                         size="large"
                                                                         
                                                                        >
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                className={classes.button}
                                                                                endIcon={<InputSharpIcon>Monthly</InputSharpIcon>}
                                                                                size="small"
                                                                                onClick = {()=>handleNextToPaymentScreen({...item, rate:item.monthlyRate, ctaFunctionId: values?.id, isMonthlySubscription:true, getCtaMonthlyYearlyId:item.id})}
                                                                            >
                                                                                Monthly
                                                                            </Button>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                className={classes.button}
                                                                                endIcon={<InputSharpIcon>Yearly</InputSharpIcon>}
                                                                                size="small"
                                                                                onClick = {()=>handleNextToPaymentScreen({...item, rate:item.yearlyRate, ctaFunctionId: values?.id, isYearlySubscription:true, getCtaMonthlyYearlyId:item.id})}
                                                                            >
                                                                                Yearly
                                                                            </Button>
                                                                        </PopOver>
                                                                       
                                                                        
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
