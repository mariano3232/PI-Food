import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css';

export default function Card(p){
    return(
        <div className={styles.container}>
            <Link to={'/Home/'+p.id} className={styles.title}><h1>{p.title}</h1></Link>
            <div className={styles.space}/>
            {
                p.diets?.map(e=>{
                    return(
                        <span key={e} className={styles.diets}>{e}{" "}</span>
                    // <p key={e} className={styles.diets}>{e}, </p>
                    )
                })
            }
            {
                p.Diets?.map(e=>{
                    console.log('Created recipe name :',e.name)
                    return(
                    <p key={e.name} className={styles.diets}>{e.name}, </p>
                    )
                })
            }
            <Link to={'/Home/'+p.id}><img src={p.image} alt="Not Found" className={styles.img} /></Link>
        </div>
    )
}