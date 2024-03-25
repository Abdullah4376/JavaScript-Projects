const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const apiKey = 'bc54d12d6ab0fe81e9f91cd8a1356b8d'
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function getWeather (city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    if (response.status === 404) {
        alert('Please Enter a Valid City!')
    }
    else {
        switch (data.weather[0].main) {
            case 'Clouds':
                weatherIcon.src = 'Images/Clouds.png'
                break;

            case 'Clear':
                weatherIcon.src = 'Images/Clear.png'
                break;

            case 'Drizzle':
                weatherIcon.src = 'Images/Drizzle.png'
                break;

            case 'Mist':
                weatherIcon.src = 'Images/Mist.png'
                break;
    
            case 'Rain':
                weatherIcon.src = 'Images/Rain.png'
                break;
    
            case 'Snow':
                weatherIcon.src = 'Images/Snow.png'
                break;
        
            default:
                break;
        }
    }

    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '*C'
    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.humidity').innerHTML = data.main.humidity
    document.querySelector('.wind').innerHTML = data.wind.speed
}

searchBtn.addEventListener('click', () => {
    if (searchBox.value === '') {
        alert('Please Enter a City Name!')
    }
    else {
        getWeather(searchBox.value)
    }
})