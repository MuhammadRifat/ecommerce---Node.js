const db = require('../util/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// generate token and send to client
const generateToken = (object) => {
    const token = jwt.sign({
        id: object.id,
        role: object.role,
    }, process.env.usersJwtToken, { algorithm: 'HS512', expiresIn: '7d' });

    return {
        "status": true,
        "token": token,
        "message": `${object.operation} Successful!`
    };
}

// handle user signup
module.exports.handleSignup = (req, res) => {
    try {
        const { name, phone, address, password } = req.body;

        // hash user password
        bcrypt.hash(password, 10, (err, hash) => {
            if (!err) {
                const sql = `INSERT INTO users (name, phone, address, password, role) VALUES (?,?,?,?,?)`;
                db.query(sql, [name, phone, address, hash, 'user'], (error, result) => {
                    if (error) {
                        res.status(500).json({ message: 'Failed to signup' });
                    } else {
                        if (result.insertId) {
                            res.status(200).json(generateToken({ id: result.insertId, role: 'user', operation: 'Signup' }));
                        }
                    }
                })
            }
        })
    } catch {
        res.status(500).json({ message: 'Failed to signup' });
    }
}

// handle user login
module.exports.handleLogin = (req, res) => {
    try {
        const { phone, password } = req.body;

        // hash user password
        const sql = 'SELECT * FROM users WHERE phone=?';
        db.query(sql, [phone], (err, rows) => {
            if (err) {
                res.status(500).json({ message: 'Failed to Login' });
            } else {
                bcrypt.compare(password, rows[0].password, (err, result) => {
                    if (result) {
                        res.status(200).json(generateToken({ id: rows[0].id, role: rows[0].role, operation: 'Login' }));
                    } else {
                        res.status(500).json({ message: 'Failed to Login' });
                    }
                })
            }
        })
    } catch {
        res.status(500).json({ message: 'Failed to signup' });
    }

}

// load user by id
module.exports.getUser = (req, res, next) => {
    try {
        const sql = 'SELECT id, name, phone, address, imageURL, role FROM users where id=?';

        db.query(sql, [req.id], (error, rows) => {
            if (error) {
                res.status(500).json({
                    "status": false,
                    "message": "Failed"
                });
            } else {
                res.status(200).json(rows);
            }
        })
    } catch (err) {
        res.status(500).json({
            "status": false,
            "message": "Failed"
        });
    }
    // const { userId } = req.params;
    // // db.query(`SELECT * FROM users where id=${userId}`, (err, rows, fields) => {
    //     if (err) throw err;

    //     res.status(200).json(rows[0]);
    // })
}

// update user
module.exports.updateUser = (req, res, next) => {
    // db.query(`SELECT * FROM users`, (err, rows, fields) => {
    //     if(err) throw err;

    //     res.status(200).send(rows);
    // })
}

// load user orders
module.exports.getUserOrders = (req, res, next) => {
    try {
        const sql = 'SELECT id, cust_name, cust_phone, cust_address, instructions, total_price, delivery_charge, total_amount, payment_medium, status, date  FROM orders WHERE cust_id=? order by date DESC LIMIT 0, 10';
        db.query(sql, [req.id], (error, rows) => {
            if (error) {
                res.status(500).json({
                    "status": false,
                    "message": "Failed"
                });
            } else {
                res.status(200).json(rows);
            }
        })
    } catch (err) {
        res.status(500).json({
            "status": false,
            "message": "Failed"
        });
    }
}