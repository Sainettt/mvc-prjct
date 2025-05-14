const { getDataBase } = require('../config/db')
const { normalizeInput } = require('../utlis/normalizeInput')
const COLLECTION_NAME = 'users'

class User {
  static async add(userName, email) {
    const db = getDataBase()

    userName = normalizeInput(userName)
    email = normalizeInput(email)

    const existingUser = await db.collection(COLLECTION_NAME).findOne({
      $or: [{ userName }, { email }],
    })

    if (existingUser) {
      return existingUser
    }

    const result = await db.collection(COLLECTION_NAME).insertOne({
      userName,
      email,
    })

    return result
  }

  static async getAll(eventName) {
    const db = getDataBase()

    const event = await db.collection('events').findOne({ eventName })

    if (!event || !event.invitedUsers || event.invitedUsers.length === 0) {
      return []
    }

    const users = await db
      .collection(COLLECTION_NAME)
      .find({ userName: { $in: event.invitedUsers } })
      .toArray()

    return users
  }

  static async delete(name) {
    const db = getDataBase()
    const result = await db.collection(COLLECTION_NAME).deleteOne({ name })
    return result
  }
}
module.exports = User
