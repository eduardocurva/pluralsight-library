var express = require('express');

var bookRouter = express.Router();

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
        res.render('books', {
            title: 'Hello from render',
            navi: [{
                Link: '/Books',
                Text: 'Books'
            }, {
                Link: '/Authors',
                Text: 'Authors'
            }],
            books: books
        });
    });

bookRouter.route('/:id')
    .get(function (req, res) {
        var id = req.params.id;
        res.render('book', {
            title: 'Hello from render',
            navi: [{
                Link: '/Books',
                Text: 'Books'
            }, {
                Link: '/Authors',
                Text: 'Authors'
            }],
            books: books[id]
        });
    });

module.exports = bookRouter;