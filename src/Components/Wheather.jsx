import React, { useState } from 'react'
import loader from "../img/loader2.gif"
import back from "../img/b.jpg"
import back2 from "../img/video2.mp4"
function Wheather() {
  let [city, setCity] = useState("");
  let [wData, setWData] = useState(undefined)
  let [isLoading, setIsLoading] = useState(false)
  async function  getData(e){
    e.preventDefault()
    setIsLoading(true)
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    let res = await data.json()
    console.log(res);
    if(res.cod == "404"){
      setWData(undefined)
    }
    else{
      setWData(res)
    }
    
    setIsLoading(false)

  }
  return (
    <>
        <div className='w-[100%] h-[100vh] py-[1%] relative'>
          <video src={back2} alt="" className=' w-[inherit] top-0 h-[100vh] absolute z-[-20] right-0' loop="true" autoPlay={true} muted style={{width: "100vw", objectFit: "cover"}} />
          <div className="max-w-[1120px]  mx-auto  pb-[10px]" style={{backgroundColor : "rgba(0,0,0, .4)"}} >
            <h1 className='text-[48px] font-bold py-[40px] px-[auto] mx-[auto] text-center relative z-[1] text-[rgb(255,255,255)]'>Simple Wheather App</h1>
            <form onSubmit={getData} className='px-auto flex justify-center'>
              <input type="text" className='w-[300px] h-[40px] outline-none px-[10px] rounded-[10px]'  value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder='Search City here..'/>
              <button className='bg-[#0f5f63] text-[white] w-[100px] h-[40px] ml-[10px] rounded-[10px]'>Search</button>
            </form>

            <div className='rounded-[10px] mb-[10px] w-[400px] h-[300px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>

                  <img src={loader} alt="" className={`absolute top-0 w-[350px] object-cover h-[300px] z-10 text-center mx-auto ${(isLoading)? '' : 'hidden'}`}/>

                {(wData !== undefined)
                ?
                <>
                
              <h3 className='font-bold text-[30px]'>{wData.name} <span className='bg-[yellow]'>{wData.sys.country}</span></h3>
              <h2 className='font-bold text-[40px]'>{wData.main.temp} <sup>O</sup>C</h2>
              <p className='font-bold text-[20px]'>Feels Like {wData.main.feels_like} <sup>O</sup>C</p>
              <img src={`http://openweathermap.org/img/w/${wData.weather[0].icon}.png`} alt="" />
              <p><b>{wData.weather[0].main}</b>, <span className='text-[grey] text-[.9rem]'>{wData.weather[0].description}</span></p>
              <p><b>Speed:</b> {wData.wind.speed} m/s</p>
              <p><b>Humidity:</b> {wData.main.humidity} g.kg-1</p>
              <p><b>Pressure:</b> {wData.main.pressure} pascal</p>
              </>
              :
              "No City Found"
                
                }
            </div>
          </div>
        </div>
    </>
  )
}

export {Wheather}