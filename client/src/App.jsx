import { Routes, Route } from "react-router-dom"
import './App.css'
import { SignIn, SignUp, Home, PageNotFound } from './pages'
import AppTheme from "./shared-theme/AppTheme"
import CssBaseline from '@mui/material/CssBaseline';


function App(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </AppTheme>
  )
}

export default App
