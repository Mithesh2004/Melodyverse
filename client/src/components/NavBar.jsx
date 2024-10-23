import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ColorModeSelect from './ColorModeSelect';
import { useNavigate } from "react-router-dom";
import logoutUser from "../utils/logoutUser";
import useAuth from "../hooks/useAuth"

export default function NavBar() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, loading, error } = useAuth();

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result.success) {
            setIsLoggedIn(false);
            navigate("/signin");
        }
        else {
            console.error(result.error)
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Melodyverse
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                        {isLoggedIn ? (
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        ) : (
                            <>
                                <Button color="inherit" onClick={() => navigate("signin")}>SignIn</Button>
                                <Button color="inherit" onClick={() => navigate("signup")}>SignUp</Button>
                            </>
                        )}
                    </Box>
                    <Box sx={{ ml: 2 }}>
                        <ColorModeSelect />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
