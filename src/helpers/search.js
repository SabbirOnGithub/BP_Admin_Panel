const searchNameByIdFromArray = (arr, id) =>{
    const name = arr.find( item => item.id === id).name;
    return name ? name : 'no name found'
}
const searchTitleByIdFromArray = (arr, id) =>{
    console.log(arr)
    const title = arr.find( item => item.id === id).title;
    return title ? title : 'no name found'
}
export { searchNameByIdFromArray, searchTitleByIdFromArray };
