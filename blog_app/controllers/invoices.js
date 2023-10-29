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
  response.json(articles)
})

invoicesRouter.get('/invoices/:id', async (request, response, next) => {
    const invoice = await Invoice.findById(request.params.id)
      if (invoice) {
        response.json(invoice)
      } else {
        response.status(404).end()
      }
})

invoicesRouter.post('/invoices', async (request, response) => {
  const body = request.body
  console.log('body', body)

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  console.log('decodedToken', decodedToken)

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
    const savedInvoice = await invice.save()
    user.invoices = user.invoices.concat(savedInvoice._id)
    await user.save()
    response.status(201).json(savedInvoice)
})

/*
invoicesRouter.delete('/:id', async (request, response) => {
    //adaug doar de test si de console log
    const body = request.body
    console.log('body', body)
    //pana aici
    await Article.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
*/
/*
invoicesRouter.put('/', (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const article = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 33,
  }

  Invoice.findByIdAndUpdate(request.params.id, article, { new: true })
    .then(updatedArticle=> {
      response.json(updatedArticle)
    })
    .catch(error => next(error))
})


invoicesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const article = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Invoice.findByIdAndUpdate(request.params.id, article, { new: true })
    .then(updatedArticle=> {
      response.json(updatedArticle)
    })
    .catch(error => next(error))
})

*/


module.exports = invoicesRouter