const invoicesRouter = require('express').Router()
const Invoice = require('../models/invoice')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

invoicesRouter.get('/invoices', async (request, response) => {
  const invoices = await Invoice.find({}).populate('user', {username: 1, name: 1})
  response.json(invoices)
})

invoicesRouter.get('/invoices/:id', async (request, response, next) => {
    const invoice = await Invoice.findById(request.params.id)
    console.log('invoices get id', request.params.id)
      if (invoice) {
        response.json(invoice)
      } else {
        response.status(404).end()
      }
})

invoicesRouter.post('/invoices', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const invoice = new Invoice({
    id: body.id,
    amount: body.amount,
    due_date: body.due_date,
    details: body.details,
    user: user.id
  })
    const savedInvoice = await invoice.save()
    user.invoices = user.invoices.concat(savedInvoice._id)
    await user.save()
    response.status(201).json(savedInvoice)
})

invoicesRouter.delete('/:id', async (request, response) => {
    await Invoice.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

invoicesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const invoice = {
    id: body.id,
    amount: body.amount,
    due_date: body.due_date,
    details: body.details
  }

  Invoice.findByIdAndUpdate(request.params.id, invoice, { new: true })
    .then(updatedInvoice=> {
      response.json(updatedInvoice)
    })
    .catch(error => next(error))
})

module.exports = invoicesRouter