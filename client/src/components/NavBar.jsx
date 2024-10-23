import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ColorModeSelect from './ColorModeSelect';
import { useNavigate } from "react-router-dom";
import logoutUser from "../utils/logoutUser";
import useAuth from "../hooks/useAuth";
import useActiveRoute from "../hooks/useActiveRoute";
import { useTheme, useMediaQuery } from '@mui/material';

export default function NavBar() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { isActive } = useActiveRoute(["/", "/signin", "/signup"]);

    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if the screen size is mobile

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result.success) {
            setIsLoggedIn(false);
            navigate("/signin");
        } else {
            console.error(result.error);
        }
        handleMenuClose();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography variant={isMobile ? "h4" : "h2"} component="div" sx={{ flexGrow: 1 }}>
                        Melodyverse
                    </Typography>

                    {isMobile ? (
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => { navigate("/"); handleMenuClose(); }}>
                                Home
                            </MenuItem>
                            {isLoggedIn ? (
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            ) : (
                                <MenuItem onClick={() => { navigate("/signin"); handleMenuClose(); }}>
                                    SignIn / SignUp
                                </MenuItem>
                            )}
                        </Menu>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                color="inherit"
                                variant={isActive("/") ? "outlined" : "text"}
                                onClick={() => navigate("/")}
                            >
                                Home
                            </Button>
                            {isLoggedIn ? (
                                <Button
                                    color="inherit"
                                    variant={isActive("/logout") ? "outlined" : "text"}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    color="inherit"
                                    variant={isActive("/signin") || isActive("/signup") ? "outlined" : "text"}
                                    onClick={() => navigate("/signin")}
                                >
                                    SignIn / SignUp
                                </Button>
                            )}
                        </Box>
                    )}

                    <Box sx={{ ml: 2 }}>
                        <ColorModeSelect />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
