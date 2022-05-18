const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('toDoList').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const toDoId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('toDoList').find({ _id: toDoId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// const createContact = async (req, res) => {
//   const contact = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     favoriteColor: req.body.favoriteColor,
//     birthday: req.body.birthday
//   };
//   const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
//   if (response.acknowledged) {
//     res.status(201).json(response);
//   } else {
//     res.status(500).json(response.error || 'Some error occured while created the contact.');
//   }
// };

// const updateContact = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const contact = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     favoriteColor: req.body.favoriteColor,
//     birthday: req.body.birthday
//   };
//   const response = await mongodb
//     .getDb()
//     .db()
//     .collection('contacts')
//     .replaceOne({ _id: userId }, contact);
//   console.log(response);
//   if (response.modifiedCount > 0) {
//     res.status(204).json(response);
//   } else {
//     req.status(500).json(response.error || 'Some error occured while updating the contact');
//   }
// };

// const deleteContact = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const contact = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     favoriteColor: req.body.favoriteColor,
//     birthday: req.body.birthday
//   };
//   const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
//   console.log(response);
//   if (response.deletedCount > 0) {
//     res.status(204).json(response);
//   } else {
//     req.status(500).json(response.error || 'Some error occured while deleting the contact');
//   }
// };

// module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };

module.exports = { getAll, getSingle };
