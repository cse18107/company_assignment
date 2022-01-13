const express = require('express');
const personsControllers = require('../controllers/personsControllers');

const personsRouter = express.Router();

personsRouter.route('/persons').get(personsControllers.getPersons).post(personsControllers.postPerson);
personsRouter.route('/persons/:id').delete(personsControllers.deletePerson);

module.exports = personsRouter;