// Import necessary components and utilities from MUI
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Define the SecondaryDraw component
const SecondaryDraw = () => {
    // Get the theme object
    const theme = useTheme();
    
    return <Box sx={{
        // Box component for the secondary drawer
        minWidth: `${theme.secondaryDraw.width}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        mt: `${theme.primaryAppBar.height}px`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: {xs: "none", sm: "block"},
        overflow:"auto",
        backgroundColor:"#673ab7",
}}>
    {[...Array(50)].map((_, i) => (
        <Typography key={i} paragraph>
            {i + 1}
        </Typography>
    ))}
</Box> 
}

// Export the SecondaryDraw component as default export
export default SecondaryDraw;