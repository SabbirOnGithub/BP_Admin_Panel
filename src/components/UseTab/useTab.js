import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import PhoneIcon from '@material-ui/icons/Phone';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
// import HelpIcon from '@material-ui/icons/Help';
// import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



export default function useTab (){
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  const a11yPropsScroll = (index) => {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  function a11yPropsFullwidth(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      // maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
      marginTop:12,
      marginBottom:12,
    },
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  
   const TabLayout = (props) => {
    return (
      <div className={classes.root}>
        {props.children}

        {/* <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant="scrollable" //"standard" or "scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            centered={true}
          >
            <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
            <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
            <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
            <Tab label="Item Four" icon={<HelpIcon />} {...a11yProps(3)} />
            <Tab label="Item Five" icon={<ShoppingBasket />} {...a11yProps(4)} />
            <Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(5)} />
            <Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </div>
    );
  }

  return {
    AppBar,
    Tabs,
    Tab,
    TabPanel,
    value,
    setValue,
    TabLayout,
    handleTabChange,
    a11yPropsScroll,
    a11yPropsFullwidth


  }
}