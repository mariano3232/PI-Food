import React from "react";
import { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { getRecipes,getDiets,alphabetical,sortRating,dietFilter} from "../actions"
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from './Home.module.css'


export default function Home(){
    const dispatch=useDispatch();
    const recipes=useSelector(state=>state.Recipes)
    const diets=useSelector((state)=>state.Diets)
    //indices para el paginado:
    const [state,setState]=useState('') //solo sirve para renderizar
    const [currentPage,setCurrentPage]=useState(1)
    const [recipesPerPage,setRecipesPerPage]=useState(9)
    const lastRecipeIndex=currentPage*recipesPerPage;
    const firstRecipeIndex=lastRecipeIndex-recipesPerPage;
    const currentRecipes=recipes.slice(firstRecipeIndex,lastRecipeIndex)
    console.log('currentRecipes :',currentRecipes)
    const setCurrentP=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getDiets())
    },[dispatch])

    function HandleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
    }
    
    function HandleAlphabetical(e){
        e.preventDefault();
        dispatch(alphabetical(e.target.value))
        setState(e.target.value)
    }

    function HandleRating(e){
        e.preventDefault();
        dispatch(sortRating(e.target.value))
        setState(e.target.value)
    }
    function HandleDiet(e){
        e.preventDefault();
        dispatch(dietFilter(e.target.value))
        setState(e.target.value)
    }
    return(
        <div>
            
            <header className={styles.header}>
                <h1 className={styles.title}>HenryRecipes</h1>
                <SearchBar/>
                <Link to='/recipe' className={styles.add}>Add a new recipe</Link>
            </header>
            <div className={styles.space}/>
            <div>
                <select onChange={(e)=>HandleAlphabetical(e)} className={styles.select}> 
                    <option disabled selected>Alphabetical</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select onChange={(e)=>HandleRating(e)} className={styles.select}>
                    <option disabled selected>Rating</option>
                    <option value="des">↑</option>
                    <option value="asc">↓</option>
                </select>
                <select onChange={(e)=>HandleDiet(e)} className={styles.select}>
                    <option disabled selected>Diet type</option>
                    {
                        diets.map(e=>{
                            return(
                            <option key={e} value={e}>{e}</option>
                            )
                        })
                    }
                </select>
                <button onClick={(e)=>HandleClick(e)}  className={styles.button}>Reload recipes</button>
                <Paginado recipesPerPage={recipesPerPage} allRecipes={recipes.length} setCurrentP={setCurrentP} />
                <div className={styles.space}/>
                {   
                    currentRecipes?.map(e=>{
                        return <Card title={e.title} diets={e.diets} Diets={e.Diets} image={e.image} key={e.id} id={e.id}/>
                    })
                }
                
                {/* {
                    recipes.map(e=>{
                        return <Card title={e.title} diets={e.diets} image={e.image} key={e.id} id={e.id}/>
                    })
                } */}
            </div>
        </div>
    )
}
