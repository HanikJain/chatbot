const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://0.0.0.0:27017/chatbotDB")
    .then(result => {
        app.listen(PORT, function () {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        throw new Error(err);
    })

require('./routes/dialogFlowRoutes')(app);
require('./routes/analyticsRoutes')(app);