import { ChevronRight,  ChevronLeft } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material"
import React from "react";

// Define the Props type for the component
type Props = {
    open: boolean;
    handleDrawerClose: () => void;
    handleDrawerOpen: () => void;
};

// Define the Drawertoggle functional component with Props type
const Drawertoggle: React.FC<Props>= ({
    open,
    handleDrawerClose,
    handleDrawerOpen,
}) => {
    return (
        <Box
        sx={{
            height: "50px",
            display: "flex",
            alighItems: "center",
            justifyContent: "center",
        }}
        >
            <IconButton onClick={open ?  handleDrawerClose : handleDrawerOpen}>
                {open ? <ChevronLeft/> : <ChevronRight/>}
            </IconButton>
        </Box>
    );
};

export default Drawertoggle;