import React, { useState } from 'react';
import axios from 'axios';
import { Button, createTheme, ThemeProvider, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  }
});

const MotionBox = motion(Box); // Wrap Box component with motion for animation

const Three = ({ location }) => {
  const [suggestions, setSuggestions] = useState('');
  const { totalCarbonFootprint, modeOfTravel, carbonFootprint, fromDistrict, fromState, toDistrict, toState, userFirstName, userId } = location.state;

  const handleSuggestionClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/suggest-ecofriendly', {
        totalCarbonFootprint,
        modeOfTravel,
        carbonFootprint,
        fromDistrict,
        fromState,
        toDistrict,
        toState,
        userFirstName,
        userId
      });
      setSuggestions(response.data.distance);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={greenTheme}>
      <div style={{
        backgroundImage: "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0yNi1iYi0yLW5hdHVyZS1iYWNrZ3JvdW5kLmpwZw.jpg')",
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AppBar color="default">
          <Toolbar>
            <Typography align="center" variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Greenwander
            </Typography>
            {userId && (
              <Typography variant="body1" sx={{ marginRight: '10px' }}>
                Welcome, {userFirstName}
              </Typography>
            )}
            <IconButton color="inherit" aria-label="home" component={Link} to="/home">
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{
          marginTop: '64px',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          padding: '20px',
          borderRadius: '10px',
          width: '80%', // Fixed width
          maxWidth: '800px', // Max width to keep it responsive
          height: 'auto', // Auto height
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="h5" gutterBottom style={{ fontSize: '1.5rem' }}>
            <b>Total Carbon Footprint:</b> {totalCarbonFootprint} kg CO2e
          </Typography>
          <Typography variant="h6" gutterBottom style={{ fontSize: '1.3rem' }}>
            <b>Mode of Travel: </b>{modeOfTravel}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem' }}>
            <div style={{ flex: '1', padding: '10px' }}>
              <Typography variant="h5" gutterBottom style={{ fontSize: '1.3rem' }}>
                <b>From:</b>
              </Typography>
              <Typography variant="body1" style={{ fontSize: '1.1rem' }}>
                {fromDistrict}, {fromState}
              </Typography>
            </div>
            <div style={{ flex: '1', padding: '10px' }}>
              <Typography variant="h5" gutterBottom style={{ fontSize: '1.3rem' }}>
                <b>To:</b>
              </Typography>
              <Typography variant="body1" style={{ fontSize: '1.1rem' }}>
                {toDistrict}, {toState}
              </Typography>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSuggestionClick}
            style={{ width: '80%', marginTop: '20px', fontSize: '1.2rem' }}
          >
            Get Eco-Friendly Suggestions
          </Button>
          {suggestions && (
            <div style={{ width: '80%', marginTop: '20px' }}>
              <h3>Suggestions:</h3>
              {suggestions.split('\n').map((suggestion, index) => {
                const parts = suggestion.split(' - ');
                return (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }} // Initial animation properties
                    animate={{ opacity: 1, y: 0 }} // Animation properties
                    transition={{ duration: 0.5, delay: index * 0.1 }} // Transition properties
                    style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}
                  >
                    <Typography variant="body1">
                      <strong>{parts[0]}</strong> - {parts[1]} - {parts[2]}
                    </Typography>
                  </MotionBox>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Three;