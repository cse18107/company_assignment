const express = require("express");
const Persons = require("../model/personsModel");

const app = express();

exports.getPersons = async (req, res) => {
  try {
    const persons = await Persons.find();

    res.status(200).json({
      status: "success",
      message: persons,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.postPerson = async (req, res) => {
  try {
    const body = req.body;
    const person = await Persons.create(body);

    res.status(200).json({
      status: "success",
      message: person,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deletePerson = async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Persons.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: person,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
