const express = require('express');
const eventRouter = express.Router();

const eventController = require('../controllers/eventController');

eventRouter.get('/events', eventController.getAllEvents);

eventRouter
    .route('/event/new')
    .get(eventController.renderNewEventForm)
    .post(eventController.addNewEvent);
    
eventRouter
  .route('/event/edit/:name')
  .get(eventController.renderEditEventForm)
  .post(eventController.editEvent);

eventRouter.post('/event/delete', eventController.deleteEvent);

module.exports = eventRouter;