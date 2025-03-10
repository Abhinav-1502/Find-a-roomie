import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { resetUser } from '../../redux/slices/user-slice';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  Typography,
  MenuItem,
  Stack,
  Toolbar,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './navbar.css';
import AccountMenu from './AccountMenu';

interface ResponsiveAppBarProps {
  theme: string;
  toggleTheme: () => void;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ theme, toggleTheme }) => {
  const { t, i18n } = useTranslation();
  const sessionUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const isLogged = Boolean(sessionUser.userId);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    dispatch(resetUser());
    localStorage.removeItem("loggedUser");
    handleCloseProfileMenu();
    navigate('/login');
  };


  return (
    <AppBar position="sticky" className={`navbar-app ${theme}`}>
      <Toolbar>
        <IconButton
          sx={{ margin: 2 }}
          onClick={() => navigate("/")}
          size='large'
          edge="start"
          color='inherit'
          aria-label='logo'>
          <Diversity3Icon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1 }}>
          Roomies
        </Typography>

        <Stack direction={'row'} spacing={3}>
          {/* Navigation Links and Buttons */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <Button color="inherit">About Us</Button>
          </Link>
          
          {isLogged ? (
            <>
              {/* Logged in user navigation and profile menu */}
              <Link to="/listings" style={{ textDecoration: 'none' }}>
                <Button color="inherit">Find Listing</Button>
              </Link>
              <Link to="/create-listing" style={{ textDecoration: 'none' }}>
                <Button color="inherit">Post Listing</Button>
              </Link>
              <Link to="/blogs" style={{ textDecoration: 'none' }}>
                <Button color="inherit">Blogs</Button>
              </Link>
              <AccountMenu logout={logoutUser} profileName={sessionUser.firstName} />
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button color="inherit">Login / Sign Up</Button>
            </Link>
          )}

          {/* Theme Toggle Button */}
          <IconButton
            sx={{ color: 'inherit' }}
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
