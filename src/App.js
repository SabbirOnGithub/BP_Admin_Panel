import React from 'react';
import { Helmet } from "react-helmet";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { config } from "./config";
import Baserouter from './routes/routes';

const {
	REACT_APP_PAYPAL_ENV,
} = config;

function App() {

  const [isProduction, setIsProduction] = React.useState(false);

  React.useEffect( () =>{
    if(REACT_APP_PAYPAL_ENV === "production"){
      setIsProduction(true);
    }
  
  }, [])


  return (
    <>
      <Router>
          <Baserouter />
    </Router>
    
    {
      isProduction ? 
      <Helmet>
    <script
      src="https://www.paypal.com/sdk/js?client-id=AfhREMWGozEmnYXbC5VY7TW5Y0Yk6WJmKmtIpyReEKNcVCPN8uYHXdCRc3uH6vmFV9gnCAUor23cc5Yv&vault=true&intent=subscription"
      data-sdk-integration-source="button-factory"></script>
    </Helmet> :
    <Helmet>
    <script
      src="https://www.paypal.com/sdk/js?client-id=AcLhes-GT14dVUDxhSMGLk-1bbk1H-MiXnLnuygg4MmyrIkLVrK5NCMKWrVAKMkq6l-dHFqYqILAGJO_&vault=true&intent=subscription"
      data-sdk-integration-source="button-factory"></script>
    </Helmet>
    }

    
    </>
    
  );
}

export default App;
