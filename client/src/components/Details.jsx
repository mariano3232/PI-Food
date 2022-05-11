import React from "react";
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { recipeDetails } from "../actions";
import { Link } from "react-router-dom";
import styles from './Details.module.css'

export default function Details(){
    const {id} =useParams()
    const dispatch=useDispatch()
    const Recipe=useSelector((state)=>state.Details)
    console.log('Recipe :',Recipe)
    useEffect(()=>{
        dispatch(recipeDetails(id))
    }, [id,dispatch])

    console.log('Recipe :',Recipe)

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>{Recipe.title}</h1>
            <Link to='/Home' className={styles.link}>Home</Link>
            <img src={Recipe.image} alt="Not Found" className={styles.img}/>
            <p className={styles.label}>Diets :</p>
            {
                Recipe?.diets?.map(e=>{
                    return <p key={e} className={styles.diet}>{e},</p>
                })
            }
            {
                Recipe?.Diets?.map(e=>{
                    return <p key={e.name} className={styles.diet}>{e.name},</p>
                })
            }
            <p className={styles.label}>Dish type :</p>
            {
                Recipe.dishTypes?.map(e=>{
                    return <p key={e} className={styles.diet}>{e}</p>
                })
            }
            <p className={styles.label}>Summary:</p>
            <p className={styles.text} dangerouslySetInnerHTML={{__html:Recipe.summary}}></p>
            <p className={styles.label}>Score :{Recipe.score}</p>
            <p className={styles.label}>healthScore :{Recipe.healthScore}</p>
            <label className={styles.label}>Step by step :</label>
                {
                    Recipe?.stepByStep?.map(e=>{
                       return <p key={e} className={styles.text}>{e}</p>
                    })
                }
        </div>
    )
}