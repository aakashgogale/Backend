
const express = require("express")
const app = express()
const contactModel = require("./models/contact.model")
const { asin } = require("three/tsl")

app.use(express.json())
// post /api/notes

const contact = 

//POST API :- Create new Contact
app.post("/api/contact", async (req, res)=>{
    const { name, email, phone}= req.body

    const contact = await contactModel.create({
        name,
        email,
        phone,
    })

    res.status(201).json({
        message: "Created contact manager successfully",
        contact
    })

})

//GET API - Fetched Details
app.get("/api/contact", async (req, res)=>{

    const contact = await contactModel.find()

    res.status(200).json({
        message: "Fetched contact successfully",
        contact
    })
})

// Patch API - Update Contact 
app.patch("/api/contact/:id", async (req, res)=>{

    const contact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
    )

    res.status(201).json({
        message: "Update Contact Successfully",
        contact
    })
})

// DELETE API - Delete Contact
app.delete("/api/contact/:id", async (req, res)=>{
        await contactModel.findByIdAndDelete(
        req.params.id,
        req.body,
    )

    res.status(201).json({
        message: "Deleted contact successfully"

    })
})

module.exports = app

