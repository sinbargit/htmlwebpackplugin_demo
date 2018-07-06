const log4js = require('log4js');
const logger = log4js.getLogger("http");
const onFinished = require('on-finished');
const config = require("../config");

module.exports = function (req, res, next) {
    respTime(req,res);
    next()
};
function analysis(obj,flag) {
    let arr = [];
    flag.forEach((item)=>{
        let temp = obj.get(item)||obj[item]||"";
        arr.push('['+temp+']');
    });
    return arr.join(' ')
}
function respTime(req,res) {
    req.clientIp = req.connection.remoteAddress;
    req._startAt = process.hrtime();
    onFinished(res,(err)=>{
        let end = process.hrtime();
        let ms = (end[0] - req._startAt[0]) * 1e3 +
            (end[1] - req._startAt[1]) * 1e-6;
        ms = ms.toFixed(3);
        res.timeCost = ms;
        logger.info(analysis(req,config.log.categories.http.req_item)+" "+analysis(res,config.log.categories.http.resp_item));
    });
}