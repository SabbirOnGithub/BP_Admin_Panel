import {AppBar, IconButton, Menu, Toolbar} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {
	ArrowBack as ArrowBackIcon,
	Menu as MenuIcon,
	Person as AccountIcon,
} from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import classNames from "classnames";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
// import { isAdminUser } from '../../helpers/search';
import {config} from "../../config";
// context
import {
	toggleSidebar,
	useLayoutDispatch,
	useLayoutState,
} from "../../context/LayoutContext";
import {logout} from "../../redux/actions/userActions";
// components
import {Typography} from "../Wrappers";
// styles
import useStyles from "./styles";

const BASE_ROOT_URL = config.BASE_ROOT_URL;

export default function Header(props) {
	const userSignIn = useSelector((state) => state.userSignin);
	//eslint-disable-next-line
	const {userInfo} = userSignIn;

	const userimage =
		BASE_ROOT_URL + "/" + userInfo?.userImage.split("\\").join("/");

	console.log("Header userInfo: ", userInfo);

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
		// console.log('logout');
		dispatch(logout());
		history.push("/signin");
	};

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					color="inherit"
					onClick={() => toggleSidebar(layoutDispatch)}
					className={classNames(
						classes.headerMenuButtonSandwich,
						classes.headerMenuButtonCollapse
					)}
				>
					{layoutState.isSidebarOpened ? (
						<ArrowBackIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse
								),
							}}
						/>
					) : (
						<MenuIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse
								),
							}}
						/>
					)}
				</IconButton>
				<div className={classes.navLogoWrapper}>
					<img
						src={process.env.PUBLIC_URL + "/BP_logo_Big.png"}
						alt="logo"
						className={classes.logotypeImage}
					/>
				</div>
				<Typography
					variant="h2"
					weight="medium"
					className={classNames(classes.logoLink, classes.logotype)}
					component={Link}
					to={"/admin"}
				>
					Best Practicify
				</Typography>
				<div className={classes.grow} />
				{/* {
          isAdminUser(userInfo) ? null : 
          <Typography
            className={classNames(
              classes.profileMenuLink,
              classes.logotype,
              classes.consultationTypeInNav
            )}
            variant="h2" 
            weight="medium"
            component={Link} to={'/admin/userProfile'}
          >
              {userInfo?.consultationTypeName}
          </Typography>
        } */}
				{/* <div>{userInfo.consultationTypeName}</div> */}

				<IconButton
					aria-haspopup="true"
					color="inherit"
					className={classes.headerMenuButton}
					aria-controls="profile-menu"
					onClick={(e) => setProfileMenu(e.currentTarget)}
				>
					{/* <AccountIcon classes={{ root: classes.headerIcon }} /> */}
					{userInfo?.userImage ? (
						<>
							<Avatar alt="Profile" src={userimage} />
							<span className={classes.menuUserName}>
								{userInfo && userInfo?.firstName}
							</span>
						</>
					) : (
						<AccountIcon classes={{root: classes.headerIcon}} />
					)}
				</IconButton>

				<Menu
					id="profile-menu"
					open={Boolean(profileMenu)}
					anchorEl={profileMenu}
					onClose={() => setProfileMenu(null)}
					className={classes.headerMenu}
					classes={{paper: classes.profileMenu}}
					disableAutoFocusItem
				>
					<div className={classes.profileMenuUserhidden}>
						<Typography variant="h4" weight="medium">
							{userInfo && userInfo.userName}
						</Typography>
						<Typography
							variant="h4"
							weight="medium"
							className={classes.consultationTypeInMenuBar}
						>
							{userInfo?.companyTypeName}
						</Typography>
						<Typography
							className={classes.profileMenuLink}
							color="primary"
							// href="/"
							component={Link}
							to={"/"}
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

					{/* <MenuItem
						className={classNames(
							classes.profileMenuItem,
							classes.headerMenuItem
						)}
						component={Link}
						to={"/admin/userProfile"}
						onClick={() => setProfileMenu(null)}
					>
						<AccountIcon className={classes.profileMenuIcon} /> Profile
					</MenuItem> */}
					<div className={classes.profileMenuUser}>
						<Typography
							className={classes.profileMenuLink}
							color="primary"
							component={Link}
							to={"/admin/userProfile"}
							onClick={() => setProfileMenu(null)}
						>
							<AccountCircleIcon className={classes.profilemenuicons} /> User
							Profile
						</Typography>

						<Typography
							className={classes.profileMenuLink}
							color="primary"
							component={Link}
							to={"/"}
							onClick={() => setProfileMenu(null)}
						>
							<RotateLeftIcon className={classes.profilemenuicons} />
							Visit Website
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
