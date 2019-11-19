import { createMuiTheme } from "@material-ui/core/styles";
import "./fonts/fonts.css";

export const myTheme = createMuiTheme({
	typography : {
		useNextVariants : true,
		siteTitle : {
			fontFamily : "Banknote"
		}
	},
	palette: {
		primary: {
			light : "#6abf69",
			dark : "#00600f",
			main : "#388e3c",
			contrastText: "#000"
		},
		secondary: {
			light : "#718792",
			dark : "#1c313a",
			main : "#455a64",
			contrastText: "#fff"
		},
		dummy: {
			backgroundNonGradient: 'rgb(151, 191, 151)',
			backgroundGradient: 'linear-gradient(131deg, rgba(231,255,231,1) 0%, rgba(76,255,105,1) 100%)',
			backgroundGradient2: 'linear-gradient(131deg, rgba(135,25,0,1) 0%, rgba(255,76,76,1) 100%)',
			color: '#6dade6', //'#83baea',//'#40a5ff',
			dark: "#bfbfbf",
			main: ""
		}
	},
	overrides : {
		MuiTableRow : {
			root : {
				height : 24
			},
			head : {
				height : 32
			},
			footer : {
				height : 32
			}
		},
		MuiButton : {
			containedPrimary : {
				color: "#fff"
			}
		}
	}
});