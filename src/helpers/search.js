const searchNameByIdFromArray = (arr, id) =>{
    const name = arr.find( item => item.id === id).name;
    return name ? name : 'no name found'
}
const searchTitleByIdFromArray = (arr, id) =>{
    const title = arr.find( item => item.id === id).title;
    if(title){
        return title
    }
    return 'no name found'
}
export { searchNameByIdFromArray, searchTitleByIdFromArray };
