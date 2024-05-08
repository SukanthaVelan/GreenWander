import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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

const Hist = ({ location }) => {
  let historyData = location.state ? location.state.historyData : [];

  if (typeof historyData === 'object' && Array.isArray(historyData.userData)) {
    historyData = historyData.userData;
  } else {
    console.error('Invalid historyData format:', historyData);
    historyData = [];
  }

  const [toggledRows, setToggledRows] = useState(Array(historyData.length).fill(false));
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleRows(prevVisibleRows => Math.min(prevVisibleRows + 1, historyData.length));
    }, 1000);

    return () => clearTimeout(timer);
  }, [visibleRows, historyData.length]);

  const toggleRow = (index) => {
    setToggledRows(prevState => {
      const newToggledRows = [...prevState];
      newToggledRows[index] = !newToggledRows[index];
      return newToggledRows;
    });
  };

  return (
    <>
      <ThemeProvider theme={greenTheme}>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <Typography align="center" variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Greenwander
            </Typography>
            <IconButton color="primary" aria-label="home" component={Link} to="/home">
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ 
          backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/636/693/299/spring-grass-nature-leaves-wallpaper-thumb.jpg)', 
          backgroundSize: 'cover', 
          minHeight: '100vh',
          overflow: 'hidden', // Remove scrolling option
          position: 'fixed', // Fix the background image
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}>
          <br/><br/>
          <br/><br/>
          <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: 'auto', background: 'rgba(255, 255, 255, 0.8)' }}>
            <Table>
              <TableHead sx={{ background: greenTheme.palette.primary.main, position: 'sticky', top: 0 }}>
                <TableRow>
                  <TableCell align="center">From</TableCell>
                  <TableCell align="center">To</TableCell>
                  <TableCell align="center">Mode of Travel</TableCell>
                  <TableCell align="center">Carbon Footprint(in kg CO2e)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TransitionGroup component={null}>
                  {historyData.slice(0, visibleRows).map((item, index) => (
                    <CSSTransition key={index} timeout={500} classNames="row">
                      <TableRow onClick={() => toggleRow(index)} sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                        '&.highlighted-row': {
                          backgroundColor: '#e3f2fd',
                          transition: 'background-color 0.5s ease',
                        },
                        '&.row-enter': {
                          opacity: 0,
                          transform: 'translateX(-100%)',
                        },
                        '&.row-enter-active': {
                          opacity: 1,
                          transform: 'translateX(0)',
                          transition: 'opacity 0.5s ease, transform 0.5s ease',
                        },
                        '&.row-exit': {
                          opacity: 1,
                          transform: 'translateX(0)',
                        },
                        '&.row-exit-active': {
                          opacity: 0,
                          transform: 'translateX(-100%)',
                          transition: 'opacity 0.5s ease, transform 0.5s ease',
                        }
                      }}>
                        <TableCell align="center">{`${item.fromstate}, ${item.fromdistrict}`}</TableCell>
                        <TableCell align="center">{`${item.tostate}, ${item.todistrict}`}</TableCell>
                        <TableCell align="center">{item.modeoftravel}</TableCell>
                        <TableCell align="center">{item.cprint}</TableCell>
                      </TableRow>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Hist;
