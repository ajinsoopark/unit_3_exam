const { db } = require('./pgPromise');

const getAllAnimals = (req, res, next) => {
    db.any('SELECT * FROM animals')
    .then(animals => {
        res.status(200)
        .json({
            staus: 'Success',
            message: 'Received all animals',
            body: animals
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

const getSingleAnimal = (req, res, next) => {
    let animalId = parseInt(req.params.id);

    db.one('SELECT * FROM animals WHERE id=$1', animalId)
    .then(animal => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Received animal',
            body: animal
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

const addAnimal = (req, res, next) => {
    db.none('INSERT INTO animals(species_id, nickname) VALUES (${species_id}, ${nickname})', req.body)
    .then(() => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Added animal'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            status: 'Error',
            message: 'Error'
        });
        next();
    });
};

const updateAnimal = (req, res, next) => {
    let animalId = parseInt(req.params.id);
    let queryArr = [];
    let animalBodyKeys = Object.keys(req.body);

    animalBodyKeys.forEach(key => {
        queryArr.push(key + '=${' + key + '}');
    });
  
    let query = queryArr.join(', ');
  
    if (req.body.species_id && req.body.species_id.toLowerCase() === 'null') {
        req.body.species_id = null;
    }
    if (req.body.nickname && req.body.nickname.toLowerCase() === 'null') {
        req.body.nickname = null;
    }
  
    db.none(`UPDATE animals SET ${query} WHERE id =${animalId}`, req.body)
      .then(() => {
          res.status(200)
          .json({
              status: 'Successful',
              message: 'Updated animal'
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

const removeAnimal = (req, res, next) => {
    let animalId = parseInt(req.params.id);
    db.result('DELETE FROM animals WHERE id=$1', [animalId])
    .then(() => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Removed animal',
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
    getAllAnimals,
    getSingleAnimal,
    addAnimal,
    updateAnimal,
    removeAnimal
}