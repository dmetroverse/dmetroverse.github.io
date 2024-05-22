import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LanguageSelector from "./header/LanguageSelector";
import ThemeToggleButton from "./header/ThemeToggler";
import FeatureToggleButton from "./header/FeatureToggler";
import { HeaderProps } from "../common/types";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";

const Header: React.FC<HeaderProps> = ({
  setShowFoodFacilities,
  setShowRedditPosts,
  showFoodFacilities,
  showRedditPosts,
}) => {
  const [language, setLanguage] = useState("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const muiTheme = useTheme();
  const isLargeScreen = useMediaQuery(muiTheme.breakpoints.up("lg"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {/*Disabling Language Selector until feature implemented*/}
        {/* <ListItem>
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </ListItem> */}
        <ListItem>
          <FeatureToggleButton
            icon={<FastfoodIcon />}
            tooltip={
              showFoodFacilities
                ? "Hide Food Facilities"
                : "Show Food Facilities"
            }
            onClick={() => setShowFoodFacilities(!showFoodFacilities)}
            active={showFoodFacilities}
          />
          <Typography>
            {showFoodFacilities
              ? "Hide Food Facilities"
              : "Show Food Facilities"}
          </Typography>
        </ListItem>
        <ListItem>
          <FeatureToggleButton
            icon={<PostAddIcon />}
            tooltip={
              showRedditPosts ? "Hide Reddit Posts" : "Show Reddit Posts"
            }
            onClick={() => setShowRedditPosts(!showRedditPosts)}
            active={showRedditPosts}
          />
          <Typography>
            {showRedditPosts ? "Hide Reddit Posts" : "Show Reddit Posts"}
          </Typography>
        </ListItem>

        <ListItem>
          <ThemeToggleButton />
          <Typography>Switch Theme</Typography>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <DirectionsTransitIcon sx={{ mr: 2 }} />
          </Box>
          <Typography
            variant="h4" // Increased variant for larger text
            noWrap
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: "bold", // Bold text
              background:
                "linear-gradient(90deg, #0000FF, #008000, #FFFF00, #FFA500, #FF0000, #EE82EE, #FF00FF, #FFC0CB)", // Gradient ordered to resemble VIBGYOR
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)", // Text shadow for better visibility
            }}
          >
            DMetroVerse
          </Typography>

          {isLargeScreen ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/*Disabling Language Selector until feature implemented*/}
              {/* <LanguageSelector language={language} setLanguage={setLanguage} /> */}
              <FeatureToggleButton
                icon={<FastfoodIcon />}
                tooltip={
                  showFoodFacilities
                    ? "Hide Food Facilities"
                    : "Show Food Facilities"
                }
                onClick={() => setShowFoodFacilities(!showFoodFacilities)}
                active={showFoodFacilities}
              />
              <FeatureToggleButton
                icon={<PostAddIcon />}
                tooltip={
                  showRedditPosts ? "Hide Reddit Posts" : "Show Reddit Posts"
                }
                onClick={() => setShowRedditPosts(!showRedditPosts)}
                active={showRedditPosts}
              />
              <ThemeToggleButton />
            </Box>
          ) : (
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          )}
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            sx={{ ml: 2, display: { xs: "flex", lg: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
