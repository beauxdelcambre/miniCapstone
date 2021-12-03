const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

const {
    getLocations,
    deleteLocation,
    createLocation,
    updateLocation
} = require("./controller.js")

app.get(`/api/locations`, getLocations)
app.delete(`/api/locations/:id`, deleteLocation)
app.post(`/api/locations`, createLocation)
app.put(`/api/locations/:id`, updateLocation)




app.listen(4004, () => console.log("Server is running on 4004"))