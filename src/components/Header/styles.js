// import { fade } from "@material-ui/core/styles/colorManipulator";
import {alpha} from "@material-ui/core/styles";
import {makeStyles} from "@material-ui/styles";
export default makeStyles((theme) => ({
	logotype: {
		color: "#ffffff",
		marginLeft: theme.spacing(0.8),
		marginRight: theme.spacing(0.8),
		fontWeight: 500,
		fontSize: 18,
		whiteSpace: "nowrap",
		textTransform: "uppercase",
		[theme.breakpoints.down("xs")]: {
			// display: "none",
		},
	},
	navLogoWrapper: {
		height: 50,
		width: 50,
		borderRadius: "10px",
		background: "#1a335b",
		textAlign: "center",
		[theme.breakpoints.down("xs")]: {
			display: "none",
		},
	},
	logotypeImage: {
		whiteSpace: "nowrap",
		height: 50,
		width: 50,
	},
	consultationTypeInNav: {
		padding: "10px 15px",
		"&:hover": {
			// background: "#f00",
			backgroundColor: "#ffffff",
			color: theme.palette.primary.main,
		},
		[theme.breakpoints.down("xs")]: {
			display: "none",
		},
	},
	consultationTypeInMenuBar: {
		// display: "none",
		marginTop: 15,
		[theme.breakpoints.down("xs")]: {
			display: "block",
		},
	},
	appBar: {
		// width: "100vw",
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflow: "auto",
	},
	toolbar: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	grow: {
		flexGrow: 1,
	},
	search: {
		position: "relative",
		borderRadius: 25,
		paddingLeft: theme.spacing(2.5),
		width: 36,
		backgroundColor: alpha(theme.palette.common.black, 0),
		transition: theme.transitions.create(["background-color", "width"]),
		"&:hover": {
			cursor: "pointer",
			backgroundColor: alpha(theme.palette.common.black, 0.08),
		},
	},
	searchFocused: {
		backgroundColor: alpha(theme.palette.common.black, 0.08),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: 250,
		},
	},
	searchIcon: {
		width: 36,
		right: 0,
		height: "100%",
		position: "absolute",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		transition: theme.transitions.create("right"),
		"&:hover": {
			cursor: "pointer",
		},
	},
	searchIconOpened: {
		right: theme.spacing(1.25),
	},
	inputRoot: {
		color: "inherit",
		width: "100%",
	},
	inputInput: {
		height: 36,
		padding: 0,
		paddingRight: 36 + theme.spacing(1.25),
		width: "100%",
	},
	messageContent: {
		display: "flex",
		flexDirection: "column",
	},
	headerMenu: {
		marginTop: theme.spacing(7),
	},
	headerMenuList: {
		display: "flex",
		flexDirection: "column",
	},
	headerMenuItem: {
		"&:hover, &:focus": {
			backgroundColor: theme.palette.background.light,
			// color: "white",
		},
	},
	headerMenuButton: {
		marginLeft: theme.spacing(2),
		padding: theme.spacing(0.5),
	},
	headerMenuButtonSandwich: {
		marginLeft: 9,
		[theme.breakpoints.down("sm")]: {
			marginLeft: 0,
		},
		padding: theme.spacing(0.5),
	},
	headerMenuButtonCollapse: {
		marginRight: theme.spacing(2),
	},
	headerIcon: {
		fontSize: 28,
		height: 30,
		width: 30,
		color: "rgba(255, 255, 255, 0.35)",
	},
	headerIconCollapse: {
		color: "white",
	},
	profileMenu: {
		minWidth: 265,
	},
	profileMenuUser: {
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(2),
	},
	profileMenuUserhidden: {
		display: "none",
	},
	profileMenuItem: {
		color: theme.palette.text.hint,
	},
	profileMenuIcon: {
		marginRight: theme.spacing(2),
		color: theme.palette.text.hint,
		"&:hover": {
			color: theme.palette.primary.main,
		},
	},
	profilemenuicons: {
		marginRight: "10px",
		fontSize: "20px",
	},
	logoLink: {
		fontSize: 16,
		padding: "10px 5px",
		textDecoration: "none",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		"&:hover": {
			cursor: "pointer",
		},
	},

	profileMenuLink: {
		fontSize: 16,
		padding: "10px 5px",
		borderBottom: "1px solid #e5e5ff",
		textDecoration: "none",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		"&:hover": {
			cursor: "pointer",
			backgroundColor: "#f4f7ff",
		},
	},
	messageNotification: {
		height: "auto",
		display: "flex",
		alignItems: "center",
		"&:hover, &:focus": {
			backgroundColor: theme.palette.background.light,
		},
	},
	messageNotificationSide: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginRight: theme.spacing(2),
	},
	messageNotificationBodySide: {
		alignItems: "flex-start",
		marginRight: 0,
	},
	sendMessageButton: {
		margin: theme.spacing(4),
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		textTransform: "none",
	},
	sendButtonIcon: {
		marginLeft: theme.spacing(2),
	},
	purchaseBtn: {
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
		marginRight: theme.spacing(3),
	},

	menuUserName: {
		paddingLeft: "5px",
	},
	avaterButton: {
		padding: 10,
		fontSize: 15,
	},
}));
