import axios from "axios"

export function getRecipes(){
    return async (dispatch)=>{
        const allRecipes=await axios('http://localhost:3001/Recipes')
        // console.log('actionrecipes :',allRecipes.data)
        return dispatch({
            type:'GET_RECIPES',
            payload:allRecipes.data
        })
    }
}
export function getDiets(){
    return async (dispatch)=>{
        const allDiets=await axios('http://localhost:3001/types')
        const filter=allDiets.data.map(e=>{return e.name})
        console.log('actionsFilter :',filter)
        return dispatch({
            type:'GET_DIETS',
            payload:filter,
        })
    }
}

export function searchRecipe(search){
    return async (dispatch)=>{
        const results=await axios('http://localhost:3001/Recipes?name='+search)
        return dispatch({
            type:'SEARCH_RECIPE',
            payload:results.data
        })
    }
}
export function alphabetical(input){
    console.log('input :',input)
    return async (dispatch)=>{
        return dispatch({
            type:'ALPHABETICAL',
            payload:input
        })
    }
}
export function sortRating(input){
    return async (dispatch)=>{
        return dispatch({
            type:'SORT_RATING',
            payload:input
        })
    }
}
export function dietFilter(input){
    return async (dispatch)=>{
        return dispatch({
            type:'DIET_FILTER',
            payload:input
        })
    }
}
export function recipeDetails(id){
    return async (dispatch)=>{
        const Data=await axios('http://localhost:3001/Recipes/'+id)
        console.log('Data :',Data)
        return dispatch({
            type:'DETAILS',
            payload:Data.data
        })
    }
}
export function post(data){
    console.log('data que llega a la action post :',data)
    return async (dispatch)=>{
        const response=await axios.post('http://localhost:3001/recipe',data)
        console.log('response :',response)
        return dispatch({
            type:'POST_RECIPE',
            payload:response
        })
    }
}