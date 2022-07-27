import React from "react";

export default function Die(props){
    return(
        <div className={`grid-item ${props.isHeld ? "held": ""}`} onClick={props.handleClick}>
            <p>{props.value}</p>
        </div>
    )
}