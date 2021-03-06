import React, { useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { Link } from "react-router-dom";
import classnames from "classnames";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// styles
import useStyles from "./styles";

// components
import Dot from "../Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../../../context/LayoutContext";

// redux action 
import { useSelector } from 'react-redux';

export default function SidebarLink({
  link,
  icon,
  label,
  children,
  location,
  nested,
  type,
}) {

  const roleResourceDetails = useSelector(state => state.roleResourceDetails);
  const { roleResource } = roleResourceDetails;

  const classes = useStyles();
  const theme = useTheme();

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  const windowWidth = window.innerWidth;
  const breakpointWidth = theme.breakpoints.values.md;
  const isSmallScreen = windowWidth < breakpointWidth;


  // local
  const [isOpen, setIsOpen] = useState(false);
  const isLinkActive =
    link &&
    (location.pathname === link);
    // (location.pathname === link || location.pathname.indexOf(link) !== -1);

  if (type === "title"){
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );
  }

  if (type === "divider") {return <Divider className={classes.divider} />;}

  if (!children){
      return (
        <>
        <ListItem
        button
        component={link && Link}
        to={link}
        className={classes.link}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple
        onClick={() => (isSidebarOpened && isSmallScreen) && toggleSidebar(layoutDispatch)}
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
        </>
    );
    
  }
  return (
    <>
    {
      children.some((childrenLink=>{if((roleResource.find(item => {return item.urlPath === childrenLink.link})?.readOperation)){return true} return false})) && 
      <ListItem
        button
        component={link && Link}
        onClick={toggleCollapse}
        className={classes.link}
        to={link}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon ? icon : <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}

        />
        {isSidebarOpened && <ExpandMoreIcon className={isOpen ? classes.rotateIcon : null}/>} 
      </ListItem>
    }
      
      {children &&(
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {children.map(childrenLink => (
              (roleResource.find(item => {return item.urlPath === childrenLink.link})?.readOperation) &&
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                classes={classes}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );

  // ###########################################################

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
