const db = require('../util/db');

module.exports.getSliders = (req, res, next) => {
    db.query(`SELECT * FROM settings_slider`, (err, rows, fields) => {
        if(err) {
            return res.status(err).send(err.message);
        } else {
            return res.status(200).send(rows);
        }
    })
}
