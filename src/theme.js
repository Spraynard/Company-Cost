import { createMuiTheme } from "@material-ui/core/styles";
import { fade, lighten, darken } from "@material-ui/core/styles/colorManipulator";
import "./fonts/fonts.css";

const defaultTheme = createMuiTheme({
	palette : {
		primary: {
			main: "#185a9d",
		},
		secondary: {
			main: "#455a64",
		}
	}
});

export const CompanyCostTheme = createMuiTheme({
	typography : {
		useNextVariants : true,
		siteTitle : {
			fontFamily : "Banknote"
		}
	},
	palette: {
		...defaultTheme.palette,
		gradients: {
			secondRiver: "linear-gradient(to left, #43cea2, #185a9d)",
			secondRiverReverse: "linear-gradient(to right, #43cea2, #185a9d)",
			secondRiverToTop: "linear-gradient(to top, #43cea2, #185a9d)"
		},
	},
	overrides : {
		MuiButton: {
			containedPrimary: {
				color: "#fff"
			}
		},
		MuiTable : {
			// root : {
			// 	borderCollapse : "separate",
			// 	borderSpacing : "0px"
			// }
		},
		// MuiTableBody : { // This override will remove the borders on all body table cells on hover
		// 	root : {
		// 		"&:hover" : {
		// 			"& .MuiTableCell-body" : {
		// 				border : "none"
		// 			}
		// 		}
		// 	}
		// },
		MuiTableCell : {
			head : {
				borderColor: defaultTheme.palette.primary.main,
				color: defaultTheme.palette.primary.main,
				paddingBottom : 0,
				paddingLeft: 0,
				paddingTop: defaultTheme.spacing(1)
			},
			footer : {
				borderBottom : "none",
			},
			sizeSmall : {
				padding: "0 0 0 4px"
			}
		},
		MuiTableHead: {
			root : {
				backgroundColor: lighten( defaultTheme.palette.primary.light, .75 )
			}
		},
		MuiTableRow: {
			root: {
				height: 24,
				// "&:hover" : {
				// 	"& .MuiTableCell-body" : {
				// 		borderBottom: `1px solid
				// 		${
				// 			defaultTheme.palette.type === "light"
				// 			? lighten(fade(defaultTheme.palette.divider, 1), 0.88)
				// 			: darken(fade(defaultTheme.palette.divider, 1), 0.68)
				// 		}`,
				// 		borderTop: `1px solid
				// 		${
				// 			defaultTheme.palette.type === "light"
				// 				? lighten(fade(defaultTheme.palette.divider, 1), 0.88)
				// 				: darken(fade(defaultTheme.palette.divider, 1), 0.68)
				// 			}`,
				// 	}
				// },
			},
			head: {
				height: 32
			},
			footer: {
				height: 32,
			}
		},
		MuiTableFooter: {
			root: {
				transition: defaultTheme.transitions.create(["opacity"])
			}
		},
		MuiTypography: {
			subtitle2: {
				fontWeight : defaultTheme.typography.fontWeightLight
			}
		}
	}
});