import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Baserouter from './routes/routes';

function App() {
  return (
    <Router>
          <Baserouter />
    </Router>
  );
}

export default App;
