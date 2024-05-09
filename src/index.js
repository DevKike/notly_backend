const express = require('express');
const config = require('./config/config');

const app = express();
const port = config.SERVER.PORT;

app.listen(port);

try {
    console.log(`Server running on port ${port}`);
} catch (error) {
    throw error;
}