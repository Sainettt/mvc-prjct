const User = require('../models/User')
const { getDataBase } = require('../config/db')
const {STATUS_CODE} = require('../constans/statusCode')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll(req.body.eventName)
    res.render('event-users', { title: 'All Users', users })
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Error fetching users')
  }
}

exports.renderAddUserForm = (req, res) => {
  const eventName = req.query.event || ''
  res.render('user-form', { title: 'Add User', eventName })
}

exports.addNewUser = async (req, res) => {
  try {
    const { userName, email, eventName } = req.body
    const db = getDataBase()

    await User.add(userName, email)

    await db
      .collection('events')
      .updateOne({ eventName }, { $addToSet: { invitedUsers: userName } })

    res.redirect(`/users/${eventName}`)
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Error adding new user')
  }
}

exports.getUsersByEvent = async (req, res) => {
  try {
    const { eventName } = req.params
    const db = getDataBase()

    const event = await db.collection('events').findOne({ eventName })
    if (!event || !event.invitedUsers) {
      return res.render('event-users', {
        title: 'No Users',
        users: [],
        eventName,
      })
    }

    const users = await db
      .collection('users')
      .find({ userName: { $in: event.invitedUsers } })
      .toArray()

    res.render('event-users', {
      title: `Users for ${eventName}`,
      users,
      eventName,
    })
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Error fetching users for event')
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { userName } = req.body
    const db = getDataBase()

    await db.collection('users').deleteOne({ userName })

    await db
      .collection('events')
      .updateMany(
        { invitedUsers: userName },
        { $pull: { invitedUsers: userName } }
      )

    res.redirect(`/users/${req.body.eventName}`)
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Error deleting user')
  }
}
