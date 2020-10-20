import React, {useEffect, useState} from 'react';
import './CountryContainer.css';
import axios from 'axios';
import Country from '../../components/Country/Country';
import CountryInfo from '../../components/CountryInfo/CountryInfo';
function CountryContainer (){
    const [countryState,setCountryState]=useState([]);
    const [currentCountryInfo,setCurrentCountryInfo]=useState({});
    const [bordersCountry,setBordersCountry] = useState();
    const [showFirstMessageForUser,setShowFirstMessageForUser] = useState(true);
    useEffect(()=>{
        axios.get(`all?fields=name;alpha3Code`)
            .then(response=>{
                setCountryState(response.data);
            })
    },[])
    const clickedCountry = async (code)=> {
        await axios.get(`alpha/${code}`)
            .then(response=> {
                setCurrentCountryInfo(
                    {
                        name:response.data.name,    
                        flag:response.data.flag,
                        capital:response.data.capital,
                        population:response.data.population,
                        borders: (function (){
                            return Promise.all(response.data.borders.map(country=>{
                                 return axios.get(`alpha/${country}`)
                                            .then( response=>{
                                                const data = response.data;
                                                return data.name;
                                            })
                            }))
                            .then(items=>{
                                setBordersCountry(items);
                            })
                        })()  
                    }
                )
            })
        setShowFirstMessageForUser(false);
    }   
    return (
        <>
            <div className="container">
                <div className="country__container">
                    {Object.values(countryState).map((element,index)=>{
                        return (
                            <Country key={index} name={element.name} clicked={()=>clickedCountry(element.alpha3Code)}/>
                        )
                    })}
                </div>
                {showFirstMessageForUser ?"Выберите страну":<CountryInfo info={currentCountryInfo} borders={bordersCountry}/>}
            </div>
        </>
    )
}
export default CountryContainer;

