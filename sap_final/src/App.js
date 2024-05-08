//App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import One from './one';
import two from './two';
import three from './three';
import FeedBack from './FeedBack'; // Import the FeedBack component
import hist from './hist';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/one" component={One} />
        <Route path="/feedback" component={FeedBack} /> {/* Use the FeedBack component */}
        <Route path="/two" component={two} />
        <Route path="/three" component={three} />
        <Route path="/hist" component={hist} />
        <Route path="/" component={Home} />
        
      </Switch>
    </Router>
  );
};

export default App;
