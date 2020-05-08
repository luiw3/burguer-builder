import React from 'react';

import classes from './Burguer.module.css';
import BurguerIngredient from './BurguerIngredients/BurguerIngredient';

const Burguer = (props) => {
   // console.log(props.ingredients) -> recebe o objeto contendo os ingredientes e a quantidade
    let transformedIngredients = Object.keys(props.ingredients) // extrai o nome das propriedades definidas em um array
    .map((igKey)=>{
     //   console.log(igKey); -> guarda o nome dos ingredientes, que será passado como props para o BurguerIngredient
        return [...Array(props.ingredients[igKey])].map((_, i)=>{ // {props.ingredients[igKey]} -> encontra o valor de cada propriedade que é extraida no igKey
         return <BurguerIngredient key={igKey + i} type={igKey} /> 
        });
    })
    .reduce((arr, el)=>{
        return arr.concat(el)
    }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );
};

export default Burguer;