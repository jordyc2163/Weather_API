// the key we need to access Weather API
const apiKey = 'bb38f902b13c7f644fd2fcfa37abcecb'

// Unsplash access key for Image API
const accessKey = 'h8rqHCR1IBDieyIc4Z68CBVKnCdbhztg_42NfsjABpo'



// Creating functions to convert data from Kelvin to either C or F
const convertKelvinToF = (kelvin) => {
    let farenheit = (kelvin - 273.15) * (9 / 5) + 32
    return `${parseInt(farenheit)}${'\u2109'}`
}
const convertKelvinToC = (kelvin) => {
    let celsius = (kelvin - 273.15)
    return `${parseInt(celsius)}${'\u2103'}`
}

// Creating a section to place our API things
const DOM_Elements = {
    weatherWidget: '.placement-stuff',
    background: '.image-placeholder'
}


/**
 * Function creates html with parameters that will hold our API values and insert it into
 * the DOM element 
 * @param {*} city 
 * @param {*} country 
 * @param {*} temp 
 * @param {*} feels 
 * @param {*} max 
 * @param {*} min 
 * @param {*} description 
 */
const createWidget = (city, country, temp, feels, max, min, description, icon, condition, imageURL, imageDescription, imageAuthor) => {
    const html = `<div class="card shadow-0 border">
    <div class="card-body p-4 ">
        <h4 class="mb-1 sfw-normal">${city}, ${country}</h4>
        <p class="mb-2">Current temperature: <strong>${temp}</strong></p>
        <p>Feels like: <strong>${feels}</strong></p>
        <p>Max: ${max}<strong></strong>, Min:
            <strong>${min}</strong></p>
        <div class="d-flex flex-row align-items-center">
            <p class="mb-0 me-4">${description}</p>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="condition text" title = "${condition}">
        </div>
    </div>
</div>`
    const html2 = `<img src="${imageURL}" alt="City Image" class = "city-image" title = "${imageDescription} by ${imageAuthor}">`

    document.querySelector(DOM_Elements.background).insertAdjacentHTML('afterbegin', html2)
    document.querySelector(DOM_Elements.weatherWidget).insertAdjacentHTML('beforeend', html)

}

/**
 * Function will grab specific weather data for searched city
 * @param {*} city_name - will take the input from the searchbar form and
 *  place it into the API link
 * @returns 
 */
const getData = async (city_name) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=bb38f902b13c7f644fd2fcfa37abcecb`)
    return response.data
}


const getImageData = async (city) => {
    const imageInfo = await axios.get(`https://api.unsplash.com/photos/random?client_id=${accessKey}&orientation=landscape&query=${city}`)
    const image = imageInfo.data
    return image
}

/**
 * Function will grab specific values from the getData() function for us to set as variables
 * Celsius version
 * @param {*} city_name - taken from the searchbar value whatever the user inputs
 * @returns 
 */
const loadDataCelsius = async (city_name) => {
    let weatherInfo = await getData(city_name)
    let cityImage = await getImageData(city_name)
    let temperature = weatherInfo.main
    let forecast = weatherInfo.weather[0]
    let wind = weatherInfo.wind
    let city = weatherInfo.name
    let country = weatherInfo.sys.country

    let celsiusTemp = convertKelvinToC(temperature.temp)
    let celsiusMax = convertKelvinToC(temperature.temp_max)
    let celsiusMin = convertKelvinToC(temperature.temp_min)
    let celsiusFeels = convertKelvinToC(temperature.feels_like)
    createWidget(city, country, celsiusTemp, celsiusFeels, celsiusMax, celsiusMin, forecast.description, forecast.icon, forecast.main, cityImage.urls.raw, cityImage.description, cityImage.user.name)
}
/**
 * Function will grab specific values from the getData() function for us to set as variables
 * Fahrenheit version
 * @param {*} city_name - taken from the searchbar value whatever the user inputs
 * @returns 
 */
const loadDataFahrenheit = async (city_name) => {
    let weatherInfo = await getData(city_name)
    let cityImage = await getImageData(city_name)
    let temperature = weatherInfo.main
    let forecast = weatherInfo.weather[0]
    let wind = weatherInfo.wind
    let city = weatherInfo.name
    let country = weatherInfo.sys.country

    let fahrenheitTemp = convertKelvinToF(temperature.temp)
    let fahrenheitMax = convertKelvinToF(temperature.temp_max)
    let fahrenheitMin = convertKelvinToF(temperature.temp_min)
    let fahrenheitFeels = convertKelvinToF(temperature.feels_like)
    createWidget(city, country, fahrenheitTemp, fahrenheitFeels, fahrenheitMax, fahrenheitMin, forecast.description, forecast.icon, forecast.main, cityImage.urls.raw, cityImage.description, cityImage.user.name)
}




// Function that clears the DOM section
const clearData = () => {
    document.querySelector(DOM_Elements.weatherWidget).innerHTML = ("")
    document.querySelector(DOM_Elements.background).innerHTML = ("")
}

// Create Form Variables
const form = document.querySelector("#testForm")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    let city = document.querySelector('#searchbar')
    let celsius = document.querySelector('#inlineRadio1')
    let fahrenheit = document.querySelector('#inlineRadio2')
    if(celsius.checked) {
        clearData()
        loadDataCelsius(city.value)
      }else if(fahrenheit.checked) {
        clearData()
        loadDataFahrenheit(city.value)
      }

})

// SCRAPPED //

// Creating EventListeners for radio buttons to display their sepcific Temp
// const degreeCelsius = document.querySelector('#inlineRadio1')
// degreeCelsius.addEventListener("click", async (event) => {
//     let city = document.querySelector('#searchbar')
//     if(city.value){
//         clearData()
//         loadDataCelsius(city.value)
//     } 
// })

// const degreeFahrenheit = document.querySelector('#inlineRadio2')
// degreeFahrenheit.addEventListener("click", async (event) => {
//     let city = document.querySelector('#searchbar')
//     if(city.value){
//         clearData()
//         loadDataFahrenheit(city.value)
//     } 
// })


