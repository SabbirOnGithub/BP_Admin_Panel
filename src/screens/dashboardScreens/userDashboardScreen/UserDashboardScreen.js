import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import { Grid } from "@material-ui/core";
import Widget from "../../../components/Widget/Widget";
import { Typography } from "../../../components/Wrappers/Wrappers";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Avatar from '@material-ui/core/Avatar';
import classnames from "classnames";
// import PageviewIcon from '@material-ui/icons/Pageview';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PaymentIcon from '@material-ui/icons/Payment';
import ReplyIcon from '@material-ui/icons/Reply';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';

// styles
import useStyles from "./styles";

// redux actions
import { detailsUserDashboard } from '../../../redux/actions/dashboardActions';

export default function UserDashboardScreen() {
    var classes = useStyles();

    const userSignIn = useSelector(state => state.userSignin);
    //eslint-disable-next-line
    const { userInfo } = userSignIn;

    const userDashboardDetails = useSelector(state => state.userDashboardDetails);
    //eslint-disable-next-line
    const { userDashboard, loading, error } = userDashboardDetails;
    const dispatch = useDispatch();
    // console.log(Math.max(...mainChartData.map(item=>item.count)))
    // console.log(userDashboard)
    useEffect(() => {
        try {
            userInfo?.userId && dispatch(detailsUserDashboard(userInfo?.userId))
            
        } catch (e) {
            console.log(e)
        }
        return () => {
            // 
        }
    }, [dispatch, userInfo?.userId])
    return (

        <>
            {
                loading ? <Loading /> :
                    ( 
                        <>
                         <PageTitle 
                            title="Dashboard" 
                        />
                            <Grid container spacing={4}>
                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                    <Widget
                                        title="Course Purchase"
                                        upperTitle
                                        bodyClass={classes.fullHeightBody}
                                        className={classes.card}
                                        disableWidgetMenu
                                    >
                                        <div className={classes.visitsNumberContainer}>
                                        <Grid container item alignItems={"center"}>
                                            <Grid item xs={6}>
                                                <Typography size="xl" weight="medium" noWrap>
                                                    {userDashboard?.coursePurchase}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Avatar 
                                                        className={classnames(classes.secondary, classes.avatarPosition )}
                                                        variant= "rounded"
                                                >
                                                    <ReceiptIcon />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                        </div>
                                        
                                    </Widget>
                                </Grid>
                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                    <Widget
                                        title="Total Cta Requests"
                                        upperTitle
                                        bodyClass={classes.fullHeightBody}
                                        className={classes.card}
                                        disableWidgetMenu
                                    >
                                        <div className={classes.visitsNumberContainer}>
                                        <Grid container item alignItems={"center"}>
                                            <Grid item xs={6}>
                                                <Typography size="xl" weight="medium" noWrap>
                                                    {userDashboard?.totalCtaRequest}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Avatar 
                                                        className={classnames(classes.warning, classes.avatarPosition )}
                                                        variant= "rounded"
                                                >
                                                    <ReplyAllIcon />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                        </div>
                                        
                                    </Widget>
                                </Grid>
                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                    <Widget
                                        title="Today Cta Requests"
                                        upperTitle
                                        bodyClass={classes.fullHeightBody}
                                        className={classes.card}
                                        disableWidgetMenu
                                    >
                                        <div className={classes.visitsNumberContainer}>
                                        <Grid container item alignItems={"center"}>
                                            <Grid item xs={6}>
                                                <Typography size="xl" weight="medium" noWrap>
                                                    {userDashboard?.todayCtaRequest}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Avatar 
                                                        className={classnames(classes.info, classes.avatarPosition )}
                                                        variant= "rounded"
                                                >
                                                    <ReplyIcon />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                        </div>
                                        
                                    </Widget>
                                </Grid>
                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                    <Widget
                                        title="Total Payment"
                                        upperTitle
                                        bodyClass={classes.fullHeightBody}
                                        className={classes.card}
                                        disableWidgetMenu
                                    >
                                        <div className={classes.visitsNumberContainer}>
                                        <Grid container item alignItems={"center"}>
                                            <Grid item xs={6}>
                                                <Typography size="xl" weight="medium" noWrap>
                                                    {userDashboard?.totalPayment} $
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Avatar 
                                                    className={classnames(classes.primary, classes.avatarPosition )}
                                                    variant= "rounded"
                                                >
                                                    <PaymentIcon />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                        </div>
                                        
                                    </Widget>
                                </Grid>
                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                    <Widget
                                        title="Today Payment"
                                        upperTitle
                                        bodyClass={classes.fullHeightBody}
                                        className={classes.card}
                                        disableWidgetMenu
                                    >
                                        <div className={classes.visitsNumberContainer}>
                                        <Grid container item alignItems={"center"}>
                                            <Grid item xs={6}>
                                                <Typography size="xl" weight="medium" noWrap>
                                                    {userDashboard?.todayPayment} $
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Avatar 
                                                    className={classnames(classes.secondary, classes.avatarPosition )}
                                                    variant= "rounded"
                                                >
                                                    <AttachMoneyIcon />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                        </div>
                                        
                                    </Widget>
                                </Grid>
                            </Grid>
                        </>
                    )
            }
        </>
    )
}
