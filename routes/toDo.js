const express = require('express');
const router = express.Router();

const toDoController = require('../controllers/toDo');

router.get('/', toDoController.getAll);

router.get('/:id', toDoController.getSingle);

// router.post('/', toDoController.createContact);

// router.put('/:id', toDoController.updateContact);

// router.delete('/:id', toDoController.deleteContact);

module.exports = router;
