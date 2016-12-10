var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function (navi) {

    bookRouter.route('/')
        .get(function (req, res) {
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
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = new objectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.findOne({
                    _id: id
                }, function (err, results) {

                    res.render('bookView', {
                        title: 'Hello from render',
                        navi: navi,
                        book: results
                    });
                });

            });
        });
    return bookRouter;
};

module.exports = router;