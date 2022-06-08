const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('login')
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
  if (!objectId.isValid(req.params.id)) {
    res.status(400).json('Must you a valid user id to find a user.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('login')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const updateUser = async (req, res) => {
  if (!objectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to update a user.');
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  const response = await mongodb.getDb().db().collection('login').replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occuring while updating the user.');
  }
};

const createUser = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  const response = await mongodb.getDb().db().collection('login').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occuring while creating the user.');
  }
};

const deleteUser = async (req, res) => {
  if (!objectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to delete a user.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('login').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    req.status(500).json(response.error || 'Some error occured while deleting the user.');
  }
};

module.exports = { getAll, getSingle, updateUser, createUser, deleteUser };
