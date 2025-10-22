const congig = require('./config.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const backendRouter = require('./backend/router.js');
const frontendRouter = require('./frontend/router.js');


const app = express();
app.use(express.static('./frontend/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', frontendRouter);
app.use('/server', backendRouter);

app.listen(congig.PORT, () => {
    console.log(`Server started...\nPort: ${congig.PORT}`);
});