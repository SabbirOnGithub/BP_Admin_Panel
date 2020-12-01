import React from 'react';
import { Link } from 'react-router-dom';

function WebsiteHomeScreen(props) {
    return(
      <div style={{textAlign:'center'}}>
      <h1> Website Page  </h1>
      <h2><Link to="/signin"> Sign In </Link></h2>
      </div>
    )
}

export default WebsiteHomeScreen;