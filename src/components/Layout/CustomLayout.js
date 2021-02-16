import React from "react";

import classnames from "classnames";
import { Box } from '@material-ui/core'

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// context
import { useLayoutState } from "../../context/LayoutContext";

const  CustomLayout = props => {

    let classes = useStyles();

    // global
    let layoutState = useLayoutState();

  return (
    <div className={classes.root}>
    <>
      <Header history={props.history} />
      
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        
        <div className={classes.fakeToolbar} />
        <div style={{minHeight:'80%'}}> 
          { props.children}
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
