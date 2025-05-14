const { MongoClient } = require('mongodb')
const { DB_USER, DB_PASS } = require('./config')

let database

const mongoConnect = async (callback) => {
  const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@sainet.tq2w5an.mongodb.net/?retryWrites=true&w=majority&appName=Sainet`

  try {
    const client = await MongoClient.connect(uri)
    database = client.db('shop')
    console.log('Connection to the database has been established.')
    callback()
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    throw error
  }
}

const getDataBase = () => {
  if (!database) {
    throw new Error('No database  found')
  }
  return database
}

module.exports = {
  mongoConnect,
  getDataBase,
}
