import { useState,useEffect } from 'react'
import './css/Weather.css';
// import images 
import rain from '../assets/weater/rain.png';
import heavyrain  from '../assets/weater/heavyrain.jpg'
import sunny from '../assets/weater/sun.png';
import search from '../assets/weater/search.png';
import normalcolud from '../assets/weater/normalcloud.png';
import cloudyrain from '../assets/weater/cloudyrain.png'
import cloudy from '../assets/weater/clouds.png';
import snow from '../assets/weater/snow.jpg';



function Wetherdetailes({weatericon,degree,city,country,lati,long}) {
  return (
    <>
      <div>
        <div className="img-contaoner">
          <img src={weatericon} alt="weatericon" />
        </div>
        <div className="detailes">
          <h1 className='degree'>{degree}<sup>o</sup>C</h1>
          <h1 className='place'>{city}</h1>
          <h1 className='country'>{country}</h1>
        </div>
        <div className="coord">
          <div className='lati'>
            <p>Latitude</p>
            <p>{lati}</p>
          </div>
          <div className='long'>
            <p>longitude</p>
            <p>{long}</p>
          </div>
        </div>
      </div>
    </>
  )
}

function Weather() {

  //create useState variale for single information
  const [val,setVal] = useState('Dharmapuri');
  const [weatericon,setWeatericon] = useState(normalcolud);
  const [degree,setDegree] = useState(0);
  const [city,setCity] = useState("");
  const [country,setCountry] = useState('in');
  const [lati,setLati] = useState(0);
  const [long,setLong] = useState(0);
  const [citynotfount,setCitynotfount] = useState(false);  
  const weatericonimage = {
    "01d": sunny,
    "02d": normalcolud,
    "03d": cloudy,
    "04d": cloudyrain,
    "09d": rain,
    "10d": heavyrain,
    "11d": snow,

  }

  // API call function
  let apikey = '42f5e422f59d8fb1d4b4d6e6750080a0'
  async function callapi(){
    try{
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${apikey}&units=metric`);
      const data =await res.json();
      if(data.cod === "404"){
        setCitynotfount(true);
      }else{
        setCitynotfount(false);
      }
      let icon = data.weather[0].icon;
      setWeatericon(weatericonimage.icon || normalcolud);
      setDegree(data.main.temp);
      setCountry(data.sys.country);
      setLati(data.coord.lat);
      setLong(data.coord.lon);
      setCity(val);
    }catch(err){
      console.log("Error found :"+err);
    }
    
  }

  
  //define functions
  useEffect(()=>{
    callapi();
  },[]);

  // input field function
  function setcity(e){
    setVal(e.target.value);
  }
  // handle key function
  function handleenterkey(e){
    if(e.key==='Enter'){
      callapi();
    }
  }

  return (
    <>
        <div className='conatinern col-md-5 col'>
            <div className="input-contain">
                <input type="text" id='input-text' onChange={setcity} value={val} onKeyDown={handleenterkey}/>
                <img src={search} alt="search" onClick={callapi}/> 
            </div>
            {!citynotfount &&<Wetherdetailes weatericon={weatericon} degree={degree} city={city} country={country} lati={lati} long={long}/>}
            {citynotfount && <h1 className='error-msg'>City Not Found</h1>}
        </div>
        
    </>
  )
}

export default Weather
