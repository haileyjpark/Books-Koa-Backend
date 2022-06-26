const logger = require('../../../log/config/logger');
const { CustomGQLError } = require('./customError');
const { ERROR_CODE } = require('./errorCode');

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const statusCode = err.statusCode || err.status || 500;
    const errorResponse = {
      statusCode,
      error: {
        errorCode: err.errorCode,
        message: err.message,
      },
    };
    ctx.status = statusCode;
    ctx.body = errorResponse;

    const logTitle = err.logTitle || '[Check the error stack]';
    if (err.statusCode === 500) {
      logger.error(logTitle, err);
    } else {
      logger.info(logTitle, err);
    }
  }
};

const errorHandlerGraphQL = (err) => {
  const errorResponse = {
    message: err.message,
    extensions: err.extensions,
    stack: err.stack,
  };
  return errorResponse;
};

const graphqlErrorExecutor = (err) => {
  // console.log(err)
  const logTitle = err.logTitle || '[Check the error stack]';
  if (err.statusCode === 500) {
    logger.error(logTitle, err);
  } else {
    logger.info(logTitle, err);
  }
  if (err.name === 'CustomError') {
    throw new CustomGQLError(err.errorCode, err.message);
  }
  if (err.name === 'GraphQLError') {
    throw new CustomGQLError(err.extensions.code, err.message);
  }
  throw new CustomGQLError(ERROR_CODE.SERVER_ERROR, err.message);
};

module.exports = { errorHandler, errorHandlerGraphQL, graphqlErrorExecutor };
