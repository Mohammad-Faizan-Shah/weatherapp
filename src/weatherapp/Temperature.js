 import React, { useEffect, useState, } from 'react'
 import Weathercard from 'weatherapp./weathercard';
 import "./style.css";
 
 

 

 const Temperature = () =>{
     const [searchValue, setSearchValue]= useState("Ujjain"); 
    const [tempInfo, setTempInfo] = useState({});
    let api = process.env.REACT_APP_WEATHERAPP_API;
     const getWeatherInfo = async() => {
         try {
             let url = `https://api.openweathermap.org/data/2.5/weather?q=
                        ${searchValue}&units=metric&appid=86f6fd1b16947ad68412f38c2160061e`;

             let res = await fetch(url);
             let data = await res.json();

                const {temp, humidity, pressure}=data.main;
                const {main: weathermood}= data.weather[0];
                const {name}=data;
                const {speed}= data.wind;
                const{country, sunset}= data.sys;

                const myNewWeatherInfo = {
                    temp,
                    humidity,
                    pressure,
                    weathermood,
                    name,
                    speed,
                    country,
                    sunset,
                };

                setTempInfo(myNewWeatherInfo);
             console.log(data);
            } catch (error) {
             console.log(error);
         }
     };

     useEffect(()=>{
        getWeatherInfo();
     }, []);

    return (
    <>
   
    <div className='wrap'>
        <div className='search'>
             <input
             type="search"
             placeholder="Search.."
             autoFocus
             id="search"
                className="searchTerm"
                className="searchTerm"
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}
             />
 
                 <button 
                 className="searchButton"
                 type="button"
                 onClick={getWeatherInfo}>
                 Search
                </button>
        </div>
    </div>

    <Weathercard tempInfo={tempInfo}/>
 
    </>
    );
 };
 
 export default Temperature;