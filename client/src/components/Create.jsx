import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { getDiets,post } from "../actions";
import styles from './Create.module.css'

export default function Create(){
    const dispatch=useDispatch();
    const diets=useSelector(state=>state.Diets)
    var [input,setInput]=useState({
        title:'',
        image:'',
        summary:'',
        score:'',
        healthScore:'',
        stepByStep:[],
        diets:[]
    })
    const [step,setStep]=useState('')

    useEffect(()=>{
        dispatch(getDiets())
    },[])

    function HandleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        console.log('input :',input)
    }

    function HandleSelect(e){
        let diets=[...input.diets,e.target.value]
        let uniqueDiets=[]
        diets.forEach(e=>{
            if (!uniqueDiets.includes(e)){
                uniqueDiets.push(e)
            }
        })
        setInput({
            ...input,
            diets:uniqueDiets
        })
    }
    function HandleStep(e){
        e.preventDefault()
        setStep(e.target.value)
    }
    function HandleClick(e){
        e.preventDefault();
        setInput({
            ...input,
            stepByStep:[...input.stepByStep,step]
        })
        setStep('')
        console.log('input :',input)
    }
    function HandleResetSteps(e){
        e.preventDefault()
        setInput({
            ...input,
            stepByStep:[]
        })
    }
    function HandleResetDiets(e){
        e.preventDefault();
        setInput({
            ...input,
            diets:[]
        })
    }
    function HandleSubmit(e){
        var letters = /^[A-Za-z, ]+$/
        e.preventDefault();
        if (input.title.length===0){return alert('The recipe has no title!')}
        if (!input.title.match(letters)){return alert('Title must be letters only')}
        if (input.score<1||input.score>100){return alert('Score must be between 1 and 100')}
        if (input.healthScore<1||input.healthScore>100){return alert('healthScore must be between 1 and 100')}
        dispatch(post(input))
        setInput({
            title:'',
            image:'',
            diets:[],
            summary:'',
            score:'',
            healthScore:'',
            stepByStep:[]
        })
        alert('Recipe added to the page :)')
    }

    return(
        <div className={styles.container}>
            <Link to ='/Home' className={styles.link}>Home</Link>
            <h1 className={styles.new}>Add a new recipe!!</h1>
            <form onSubmit={(e)=>HandleSubmit(e)}>
                <label className={styles.label}>  Title: </label>
                <input type="text" name='title' value={input.title} onChange={HandleChange} className={styles.title}/>
                <div className={styles.space}/>
                <label className={styles.label}>ImageUrl :</label>
                <input type="url" name='image' onChange={(e)=>HandleChange(e)} className={styles.title}/>
                <div className={styles.space}/>
                <label className={styles.label}>Diets:</label>
                <select onChange={(e)=>HandleSelect(e)} className={styles.select}>
                    <option disabled selected>Diets</option>
                    {
                        diets.map(e=>{
                           return <option key={e} id={e} value={e}>{e}</option>
                        })
                    }
                </select>
                <button onClick={(e)=>{HandleResetDiets(e)}} className={styles.button}>Reset diets</button>
                <ul>
                    <li>
                        {input.diets.map(e=>
                            e + ', '
                        )}
                    </li>
                </ul>
                <label className={styles.label}>summary:</label>
                <div className={styles.space}/>
                <textarea rows="2" cols="25" type="text" name='summary' value={input.summary} onChange={HandleChange} className={styles.summary}></textarea>
                <div className={styles.space}/>
                <label className={styles.label}>Score:</label>
                <input type="number" name='score' value={input.score} onChange={HandleChange} className={styles.input}/>
                <label className={styles.label}>healthScore:</label>
                <input type="number" name='healthScore' value={input.healthScore} onChange={HandleChange} className={styles.input}/>
                <div className={styles.space}/>
                <label className={styles.label}>Step by step instructions :</label>
                <textarea rows="2" cols="25" type="text" onChange={(e)=>HandleStep(e)} className={styles.step}/>
                <div className={styles.space}/>
                <button onClick={(e)=>HandleClick(e)}className={styles.button}>add step</button>
                <button onClick={(e)=>{HandleResetSteps(e)}} className={styles.button}>Reset steps</button>
                {/* <ul><li>{input.stepByStep.map((e,index)=>'step '+(index+1)+': '+e +', ')}</li></ul> */}
                <ul><li>{input.stepByStep.map((e,i)=>'Step '+(i+1)+' saved,' )}</li></ul>
                <button type='submit' className={styles.add}>Add recipe</button>
            </form>
        </div>
    )
}