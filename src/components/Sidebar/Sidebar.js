import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  FormatSize as TypographyIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Home Page",
    link: "/dashboard/homepage",
    icon: <HomeIcon />,
    children: [
      { label: "Basic Info", link: "/dashboard/homepage" },
      { label: "Slider", link: "/dashboard/homePageSlider" },
      { label: "Short Intro", link: "/dashboard/submenu" },
      { label: "Walk-through", link: "/dashboard/homePageFunctionAreaDetail" },
      { label: "Consulting", link: "/dashboard/homeConsultationTopic" },
      { label: "Core Values", link: "/dashboard/homePageCoreValueDetail" },
    ],
  },
  {
    id: 2, label: "Menu", link: "/dashboard/menu", icon: <TypographyIcon />,
  },
  // {
  //   id: 3, label: "Sub Menu", link: "/dashboard/submenu", icon: <TypographyIcon />,
  // },
  {
    id: 4, label: "Footer Section", link: "/dashboard/footerSection", icon: <TypographyIcon />,
  },
  {
    id: 5, label: "Training Detail", link: "/dashboard/trainingDetail", icon: <TypographyIcon />,
  },
  {
    id: 6, label: "Testimonial Detail", link: "/dashboard/testimonialDetail", icon: <TypographyIcon />,
  },
  {
    id: 7, label: "Submenu Best Practice", link: "/dashboard/submenuBestPractice", icon: <TypographyIcon />,
  },
  
  // {
  //   id: 4,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);

    }
  }
}

export default withRouter(Sidebar);
