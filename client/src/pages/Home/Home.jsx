import React from 'react'
import BgContainer from '../../themes/BgContainer'
import useAuth from '../../hooks/useAuth';
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Home() {
  const { isLoggedIn, setIsLoggedIn, loading, error } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      alert("Signin to access this protected route")
      return navigate("/signin");
    }
  }, [])

  return (
    <BgContainer direction="column" justifyContent="space-between">
      {loading ? <CircularProgress /> : <div>Home</div>}
    </BgContainer>
  )
}

export default Home