export const getItemFromLocalStorage = () => {
    const item = localStorage.getItem('list');
    if(item) return JSON.parse(item);
    return [];
}