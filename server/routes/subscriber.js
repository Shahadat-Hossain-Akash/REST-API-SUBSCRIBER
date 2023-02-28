const express = require('express')
const router = express.Router()
const Subscriber = require('../model/subscriber')
const { getAllSubscriber, getOneSubscriber,createNewSubscriber, updateSubscriber,deleteSubscriber } = require('../controller/subscriber') 

//Get all
router.get('/', getAllSubscriber)
//Get one
router.get('/:id', getSubscriber, getOneSubscriber )
//Create
router.post('/', createNewSubscriber)
//Update
router.patch('/:id', getSubscriber, updateSubscriber)
//Delete
router.delete('/:id', getSubscriber, deleteSubscriber)

//Middleware
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber === null) {

            return res
                .status(404)
                .json({message: "Subscriber not found"})
        }
    } catch (err) {
        return res
            .status(500)
            .json({message: err.message})
    }
    res.subscriber = subscriber
    next()
}


module.exports = router