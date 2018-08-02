const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://example.com', // replace this
    optionsSuccessStatus: 200 // To prevent older browsers from failing on 201's or 204's
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.route('/')
.get((req, res) => {
    res.send('Welcome to my REST API written in Node.js using Express!');
});

const movieRouter = require('./routes/movieRoutes')();
app.use('/api/Movies', movieRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server running...');
    console.log('Open browser to localhost:' + port);
});
