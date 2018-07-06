require('babel-register')({
	presets: ['react','env','stage-0'],
	"plugins": [
		"add-module-exports"
	]
});
delete process.env.BROWSER;
const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const setbase = require('./service/setbase');
//HTTP LOG
const httpLog = require('./service/httplog');
//SERVER RUNTIME LOG
const log4js = require('log4js');
const bodyParser = require('body-parser');
const config = require("./config");
const router = require('./router/router');
const logger = log4js.getLogger("index");

log4js.configure(config.log);
global.__rootdir = path.resolve(__dirname);

const app = express();
app.use(helmet());
app.use(compression());
app.use(setbase());
app.use(httpLog);
app.use(bodyParser.json({
    limit: '10MB'
}));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.use((res,resp,next)=>{
    global.__requestdir = res.path;
    next();
});
app.use(router);

if(config.https.enable)
{
    const port = config.https.port||8443;
    const options = {
        key:fs.readFileSync(config.https.options.key),
        cert:fs.readFileSync(config.https.options.cert)
    }
    require('https').createServer(options,app).listen(port,()=>{
        logger.info('app listening on https on port '+port);
    })
}
else
{
    const port = config.port||8000;
    require('http').createServer(app).listen(port,()=>{
        logger.info('app listening on http on port '+port);
    })
}
