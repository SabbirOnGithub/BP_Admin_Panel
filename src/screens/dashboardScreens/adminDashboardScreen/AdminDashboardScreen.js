import React, { useEffect , useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import { Grid,
    Select,
    OutlinedInput,
    MenuItem,
     } from "@material-ui/core";
import Widget from "../../../components/Widget";
import { Typography } from "../../../components/Wrappers";
import PageTitle from "../../../components/PageTitle";
import Avatar from '@material-ui/core/Avatar';
import classnames from "classnames";
// import PageviewIcon from '@material-ui/icons/Pageview';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import GroupIcon from '@material-ui/icons/Group';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PaymentIcon from '@material-ui/icons/Payment';
import ReplyIcon from '@material-ui/icons/Reply';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    YAxis,
    XAxis,
  } from "recharts";
import { useTheme } from "@material-ui/styles";
import Dot from "../../../components/Sidebar/components/Dot";
// import Table from "./components/Table/Table";
// import BigStat from "./components/BigStat/BigStat";

// styles
import useStyles from "./styles";

// redux actions
import { detailsAdminDashboard } from '../../../redux/actions/dashboardActions';

// const mainChartData = [
//     {
//         "year": '2021',
//         "month": '5',
//         "count": '156'
//     },
//     {
//         "year": 2021,
//         "month": 6,
//         "count": 500,
//     },
//     {
//         "year": '2021',
//         "month": '7',
//         "count": '156'
//     },
//     {
//         "year": 2021,
//         "month": 8,
//         "count": 100,
//     },
//     {
//         "year": 2021,
//         "month": 9,
//         "count": 300,
//     },
//     {
//         "year": 2021,
//         "month": 10,
//         "count": 190,
//     },
//     {
//         "year": 2021,
//         "month": 11,
//         "count": 504,
//     },
//     {
//         "year": 2021,
//         "month": 12,
//         "count": 689,
//     },
//     {
//         "year": 2022,
//         "month": 1,
//         "count": 309,
//     },
//     {
//         "year": 2022,
//         "month": 2,
//         "count": 809,
//     },
//     {
//         "year": 2022,
//         "month": 3,
//         "count": 300,
//     },
//     {
//         "year": 2022,
//         "month": 4,
//         "count": 190,
//     },
//     {
//         "year": 2022,
//         "month": 5,
//         "count": 504,
//     },
//     {
//         "year": 2022,
//         "month": 6,
//         "count": 689,
//     },
//     {
//         "year": 2022,
//         "month": 7,
//         "count": 309,
//     },
//     {
//         "year": 2022,
//         "month": 8,
//         "count": 809,
//     },
//     {
//         "year": 2022,
//         "month": 9,
//         "count": 190,
//     },
//     {
//         "year": 2022,
//         "month": 10,
//         "count": 504,
//     },
//     {
//         "year": 2022,
//         "month": 11,
//         "count": 689,
//     },
//     {
//         "year": 2022,
//         "month": 12,
//         "count": 309,
//     },
//     {
//         "year": 2023,
//         "month": 1,
//         "count": 809,
//     },
//     {
//         "year": 2023,
//         "month": 2,
//         "count": 504,
//     },
//     {
//         "year": 2023,
//         "month": 3,
//         "count": 689,
//     },
//     {
//         "year": 2023,
//         "month": 4,
//         "count": 309,
//     },
// ]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']

export default function AdminDashboardScreen() {
    var classes = useStyles();
    var theme = useTheme();

    // local
    var [mainChartState, setMainChartState] = useState("year");

    const userSignIn = useSelector(state => state.userSignin);
    //eslint-disable-next-line
    const { userInfo } = userSignIn;

    const adminDashboardDetails = useSelector(state => state.adminDashboardDetails);
    //eslint-disable-next-line
    const { adminDashboard, loading, error } = adminDashboardDetails;
    const dispatch = useDispatch();
    // console.log(Math.max(...mainChartData.map(item=>item.count)))
    // console.log(adminDashboard?.userGraph)
    useEffect(() => {
        try {
            userInfo?.userId && dispatch(detailsAdminDashboard(userInfo?.userId))
            
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
                                        title="Total Users"
                                        upperTitle
                                        bodyClass={classes.fullHeightBody}
                                        className={classes.card}
                                        disableWidgetMenu
                                    >
                                        <div className={classes.visitsNumberContainer}>
                                        <Grid container item alignItems={"center"}>
                                            <Grid item xs={6}>
                                                <Typography size="xl" weight="medium" noWrap>
                                                    {adminDashboard?.totalUser}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Avatar 
                                                        className={classnames(classes.secondary, classes.avatarPosition )}
                                                        variant= "rounded"
                                                >
                                                    <GroupIcon />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                        </div>
                                        
                                    </Widget>
                                </Grid>
                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                    <Widget
                                        title="Today Users"
                                        upperTitle
                                        bodyClass={classes.fullHeightBody}
                                        className={classes.card}
                                        disableWidgetMenu
                                    >
                                        <div className={classes.visitsNumberContainer}>
                                        <Grid container item alignItems={"center"}>
                                            <Grid item xs={6}>
                                                <Typography size="xl" weight="medium" noWrap>
                                                    {adminDashboard?.todayUser}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Avatar 
                                                    className={classnames(classes.success, classes.avatarPosition )}
                                                    variant= "rounded"
                                                >
                                                    <PermIdentityIcon />
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
                                                    {adminDashboard?.totalCtaRequest}
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
                                                    {adminDashboard?.todayCtaRequest}
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
                                                    {adminDashboard?.totalPayment} $
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
                                                    {adminDashboard?.todayPayment} $
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
                                <Grid item xs={12}>
                                    {
                                        adminDashboard.userGraph &&
                                            
                                        <Widget
                                        bodyClass={classes.mainChartBody}
                                        header={
                                        <div className={classes.mainChartHeader}>
                                            <Typography
                                            variant="h5"
                                            color="text"
                                            colorBrightness="secondary"
                                            >
                                            {(mainChartState + 'ly Chart')?.toUpperCase()}
                                            </Typography>
                                            <div className={classes.mainChartHeaderLabels}>
                                            {/* <div className={classes.mainChartHeaderLabel}>
                                                <Dot color="warning" />
                                                <Typography className={classes.mainChartLegentElement}>
                                                Tablet
                                                </Typography>
                                            </div>
                                            <div className={classes.mainChartHeaderLabel}>
                                                <Dot color="primary" />
                                                <Typography className={classes.mainChartLegentElement}>
                                                Mobile
                                                </Typography>
                                            </div> */}
                                            <div className={classes.mainChartHeaderLabel}>
                                                <Dot color="secondary" />
                                                <Typography className={classes.mainChartLegentElement}>
                                                Count
                                                </Typography>
                                            </div>
                                            </div>
                                            <Select
                                            value={mainChartState}
                                            onChange={e => setMainChartState(e.target.value)}
                                            input={
                                                <OutlinedInput
                                                labelWidth={0}
                                                classes={{
                                                    notchedOutline: classes.mainChartSelectRoot,
                                                    input: classes.mainChartSelect,
                                                }}
                                                />
                                            }
                                            autoWidth
                                            >
                                            <MenuItem value="year">Year</MenuItem>
                                            <MenuItem value="month">Month</MenuItem>
                                            </Select>
                                        </div>
                                        }
                                    >
                                        <ResponsiveContainer width="100%" minWidth={500} height={350}>
                                        <ComposedChart
                                            margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                                            data={adminDashboard.userGraph?.map(item=> item.month ? {...item, month:months[item.month -1]} : item) }
                                            // data={mainChartData.map(item=> item.month ? {...item, month:months[item.month -1]} : item)}

                                        >
                                            <YAxis
                                            ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600]}
                                            tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                                            stroke={theme.palette.text.hint + "80"}
                                            tickLine={false}
                                            />
                                            <XAxis
                                                // tickFormatter={i => i + 1}
                                                // tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                                                // stroke={theme.palette.text.hint + "80"}
                                                // tickLine={false}
                                                dataKey={mainChartState}
                                            />
                                            <Area
                                            type="natural"
                                            // dataKey="desktop"
                                            fill={theme.palette.background.light}
                                            strokeWidth={0}
                                            activeDot={false}
                                            dataKey="count"

                                            />
                                            <Line
                                            type="natural"
                                            // dataKey="mobile"
                                            stroke={theme.palette.secondary.main}
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={false}
                                            dataKey="count"
                                            />
                                            {/* <Line
                                            type="linear"
                                            dataKey="count"
                                            stroke={theme.palette.warning.main}
                                            strokeWidth={2}
                                            dot={{
                                                stroke: theme.palette.warning.dark,
                                                strokeWidth: 2,
                                                fill: theme.palette.warning.main,
                                            }}
                                            /> */}
                                        </ComposedChart>
                                        </ResponsiveContainer>
                                    
                                    </Widget>

                                    }
                                    
                                </Grid>
        
                            
                            </Grid>
                        </>
                    )
            }
        </>
    )
}
