const { rentalRepository } = require('../../../repository');

const getOneRental = async (rentalId) => {
  const rental = await rentalRepository.getOne(rentalId);
  return rental;
};

module.exports = {
  getOneRental,
};
