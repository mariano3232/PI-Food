import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {searchRecipe} from "../actions";
import styles from './SearchBar.module.css'
export default function SearchBar(){
    const dispatch=useDispatch()
    const [search,setSearch]=useState()

    function HandleChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }
    function HandleClick(e){
        e.preventDefault()
        dispatch(searchRecipe(search))
    }

    return(
        <div>
            <input
                type="text"
                placeholder='Search recipe'
                onChange={(e)=>HandleChange(e)}
                className={styles.search}
             />
            <button onClick={(e)=>HandleClick(e)} className={styles.button}>Search</button>
        </div>
    )
}