import { Routes, Route } from "react-router-dom"
import './App.css'
import { SignIn, SignUp, Home, PageNotFound } from './pages'

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
