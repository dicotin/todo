import React from "react";

type ButtonPropsType = {
    title:string

    callback:Function
}
export const Button = (props:ButtonPropsType) =>{
    return(
        <button onClick={()=> props.callback('all')}>{props.title}</button>
    );
}