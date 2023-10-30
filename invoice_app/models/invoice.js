const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
  id: Number,
  details: String,
  due_date: String,
  amount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})


invoiceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Invoice', invoiceSchema)