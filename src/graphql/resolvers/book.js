const { bookService } = require('../../services');

module.exports = {
  Query: {
    books: async (root, args, context) => {
    // const books = await bookController.getBooks();
    //   console.log('================================================');
    //   console.log(context.ctx.req.headers.authorization);
      const books = bookService.getBooks(args.input);
      return books;
    },
    book: async (root, args, context) => {
      const id = Number(args.id);
      const singleBook = await bookService.getBookById(id);
      return singleBook;
    },
  },
  Mutation: {
    createBook: async (root, args, context) => {
      // const books = await bookController.getBooks();
      const book = await bookService.createBook(args.input);
      return book;
    },
    deleteBook: async (root, args, context) => {
      // const books = await bookController.getBooks();
      const id = Number(args.id);
      const book = await bookService.deleteBook(id);
      if (book) {
        return `The book < ${id} > is successfully deleted.`;
      }
      return ` Failed to deleted the book <${id}>.`;
    },
  },
};
