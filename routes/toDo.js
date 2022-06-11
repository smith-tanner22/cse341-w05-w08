const express = require('express');
const router = express.Router();

const toDoController = require('../controllers/toDo');
const validation = require('../middleware/validate');

router.get('/', toDoController.getAll);

router.get('/:id', toDoController.getSingle);

router.post('/', validation.saveList, toDoController.createList);

router.put('/:id', validation.saveList, toDoController.updateList);

router.delete('/:id', toDoController.deleteList);

// router.post('/', toDoController.createContact);

// router.put('/:id', toDoController.updateContact);

// router.delete('/:id', toDoController.deleteContact);

module.exports = router;
