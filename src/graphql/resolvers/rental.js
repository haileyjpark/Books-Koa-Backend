const { rentalService } = require('../../services');

module.exports = {
  Query: {
    rentals: async (root, args, context) => {
      const rentals = rentalService.getRentals(args.input);
      return rentals;
    },
    rental: async (root, args, context) => {
      const id = Number(args.id);
      const singleRental = await rentalService.getSingleRental(id);
      return singleRental;
    },
  },
  Mutation: {
    createRentals: async (root, args, context) => {
      const rentals = await rentalService.createRentals(args.input);
      return rentals;
    },
    extendRental: async (root, args, context) => {
      const id = Number(args.id);
      const book = await rentalService.extendRental(id);
      if (book) {
        return `The book < ${id} > is successfully deleted.`;
      }
      return ` Failed to deleted the book <${id}>.`;
    },
  },
};
