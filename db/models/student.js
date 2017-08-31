'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
var Campus = require('./campus')


const Student = db.define('student', {
  name: Sequelize.STRING,
  email: {
    type:Sequelize.STRING,
    validate: { isEmail: true } 
  }
},{
  defaultScope: {
    include: [Campus]
  }
})

module.exports = Student