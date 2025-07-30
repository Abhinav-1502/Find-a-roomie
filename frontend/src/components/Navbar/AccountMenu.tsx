import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CarouselItem from '../../assets/images/CarouselItem.jpg';
import CarouselItem1 from '../../assets/images/CarouselItem2.jpg';

interface AccountMenuProps {
  logout: () => void;
  profileName: string;
}
// List of avatar image URLs
const avatarImages = [
  CarouselItem,
  CarouselItem1,
  // Add more image URLs as needed
];

// Function to get a random image URL
const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarImages.length);
  return avatarImages[randomIndex];
};


const changeLang = (lang: string) => {
  i18n.changeLanguage(lang);
};

const AccountMenu: React.FC<AccountMenuProps> = ({
  logout,
  profileName,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenSubmenu = (event: React.MouseEvent<HTMLLIElement>) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleCloseSubmenu = () => {
    setSubmenuAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={getRandomAvatar()} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/profile");
          }}
        >
          <Avatar>{profileName.charAt(0)}</Avatar>
          My Account
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/mylistings");
          }}
        >
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          My Listings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon > 
          <FavoriteIcon />
          </ListItemIcon > 
          {" "}Wishlist
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOpenSubmenu}>
          {" "}
          <ListItemIcon>
            <LanguageIcon fontSize="small" />
          </ListItemIcon>
          Language
          <ExpandMoreIcon />
        </MenuItem>

        {/* Submenu */}
        <Menu
          anchorEl={submenuAnchorEl}
          open={Boolean(submenuAnchorEl)}
          onClose={handleCloseSubmenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={() => {changeLang("en"); handleCloseSubmenu(); handleClose();}}>English</MenuItem>
          <MenuItem onClick={() => {changeLang("tel"); handleCloseSubmenu(); handleClose();}}>Telugu</MenuItem>
          <MenuItem onClick={() => {changeLang("es"); handleCloseSubmenu(); handleClose();}}>Spanish</MenuItem>
        </Menu>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
