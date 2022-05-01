const { BookInfo } = require('../db/models');

module.exports = {

    async create(ctx) {
          ctx.body = await BookInfo.create({
            ISBN: ctx.request.body.ISBN,
            bookTypeId: ctx.request.body.bookTypeId,
            categoryId: ctx.request.body.categoryId,
            title: ctx.state.title,
            author: ctx.request.body.author,
            publisher: ctx.request.body.publisher,
            publicationDate: ctx.request.body.publicationDate,
            thumbnailImage: ctx.request.body.thumbnailImage,
            pages: ctx.request.body.pages,
            description: ctx.request.body.description,
          });
          await BookInfo.save();
          return ctx.body;
        },

    async create2(bookEntity) {
        const { 
            ISBN, bookTypeId, categoryId, title, author, publisher, 
            publicationDate, thumbnailImage, pages, description
          } = bookEntity;
        const BookInfo = await BookInfo.create({ 
            ISBN, bookTypeId, categoryId, title, author, publisher, 
            publicationDate, thumbnailImage, pages, description 
        });
        await BookInfo.save();

        return new BookInfo(BookInfo.ISBN, BookInfo.bookTypeId, BookInfo.categoryId, 
            BookInfo.title, BookInfo.author, BookInfo.publisher, 
            BookInfo.publicationDate, BookInfo.thumbnailImage, BookInfo.pages, BookInfo.description);
    },

    async getById(userId) {
    const seqUser = await this.model.findOne({ where: { email: userEmail } });
    const User(User.id, User.firstName, User.lastName, User.email, User.password)
    return new User();
    },

    async find() {
    const Users = await this.model.findAll();
    return Users.map((User) => new User(User.id, User.firstName, User.lastName, User.email, User.password));
    },
};
