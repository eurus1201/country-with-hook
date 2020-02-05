import React,{ useState,useEffect,useRef } from "react";
import  CountryCard from "./countryCard.component";
import { countryServices } from "../services/getCountrie.servises";

export default ()=>{
    const [countries, setCountries]= useState([]);
    // const componentIsMounted = useRef(true);

   const load = () =>{
    countryServices.all.get().then(
        ({response })=>{
            setCountries(response )
        },
        ()=>setCountries([])
    )
   }

   useEffect(() => {
      load();
   }, []);
   
    return (
        <div className="countries-container">
          {countries.map(country => {
            return <CountryCard key={country.numericCode} country={country} />;
          })}
        </div>
      ); 
}