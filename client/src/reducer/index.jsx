import _default from "react-redux/es/components/connect"

const initialState={
    Recipes:[],
    allRecipes:[],
    Diets:[],
    Details:[]
}

function Reducers(state=initialState,action){
    switch (action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                Recipes:action.payload,
                allRecipes:action.payload
            }
        case 'GET_DIETS':
            return{
                ...state,
                Diets:action.payload
            }
        case 'SEARCH_RECIPE':
            let results=action.payload;
            if (results==='Recipe Not Found'){
                results=[]
            }
            return{
                ...state,
                Recipes:results
            }
        case 'ALPHABETICAL':
            var input=action.payload
            var sorted=''
            if (input=='A-Z'){
                sorted=state.Recipes.sort((a,b)=>{
                    if (a.title>b.title){return 1}
                    if (a.title<b.title){return -1}
                })
            }    
            if (input=='Z-A'){
                sorted=state.Recipes.sort((a,b)=>{
                    if (a.title>b.title){return -1}
                    if (a.title<b.title){return 1}
                })
            }
            if (input==""){sorted=state.Recipes}  
            console.log('sorted :',sorted)
            return{
                ...state,
                Recipes:sorted
            }
        case 'SORT_RATING':
            input=action.payload;
            if (input==='asc'){
                sorted=state.Recipes.sort((a,b)=>{
                    if (a.score<b.score){return -1}
                    if (a.score>b.score){return 1}
                    if (a.score===b.score){return 0}
                })
            }
                if (input==='des'){
                    sorted=state.Recipes.sort((a,b)=>{
                        if (a.score<b.score){return 1}
                        if (a.score>b.score){return -1}
                        if (a.score===b.score){return 0}
                    })
                if (input==""){sorted=state.Recipes}    
            }
            return{
                ...state,
                Recipes:sorted
            }
        case 'DIET_FILTER':
            let filter=state.Recipes
            input=action.payload;
            if (input!=='Diet type')
            filter=state.allRecipes.filter(e=>e.diets?.includes(input)||(e.Diets?.map(e=>{
                return e.name
            }))?.includes(input))
            return {
                ...state,
                Recipes:filter
            }
        case 'DETAILS':
            return{
                ...state,
                Details:action.payload
            }
        case 'POST_RECIPE':
            return{
                ...state,
            }    

        default: return state;       
    }

}

export default Reducers;