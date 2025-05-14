const express = require('express');
const eventRouter = express.Router();

const eventController = require('../controllers/eventController');

eventRouter.get('/events', eventController.getAllEvents);
eventRouter.get('/event/new', eventController.renderNewEventForm);
eventRouter.post('/event/new', eventController.addNewEvent);
eventRouter.get('/event/edit/:name', eventController.renderEditEventForm);
eventRouter.post('/event/edit/:name', eventController.editEvent);
eventRouter.post('/event/delete', eventController.deleteEvent);

module.exports = eventRouter;