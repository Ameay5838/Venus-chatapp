// Import necessary utilities from MUI
import { createTheme, responsiveFontSizes } from "@mui/material";

// Extend the MUI theme interface to include custom properties
declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number;
        };
        primaryDraw:{
            width:number;
            closed:70;
        };
        secondaryDraw:{
            width:number;
        };
    }
    interface ThemeOptions {
        primaryAppBar: {
            height: number;
        };
        primaryDraw:{
            width:number;
            closed:70;
        };
        secondaryDraw:{
            width:number;
        };
    }
}

export const createMuiTheme = () => {
    let theme = createTheme({

        typography: {
            fontFamily: ["Poppins", "sans-serif"].join(","),
        },

        primaryAppBar: {
            height: 50,
        },

        secondaryDraw:{
            width:240
        },

        primaryDraw:{
            width:240,
            closed:70,
        },

        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "default",
                    elevation: 0,
                }
            }
        }
    });
    theme = responsiveFontSizes(theme);
    return theme;
};
export default createMuiTheme;