var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

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

var router = function (navi) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });

        });
    return adminRouter;
};

module.exports = router;