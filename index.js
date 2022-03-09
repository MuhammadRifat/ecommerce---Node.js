const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const userRouter = require('./routes/users.route');
const productRouter = require('./routes/products.route');
const categoryRouter = require('./routes/categories.route');
const settingRouter = require('./routes/settings.route');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/settings', settingRouter);

app.get("/", (req, res) => {
    res.send("Bismillah");
})

const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).json({error: err});
}

app.use(errorHandler);

app.listen(port, () => {
    console.log('listening on port ' + port);
});