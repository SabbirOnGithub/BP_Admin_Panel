import {IconButton, makeStyles} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";

const useStyles = makeStyles((theme) => ({
	dialog: {
		padding: theme.spacing(2),
		position: "absolute",
		top: theme.spacing(5),
	},
	dialogTitle: {
		textAlign: "center",
	},
	dialogContent: {
		textAlign: "center",
	},
	dialogAction: {
		justifyContent: "center",
	},
	titleIcon: {
		backgroundColor: theme.palette.success.light,
		color: theme.palette.success.main,
		"&:hover": {
			backgroundColor: theme.palette.success.light,
			cursor: "default",
		},
		"& .MuiSvgIcon-root": {
			fontSize: "8rem",
		},
	},
}));

export default function PaymentSuccessDialog(props) {
	const {title, subTitle, details} = props;
	const classes = useStyles();
	const amountString = (details?.rate).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});

	return (
		<>
			<div className="card text-center purchase-success">
				<div className="card-body">
					<IconButton disableRipple className={classes.titleIcon}>
						<CheckCircleIcon />
					</IconButton>

					<h4 className="card-title title">{title}</h4>
					<div className="header"> Purchase Details </div>
					<p class="card-text">Package type : {details?.name}</p>
					<p class="card-text">Amount Paid: USD {amountString}</p>
					<p class="card-text">
						Payment Method: {details?.Brand === "visa" ? "Card" : "Paypal"}
					</p>
					{details?.Last4 ? (
						<p class="card-text">Card Number: **** {details?.Last4}</p>
					) : (
						""
					)}

					<p class="card-text message">
						A copy of the recipt has been emailed to you.
					</p>
					<div className="subtitle"> {subTitle}</div>
				</div>
			</div>

			{/* <div classes={{ paper: classes.dialog }}>
        <DialogTitle className={classes.dialogTitle}>
          <IconButton disableRipple className={classes.titleIcon}>
            <CheckCircleIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={`dialog-content ${classes.dialogContent}`}>
          <Typography variant="h6" className="title">
            {title}
          </Typography>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Purchase Details
              </Typography>

              <Typography variant="body2" component="p">
                Package type : {details.name}
              </Typography>

              <Typography variant="body2" component="p">
                Amount Paid: {details.rate}
              </Typography>

              <Typography variant="body2" component="p">
                Payment Method: {details.brand}
              </Typography>

              <Typography variant="body2" component="p">
                Card Number: **** {details.last4}
              </Typography>

              <Typography variant="caption" display="block" gutterBottom>
                A copy of the recipt has been emailed to you.
              </Typography>
            </CardContent>
          </Card>
          <Typography variant="subtitle2" className="subtitle">
            {subTitle}
          </Typography>
        </DialogContent>
      </div> */}
		</>
	);
}
