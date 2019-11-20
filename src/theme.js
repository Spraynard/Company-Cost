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
		gradients: {
			secondRiver: 'linear-gradient(to left, #43cea2, #185a9d)',
			secondRiverReverse: 'linear-gradient(to right, #43cea2, #185a9d)',
			secondRiverToTop: 'linear-gradient(to top, #43cea2, #185a9d)'
		},
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