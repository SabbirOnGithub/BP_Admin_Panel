import React, { useEffect } from 'react'
// import AccessDeniedScreen from '../accessDeniedScreen/AccessDeniedScreen'
import { usePermission } from '../../components/UsePermission/usePermission';


function HomeScreen() {
  const {
    permission,
    setPermission,
    recievedPermission,
    loadingRoleResource,
    history,
    initialPermission
  } = usePermission();

  //eslint-disable-next-line
  const { createOperation, readOperation, updateOperation, deleteOperation } =  permission; 

  useEffect(() => {
    try{
        if(recievedPermission){
            setPermission({...recievedPermission})
        }
        if(readOperation === false ){
            history.push('/admin/accessDenied');
        }
        if(loadingRoleResource === false && !recievedPermission){
          setPermission({...initialPermission})
        }
    }catch(e){
        console.log(e)
    }
    return () => {
        // 
    }
  }, [setPermission, recievedPermission, readOperation, history, initialPermission, loadingRoleResource])

    return(
      <>
      { loadingRoleResource ? "Loading" : 
        <><h1 style={{textAlign:'center',display:'flex', justifyContent:'center'}}> {'Welcome to Best Practicify Dashboard' } </h1> </> 
      }
      </>
        
    )
}

export default HomeScreen;