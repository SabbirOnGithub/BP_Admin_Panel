import React from 'react';

function HomeScreen(props) {
    return(
      <>
      <h1> {props.title? props.title : 'dashboard home' } </h1>
      </>
    )
}

export default HomeScreen;