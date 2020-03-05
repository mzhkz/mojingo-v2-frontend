const path = require('path');
const fs = require('fs');
const Express = require('express');
const config = require('../config');



const app = new Express();

/** JSやCSSなどを配信 */
app.use("/" + config.build.contentsDir, Express.static(path.join(__dirname + './../dist/' + config.build.contentsDir)));
app.use("/" + config.build.staticsDir, Express.static(path.join(__dirname + './../dist' + config.build.staticsDir)));
app.use("/", Express.static(path.join(__dirname + './../dist')));

/** SPA respond index.html */
app.get('/*', async (req, res, next) => {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/spa_index.html'), {encoding: "utf-8"});
    res.send(html)
});


app.listen(config.express.port, config.express.host,() => {
    console.log(`Wordlink Express running http://${config.express.host}:${config.express.port}`);
});