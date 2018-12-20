const { db } = require('./pgPromise');

const getAllTaggings = (req, res, next) => {
    db.any('SELECT * FROM taggings')
    .then(taggings => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Received all taggings',
            body: taggings
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

const getSingleTagging = (req, res, next) => {
    let taggingId = parseInt(req.params.id);

    db.one('SELECT * FROM taggings WHERE id=$1', [taggingId])
    .then(tagging => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Received tagging',
            body: tagging
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

const getResearcherTaggings = (req, res, next) => {
    let researcherId = parseInt(req.params.id);

    db.any('SELECT * FROM taggings WHERE researcher_id=$1', [researcherId])
    .then(taggings => {
        res.status(200)
        .json({
            status: 'Success',
            message: `Received researcher(${researcherId}) taggings`,
            body: taggings
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

const getAnimalTaggings = (req, res, next) => {
    let animalId = parseInt(req.params.id);

    db.any('SELECT * FROM taggings WHERE animal_id=$1', [animalId])
    .then(taggings => {
        res.status(200)
        .json({
            status: 'Success',
            message: `Received animal(${animalId}) taggings`,
            body: taggings
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

const addTaggings = (req, res, next) => {
    db.none('INSERT INTO taggings(animal_id, researcher_id) VALUES (${animal_id}, ${researcher_id})', req.body)
    .then(() => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Added tagging'
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
    getAllTaggings,
    getSingleTagging,
    getResearcherTaggings,
    getAnimalTaggings,
    addTaggings
}