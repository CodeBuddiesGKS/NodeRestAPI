const fs = require('fs');

var controller = function() {
    var get = function(req, res) {
        fs.readFile('db.json', (err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(JSON.parse(data).movies);
        });
    };

    var getById = function(req, res) {
        fs.readFile('db.json', (err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            const id = +req.params.id;
            if (id <= 0) {
                res.status(404).send('Invalid Id');
            } else {
                const dbJson = JSON.parse(data);
                const payload = dbJson.movies[id-1];
                if (!payload) {
                    res.status(404).send('Movie not found');
                } else {
                    res.status(200).send(payload);
                }
            }
        });
    };

    var post = function(req, res) {
        fs.readFile('db.json', (err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            let dbJson = JSON.parse(data);
            let payload = {};
            let emptyIndex;
            for (let i=0; i<dbJson.movies.length; ++i) {
                if (!dbJson.movies[i]) {
                    emptyIndex = i;
                    break;
                }
            }
            if (emptyIndex >= 0) {
                req.body.id = emptyIndex + 1;
                for(let prop in req.body) {
                    payload[prop] = req.body[prop];
                }
                dbJson.movies[emptyIndex] = payload;
            } else {
                req.body.id = dbJson.movies.length + 1;
                for(let prop in req.body) {
                    payload[prop] = req.body[prop];
                }
                dbJson.movies.push(payload);
            }

            dbJson = JSON.stringify(dbJson, null, 2)
            fs.writeFile('db.json', dbJson, (writeErr) => {
                if (writeErr) {
                    res.status(500).send(writeErr);
                }
                res.status(201).send(payload);
            });
        });
    };

    var putById = function(req, res) {
        fs.readFile('db.json', (err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            const id = +req.params.id;
            if (id <= 0) {
                res.status(404).send('Invalid Id');
            } else {
                let dbJson = JSON.parse(data);
                const status = dbJson.movies[id-1] ? 200 : 201;
                const payload = {};
                req.body.id = id;
                for(let prop in req.body) {
                    payload[prop] = req.body[prop];
                }
                dbJson.movies[id-1] = payload;
                dbJson = JSON.stringify(dbJson, null, 2)
                fs.writeFile('db.json', dbJson, (writeErr) => {
                    if (writeErr) {
                        res.status(500).send(writeErr);
                    }
                    res.status(status).send(payload);
                });
            }
        });
    };

    var patchById = function(req, res) {
        fs.readFile('db.json', (err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            const id = +req.params.id;
            if (id <= 0) {
                res.status(404).send('Invalid Id');
            } else {
                let dbJson = JSON.parse(data);
                const payload = dbJson.movies[id-1];
                if (!payload) {
                    res.status(404).send('Movie not found');
                } else {
                    req.body.id = id;
                    for(let prop in req.body) {
                        payload[prop] = req.body[prop];
                    }
                    dbJson = JSON.stringify(dbJson, null, 2)
                    fs.writeFile('db.json', dbJson, (writeErr) => {
                        if (writeErr) {
                            res.status(500).send(writeErr);
                        }
                        res.status(200).send(payload);
                    });
                }
            }
        });
    };

    var deleteById = function(req, res) {
        fs.readFile('db.json', (err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            const id = +req.params.id;
            if (id <= 0) {
                res.status(404).send('Invalid Id');
            } else {
                let dbJson = JSON.parse(data);
                const payload = dbJson.movies[id-1];
                if (!payload) {
                    res.status(404).send('Movie not found');
                } else {
                    dbJson.movies[id-1] = null;
                    dbJson = JSON.stringify(dbJson, null, 2)
                    fs.writeFile('db.json', dbJson, (writeErr) => {
                        if (writeErr) {
                            res.status(500).send(writeErr);
                        }
                        res.status(204).send(payload);
                    });
                }
            }
        });
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