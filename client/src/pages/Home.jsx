import React, { useEffect, useState } from 'react';
import BgContainer from '../themes/BgContainer';
import useAuth from '../hooks/useAuth';
import { CircularProgress } from '@mui/material';
import getDownloadedSongs from '../utils/getDownloadedSongs';
import { useNavigate } from "react-router-dom";


function Home() {
  const { isLoggedIn, loading, checkAuth, error } = useAuth();
  const [downloadedSongs, setDownloadedSongs] = useState([]);
  const [songsLoading, setSongsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    await checkAuth();
  };

  const fetchSongs = async () => {
    try {
      setSongsLoading(true);
      const songs = await getDownloadedSongs();
      if (songs.error) {
        setFetchError(songs.error);
      } else {
        setDownloadedSongs(songs);
      }
    } catch (err) {
      setFetchError("Error fetching songs");
    } finally {
      setSongsLoading(false);
    }
  };

  useEffect(() => {
    const handleAuthAndFetch = async () => {
      await checkAuthentication()
      if (isLoggedIn) {
        fetchSongs();
      }
    };
    handleAuthAndFetch();
  }, [isLoggedIn]);

  if (loading || songsLoading) {
    return (
      <BgContainer direction="column" justifyContent="center" alignItems="center">
        <CircularProgress />
      </BgContainer>
    );
  }

  return (
    <BgContainer direction="column" justifyContent="space-between">
      {!isLoggedIn ? <div> You are logged-out!. Please sign-in to get your downloaded songs</div> :
        fetchError ? (
          <div> {fetchError === 'Unauthorized' ? "You don't have authorization to get the songs" : fetchError}</div >
        ) : (
          downloadedSongs.length > 0 ? (
            <div>
              <h2>Your Downloaded Songs:</h2>
              <ul>
                {downloadedSongs.map((song, index) => (
                  <li key={index}>{song}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No songs available.</div>
          )
        )
      }
    </BgContainer >
  );
}

export default Home;
