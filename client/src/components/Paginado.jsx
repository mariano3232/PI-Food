import React from "react";
import styles from './Paginado.module.css'

export default function Paginado({recipesPerPage,allRecipes,setCurrentP}){
    const pageNumbers=[]

    for (let i=1;i<=Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i)
    }
    return(
        <div className={styles.paginado}>
            {pageNumbers.map(e=>{
               return <button key={e} onClick={()=>setCurrentP(e)} className={styles.button}>{e}</button> 
            })}
        </div>
    )
        
        
    
}