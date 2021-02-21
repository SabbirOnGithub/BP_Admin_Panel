import React from "react";
import { Grid, Typography  } from "@material-ui/core";
import WarningIcon from '@material-ui/icons/Warning';
// import { Link } from "react-router-dom";

// styles
import useStyles from "./styles";


export default function AccessDeniedScreen() {
  var classes = useStyles();
 
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.fullSize}
    >
      <WarningIcon style={{height:100, width:100}} />
      <Typography variant="h5" align="center">
      OPPSSS!!!! Sorry...
      </Typography>
      <Typography variant="h3" align="center">
        Sorry, your access is refused due to security reasons of our server and also our sensitive data.
        <br /> Please go back to the previous page to continue browsing. 
      </Typography>
      {/* <div className={classes.beforeTooLate}>
            <Button 
                component={Link}
                className={classes.textLink} 
                to="/admin"
                size="large"
                color="secondary"
                variant="contained"
                >
                Go back to Home
              </Button>
      </div> */}
    </Grid>
  );
}
