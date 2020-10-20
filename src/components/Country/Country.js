import React from 'react';
import './Country.css';

function Country (props){
    return (
        <div className="country" onClick={props.clicked}>{props.name}</div>
    )
}
export default Country;
