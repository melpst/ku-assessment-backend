const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cipherSchema = new Schema({
	cipher: String
})

module.exports = mongoose.model('Cipher', cipherSchema)