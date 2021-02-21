import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { Link, useHistory } from "react-router-dom";
import classnames from "classnames";
// styles
import useStyles from "./styles";


export default function NotFoundScreen(props) {
  var classes = useStyles();
 
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotype}>
        <img className={classes.logotypeIcon} src={process.env.PUBLIC_URL+"/BP_logo_Big.png"} alt="logo" />
        <Typography variant="h3" 
                    color="primary" 
                    className={classes.logotypeText}>
          Best Practicify
        </Typography>
      </div>
      <Paper classes={{ root: classes.paperRoot }}>
        <Typography
          variant="h1"
          color="primary"
          className={classnames(classes.textRow, classes.errorCode)}
        >
          404
        </Typography>
        <Typography variant="h5" color="primary" className={classes.textRow}>
          Oops. Looks like the page you're looking for no longer exists
        </Typography>
        <Typography
          variant="h4"
          color="textSecondary"
          // colorBrightness="secondary"
          className={classnames(classes.textRow)}
        >
          But we're here to bring you back to safety
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/admin"
          size="large"
          className={classes.backButton}
        >
          Back to Home
        </Button>
        {/* <Button
          variant="contained"
          color="primary"
          component={Link}
          // to='/'
          onClick={()=>{props.history.goBack()}}
          size="large"
          className={classes.backButton}
        >
          Back
        </Button> */}
        
      </Paper>
    </Grid>
  );
}
