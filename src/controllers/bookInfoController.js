const CreateBookInfo = require('../services/CreateBookInfo');

module.exports = {

  async createBookInfo(request) {
    // Context
    const { serviceLocator } = request.server.app;

    // Input
    const {
      firstName, lastName, email, password,
    } = request.payload;

    // Treatment
    const user = await CreateBookInfo(firstName, lastName, email, password, serviceLocator);

    // Output
    return serviceLocator.userSerializer.serialize(user);
  },
};
