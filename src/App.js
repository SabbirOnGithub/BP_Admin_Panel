import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Baserouter from './routes/routes';

function App() {
  return (
    <Router>
          <Baserouter />
    </Router>
  );
}

export default App;
