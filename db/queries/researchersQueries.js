const { db } = require('./pgPromise');

const getAllResearchers = (req, res, next) => {
    db.any('SELECT * FROM researchers')
    .then(researchers => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Received all researchers',
            body: researchers
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
    })
};

const getSingleResearcher = (req, res, next) => {
    let researcherId = parseInt(req.params.id);

    db.one('SELECT * FROM researchers WHERE id=$1', [researcherId])
    .then(researcher => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Received researcher',
            body: researcher
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

const addNewResearcher = (req, res, next) => {
    db.none('INSERT INTO researchers (name, job_title) VALUES (${name}, ${job_title})', req.body)
    .then(() => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Added new researcher'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            status: 'Error',
            message: 'Error',
        });
    });
};

const updateResearcher = (req, res, next) => {
    let researcherId = parseInt(req.params.id);
    let queryArr = [];
    let reqBodyKeys = Object.keys(req.body);

    reqBodyKeys.forEach(key => {
        queryArr.push(key + '=${' + key + '}');
    });

    let query = queryArr.join(', ');

    if (req.body.name && req.body.name.toLowerCase() === 'null') {
        req.body.name = null;
    }
    if (req.body.job_title && req.body.job_title.toLowerCase() === 'null') {
        req.body.job_title = null;
    }

    db.none(`UPDATE researchers SET ${query} WHERE id =${researcherId}`, req.body)
    .then(() => {
        res.status(200)
        .json({
            status: 'Successful',
            message: 'Updated researcher'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            status: 'Error',
            message: 'Error'
        })
    });
};

const removeResearcher = (req, res, next) => {
    let researcherId = parseInt(req.params.id);

    db.result('DELETE FROM researchers WHERE id=$1', [researcherId])
    .then(result => {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Removed researcher'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            status: 'Error',
            message: 'Error'
        })
    });
};

module.exports = {
    getAllResearchers,
    getSingleResearcher,
    addNewResearcher,
    updateResearcher,
    removeResearcher
}