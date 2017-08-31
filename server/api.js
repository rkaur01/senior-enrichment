'use strict'
const api = require('express').Router()
const db = require('../db')
const Promise = require('bluebird');
const Campus = require('../db/models/campus')
const Student = require('../db/models/student')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({ hello: 'world' }))


// GET
// - all campuses
// - a campus by id
// - all students
// - a student by id
api.get('/campuses', (req, res, next) => {
	Campus.findAll()
		.then(campuses => res.json(campuses))
		.catch(next)
})

api.get('/campuses/:id', (req, res, next) => {
	Campus.find(
		{
			where:
			{ id: req.params.id }
		})
		.then(campus => res.json(campus))
		.catch(next)
})

api.get('/students', (req, res, next) => {
	Student.findAll()
		.then(students => res.json(students))
		.catch(next)
})

api.get('/students/:id', (req, res, next) => {
	Student.find(
		{
			where:
			{ id: req.params.id }
		})
		.then(student => res.json(student))
		.catch(next)
})

//get student campus
api.get('/students/:id/campus', (req, res, next) => {
	Student.find(
		{
			where:
			{ id: req.params.id }
		})
		.then(student => {
			Campus.find(
				{
					where:
					{ id: student.campusId}
				})
				.then(campus => res.json(campus))
		})	
})


// POST
// - new campus
// - new student
api.post('/campuses', (req, res, next) => {
	Campus.create({
		name: req.body.name,
		image: req.body.image
	})
		.then(function (newCampus) {
			res.status(201).json(newCampus);
		})
		.catch(next);
})

api.post('/students', (req, res, next) => {
	Student.create({
		name: req.body.name,
		email: req.body.email
	})
		.then(function (newStudent) {
			res.status(201).json(newStudent);
		})
		.catch(next);
})


// PUT
// - updated student info for one student
// - updated campus info for one campus
api.put('/students/:id', (req, res, next) => {
	Student.update(req.body, {
		where: { id: req.params.id },
		returning: true
	})
		.then(function (updatedStudent) {
			res.status(200).json(updatedStudent);
		})
		.catch(next);
})

api.put('/campuses/:id', (req, res, next) => {
	Campus.update(req.body, {
		where: { id: req.params.id },
		returning: true
	})
		.then(function (updatedCampus) {
			res.status(200).json(updatedCampus);
		})
		.catch(next);
})


// DELETE
// - a campus
// - a student
api.delete('/students/:id', (req, res, next) => {
	Student.destroy({
		where: { id: req.params.id }
	})
		.then(function () {
			res.status(204).json('Student destroyed');
		})
		.catch(next);
})

api.delete('/campuses/:id', (req, res, next) => {
	Campus.destroy({
		where: { id: req.params.id }
	})
		.then(function () {
			res.status(204).json('Campus destroyed');
		})
		.catch(next);
})


module.exports = api