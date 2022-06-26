/* eslint-disable max-classes-per-file */
const { GraphQLError } = require('graphql');
const { ERROR_CODE_STATUS_MAPPING } = require('./errorCode');

class CustomError extends Error {
  constructor(errorCode, message, logTitle) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.name = 'CustomError';
    this.errorCode = errorCode;
    this.message = message;
    this.statusCode = ERROR_CODE_STATUS_MAPPING[errorCode];
    this.logTitle = logTitle;
  }
}

class CustomGQLError extends GraphQLError {
  constructor(errorCode, message, logTitle, field) {
    super(message);
    this.logTitle = logTitle;
    this.extensions = {
      statusCode: ERROR_CODE_STATUS_MAPPING[errorCode],
      code: errorCode,
      field,
    };
  }
}

const setHttpPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }) {
        response.http.headers.set('Custom-Header', 'custom');
        const statusCode = response?.errors[0]?.extensions.statusCode;
        response.http.status = statusCode;
      },
    };
  },
};

module.exports = { CustomError, CustomGQLError, setHttpPlugin };
