import store from '../redux/store'

const searchNameByIdFromArray = (arr, id) =>{
    // console.log(arr)
    // console.log(id)
    const name = Array.isArray(arr) && typeof(id)!=='undefined' ?  arr.find( item => item.id === id)?.name : "no data found";
    return name
}
const searchTitleByIdFromArray = (arr, id) =>{
    const title = Array.isArray(arr) && typeof(id)!=='undefined' ? arr.find( item => item.id === id)?.title : "no data found";
    return title
}

const getPermissions = (currentPathName) =>{
    const {roleResourceDetails : { roleResource }} = store.getState();
    const permission = Array.isArray(roleResource) ? roleResource.filter(item => item.systemName!= null && (item.systemName?.toUpperCase() === currentPathName?.toUpperCase()))[0] : {};
    return permission
    
}
const getFilterDataByUser = (dataOfArray, userInfo) =>{
    // 1-superadmin, 2-admin, 3- member, 4- client 
    const tableDataFilterByUser = (userInfo?.userRole === 1 || userInfo?.userRole === 2) ? dataOfArray : (userInfo?.userRole === 3 ? [] : dataOfArray?.filter(item=>item?.email === userInfo?.email))

    return tableDataFilterByUser
    
}
export { searchNameByIdFromArray, searchTitleByIdFromArray, getPermissions, getFilterDataByUser };
