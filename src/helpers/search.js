const searchNameByIdFromArray = (arr, id) =>{
    console.log(arr)
    console.log(id)
    const name = Array.isArray(arr) && typeof(id)!=='undefined' ?  arr.find( item => item.id === id).name : "no data found";
    return name
}
const searchTitleByIdFromArray = (arr, id) =>{
    const title = Array.isArray(arr) && typeof(id)!=='undefined' ? arr.find( item => item.id === id).title : "no data found";
    return title
}

const createPermission = async (permissionArr, pathName) => {
    let permission = false 
    //eslint-disable-next-line
    const getPermission = await new Promise ((resolve,reject)=>{
        permission = permissionArr.find(item => item.systemName!= null && (item.systemName.toUpperCase() === pathName.toUpperCase()));
        if(permission){
            console.log(permission.createOperation)
            resolve()
        }else{
            reject()
        }

    })
}
export { searchNameByIdFromArray, searchTitleByIdFromArray, createPermission };
