// Import necessary components and utilities from MUI and local files

import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import PopularChannels from "../components/PrimaryDraw/PopularChannels";

// Define the Home component
const Home = () => {
    return (
    // Create a flex container to layout the child components
    <Box sx={{ display: "flex" }}>
        <CssBaseline />         {/* Normalize CSS styles */}
        <PrimaryAppBar />       {/* Add the primary app bar at the top */}
        {/* Add the primary drawer with PopularChannels as its child */}
        <PrimaryDraw>
            <PopularChannels/>
        </PrimaryDraw>
        <SecondaryDraw/>        {/* Add the secondary drawer */}
        <Main/>                 {/* Main content area */}
    </Box>
    );
};


// Export the Home component as default export
export default Home;