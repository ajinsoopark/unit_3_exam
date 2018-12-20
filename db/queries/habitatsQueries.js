const { db } = require('./pgPromise');

const getAllHabitats = (req, res, next) => {
    db.any('SELECT * FROM habitats')
    .then(habitats => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Recieved all habitats',
            body: habitats
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

const getSingleHabitat = (req, res, next) => {
    let habitatId = parseInt(req.params.id);
    db.one('SELECT * FROM habitats WHERE id=$1', [habitatId])
    .then(habitat => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Received habitat',
            body: habitat
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

const addHabitat = (req, res, next) => {
    db.none('INSERT INTO habitats(category) VALUES (${category})', req.body)
    .then(() => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Added habitat'
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
    getAllHabitats,
    getSingleHabitat,
    addHabitat
}