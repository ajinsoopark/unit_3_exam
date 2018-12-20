const { db } = require('./pgPromise');

const getAllSpecies = (req, res, next) => {
    db.any('SELECT * FROM species')
    .then(species => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Received all species',
            body: species
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            status: 'Error',
            message: 'Error',
            body: err
        })
        next()
    });
};

const getSingleSpecies = (req, res, next) => {
    let speciesId = parseInt(req.params.id);

    db.one('SELECT * FROM species WHERE id=$1', [speciesId])
    .then(species => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Received species',
            body: species
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            status: 'Error',
            message: 'Error',
            body: err
        })
        next();
    });
};

const addSpecies = (req, res, next) => {
    db.none('INSERT INTO species(name, is_mammal) VALUES (${name}, ${is_mammal})', req.body)
    .then(() => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Added species'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            status: 'Error',
            message: 'Error'
        })
        next();
    });
};

module.exports = {
    getAllSpecies,
    getSingleSpecies,
    addSpecies
}