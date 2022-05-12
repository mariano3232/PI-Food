const { Router } = require('express');
const axios=require('axios');
const {Recipe,Diet} = require('../db');
require('dotenv').config();
const {YOUR_API_KEY}=process.env


const router = Router();

const FoodApi=async()=>{
    let allData= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
    let filter=allData.data.results.map(e=>{
        return {
            id:e.id,
            title:e.title,
            image:e.image,
            summary:e.summary,
            diets:e.diets,
            dishTypes:e.dishTypes,
            score:e.spoonacularScore,
            healthScore:e.healthScore,
            stepByStep:e.analyzedInstructions.map(e=>{
                return e.steps.map(e=>{
                    return e.step
                })
            })
        }
    })
    return filter;
}

const FoodDb=async ()=>{
   return await Recipe.findAll({
           include:{                            
               model:Diet,                   
               attributes:['name'],
               through: {attributes:[]}   
           }
     })
}
const getFood=async()=>{    
    const api=await FoodApi();
    const db=await FoodDb();
    const allFood=api.concat(db)
    return allFood;
}

//rutas:


router.get('/recipes',async(req,res)=>{      
    let query=req.query.name;
    let recipes=await getFood();
    let response=recipes;
    if (query){
        let filter=recipes.filter(e=>{
            return e.title.toLowerCase().replaceAll(',','').split(' ').includes(query.toLocaleLowerCase())
        })
        response=filter;
        if (filter.length<1){
            response='Recipe Not Found'
        }
    }
    res.status(200).send(response)
})


router.get('/recipes/:RecipeID',async(req,res)=>{    //details    
    let recipes= await getFood();
    let RecipeID=req.params.RecipeID;
    let response='Not Found ):'
    let filter=recipes.filter(e=>{
        return e.id==RecipeID
    })
    if (filter.length===1){
        let e=filter[0]; 
        response={
            title:e.title,
            image:e.image,
            dishTypes:e.dishTypes,
            diets:e.diets,
            Diets:e.Diets,
            summary:e.summary,
            score:e.score,
            healthScore:e.healthScore,
            stepByStep:e.stepByStep
        }
    }
    res.status(200).send(response)
})


router.get('/types',async (req,res)=>{
    let recipes=await getFood();
    let Diets=recipes.map(e=>{
        return e.diets
    })
    let UniqueDiets=[];
    Diets.flat().forEach(e=>{
        if (!UniqueDiets.includes(e)&&typeof(e)!=='object'){
            UniqueDiets.push(e)
        }
    })
    UniqueDiets.forEach(async (e)=>{
       if (e){
            await Diet.findOrCreate({where:{name:e}})
        }
    });
    let response= await Diet.findAll()
    res.status(200).send(response)
})


router.post('/recipe',async(req,res)=>{
    const {title,image,summary,score,healthScore,stepByStep,diets}=req.body

    const RecipeData={
        title,
        image,
        summary,
        score,
        healthScore,
        stepByStep,
    }
    const newRecipe=await Recipe.create(RecipeData)
    const dietsDb=await Diet.findAll({where:{name:diets}})
    newRecipe.addDiet(dietsDb)
    res.send('New recipe stored succesfully')
})


module.exports = router;
