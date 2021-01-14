import Cookie from 'js-cookie';

export const userToken = Cookie.get('userToken');

export const validAdmin = ()=>{
    //eslint-disable-next-line
    const userToken = Cookie.get('userToken')
    // return true;

    if(userToken)
    {
        return true;
    }
    else {
        return false;
    }
     
}
