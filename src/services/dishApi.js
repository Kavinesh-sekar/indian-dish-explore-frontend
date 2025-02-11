const BackEnd_URL = process.env.REACT_APP_BACKEND_URL;

console.log('BackEnd_URL', BackEnd_URL);

export const getAllDish = async () => {
    try {

        const response = await fetch(`${BackEnd_URL}/api/dish/list_all_dish`);
        // const response = await fetch('http://localhost:5000/api/dish/list_all_dish');

        // console.log('Response:', response);
        // const data = 

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch dishes:', error);
        return [];
    }
};

export const getDishDetails = async(dish_name) =>{

    try{

    const response = await fetch(`${BackEnd_URL}/api/dish/dish_details/${dish_name}`);
    const data = await response.json();
    // console.log('rrrrrrrrrrrrrr',data);
    

    return data;

    }catch(err){
        console.error('Failed to fetch dishes:', err);
        return [];
    }
    

}

export const getSearchResult = async(search_suggestion) =>{
    try{
        console.log('sssss',search_suggestion);
        
        const response = await fetch(`${BackEnd_URL}/api/dish/dish_search/${search_suggestion}`)

        const data = await response.json();
        console.log('ddddddddd',data);
        
        return data;

    }catch(err){
        console.log('err',err);
    }
}