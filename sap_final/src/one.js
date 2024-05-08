import React, { useState } from 'react';
  import { useHistory } from 'react-router-dom';
  import axios from 'axios'; 
  import statesData from './data';
  import { Button, Container, CssBaseline, Typography, createTheme, ThemeProvider, AppBar, Toolbar, IconButton } from '@mui/material';
  import HomeIcon from '@mui/icons-material/Home';
  import { Link } from 'react-router-dom'; 
  import { useLocation } from 'react-router-dom'; 
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



  const One = (props) => {
    const history = useHistory();
    const [fromState, setFromState] = useState('');
    const [fromDistrict, setFromDistrict] = useState('');
    const [toState, setToState] = useState('');
    const [toDistrict, setToDistrict] = useState('');
    const [distanceResult, setDistanceResult] = useState(null);
    const [carbonFootprint, setCarbonFootprint] = useState(0);
    const [modeOfTravel, setModeOfTravel] = useState(''); 
    const { userFirstName, userId } = props.location.state;

    const handleStateChange = (event, category) => {
      const newState = {
        [category === 'from' ? 'fromState' : 'toState']: event.target.value,
        [category === 'from' ? 'fromDistrict' : 'toDistrict']: '', 
      };

      if (category === 'from') {
        setFromState(event.target.value);
        setFromDistrict('');
      } else {
        setToState(event.target.value);
        setToDistrict('');
      }
    };

    const handleDistrictChange = (event, category) => {
      if (category === 'from') {
        setFromDistrict(event.target.value);
      } else {
        setToDistrict(event.target.value);
      }
    };

    const calculateDistance = async () => {
      try {
        const response = await axios.post('http://localhost:5000/calculate-distance', {
          fromDistrict,
          fromState,
          toDistrict,
          toState
        });
        const { distance } = response.data;
        setDistanceResult(distance);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleResultClick = (value, mode) => {
      const intValue = parseInt(value.split(' ')[0]);
      if (intValue) {
        setCarbonFootprint(intValue);
      } else {
        // If the first part of the split value is null, use the second part
        setCarbonFootprint(parseInt(value.split(' ')[1]));
      }
      setModeOfTravel(mode);
    };
    

    const handleNextClick = () => {
      history.push({
        pathname: '/two',
        state: {
          distanceResult,
          carbonFootprint,
          modeOfTravel,
          fromDistrict,
          fromState,
          toDistrict,
          toState,
          userFirstName, 
          userId
        }
      });
    };

    return (
      <ThemeProvider theme={greenTheme}>
        <CssBaseline />
        <style>
          {`
            body {
              background: url('https://images.unsplash.com/photo-1496309732348-3627f3f040ee?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
              background-size: cover;
              background-repeat: no-repeat;
              height: 100vh;
              margin: 0;
              padding: 0;
            }
            .translucent-container {
              background-color: rgba(255, 255, 255, 0.5); /* Adjust the opacity as needed */
              padding: 20px;
              border-radius: 10px;
            }
          `}
        </style>
        <AppBar position="sticky" color="default">
         
  <Toolbar>
    
  <Typography variant="h5" component="div" sx={{ flexGrow: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
  Greenwander
</Typography>


    {userId && (
      <Typography variant="body1" sx={{ marginRight: '15px' }}>
        Welcome, {userFirstName} 
      </Typography>
    )}
    <IconButton color="primary" aria-label="home" href="home">
      <HomeIcon />
    </IconButton>
  </Toolbar>
</AppBar>

        <Container component="main" maxWidth="xs" sx={{ textAlign: 'center', mt: 4, position: 'relative' }}>
          <div className="translucent-container">
            <div>
              <div  theme={greenTheme}>
                <label htmlFor="fromStateDropdown"><b>From State:</b></label>
                <select
                    id="fromStateDropdown"
                    onChange={(e) => handleStateChange(e, 'from')}
                    value={fromState}
                    style={{ fontFamily: 'Amatic SC, cursive', padding: '10px', borderRadius: '5px', margin: '10px' }}
                  >
                    <option value="">Select a state</option>
                    {statesData.map((state, index) => (
                      <option key={index} value={state.state}>
                        {state.state}
                      </option>
                    ))}
                  </select>


                {fromState && (
                  <>
                    <label htmlFor="fromDistrictDropdown"><br></br><b>From District:</b></label>
                    <select
                        id="fromDistrictDropdown"
                        onChange={(e) => handleDistrictChange(e, 'from')}
                        value={fromDistrict}
                        style={{ fontFamily: 'Amatic SC, cursive', padding: '10px', borderRadius: '5px', margin: '10px' }}
                      >
                        <option value=""><b>Select a district</b></option>
                        {statesData
                          .find((state) => state.state === fromState)
                          .districts.map((district, index) => (
                            <option key={index} value={district}>
                              {district}
                            </option>
                          ))}
                      </select>

                  </>
                )}
              </div>
              <label htmlFor="toStateDropdown"><b>To State:</b></label>
              <select
                  id="toStateDropdown"
                  onChange={(e) => handleStateChange(e, 'to')}
                  value={toState}
                  style={{ fontFamily: 'Amatic SC, cursive', padding: '10px', borderRadius: '5px', margin: '10px' }}
                >
                  <option value=""><b>Select a state</b></option>
                  {statesData.map((state, index) => (
                    <option key={index} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </select>


                {toState && (
                  <>
                    <label htmlFor="toDistrictDropdown"><br></br><b>To District:</b></label>
                    <select
                      id="toDistrictDropdown"
                      onChange={(e) => handleDistrictChange(e, 'to')}
                      value={toDistrict}
                      style={{ fontFamily: 'Amatic SC, cursive', padding: '10px', borderRadius: '5px', margin: '10px' }}
                    >
                      <option value=""><b>Select a district</b></option>
                      {statesData
                        .find((state) => state.state === toState)
                        .districts.map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                    </select>

                  </>
                )}
              <div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={calculateDistance}
                >
                  Calculate Distance
                </Button>
                {distanceResult && (
                  <div>
                    <h3>Distance Result:</h3>
                    <div>
                      {distanceResult.split('\n').map((line, index) => {
                        if (index < 2) { 
                          return (
                            <div key={index} style={{ margin: '10px' }}>
                              <p>{line}</p>
                            </div>
                          );
                        } else { 
                          return (
                            <div key={index} style={{ margin: '10px' }}>
                              <Button variant="contained" onClick={() => handleResultClick(line, line.split(":")[0].trim())}>
                                {line}
                              </Button>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
                {/* Display the carbon footprint */}
                <div>
                  <h3>Carbon Footprint:</h3>
                  <p>{carbonFootprint} CO2e</p>
                  <p><b>Mode of Travel: </b>{modeOfTravel}</p>
                </div>
              </div>
            </div>
            
            <Button
              variant="contained"
              color="primary"
              sx={{
                position: 'relative',
                bottom: 10,
                left:300,
              }}
              onClick={handleNextClick}
            >
              Next
            </Button>
          </div>
        </Container>
      </ThemeProvider>
    );
  };

  export default One;