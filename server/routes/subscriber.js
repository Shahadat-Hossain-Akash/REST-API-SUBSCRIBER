const express = require('express')
const {findById} = require('../model/subscriber')
const router = express.Router()
const Subscriber = require('../model/subscriber')

//Get all
router.get('/', async (req, res) => {
    try {
        const subs = await Subscriber.find()
        res.json(subs)
    } catch (err) {
        res
            .status(500)
            .json({message: err.message})
    }
})
//Get one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)

})
//Create
router.post('/', async (req, res) => {

    const subscriber = new Subscriber(
        {name: req.body.name, subscribedToChannel: req.body.subscribedToChannel}
    )
    try {
        const newSubscriber = await subscriber.save()
        res
            .status(201)
            .json(newSubscriber)
    } catch (err) {
        res
            .status(400)
            .json({message: err.message})
    }

})
//Update
router.patch('/:id', getSubscriber, async (req, res) => {

    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }

    if (req.body.subscribedToChannel != null) {

        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try {
        const updatedUser = await res
            .subscriber
            .save()
        res
            .status(201)
            .json(updatedUser)
    } catch (err) {
        res
            .status(400)
            .json({message: err.message})
    }

})
//Delete
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res
            .subscriber
            .deleteOne()
        res.json({message: `User ${res.subscriber.name} & ID ${res.subscriber.id} is deleted successfully`})
    } catch (err) {
        res
            .status(500)
            .json({message: err.message})
    }

})

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