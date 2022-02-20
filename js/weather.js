const API_KEY = "26ba005b5fb2172070224fe0d61c84ea";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const city = document.querySelector("#weather span:first-child");
        const weather = document.querySelector("#weather span:nth-child(2)");
        const temp = document.querySelector("#weather span:last-child");

        weather.innerText = `${data.weather[0].main} &`;
        city.innerText = data.name;
        temp.innerText = data.main.temp;
    });
}

function onGeoError(){
    alert("Can't find you. No weather for you")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)