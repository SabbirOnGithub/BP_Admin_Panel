import React from 'react';

function HomeScreen(props) {
  console.log(props.test)
    return(
      <>
      <h1 style={{textAlign:'center',display:'flex', justifyContent:'center'}}> {'Welcome to Best Practicify Dashboard' } </h1>
      </>
    )
}

export default HomeScreen;