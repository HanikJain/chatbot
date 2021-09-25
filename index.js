const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);

PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
});
