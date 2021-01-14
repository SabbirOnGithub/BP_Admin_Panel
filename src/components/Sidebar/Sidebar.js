import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SubjectIcon from '@material-ui/icons/Subject';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import BookIcon from '@material-ui/icons/Book';
import AppsIcon from '@material-ui/icons/Apps';
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
  { id: 0, label: "Dashboard", link: "/dashboard", icon: <AppsIcon /> },
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
      { label: "Modern Tech", link: "/dashboard/modernTechDetail" },
      { label: "Personalized Service Detail", link: "/dashboard/personalizedServiceDetail" },
      { label: "Unique Solution Detail", link: "/dashboard/uniqueSolutionDetail" },
    ],
  },
  {
    id: 2,
    label: "Menu",
    link: "/dashboard/menu",
    icon: <MenuIcon />,
    children: [
      { label: "Menu", link: "/dashboard/menu" },
      { label: "Menu Section", link: "/dashboard/menuSection" },
      { label: "Menu Section Details", link: "/dashboard/menuSectionDetail" },
      { label: "Menu Hero Slider", link: "/dashboard/menuHeroSlider" },
    ],
  },
  {
    id: 3,
    label: "SubMenu",
    link: "/dashboard/menu",
    icon: <SubjectIcon />,
    children: [
      { label: "Submenu", link: "/dashboard/submenu" },
      { label: "Submenu Best Practice", link: "/dashboard/submenuBestPractice" },
      { label: "SubMenu Overview", link: "/dashboard/SubMenuOverView" },
      { label: "SubMenu Business Context", link: "/dashboard/subMenuBusinessContext" },
    ],
  },
  {
    id: 4,
    label: "Menu SubMenu",
    link: "/dashboard/menuSubMenuMap",
    icon: <FeaturedPlayListIcon />,
    children: [
      { label: "Menu SubMenu Map", link: "/dashboard/menuSubMenuMap" },
      { label: "Menu Sub Menu Map Detail", link: "/dashboard/menuSubMenuMapDetail" },
      { label: "Menu SubMenu Map Item", link: "/dashboard/menuSubMenuMapItem" },
      { label: "Menu Sub Menu Map Item List Item", link: "/dashboard/menuSubMenuMapItemListItem" },
    ],
  },
  {
    id: 5, label: "Training Detail", link: "/dashboard/trainingDetail", icon: <TrendingUpIcon />,
  },
  {
    id: 6, label: "Testimonial Detail", link: "/dashboard/testimonialDetail", icon: <DescriptionIcon />,
  },
  {
    id: 7, label: "Footer Section", link: "/dashboard/footerSection", icon: <TypographyIcon />,
  },
  {
    id: 8,
    label: "Blog",
    link: "/dashboard/blogPost",
    icon: <BookIcon />,
    children: [
      { label: "Blog Post", link: "/dashboard/blogPost" },
      { label: "Blog Category", link: "/dashboard/blogCategory" },
      { label: "Blog Sub Category", link: "/dashboard/blogSubCategory" },
    ],
  },
  {
    id: 9,
    label: "Settings",
    link: "/dashboard/resource",
    icon: <SettingsIcon />,
    children: [
      { label: "Resource", link: "/dashboard/resource" },
      { label: "Role Resource", link: "/dashboard/roleResource" },
    ],
  },
  

];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
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

  //##################################################################
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
