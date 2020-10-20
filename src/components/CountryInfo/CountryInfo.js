import React from 'react';
import './CountryInfo.css';

function CountryInfo (props){       
    let text = "";
    if(props.borders!==undefined) text=props.borders.join(" , ");
    return (
        <div className="country__wrapper">
            <p>Name : {props.info.name}</p>
            <p>Capital : {props.info.capital}</p>
            <p>Population : {props.info.population}</p>
            <p>Borders with: {text}</p>
            <img className="country__flag" src={props.info.flag} alt="flagImg"/>
        </div>
    )
}
export default CountryInfo;
