const Event = require('../models/Event')

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.getAll()
    res.render('events', { title: 'Events', events })
  } catch (error) {
    res.status(500).send('Error fetching events')
  }
}

exports.renderNewEventForm = (req, res) => {
  res.render('event-form', {
    title: 'New Event',
    formAction: '/event/new',
    event: null,
  })
}

exports.addNewEvent = async (req, res) => {
  try {
    const { eventName, eventDate, eventLocation } = req.body
    await Event.add({
      eventName,
      eventDate,
      eventLocation,
      invitedUsers: [],
    })
    res.redirect('/events')
  } catch (error) {
    res.status(500).send('Error adding new event')
  }
}

exports.renderEditEventForm = async (req, res) => {
  try {
    const name = req.params.name
    const events = await Event.getAll()
    const event = events.find((e) => e.eventName === name)
    if (!event) {
      return res.status(404).send('Event not found')
    }
    res.render('event-form', {
      title: 'Edit Event',
      formAction: `/event/edit/${name}`,
      event,
    })
  } catch (error) {
    res.status(500).send('Error fetching event for editing')
  }
}

exports.editEvent = async (req, res) => {
  try {
    const name = req.params.name
    const { eventName, eventDate, eventLocation } = req.body
    await Event.edit(name, { eventName, eventDate, eventLocation })
    res.redirect('/events')
  } catch (error) {
    res.status(500).send('Error editing event')
  }
}

exports.deleteEvent = async (req, res) => {
  try {
    const { eventName } = req.body
    await Event.delete(eventName)
    res.redirect('/events')
  } catch (error) {
    res.status(500).send('Error deleting event')
  }
}
