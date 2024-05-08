import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showRateUs, setShowRateUs] = useState(false);
  const [rated, setRated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement logic to send feedback to backend or perform any action
    console.log('Feedback submitted:', feedback);
    // For demonstration purposes, we'll just set submitted state to true
    setSubmitted(true);
    setShowRateUs(true);
  };

  const handleReset = () => {
    setFeedback('');
    setSubmitted(false);
    setShowRateUs(false);
    setRated(false);
  };

  const submitRating = (emoji) => {
    // Here you can implement logic to send rating to backend or perform any action
    console.log('Rating submitted:', emoji);
    // For demonstration purposes, we'll just set the state and display a message
    setRated(true);
    setShowRateUs(false);
  };

  const handleEmojiClick = (emoji) => {
    if (!submitted) {
      setFeedback(emoji);
    } else {
      submitRating(emoji);
    }
  };

  return (
    <>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Typography align="center" variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Feedback Form
          </Typography>
          <IconButton color="inherit" aria-label="home" href="home">
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', height: '100vh', fontSize: '20px', fontFamily: 'Caveat, cursive' }}>
        {/* Left side with image */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <img
            src="https://img.freepik.com/premium-photo/green-natural-background-greenery-background_125452-322.jpg" // Placeholder image URL
            alt="Nature"
            style={{ width: '100%', height: '200%', objectFit: 'cover', maxHeight: '200%'}}
          />
        </div>
        {/* Right side with feedback form */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
          <div style={{ maxWidth: '400px' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                  <span style={{ marginRight: '20px', cursor: 'pointer', fontSize: '2em' }} onClick={() => handleEmojiClick('😊')}>😊</span>
                  <span style={{ marginRight: '20px', cursor: 'pointer', fontSize: '2em' }} onClick={() => handleEmojiClick('😐')}>😐</span>
                  <span style={{ cursor: 'pointer', fontSize: '2em' }} onClick={() => handleEmojiClick('😞')}>😞</span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="feedback">Your Feedback:</label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
                    rows={4}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '20px' }}>Submit Feedback</button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p>Thank you for your feedback!</p>
                <button onClick={handleReset} style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '20px' }}>Submit Another Feedback</button>
              </div>
            )}
          </div>
          {/* Rate Us section */}
          {showRateUs && !rated && (
            <div style={{ marginTop: '20px', fontSize: '20px' }}>
              <h2>Rate Us</h2>
              <div>
                <span style={{ marginRight: '20px', cursor: 'pointer', fontSize: '2em' }} onClick={() => submitRating('😊')}>😊</span>
                <span style={{ marginRight: '20px', cursor: 'pointer', fontSize: '2em' }} onClick={() => submitRating('😀')}>😀</span>
                <span style={{ marginRight: '20px', cursor: 'pointer', fontSize: '2em' }} onClick={() => submitRating('😐')}>😐</span>
                <span style={{ marginRight: '20px', cursor: 'pointer', fontSize: '2em' }} onClick={() => submitRating('😕')}>😕</span>
                <span style={{ cursor: 'pointer', fontSize: '2em' }} onClick={() => submitRating('😞')}>😞</span>
              </div>
            </div>
          )}
          {rated && <p style={{ fontSize: '20px' }}>Thanks for rating us!</p>}
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
