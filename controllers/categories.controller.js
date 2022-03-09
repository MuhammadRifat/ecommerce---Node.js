const db = require('../util/db');

module.exports.getCategories = (req, res, next) => {
    db.query(`SELECT * FROM categories`, (err, rows, fields) => {
        if(err) throw err;

        res.status(200).send(rows);
    })
}

// load categories by id
module.exports.getCategoriesById = (req, res, next) => {
    const {categoryId} = req.params;
    db.query(`SELECT * FROM categories where id=${categoryId}`, (err, rows, fields) => {
        if(err) throw err;

        res.status(200).send(rows);
    })
}