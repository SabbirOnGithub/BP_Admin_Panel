import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const initialPermission = {
    createOperation: false,
    readOperation:false,
    updateOperation: false,
    deleteOperation : false,
}
export function usePermission() {

    const history = useHistory();
    const urlPath = history.location.pathname;
    const roleResourceDetails = useSelector(state => state.roleResourceDetails);
    const { roleResource } = roleResourceDetails;
    const recievedPermission = roleResource.find(item => {return item.urlPath === urlPath});

    const [permission, setPermission] = useState(initialPermission);

    useEffect(()=>{
        setPermission(recievedPermission)
    },[setPermission, recievedPermission])

    return {
        permission, 
        setPermission,
        recievedPermission
    }
}

 