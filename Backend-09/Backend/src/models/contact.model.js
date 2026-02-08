
const { Contact, Phone } = require("lucide-react")
const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
})

const contactModel = mongoose.model("NoteData", contactSchema)

module.exports = contactModel