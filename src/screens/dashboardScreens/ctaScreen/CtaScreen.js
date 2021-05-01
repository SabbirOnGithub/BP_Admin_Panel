import React, { useState, useEffect } from 'react'
// permissions
import { usePermission } from '../../../components/UsePermission/usePermission';
import { accessDeniedRoute } from '../../../routes/routeConstants';
import CtaCategoryScreen from './ctaCategoryScreen/CtaCategoryScreen';
import CtaFunctionScreen from './ctaFunctionScreen/CtaFunctionScreen';


export default function CtaScreen() {

    // permission get
    const {
        permission,
        setPermission,
        recievedPermission,
        loadingRoleResource,
        history,
        initialPermission
    } = usePermission();
    //eslint-disable-next-line
    const { createOperation, readOperation, updateOperation, deleteOperation } = permission;
    // permission get end

    const [openPopup, setOpenPopup] = useState(false)


    useEffect(() => {
        try {
            if (recievedPermission) {
                setPermission({ ...recievedPermission })
            }
            if (readOperation === false) {
                history.push(accessDeniedRoute);
            }
            if (loadingRoleResource === false && !recievedPermission) {
                setPermission({ ...initialPermission })
            }
        } catch (e) {
            console.log(e)
        }
        return () => {
            // 
        }
    }, [setPermission, recievedPermission, readOperation, history, initialPermission, loadingRoleResource])
    return (
        <>
            {
                (loadingRoleResource) ? "Loading" :
                    (

                        <>
                            <CtaFunctionScreen
                                createOperation = {createOperation}
                                openPopup = {openPopup}
                                setOpenPopup ={setOpenPopup}
                            />
                            {
                                openPopup === false && <CtaCategoryScreen />
                            }
                            
                        </>
                    )
            }
        </>
    )
}
