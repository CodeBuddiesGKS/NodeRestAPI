const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let corsOptions = {
    origin: 'http://example.com', // replace this
    optionsSuccessStatus: 200 // To prevent older browsers from failing on 201's or 204's
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.listen(8000, () => {
    console.log('Server Started!');
    console.log('Open browser to localhost:8000/api/movies');
});
app.route('/api/movies')
.get((req, res) => {
    res.status(200).send({
        movies: [
            {
                id: 1,
                title: "The Movie that Never Existed",
                runTime: 120,
                releaseDate: "01/01/0001"
            },
            {
                id: 2,
                title: "The Movie that Never Existed 2: The Longer One",
                runTime: 160,
                releaseDate: "01/01/0002"
            }
        ]
    });
})
.post((req, res) => {
    //add req.body to the movies DB 
    res.status(201).send(req.body);
});

app.route('/api/movies/:id')
.get((req, res) => {
    const requestedId = req.params['id'];
    // getMovieById from the DB
    let payload = {};
    payload.id = requestedId;
    payload.title = "You Got a Movie By Id";
    payload.runTime = 1,
    payload.releaseDate = "Now"
    res.status(200).send(payload);
})
.put((req, res) => {
    //updateMovieById on the DB
    res.status(200).send(req.body);
})
.patch((req, res) => {
    //updatePartOfMovieById on the DB
    res.status(200).send(req.body);
})
.delete((req, res) => {
    //deleteMovieById on the DB
    res.status(204).send();
});

module.exports = app;