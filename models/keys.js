const mongoose = require('mongoose')

const Schema = mongoose.Schema

const keySchema = new Schema({
	publicKey: String,
	padding: String
})

module.exports = mongoose.model('Key', userSchema)