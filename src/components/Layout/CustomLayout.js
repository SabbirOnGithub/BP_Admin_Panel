// import React from "react";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classnames from "classnames";
import { Box } from '@material-ui/core'
// import {Box, IconButton, Link} from '@material-ui/core'
// import Icon from '@mdi/react'

//icons
// import {
//   mdiFacebook as FacebookIcon,
//   mdiTwitter as TwitterIcon,
//   mdiGithub as GithubIcon,
// } from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";



// context
import { useLayoutState } from "../../context/LayoutContext";

// redux actions
import { detailsRoleResource } from '../../redux/actions/roleResourceActions';


const  CustomLayout = props => {
  
    let classes = useStyles();

    // global
    let layoutState = useLayoutState();

    const roleResourceDetails = useSelector(state => state.roleResourceDetails);
    const { roleResource, loading:loadingResources } = roleResourceDetails;

    const userSignIn = useSelector( state => state.userSignin );
    const {  userInfo  } = userSignIn;

    const dispatch = useDispatch();

    useEffect(() => {
      if(typeof roleResource === 'object' && roleResource !== null && Object.keys(roleResource).length === 0){
        dispatch(detailsRoleResource(userInfo.userId))
      }
      return () => {
          // 
      }
  }, [dispatch, roleResource, userInfo.userId])

  return ( loadingResources ? 'loading' :
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
          {props.children}
        </div>
       
        <Box
          mt={5}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent="space-between"
        >
{/*           
          <div>
            <Link
              color={'primary'}
              href={'/'}
              target={'_blank'}
              className={classes.link}
            >
              Best Practicify
            </Link>
            <Link
              color={'primary'}
              href={'/'}
              target={'_blank'}
              className={classes.link}
            >
              About Us
            </Link>
            <Link
              color={'primary'}
              href={'/'}
              target={'_blank'}
              className={classes.link}
            >
              Blog
            </Link>
          </div>
          <div>
            <Link
              href={'/'}
              target={'_blank'}
            >
              <IconButton aria-label="facebook">
                <Icon
                  path={FacebookIcon}
                  size={1}
                  color="#6E6E6E99"
                />
              </IconButton>
            </Link>
            <Link
              href={'/'}
              target={'_blank'}
            >
              <IconButton aria-label="twitter">
                <Icon
                  path={TwitterIcon}
                  size={1}
                  color="#6E6E6E99"
                />
              </IconButton>
            </Link>
            <Link
              href={'/'}
              target={'_blank'}
            >
              <IconButton
                aria-label="github"
                style={{marginRight: -12}}
              >
                <Icon
                  path={GithubIcon}
                  size={1}
                  color="#6E6E6E99"
                />
              </IconButton>
            </Link>
          </div>
         */}
        </Box>
      </div>
    </>
</div>
  );
}

export default CustomLayout;
