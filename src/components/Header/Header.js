import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import Avatar from '@material-ui/core/Avatar';
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import {  Typography } from "../Wrappers";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { useHistory } from "react-router-dom";

import { config } from "../../config";
const BASE_ROOT_URL = config.BASE_ROOT_URL

export default function Header(props) {
  const userSignIn = useSelector( state => state.userSignin );
  //eslint-disable-next-line
  const { userInfo  } = userSignIn;

  // console.log(userInfo)

  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  let [profileMenu, setProfileMenu] = useState(null);
  
  const dispatch = useDispatch();
  const history = useHistory();

// logout
  const handleLogout = () => {
    console.log('logout');
    dispatch(logout());
    history.push("/signin");
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
          <img src={process.env.PUBLIC_URL+"/BP_logo_Big.png"} alt="logo" height='50px' width='50px' className={classes.logotypeImage} />
          <Typography 
            variant="h2" 
            weight="medium" 
            className={classNames(
              classes.profileMenuLink,
              classes.logotype,
            )}
            component={Link} to={'/admin'}
          >
            Best Practicify
          </Typography>
        <div className={classes.grow} />

        <Typography
            className={classNames(
              classes.profileMenuLink,
              classes.logotype,
            )}
            variant="h2" 
            weight="medium"
            component={Link} to={'/admin/userProfile'}
          >
            {userInfo?.consultationTypeName}
          </Typography>
        
        
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          {/* <AccountIcon classes={{ root: classes.headerIcon }} /> */}
          { userInfo?.userImage ? <Avatar alt="Remy Sharp" src={BASE_ROOT_URL + "/" + userInfo.userImage.split("\\").join('/')} /> :
            <AccountIcon classes={{ root: classes.headerIcon }} />
          }
        </IconButton>
        
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {userInfo && userInfo.userName}
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              // href="/"
              component={Link} to={'/'}

            >
              {/* {userInfo.role} */}
            </Typography>
          </div>

          {/* {
            (roleResource?.find(item => {return item.urlPath === '/admin/user'})?.readOperation) && 
           
              <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem,
              )}
              component={Link} to={'/admin/user'}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Users
            </MenuItem>
          } */}
          {/* { (roleResource?.find(item => {return item.urlPath === '/admin/role'})?.readOperation) && 
            <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem,
              )}
              component={Link} to={'/admin/role'}
            >
              <AccountIcon className={classes.profileMenuIcon} /> User Role 
            </MenuItem>
         
          } */}
          
          <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem,
              )}
              component={Link} to={'/admin/userProfile'}
              onClick={() => setProfileMenu(null)}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Profile
            </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              component={Link} to={'/'}
              onClick={() => setProfileMenu(null)}
            >
             Visit Website Page
            </Typography>
          </div>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={handleLogout}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
