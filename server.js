const app = require('./app')
const { PORT } = require('./config/config')
const { mongoConnect } = require('./config/db')

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
