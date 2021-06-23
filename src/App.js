import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Admin from "./components/Admin";
import Report from "./components/Report";
import Waitlist from "./components/Waitlist";
import { AuthProvider } from "./components/Auth/Auth";

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/admin_hidden_link" component={Admin} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/waitlist" component={Waitlist} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
