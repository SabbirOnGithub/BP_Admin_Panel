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
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PaymentIcon from '@material-ui/icons/Payment';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
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
  setSidbarForMobile,
  setSidbarForDesktop
} from "../../context/LayoutContext";

import { useSelector } from 'react-redux';


const structure = [
  { id: 0, label: "Dashboard", link: "/admin", icon: <AppsIcon /> },
  {
    id: 1,
    label: "Home Page",
    // link: "/admin/homepage",
    icon: <HomeIcon />,
    children: [
      { label: "Basic Info", link: "/admin/homepage" },
      { label: "Slider", link: "/admin/homePageSlider" },
      { label: "Short Intro", link: "/admin/shortIntro" },
      { label: "Walk-through", link: "/admin/homePageFunctionAreaDetail" },
      { label: "Consulting", link: "/admin/homeConsultationTopic" },
      { label: "Core Values", link: "/admin/homePageCoreValueDetail" },
      { label: "Modern Tech", link: "/admin/modernTechDetail" },
      { label: "Personalized Service Detail", link: "/admin/personalizedServiceDetail" },
      { label: "Unique Solution Detail", link: "/admin/uniqueSolutionDetail" },
    ],
  },
  {
    id: 2,
    label: "Menu",
    // link: "/admin/menu",
    icon: <MenuIcon />,
    children: [
      { label: "Menu", link: "/admin/menu" },
      { label: "Menu Section", link: "/admin/menuSection" },
      { label: "Menu Section Details", link: "/admin/menuSectionDetail" },
      { label: "Menu Hero Slider", link: "/admin/menuHeroSlider" },
    ],
  },
  {
    id: 3,
    label: "SubMenu",
    // link: "/admin/menu",
    icon: <SubjectIcon />,
    children: [
      { label: "Submenu", link: "/admin/submenu" },
      { label: "Submenu Best Practice", link: "/admin/submenuBestPractice" },
      { label: "SubMenu Overview", link: "/admin/subMenuOverView" },
      { label: "SubMenu Business Context", link: "/admin/subMenuBusinessContext" },
    ],
  },
  {
    id: 4,
    label: "Menu SubMenu",
    // link: "/admin/menuSubMenuMap",
    icon: <FeaturedPlayListIcon />,
    children: [
      { label: "Menu SubMenu Map", link: "/admin/menuSubMenuMap" },
      { label: "Menu Sub Menu Map Detail", link: "/admin/menuSubMenuMapDetail" },
      { label: "Menu SubMenu Map Item", link: "/admin/menuSubMenuMapItem" },
      { label: "Menu Sub Menu Map Item List Item", link: "/admin/menuSubMenuMapItemListItem" },
    ],
  },
  {
    id: 5, label: "Training Detail", link: "/admin/trainingDetail", icon: <TrendingUpIcon />,
  },
  {
    id: 6, label: "Testimonial Detail", link: "/admin/testimonialDetail", icon: <DescriptionIcon />,
  },
  {
    id: 7, label: "Footer Section", link: "/admin/footerSection", icon: <TypographyIcon />,
  },
  {
    id: 8,
    label: "Blog",
    // link: "/admin/blogPost",
    icon: <BookIcon />,
    children: [
      { label: "Blog Post", link: "/admin/blogPost" },
      { label: "Blog Category", link: "/admin/blogCategory" },
      { label: "Blog Sub Category", link: "/admin/blogSubCategory" },
    ],
  },
  {
    id: 9,
    label: "Settings",
    // link: "/admin/resource",
    icon: <SettingsIcon />,
    children: [
      { label: "Role", link: "/admin/role" },
      { label: "Users", link: "/admin/user" },
      { label: "Resource", link: "/admin/resource" },
      { label: "Role Resource", link: "/admin/roleResource" },
    ],
  },
  {
    id: 10,
    label: "Consultancy",
    link: "/admin/cta",
    icon: <BookIcon />,
  },
  {
    id: 11,
    label: "Contact Us",
    link: "/admin/contactUs",
    icon: <ContactSupportIcon />,
  },
  {
    id: 12,
    label: "Payment Package",
    link: "/admin/paymentPackage",
    icon: <PaymentIcon />,
  },
  {
    id: 13,
    label: "Payment Configuration",
    // link: "/admin/resource",
    icon: <PermDataSettingIcon />,
    children: [
      { label: "Consulting Type", link: "/admin/consultingType" },
      { label: "Cta Hour", link: "/admin/ctaHour" },
      { label: "Cta Package Daily", link: "/admin/ctaPackageDaily" },
      { label: "Company Type", link: "/admin/companyType" },
      { label: "Cta Package Hourly", link: "/admin/ctaPackageHourly" },
      { label: "Cta Package Monthly Yearly", link: "/admin/ctaPackageMonthlyYearly" },
    ],
  },
  {
    id: 14, label: "Business Principal Descriptor", link: "/admin/businessPrincipalDescriptor", icon: <TypographyIcon />,
  },
  {
    id: 15, label: "Consultation Overview", link: "/admin/consultationOverview", icon: <TypographyIcon />,
  },
  {
    id: 16, label: "Training Candidate Descriptor", link: "/admin/trainingCandidateDescriptor", icon: <TypographyIcon />,
  },
  {
    id: 17, label: "Training Overview", link: "/admin/trainingOverview", icon: <TypographyIcon />,
  },
  {
    id: 18, label: "Training Type", link: "/admin/trainingType", icon: <TypographyIcon />,
  },
  {
    id: 19, label: "Software", link: "/admin/software", icon: <TypographyIcon />,
  },
  {
    id: 20, label: "Course Benefit", link: "/admin/courseBenefit", icon: <TypographyIcon />,
  },
  {
    id: 21, label: "Course Content", link: "/admin/courseContent", icon: <TypographyIcon />,
  },
  {
    id: 22, label: "Course Requirement", link: "/admin/courseRequirement", icon: <TypographyIcon />,
  },
  {
    id: 23, label: "Software Training Summary", link: "/admin/softwareTrainingSummary", icon: <TypographyIcon />,
  },
  {
    id: 24, label: "Software Training Price", link: "/admin/softwareTrainingPrice", icon: <TypographyIcon />,
  },
  {
    id: 25, label: "Software Training Type And Length", link: "/admin/softwareTrainingTypeAndLength", icon: <TypographyIcon />,
  },
  {
    id: 26, label: "Course Purchase", link: "/admin/coursePurchase", icon: <TypographyIcon />,
  },
  {
    id: 27, label: "Subscription", link: "/admin/subscription", icon: <TypographyIcon />,
  },
];



function Sidebar({ location }) {
  const roleResourceDetails = useSelector(state => state.roleResourceDetails);
  const { roleResource } = roleResourceDetails;

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
    <>
      { 
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
          {roleResource?.length>0 && structure.map(link => (
            (roleResource?.find(item => {return item.urlPath === link.link})?.readOperation || link.children) &&
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
            
          ))}
        </List>
      </Drawer>
      }
    </>
  );

  //##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
      setSidbarForMobile(layoutDispatch)
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
      setSidbarForDesktop(layoutDispatch)
    }
  }
}

export default withRouter(Sidebar);
