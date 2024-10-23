import { Routes, Route } from "react-router-dom"
import './App.css'
import { SignIn, SignUp, Home, PageNotFound } from './pages'
import AppTheme from "./themes/AppTheme"
import CssBaseline from '@mui/material/CssBaseline';
import { NavBar } from "./components";
import { AuthProvider } from "./customContext/AuthContext";


function App(props) {
  return (
    <AuthProvider>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <NavBar></NavBar>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AppTheme>
    </AuthProvider>
  )
}

export default App
