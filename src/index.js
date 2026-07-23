'use strict';

/**
 * @module test01
 */

const { add, subtract, multiply, divide } = require('./math');
const { capitalize, slugify, truncate } = require('./strings');

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  capitalize,
  slugify,
  truncate,
};
