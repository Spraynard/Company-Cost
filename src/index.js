import React from "react";
import { render } from "react-dom";
import store from "./store";
import stateData from "../data/default_state.json";
import testStateData from "../data/test_state.json";
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { myTheme } from './theme';

require("./utils.js");

const Business_Calculator = require("./components/Business_Calculator");


const store_data = store( testStateData );

window.store = store_data;
window.React = React;

render(
	<MuiThemeProvider theme={myTheme}>
	<CssBaseline />
	<Business_Calculator store={store_data} />
	</MuiThemeProvider>
	,
	document.getElementById("app-mount")
);
