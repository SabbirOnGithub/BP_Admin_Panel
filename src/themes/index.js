import defaultTheme from "./default";

// import { createMuiTheme } from "@material-ui/core";
import {createTheme} from "@material-ui/core/styles";
import KeepCalm from "../fonts/KeepCalm-Medium.ttf";

const keepCalm = {
	fontFamily: "KeepCalm",
	src: `
    local('KeepCalm'),
    local('KeepCalm-Medium'),
    url(${KeepCalm}) format('ttf')
  `,
	unicodeRange:
		"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const overrides = {
	typography: {
		h1: {
			fontSize: "3rem",
		},
		h2: {
			fontSize: "2rem",
		},
		h3: {
			fontSize: "1.64rem",
		},
		h4: {
			fontSize: "1.5rem",
		},
		h5: {
			fontSize: "1.285rem",
		},
		h6: {
			fontSize: "1.142rem",
		},
		fontFamily: ['"Open Sans"', "KeepCalm", "Roboto"].join(","),
		MuiCssBaseline: {
			"@global": {
				"@font-face": [keepCalm],
			},
		},
	},
};

//eslint-disable-next-line
export default {
	default: createTheme({...defaultTheme, ...overrides}),
};
