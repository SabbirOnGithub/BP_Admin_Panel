import tinycolor from "tinycolor2";

// const primary = "#536DFE"; // previous
// const secondary = "#FF5C93"; // previous


const primary = "#6264A7"; // medium light
const secondary = "#df4759"; // light red


// ---------------------------

const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";

const lightenRate = 7.5;
const darkenRate = 15;

//eslint-disable-next-line
export default {
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: "#FFFFFF",
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      primary: "#4A4A4A",
      secondary: "#6E6E6E",
      hint: "#B9B9B9",
    },
    background: {
      default: "#F6F7FF",
      light: "#F3F5FF",
    },
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },
  subHeadlineText :{
    // background:'skyblue', 
    // color:'#1a335b',
    color:'#252423',
    // background:'#c7d4e7', 
    background:'#f3f2f1', 
    padding:15, 
    marginRight:5
},
customPharagraph: {
  fontSize: '1.5rem',
  "& b": {
      // color: '#0096ff',
      color: '#1a335b',
      marginRight:5
  },
  marginRight:5,
  padding:10,
},
thinScrollBar :{
  '@global': {
    '*': {
      'scrollbar-width': 'thin',
    },
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '4px',
      backgroundColor: '#F5F5F5',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#767676',
      borderRadius: '10px'
    },
  },
},
 
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "#4A4A4A1A",
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
      },
    },
    MuiSelect: {
      icon: {
        color: "#B9B9B9",
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#F3F5FF !important",
          "&:focus": {
            backgroundColor: "#F3F5FF",
          },
        },
      },
      button: {
        "&:hover, &:focus": {
          backgroundColor: "#F3F5FF",
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: "white",
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid rgba(224, 224, 224, .5)",
        paddingLeft: 24
      },
      head: {
        // fontSize: "0.95rem",
        fontSize: "1.6rem",
      },
      body: {
        // fontSize: "0.95rem",
        fontSize: "1.6rem",
      },


    },
    PrivateSwitchBase: {
      root: {
        marginLeft: 10
      }
    },
    // 
    MuiPaper: {
      root: {
        '@global': {
          '*': {
            'scrollbar-width': 'thin',
          },
          '*::-webkit-scrollbar': {
            width: '0.4em',
            height: '4px',
            backgroundColor: '#F5F5F5',

          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#767676',
            borderRadius: '10px', 
          },
        },
      },
    },
    // 
  

  },

};
