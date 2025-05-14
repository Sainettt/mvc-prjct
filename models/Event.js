const { getDataBase } = require('../config/db')

const COLLECTION_NAME = 'events'

class Event {
  static async add(data) {
    const db = getDataBase()
    const { eventName, eventDate, eventLocation, invitedUsers } = data

    const existing = await db.collection(COLLECTION_NAME).findOne({ eventName })
    if (existing) {
      throw new Error('Event with this name already exists')
    }

    const result = await db.collection(COLLECTION_NAME).insertOne({
      eventName,
      eventDate,
      eventLocation,
      invitedUsers,
    })

    return result
  }

  static async getAll() {
    const db = getDataBase()
    const result = await db.collection(COLLECTION_NAME).find().toArray()
    return result
  }

  static async edit(name, updatedData) {
    const db = getDataBase()
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne({ eventName: name }, { $set: updatedData })
    return result
  }

  static async delete(eventName) {
    const db = getDataBase()

    const event = await db.collection(COLLECTION_NAME).findOne({ eventName })

    if (!event) {
      throw new Error('Event not found')
    }

    const invitedUsers = event.invitedUsers || []

    for (const userName of invitedUsers) {
      const otherEvents = await db
        .collection(COLLECTION_NAME)
        .find({
          eventName: { $ne: eventName },
          invitedUsers: userName,
        })
        .toArray()

      if (otherEvents.length === 0) {
        await db.collection('users').deleteOne({ userName })
      }
    }
    const result = await db.collection(COLLECTION_NAME).deleteOne({ eventName })
    return result
  }
}
module.exports = Event
