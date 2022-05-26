const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('toDoList')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must you a valid list id to find a list.');
  }
  const toDoId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('toDoList')
    .find({ _id: toDoId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const updateList = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid list id to update a list.');
  }
  const toDoId = new ObjectId(req.params.id);
  const toDo = {
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    place: req.body.place,
    description: req.body.description,
    completed: req.body.completed
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('toDoList')
    .replaceOne({ _id: toDoId }, toDo);
  console.log(response);
  if (response.modififedCount > 0) {
    res.status(204).json(response);
  } else {
    req.status(500).json(response.error || 'Some error occuring while updating the to do list.');
  }
};

const createList = async (req, res) => {
  const toDo = {
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    place: req.body.place,
    description: req.body.description,
    completed: req.body.completed
  };
  const response = await mongodb.getDb().db().collection('toDoList').insertOne(toDo);
  if (response.acknowledged) {
    res.status(201).json(repsonse);
  } else {
    res.status(500).json(repsonse.error || 'Some error occured while creating the to do list.');
  }
};

const deleteList = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid list ID to delete a list.');
  }
  const listId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('toDoList').remove({ _id: listId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    req.status(500).json(response.error || 'Some error occured while deleting the list.');
  }
};

module.exports = { getAll, getSingle, updateList, createList, deleteList };
