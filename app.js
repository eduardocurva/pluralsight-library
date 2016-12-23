var express = require('express');
var bodyParser = require('body-parser');

var session = require('express-session');
//instance of express
var app = express();

var port = process.env.PORT || 5000;
var navi = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Author',
    Text: 'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(navi);
var adminRouter = require('./src/routes/adminRoutes')(navi);
var authRouter = require('./src/routes/authRoutes')(navi);

//used by express first
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        navi: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});


app.get('/books', function (req, res) {
    res.send('Hello books');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});