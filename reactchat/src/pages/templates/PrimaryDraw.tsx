// Import necessary components and utilities from MUI
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery, styled } from "@mui/material";
import { useEffect, useState, ReactNode } from "react";
import Drawertoggle from "../../components/PrimaryDraw/DrawToggle";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";

// Define the Props type for the PrimaryDraw component
type Props = {
   children:ReactNode;
};

// Define the ChildProps type for child components
type ChildProps = {
    open:Boolean;
};

// Define the ChildElement type for React elements with ChildProps
type ChildElement = React.ReactElement<ChildProps>;

// Define the PrimaryDraw component
const PrimaryDraw: React.FC<Props> = ({ children }) => {
    const theme = useTheme();                                     // Get the theme object
    const below600 = useMediaQuery("(max-width:599px)");          // Media query to check if the screen width is below 600px
    const [open, setOpen] = useState(!below600);                  // State to manage the drawer open state

    // Function to create the opened drawer styles
    const openedMixin = () => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
    });

    // Function to create the closed drawer styles
    const closedMixin = () => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.primaryDraw.closed,
    });

    // Styled drawer component with conditional styles based on open state
    const Drawer = styled(
        MuiDrawer,
        {}
    )(({ theme, open }) => ({
        width: theme.primaryDraw.width,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(),
            "& .MuiDrawer-paper": openedMixin(),
        }),
        ...(!open && {
            ...closedMixin(),
            "& .MuiDrawer-paper": closedMixin(),
        }),
    }));

    // Effect to set the drawer open state based on screen width
    useEffect(() => {
        setOpen(!below600);
    }, [below600]);

    // Function to handle drawer open
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    // Function to handle drawer close
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return(<>
        {/* Render the drawer component */}
        <Drawer 
        open={open} 
        variant={below600 ? "temporary":"permanent"}
        PaperProps={{
            sx: {
                mt: `${theme.primaryAppBar.height}px`,
                height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
                width: theme.primaryDraw.width,
                backgroundColor:"#5e35b1",
            },
        }}
        >
            <Box>
                <Box
                    sx={{
                        position:"absolute",
                        top:0,
                        right:0,
                        p:0,
                        width: open ? "auto" : "100%",
                        
                    }}
                >
                    {/* Render the drawer toggle button */}
                    <Drawertoggle open={open} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>
                </Box>
                {/* Clone child elements and pass open prop */}
                {React.Children.map(children, (child) => {
                        return React.isValidElement(child)
                            ? React.cloneElement(child as ChildElement, {open})
                            : child;
                    })}
            </Box>
        </Drawer>
    </>);
};
export default PrimaryDraw;