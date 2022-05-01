const { BookInfo } = require('../db/models');

module.exports = (firstName, lastName, email, password, { userRepository }) => {
  const user = new User(null, firstName, lastName, email, password);
  return userRepository.persist(user);
};