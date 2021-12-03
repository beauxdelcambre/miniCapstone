const locationsContainer = document.querySelector('#locations-container')

const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/locations`

const locationCallback = ({data: location}) => displayLocations(location)
const errCallback = err => console.log(err.response.data)

const getAllLocations = () => axios.get(baseURL).then(locationCallback).catch(errCallback)
const createLocation = body => axios.post(baseURL, body).then(locationCallback).catch(errCallback)
const deleteLocation = id => axios.delete(`${baseURL}/${id}`).then(locationCallback).catch(errCallback)
const updateLocation = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(locationCallback).catch(errCallback)



function submitHandler(e) {
    e.preventDefault()

    let restaurant = document.querySelector('#restaurant')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObject = {
        restaurant: restaurant.value,
        rating: rating.value,
        imageURL: imageURL.value
    }

    createLocation(bodyObject)

    restaurant.value = ""
    rating.checked = false
    imageURL.value = ""

}

function createLocationCard(location) {
    const locationCard = document.createElement('div')
    locationCard.classList.add('location-card')

    locationCard.innerHTML = `<img alt="location cover" src=${location.imageURL} class="location-cover"/>
    <p class="location-restaurant">${location.restaurant}</p>
    <div class="btns-container">
        <button onclick="updateLocation(${location.id}, 'minus')">-</button>
        <p class="location-rating">${location.rating} stars</p>
        <button onclick="updateLocation(${location.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteLocation(${location.id})">delete</button>
    `
    locationsContainer.appendChild(locationCard)

}

function displayLocations(arr) {
    locationsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createLocationCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
getAllLocations()