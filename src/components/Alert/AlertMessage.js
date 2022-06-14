import {makeStyles} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {Alert} from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		top: theme.spacing(9),
	},
}));

export default function AlertMessage(props) {
	const {notify, setNotify} = props;
	const classes = useStyles();

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setNotify({
			...notify,
			isOpen: false,
		});
	};

	return (
		<>
			<Collapse in={notify.isOpen}>
				<Alert
					severity={notify.type}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={handleClose}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					<span style={{fontSize: "14px"}}>{notify.message}</span>
				</Alert>
			</Collapse>
		</>
	);
}
