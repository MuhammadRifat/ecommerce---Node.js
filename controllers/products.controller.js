const db = require('../util/db');

// load all products from the database
module.exports.getProducts = (req, res, next) => {
    try {
        db.query(`SELECT * FROM products`, (err, rows, fields) => {
            if (err) {
                return res.status(404).send(err.message);
            } else {
                return res.status(200).send(rows);
            }
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// load product by id
module.exports.getProductById = (req, res, next) => {
    try {
        const { productId } = req.params;
        db.query(`SELECT * FROM products where id=${productId}`, (err, rows, fields) => {
            if (err) {
                return res.status(404).send(err.message);
            } else {
                return res.status(200).send(rows[0]);
            }
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// load all products from the database
module.exports.getProductsByCategoryId = (req, res, next) => {
    try {
        const { categoryId } = req.params;
        db.query(`SELECT * FROM products where category_id=${categoryId}`, (err, rows, fields) => {
            if (err) {
                return res.status(404).send(err.message);
            } else {
                return res.status(200).send(rows);
            }
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// upload products
module.exports.uploadProduct = (req, res, next) => {
    db.query(`SELECT * FROM products`, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
    })
}

// update product
module.exports.updateProduct = (req, res, next) => {
    db.query(`SELECT * FROM products`, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
    })
}

// delete product
module.exports.deleteProduct = (req, res, next) => {
    db.query(`SELECT * FROM products`, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
    })
}