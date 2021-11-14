import { CssBaseline } from "@material-ui/core";
// import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "@material-ui/styles";
import 'draft-js/dist/Draft.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Provider } from 'react-redux';
import App from './App';
// context
import { LayoutProvider } from "./context/LayoutContext";
import './index.css';
import store from './redux/store';
import Themes from "./themes";


ReactDOM.render(
  // <React.StrictMode>
  <LayoutProvider>
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </LayoutProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
