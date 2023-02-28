const Subscriber = require('../model/subscriber')

exports.getAllSubscriber = async (req, res) => {
    try {
        const subs = await Subscriber.find()
        res.json(subs)
    } catch (err) {
        res
            .status(500)
            .json({message: err.message})
    }
}

exports.getOneSubscriber = (req, res) => {
    res.json(res.subscriber)

}
exports.createNewSubscriber = async (req, res) => {

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

}
exports.updateSubscriber = async (req, res) => {

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

}
exports.deleteSubscriber = async (req, res) => {
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

}