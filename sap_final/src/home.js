import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  CssBaseline,
  IconButton,
  Typography,
  createTheme,
  ThemeProvider,
  Box,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useHistory } from 'react-router-dom';

const greenTheme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: [
      'Amatic SC',
      'cursive',
    ].join(','),
  },
});


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [userId, setUserId] = useState('');
  const [historyData, setHistoryData] = useState(null);
  const routerHistory = useHistory();

  useEffect(() => {
    const firstName = localStorage.getItem('userFirstName');
    const id = localStorage.getItem('userId');
    if (firstName) {
      setIsLoggedIn(true);
      setUserFirstName(firstName);
      setUserId(id);
    }
    if (id) {
      setIsLoggedIn(true);
      setUserId(id);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserFirstName('');
    setUserId('');
  };

  const fetchHistoryData = async () => {
    try {
      if (!userId) {
        alert('Please sign in to view history.');
        routerHistory.push('/signin'); // Redirect to sign-in page
      } else {
        const response = await axios.post('http://localhost:8081/hist', { userId });
        console.log('Response data:', response.data); // Log the response data
        setHistoryData(response.data);
        routerHistory.push({
          pathname: '/hist',
          state: { historyData: response.data } // Pass historical data as state
        });
      }
    } catch (error) {
      console.error('Error fetching history data:', error);
      if (error.response && error.response.status === 401) {
        alert('User has no travel history');
      } else {
        alert('An error occurred while fetching history data');
      }
    }
  };

  return (
    <ThemeProvider theme={greenTheme}>
      <CssBaseline />
      <style>
        {`
          body {
            background-image: url('https://media.canadianunderwriter.ca/uploads/2021/03/Carbon-Footprint-1536x1152.jpg');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
        `}
      </style>

      <AppBar position="sticky" color="default">
        <Toolbar>
          <Typography align="center" variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Greenwander
          </Typography>
          {isLoggedIn ? (
            <>
              <Typography variant="body1" sx={{ marginRight: '10px' }}>
                Welcome, {userFirstName}
              </Typography>
              <Button variant="text" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="text" href="/SignIn">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box py={4} style={{ backgroundColor: 'transparent' }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2} mb={4}>
          <br></br>
          <br></br>
          <br></br>
        </Grid>

        <Grid container justifyContent="center" spacing={6} style={{ backgroundColor: 'transparent' }}>
          <Grid item xs={12} sm={5} textAlign="center">
            <Box p={5} bgcolor="rgba(240, 240, 240, 0.6)" borderRadius={4}>
              <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                <b>Greenwander</b>
              </Typography>

              <Typography variant="body1" fontSize={20}>
                Welcome to Greenwander, your ultimate destination for planning eco-conscious and sustainable travel adventures! At Greenwander, we believe in exploring the world while preserving its beauty for future generations. Our platform empowers travelers to make responsible choices, minimize their carbon footprint, and contribute positively to the environment and local communities.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box p={5} bgcolor="rgba(240, 240, 240, 0.6)" borderRadius={4}>
              <Typography variant="h5" gutterBottom align="right" style={{ textAlign: 'center' }}>
                Try Us!!
              </Typography>
              <br />
              <div style={{ textAlign: 'center' }}>
                <Link to={{ pathname: "/One", state: { userFirstName: userFirstName, userId: userId } }} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" sx={{ ml: 2 }}>
                    Plan a new trip
                  </Button>
                </Link>

                <br />
                <br />
                <Button variant="contained" sx={{ ml: 2 }} onClick={fetchHistoryData}>
                  History
                </Button>
                <br />
                <br />

                <Button href="FeedBack" variant="contained" sx={{ ml: 2 }}>
                  FeedBack
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
