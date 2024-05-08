import React, { useState, useEffect } from 'react';
import { Button, Container, CssBaseline, Typography, createTheme, ThemeProvider, AppBar, Toolbar, IconButton, Slider, Grow, Box, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Home from './home';

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



const Two = () => {
  const location = useLocation();
  const {modeOfTravel, carbonFootprint, fromDistrict, fromState, toDistrict, toState, userFirstName, userId  } = location.state;
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [mealOptions, setMealOptions] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });
  const [suggestionSent, setSuggestionSent] = useState(false);
  const [suggestionResults, setSuggestionResults] = useState(null);
  const [clickedButtonValue, setClickedButtonValue] = useState(0);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [showSuggestionButton, setShowSuggestionButton] = useState(false); // New state to manage suggestion button visibility
  

  useEffect(() => {
    if (numberOfPeople >= 1 && (mealOptions.breakfast || mealOptions.lunch || mealOptions.dinner)) {
      setShowSuggestionButton(true);
    } else {
      setShowSuggestionButton(false);
    }
    setSuggestionSent(false);
  }, [numberOfPeople, mealOptions]);

  const handleNumberOfPeopleChange = (event, value) => {
    setNumberOfPeople(value);
  };

  const handleButtonClick = (type) => {
    if (type === 'breakfast') {
      setMealOptions(prevOptions => ({ ...prevOptions, breakfast: !prevOptions.breakfast }));
    } else if (type === 'lunch') {
      setMealOptions(prevOptions => ({ ...prevOptions, lunch: !prevOptions.lunch }));
    } else if (type === 'dinner') {
      setMealOptions(prevOptions => ({ ...prevOptions, dinner: !prevOptions.dinner }));
    } else {
      const value = parseFloat(type.match(/(\d+\.\d+) Kg/)[1]);
      const isSelected = selectedSuggestions.includes(type);
      if (isSelected) {
        setClickedButtonValue(prevValue => prevValue - value);
        setSelectedSuggestions(prevSelected => prevSelected.filter(suggestionId => suggestionId !== type));
      } else {
        setClickedButtonValue(prevValue => prevValue + value);
        setSelectedSuggestions(prevSelected => [...prevSelected, type]);
      }
    }
  };

  const handleSuggestionClick = async () => {
    try {
      setClickedButtonValue(0);
      if (Object.values(mealOptions).some(option => option)) {
        const response = await axios.post('http://localhost:5000/submit-suggestion', {
          fromDistrict,
          fromState,
          toDistrict,
          toState,
          carbonFootprint,
          numberOfPeople,
          mealOptions,
          modeOfTravel
        });
        const { data } = response;
        setSuggestionResults(data);
        setSuggestionSent(true);
        setShowSuggestionButton(false); // Hide suggestion button after it's clicked
      } else {
        alert('Please select at least one meal option.');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSuggestionCheckboxChange = (id) => {
    setSelectedSuggestions(prevSelected => {
      const alreadySelected = prevSelected.includes(id);
      return alreadySelected ? prevSelected.filter(suggestionId => suggestionId !== id) : [...prevSelected, id];
    });
  };

  const startsWithNumber = (str) => /^\d/.test(str);

  const handleSaveTravelDetails = async () => {
    try {
      const totalCarbonFootprint = carbonFootprint + clickedButtonValue;
      const response = await axios.post('http://localhost:8081/save-travel-details', {
        userId,
        fromState,
        fromDistrict,
        toState,
        toDistrict,
        totalCarbonFootprint,
        modeOfTravel
      });
      const { data } = response;
      if (data.success) {
        console.log('Travel details saved successfully');
        // Redirect to the next page or perform any other action after saving
      } else {
        console.error('Failed to save travel details');
      }
    } catch (error) {
      console.error('Error saving travel details:', error);
    }
  };


  return (
    <ThemeProvider theme={greenTheme}>
      <CssBaseline />
      <div style={{ backgroundImage: 'url(https://wallup.net/wp-content/uploads/2019/09/11751-green-nature-grass-bokeh-blurred-background.jpg)', backgroundSize: 'cover', minHeight: '100vh', padding: '20px' }}>
        <AppBar  color="default">
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
        <Container component="main" maxWidth="sm" sx={{ textAlign: 'center', mt: 7 }}>
          <div style={{ position: 'relative', fontSize: '1.1rem' }}>
          <Grid container justifyContent="space-between" spacing={6} style={{ backgroundColor: 'transparent' }}>
                  <Grid item xs={12} sm={6} textAlign="center" width="100%">
                    <Box p={5} bgcolor="rgba(240, 240, 240, 0.6)" borderRadius={4} width="100%" height="100%">
                      <Typography variant="h6" align="center" gutterBottom>
                        From: {fromDistrict}, {fromState}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} textAlign="center" width="100%">
                    <Box p={5} bgcolor="rgba(240, 240, 240, 0.6)" borderRadius={4} width="100%" height="100%">
                      <Typography variant="h6" align="center" gutterBottom>
                        To: {toDistrict}, {toState}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

            
            <Box p={5} bgcolor="rgba(240, 240, 240, 0.6)" borderRadius={4} style={{ marginTop: '20px' }}>
              <Typography variant="h5" gutterBottom>
                Mode of Travel: {modeOfTravel}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Carbon Footprint: {carbonFootprint} kg CO2e
              </Typography>
              
              <Typography id="slider-label" gutterBottom>
                Number of People
              </Typography>
              <Slider
                aria-labelledby="slider-label"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                value={numberOfPeople}
                onChange={handleNumberOfPeopleChange}
              />

              <Button
                variant={mealOptions.breakfast ? "contained" : "outlined"}
                color={mealOptions.breakfast ? "primary" : "inherit"}
                onClick={() => handleButtonClick('breakfast')}
                sx={{ mr: 2 }}
              >
                Breakfast
              </Button>
              <Button
                variant={mealOptions.lunch ? "contained" : "outlined"}
                color={mealOptions.lunch ? "primary" : "inherit"}
                onClick={() => handleButtonClick('lunch')}
                sx={{ mr: 2 }}
              >
                Lunch
              </Button>
              <Button
                variant={mealOptions.dinner ? "contained" : "outlined"}
                color={mealOptions.dinner ? "primary" : "inherit"}
                onClick={() => handleButtonClick('dinner')}
                sx={{ mr: 2 }}
              >
                Dinner
              </Button>
              <br></br>
              {showSuggestionButton && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSuggestionClick}
                  sx={{ mt: 2 }}
                >
                  Suggestion
                </Button>
              )}

              { suggestionResults && suggestionResults.suggestion &&  (
                <div>
                  <Typography variant="h5" gutterBottom>
                    Suggestion Results for {numberOfPeople} traveler(s):
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {suggestionResults.suggestion.split('\n').map((line, index) => (
                      <div key={index} style={{ marginBottom: '0.5rem' }}>
                        {startsWithNumber(line) ? (
                          <Grow in={true}>
                            <Button 
                              variant={selectedSuggestions.includes(line) ? "contained" : "outlined"} 
                              color={selectedSuggestions.includes(line) ? "primary" : "inherit"} 
                              style={{ marginRight: '1rem' }} 
                              onClick={() => handleButtonClick(line)}
                            >
                              {line}
                            </Button>
                          </Grow>
                        ) : (
                          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                            {line.replace(/\*/g, '')}
                          </Typography>
                        )}
                      </div>
                    ))}
                  </Typography>
                </div>  
              )}

              { clickedButtonValue !== 0 && (
                <Typography variant="body1" gutterBottom style={{ marginTop: '1rem' }}>
                  Carbon Footprint : {clickedButtonValue.toFixed(2)}
                </Typography>
              )}

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    position: 'relative',
                    bottom: 10,
                    right: 300,
                  }}
                  component={Link}
                  to="/one"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSaveTravelDetails}
                  variant="contained"
                  color="primary"
                  sx={{
                    position: 'relative',
                    bottom: 10,
                    left: 300,
                  }}
                  component={Link}
                  to={{
                    pathname: "/three",
                    state: {
                      totalCarbonFootprint: clickedButtonValue+carbonFootprint,
                      modeOfTravel: modeOfTravel,
                      carbonFootprint: carbonFootprint,
                      fromDistrict: fromDistrict,
                      fromState: fromState,
                      toDistrict: toDistrict,
                      toState: toState,
                      userFirstName: userFirstName, 
                      userId: userId 
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </Box>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Two;
