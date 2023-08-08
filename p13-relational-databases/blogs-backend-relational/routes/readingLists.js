const {ReadingList } = require("../models");
const router = require('express').Router()
const middleware = require('../util/middleware')

router.post('/', async (req, res) => {
    const readingList= await ReadingList.create(req.body)
    res.json(readingList)
})

router.put('/:id', middleware.tokenExtractor, async (req, res) => {

    const readingList = await ReadingList.findByPk(req.params.id)
    if(readingList && readingList.userId === req.token.id){
        readingList.read = req.body.read
        await readingList.save()
        res.json(readingList)
    } else {
        res.status(403).json({error: "User is not authorized to edit this reading list"})
    }
})

module.exports = router