const location = require("./db.json")
let globalId = 6

module.exports = {
    getLocations: (req, res) => res.status(200).send(location),
    deleteLocation: (req, res) => {
        let index = location.findIndex(elem => elem.id === +req.params.id)
        location.splice(index, 1)
        res.status(200).send(location)
    },
    createLocation: (req, res) => {
        let {restaurant, rating, imageURL} = req.body
        let newLocation = {
            id: globalId, 
            restaurant,
            rating,
            imageURL
        }

        location.push(newLocation)
        res.status(200).send(location)
        globalId++
    },
    updateLocation: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = location.findIndex(elem => +elem.id === +id)

        if (location[index].rating === 5 && type === "plus"){
            res.status(400).send("Cannot go above 5")
        }else if (location[index].rating === 0 && type === "minus"){
            res.status(400).send("Cannot go below 0")
        }else if (type === "plus"){
            location[index].rating++
            res.status(200).send(location)
        }else if (type === "minus"){
            location[index].rating--
            res.status(200).send(location)
        }else {
            res.status(400)
        }

        
    }
}