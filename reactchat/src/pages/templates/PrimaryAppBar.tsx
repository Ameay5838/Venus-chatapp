// Import necessary components and utilities from MUI
import { AppBar, Toolbar, Typography, Link, IconButton, Box, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu"
import {useEffect, useState} from "react";

// Define the PrimaryAppBar component
const PrimaryAppBar = () => {
    const [sideMenu, setSideMenu] = useState(false);        // State to manage the side menu visibility
    const theme = useTheme();                               // Get the theme object
    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));    // Media query to check if the screen is small

    // Effect to close the side menu when the screen is small
    useEffect(() => {
        if (isSmallScreen && sideMenu){
            setSideMenu(false);
        }
    },[isSmallScreen]); 

    // Function to toggle the side menu
    const toggleDrawer = (event: React.MouseEvent | React.KeyboardEvent) => {
        if(
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        
        setSideMenu(!sideMenu);
    }

    return (
        // AppBar component for the primary app bar
        <AppBar
            sx={{
                zIndex: (theme)=> theme.zIndex.drawer + 2,
                backgroundColor: "#4a148c",
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}>
            {/* Toolbar for the app bar */}
            <Toolbar variant="dense" sx={{
                height: theme.primaryAppBar.height,
                minHeight: theme.primaryAppBar.height
            }}>
                {/* Box to display the menu icon on small screens */}
                <Box sx={{ display: {xs:"block", sm: "none"}}}>
                    <IconButton aria-label="open drawer" edge="start" sx={{mr:1, color: "#673ab7"}} onClick={toggleDrawer}>
                        <MenuIcon/>
                    </IconButton>
                </Box>

                {/* Drawer component for the side menu */}
                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer}>
                    {[...Array(100)].map((_, i) => (
                        <Typography key={i} paragraph>
                            {i + 1}
                        </Typography>
                    ))}
                </Drawer>

                {/* Link component for the app title */}
                <Link href="/" underline="none" color="#ede7f6">
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ display: { fontWeight: 1000, letterSpacing: "-0.5px", fontFamily: "'Dancing Script', cursive" } }}
                    >
                        VenusChat
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

// Export the PrimaryAppBar component as default export
export default PrimaryAppBar;