var controller = function() {
    var get = function(req, res) {
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
    };

    var getById = function(req, res) {
        const requestedId = req.params.id;
        // getMovieById from the DB
        let payload = {};
        payload.id = requestedId;
        payload.title = "You Got a Movie By Id";
        payload.runTime = 1,
        payload.releaseDate = "Now"
        res.status(200).send(payload);
    };

    var post = function(req, res) {
        //add req.body to the movies DB 
        res.status(201).send(req.body);
    };

    var putById = function(req, res) {
        //updateMovieById on the DB
        res.status(200).send(req.body);
    };

    var patchById = function(req, res) {
        //updatePartOfMovieById on the DB
        res.status(200).send(req.body);
    };

    var deleteById = function(req, res) {
        //deleteMovieById on the DB
        res.status(204).send();
    };

    return {
        get: get,
        getById: getById,
        post: post,
        putById: putById,
        patchById: patchById,
        deleteById: deleteById
    };
}

module.exports = controller;