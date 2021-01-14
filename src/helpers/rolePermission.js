export const createPermission = (permissionArr, pathName) => {
    const permission = Array.isArray(permissionArr) ? permissionArr.find(item => item.systemName!= null && (item.systemName.toUpperCase() === pathName.toUpperCase())) : false;
    return permission
}