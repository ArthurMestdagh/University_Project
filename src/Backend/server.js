const express = require('express')
const {Material} = require('./models')
const multer = require('multer')
require('./database/mongoose')
const app = express()
const port = 4000

app.use(express.json())

app.post('/materials/post', (req,res) => {
    return res.status(200).send('material added')
})

app.get('/', (req, res) => {
    return res.status(200).send('Welcome to the home page')
})

//CREATE
app.post('/materials', async (req,res) => {
    const material = new Material({
        ...req.body
    })
    try {
        await material.save()
        res.status(201).send(material)
    }   
        catch (error) {
            res.status(400).send(error)
        }
})

//READ
app.get('/materials', async (req, res) => {
    try {
        const materials = await Material.find({})
        res.send(materials)
    }
        catch (error) {
            res.status(400).send(error)
        }
})

app.get('/materials/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const material = await Material.findById(_id)
        if (!material) {
            return res.status(404).send("Material not found")
        }
        res.send(material)
    }
        catch (error) {
            res.status(400).send(error)
        }
})

//DELETE
app.delete('/materials/:id', async (req, res) => {
    try {
        const material = await Material.findOneAndDelete({_id: req.params.id})

        if (!material) {
            return res.status(404).send('Material not found')
        }
        res.send(material)

    }
        catch (error) {
            res.status(400).send(error)
        }
})

// Server listening

app.listen(port, () => {
    console.log("Server up on port", port)
})