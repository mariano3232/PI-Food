import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css';
import img from '../catFood.jpg'


export default function Card(p){
    const catFood=img;
    return(
        <div className={styles.container}>
            <Link to={'/Home/'+p.id} className={styles.title}><h1>{p.title}</h1></Link>
            <div className={styles.space}/>
            {
                p.diets?.map(e=>{
                    return(
                        <span key={e} className={styles.diets}>{e}{" "}</span>
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
            <Link to={'/Home/'+p.id}><img src={p.image} alt='Not found' width= '270px' height='200px' className={styles.img}/></Link>
        </div>
    )
}