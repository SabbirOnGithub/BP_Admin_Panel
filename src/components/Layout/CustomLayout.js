import React from "react";

import classnames from "classnames";
import { Box } from '@material-ui/core'

// styles
import useStyles from "./styles";
import { useTheme } from "@material-ui/styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// context
import { useLayoutState } from "../../context/LayoutContext";

const CustomLayout = props => {

  let classes = useStyles();
  var theme = useTheme();


  // global
  let layoutState = useLayoutState();

  var windowWidth = window.innerWidth;
  var breakpointWidth = theme.breakpoints.values.md;
  var isSmallScreen = windowWidth < breakpointWidth;


  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />

        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
            [classes.setZIndex]: layoutState.isSidebarOpened && isSmallScreen
          })}
        >

          <div className={classes.fakeToolbar} />

          <div style={{ minHeight: '80%' }} > 
          
              {props.children} 
          
          </div>

          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
          </Box>
        </div>
      </>
    </div>
  );

}

export default CustomLayout;
