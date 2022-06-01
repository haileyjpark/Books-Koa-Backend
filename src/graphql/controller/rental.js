const { rentalService } = require('../../services');
const { graphqlRentalService } = require('../services');

const createRentals = async (root, args, context) => {
  try {
    if (!args.input) {
      context.ctx.throw(400, 'please provide the information');
    }
    const newRental = await rentalService.createRentals(args.input);
    context.ctx.status = 201;
    return newRental;
  } catch (err) { return context.ctx.throw(500, err); }
};

const extendRental = async (root, args, context) => {
    try {
      if (!args.input.rentalId) {
        context.ctx.throw(400, 'please provide the rental information');
      }
      const newRental = await rentalService.createRentals(args.input);
      context.ctx.status = 200;
      return newRental;
    } catch (err) { return context.ctx.throw(500, err); }
  };

const extendRental = async (ctx) => {
  const rentalId = parseInt(ctx.params.rentalId, 10);
  const { userId } = ctx.state;
  try {
    if (!ctx.params.rentalId) {
      ctx.throw(400, 'please provide the rental information');
    }
    ctx.body = await rentalService.extendRental(rentalId, userId);
    ctx.status = 200;
  } catch (err) { ctx.throw(500, err); }
};

module.exports = {
  createRentals, extendRental,
};
