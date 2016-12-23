var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function (bookService, navi) {
    var middleware = function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };

    var getIndex = function (req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.find().toArray(function (err, results) {

                res.render('bookListView', {
                    title: 'Hello from render',
                    navi: navi,
                    books: results
                });
            });

        });
    };

    var getById = function (req, res) {
        var id = new ObjectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.findOne({
                _id: id
            }, function (err, results) {

                if (results.bookId) {

                    bookService.getBookById(results.bookId, function (err, book) {
                        console.log(book);
                        results.book = book;
                        res.render('bookView', {
                            title: 'Hello from render',
                            navi: navi,
                            book: results
                        });
                    });
                } else {
                    res.render('bookView', {
                        title: 'Hello from render',
                        navi: navi,
                        book: results
                    });
                }
            });

        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };

};

module.exports = bookController;