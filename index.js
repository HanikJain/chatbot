const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("hello world")
})

PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
});