import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
  } from "@mui/material";
  import useCrud from "../../hooks/useCrud";
  import { useEffect } from "react";
  import ListItemAvatar from "@mui/material/ListItemAvatar";
  import Avatar from "@mui/material/Avatar";
  import { MEDIA_URL } from "../../config";
  import { Link } from "react-router-dom";
  
  // Define the Server interface to represent server data
  interface Server {
    id: number;
    name: string;
    category: string;
    icon: string;
  }
  
  // Define the Props type for the component
  type Props = {
    open: boolean;    // Boolean to check if the drawer is open
  };
  
  // Define the PopularChannels functional component with Props type
  const PopularChannels: React.FC<Props> = ({ open }) => {

    // Use the useCrud hook to manage server data
    const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
      [],
      "/server/select/"
    );
    
    // Fetch data on component mount
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <>
        <Box
          sx={{
            height: 50,
            p: 2,
            display: "flex",
            alignItems: "center",
            flex: "1 1 100%",
            backgroundColor: "#5e35b1",
            elevation:0
          }}
        >
          <Typography sx={{ display: open ? "block" : "none", color: "#ede7f6"  }}>
            Popular
          </Typography>
        </Box>
        <List>
          {dataCRUD.map((item) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{ display: "block" }}
              dense={true}
              
            >
              <Link
                to={`/server/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton sx={{ minHeight: 0 }}>
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                    <ListItemAvatar sx={{ minWidth: "50px" }}>
                      <Avatar
                        alt="Server Icon"
                        src={`${MEDIA_URL}${item.icon}`}
                      />
                    </ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.2,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          color:"#ede7f6",
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.2,
                          color:"#ede7f6",
                        }}
                      >
                        {item.category}
                      </Typography>
                    }
                    sx={{ opacity: open ? 1 : 0 }}
                    primaryTypographyProps={{
                      sx: {
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whitespace: "nowrap",
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </>
    );
  };
  export default PopularChannels;