import React from 'react';
import { usePermission } from '../../components/UsePermission/usePermission';
import AccessDeniedScreen from '../accessDeniedScreen/AccessDeniedScreen'

function HomeScreen() {
    const {
      permission,
    } = usePermission();
    // const { createOperation, readOperation, updateOperation, deleteOperation } =  permission; 
    const { readOperation } =  permission; 

    return(
      <>
      {/* {
        readOperation ? <><h1 style={{textAlign:'center',display:'flex', justifyContent:'center'}}> {'Welcome to Best Practicify Dashboard' } </h1> </> : <AccessDeniedScreen />
      } */}
      <AccessDeniedScreen />
      </>
        
    )
}

export default HomeScreen;