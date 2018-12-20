const express = require('express');
const router = express.Router();
const { getAllTaggings, 
        getSingleTagging, 
        getResearcherTaggings, 
        getAnimalTaggings, 
        addTaggings } = require('../db/queries/taggingsQueries');

router.get('/', getAllTaggings);
router.get('/:id', getSingleTagging);
router.get('/researchers/:id', getResearcherTaggings);
router.get('/animals/:id', getAnimalTaggings);
router.post('/', addTaggings);

module.exports = router;