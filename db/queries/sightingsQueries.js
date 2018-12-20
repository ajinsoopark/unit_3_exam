const { db } = require('./pgPromise');

const getAllSightings = (req, res, next) => {
    db.any('SELECT * FROM sightings')
    .then(sightings => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Received all sightings',
            body: sightings
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

const getSpeciesSightings = (req, res, next) => {
    let speciesId = parseInt(req.params.id);
    
    db.any('SELECT * FROM sightings WHERE species_id =$1', [speciesId])
    .then(sightings => {
        res.status(200)
        .json({
            status: 'Success',
            message: `Received species(${speciesId}) sightings`,
            body: sightings
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

const getResearcherSightings = (req, res, next) => {
    let researcherId = parseInt(req.params.id);

    db.any('SELECT * FROM sightings WHERE researcher_id =$1', [researcherId])
    .then(sightings => {
        res.status(200)
        .json({
            status: 'Success',
            message: `Received researcher(${researcherId}) sightings`,
            body: sightings
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

const getHabitatSightings = (req, res, next) => {
    let habitatId = parseInt(req.params.id);

    db.any('SELECT * FROM sightings WHERE habitat_id =$1', [habitatId])
    .then(sightings => {
        res.status(200)
        .json({
            status: 'Success',
            message: `Received habitat(${habitatId}) sightings`,
            body: sightings
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

const addSighting = (req, res, next) => {
    db.none('INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES (${researcher_id}, ${species_id}, ${habitat_id})', req.body)
    .then(() => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Added sighting'
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

const removeSighting = (req, res, next) => {
    let sightingId = parseInt(req.params.id);

    db.result('DELETE FROM sightings WHERE id=$1', [sightingId])
    .then(() => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Removed Sighting'
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
    getAllSightings,
    getSpeciesSightings,
    getResearcherSightings,
    getHabitatSightings,
    addSighting,
    removeSighting
}