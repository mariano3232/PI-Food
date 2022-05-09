import React from "react";
import {Link} from "react-router-dom";
import styles from './Landing.module.css'

export default function Landing(){
    return(
        <div className={styles.container}>
            {/* <h1 className={styles.title}>Food beibiii</h1> */}
            <Link to='/Home'><button className={styles.button}>
                <h1>Check out the recipes</h1>
                </button>
            </Link>
        </div>
    )
}