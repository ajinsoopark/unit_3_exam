const express = require('express');
const router = express.Router();
const { getAllAnimals, 
        getSingleAnimal, 
        addAnimal, 
        updateAnimal, 
        removeAnimal } = require('../db/queries/animalsQueries');

router.get('/', getAllAnimals);
router.get('/:id', getSingleAnimal);
router.post('/', addAnimal);
router.patch('/:id', updateAnimal);
router.delete('/:id', removeAnimal);

module.exports = router;