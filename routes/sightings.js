const express = require('express');
const router = express.Router();
const { getAllSightings, 
        getSpeciesSightings, 
        getResearcherSightings, 
        getHabitatSightings,
        addSighting,
        removeSighting } = require('../db/queries/sightingsQueries');

router.get('/', getAllSightings);
router.get('/species/:id', getSpeciesSightings);
router.get('/researchers/:id', getResearcherSightings);
router.get('/habitats/:id', getHabitatSightings);
router.post('/', addSighting);
router.delete('/:id', removeSighting);

module.exports = router;