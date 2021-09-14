'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    console.log('error auth',error);
    return response.status(403).json({
      error: 'invalid access to resource'
    })
  }
}

module.exports = InvalidAccessException;
