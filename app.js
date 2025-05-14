const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const eventRouter = require('./routing/eventRoutes')
const userRouter = require('./routing/userRouter')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layout')

app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', eventRouter)
app.use('/', userRouter)

app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' })
})

module.exports = app
