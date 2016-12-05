var express = require('express');

var bookRouter = express.Router();

var router = function (navi) {

    var books = [{
        title: 'War and peace',
        genre: 'Historical Fiction',
        author: 'Lev Niko',
        read: false
    }, {
        title: 'Book 2',
        genre: 'Genre 2',
        author: 'Author 2',
        read: false
    }];

    bookRouter.route('/')
        .get(function (req, res) {
            res.render('bookListView', {
                title: 'Hello from render',
                navi: navi,
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Hello from render',
                navi: navi,
                book: books[id]
            });
        });
        return bookRouter;
};

module.exports = router;