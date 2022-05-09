import React from "react";
import styles from './Paginado.module.css'

export default function Paginado({recipesPerPage,allRecipes,paginado}){
    const pageNumbers=[]
    console.log('allRecipes.length',allRecipes)
    console.log('recipesPerPage',recipesPerPage)

    for (let i=1;i<=Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i)
    }
    console.log('pageNumbers',pageNumbers)
    return(
        <div className={styles.paginado}>
            {pageNumbers.map(e=>{
               return <button key={e} onClick={()=>paginado(e)} className={styles.button}>{e}</button> 
            })}
        </div>
    )
        
        
    
}