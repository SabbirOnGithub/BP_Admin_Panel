import React from "react";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1">
        {props.title}
      </Typography>
      {(props.button && props.showButton) && props.button}
    </div>
  );
}
