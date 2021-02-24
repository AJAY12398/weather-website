console.log("welcome to know your city weather site");
// need appi key so in this project learn how to use featchig 
//used a api key 
let loc = document.getElementById('location')

let tempicon =  document.getElementById('tempimg');
let tempvalue = document.getElementById('temp-value');

let climent  = document.getElementById('climent')

let iconefile;

const searching  = document.getElementById('searching')

const serchbutton  = document.getElementById('search-btn')


serchbutton.addEventListener('click' , (e)=>{
    e.preventDefault();
    getWeather(searching.value)
    searching.value = '';
});
const getWeather=async (city) =>{
     try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=467fa4838f6073c1fb7c95fde6fdec9f`,

         {mode: 'cors'}
         );
         
         const weatherData = await response.json();
         console.log(weatherData);
         const{name} = weatherData;
         const{feels_like} = weatherData.main;
         const{id,main} = weatherData.weather[0];
         loc.textContent = name;
         climent.textContent = main;
         tempvalue.textContent = Math.round(feels_like-273);
         
        if(id<300 && id>200)
        {
            tempicon.src = 'tstrome.png'
        }
       else if(id<400 && id>300)
       {
            tempicon.src = 'cloudsolid.png'
        }
        else  if(id<600 && id>500)
        {
            tempicon.src =  'rain.png'
        }
         else if(id<700 && id>600)
        {
            tempicon.src = 'snow.png'
        }
         else if(id<800 && id>700)
        {
            tempicon.src = 'cloud.png'
        }
        else if(id==800)
        {
            tempicon.src = 'cloudsun.png'
        }
         

     } 
     catch(error)
     {
         alert('city not found');
     }
     
};

// for the need user location must know the geolocation api
const sucessCallBack = (position) =>{
    console.log(position);
};
const errorCallBack = (error) =>{
    console.error(error);
}

//     navigator.geolocation.getCurrentPosition(sucessCallBack , errorCallBack);

window.addEventListener('load' , ()=>{
    let long;
    let lat;
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position)=>{
            long= position.coords.longitude;
            lat = position.coords.latitude;
            const proxy  = "https://cors-anywhere.herokuapp.com/"
            // https://cors-anywhere.herokuapp.com/
            // const proxy = 'https://github.com/Rob--W/cors-anywhere'

            const api = ` ${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=467fa4838f6073c1fb7c95fde6fdec9f`
            fetch(api).then((response)=>{
                return response.json();
            })
            .then(data=>{
                const{name} = data;
                const{feels_like} =  data.main;
                const{id,main} = data.weather[0];

                loc.textContent = name;
                climent.textContent = main;
                tempvalue.textContent = Math.round(feels_like);
                if(id<300 && id>200){
                    tempimg.src = "tstrome.png"
                }
               else if(id<400 && id>300)
                {
                    tempicon.src =  "cloudsolid.png";
                }
                else  if(id<600 && id>500)
                {
                    tempicon.src =  "rain.png";
                }
                 else if(id<700 && id>600)
                {
                    tempicon.src =  "snow.png"
                } 
                else if(id<800 && id>700)
                {
                    tempicon.src =  "cloud.png";
                }
                else if(id==800){
                    tempicon.src =  "cloudsun.png";
                }
                console.log(data);
            })
        })
    }
})



