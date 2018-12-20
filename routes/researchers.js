const express = require('express');
const router = express.Router();
const { getAllResearchers, 
        getSingleResearcher, 
        addNewResearcher, 
        updateResearcher, 
        removeResearcher } = require('../db/queries/researchersQueries');

router.get('/', getAllResearchers);
router.get('/:id', getSingleResearcher);
router.post('/', addNewResearcher);
router.patch('/:id', updateResearcher);
router.delete('/:id', removeResearcher);

module.exports = router;