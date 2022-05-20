const Router = require('koa-router');
const { bookController } = require('../../controllers');
const { adminAuthorized } = require('../../common/auth/authMiddleware');

const bookRouter = new Router();

bookRouter.post('/book', adminAuthorized, bookController.createBook);
bookRouter.get('/books', bookController.getBooks);
bookRouter.get('/book/:id', bookController.getBookById);
bookRouter.delete('/book/:id', adminAuthorized, bookController.deleteBook);

module.exports = bookRouter;
