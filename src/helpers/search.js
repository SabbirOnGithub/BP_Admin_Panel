const searchNameByIdFromArray = (arr, id) =>{
    const name = Array.isArray(arr) ?  arr.find( item => item.id === id).name : "no data found";
    return name
}
const searchTitleByIdFromArray = (arr, id) =>{
    const title = Array.isArray(arr) ? arr.find( item => item.id === id).title : "no data found";
    return title
}
export { searchNameByIdFromArray, searchTitleByIdFromArray };
