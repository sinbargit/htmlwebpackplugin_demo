const deep = require('deep-extend');
const path = require('path');
const log4js = require('log4js');
const logger = log4js.getLogger("config");
/**
 * 时间单位毫秒
 * 深copy合并,使用dev覆盖production时必须指明一级属性
 * */
const production = {
    'name': 'firefly',
    "basepath": '/web',
    "port": 80,
    //https
    "https": {
        "enable": false,
        "port": 8443,
        "options": {
            "key": path.join(__dirname, 'keystore/server.key'),
            "cert": path.join(__dirname, 'keystore/server.crt')
        }
    },
    "cdn": "//gamestatic.iqiyi.com/game/react/resource/",
    "webpack": false,
    //maxLogSize:单位 byte
    "log": {
        appenders: {
            runtime: {
                type: 'file',
                filename: 'runtime.log',
                maxLogSize: 1024 * 1024 * 16,
                layout: {
                    type: 'pattern',
                    pattern: '[%d] [%p] [%c] [%m]'
                }
            },
            http: {
                type: 'file',
                filename: 'http.log',
                maxLogSize: 1024 * 1024 * 16,
                layout: {
                    type: 'pattern',
                    pattern: '[%d] %m'
                }
            },
            http_out: {
                type: 'stdout',
                layout: {
                    type: 'pattern',
                    pattern: '[%d] %m'
                }
            },
            out: {
                type: 'stdout',
                layout: {
                    type: "basic"
                }
            }
        },
        categories: {
            default: {
                appenders: ['runtime'],
                level: 'INFO'
            },
            http: {
                appenders: ['http', 'http_out', 'out'],
                level: 'INFO',
                req_item: ['host', 'referer', 'originalUrl', 'user-agent', 'httpVersion', 'method', 'clientIp'],
                resp_item: ['statusCode', 'Content-Length', 'timeCost']
            }
        },
        pm2: true
    },
    "redis": {
        "connect": {
            "host": "10.77.43.22",
            "port": 6380,
            "password": "YxPtHd#$@qe23XAMD",
            "retry_strategy": function(options) {
                logger.warn("Redis connect timeout... retrying..." + options.error);
                if (options.error && options.error.code === 'ECONNREFUSED') {
                    logger.error("The redis server refused the connection." + options.error);
                    return false;
                }
                //重试时间1hour
                if (options.total_retry_time > 1000 * 60 * 60) {
                    logger.error("Redis retry time exhausted " + options.error);
                    return false;
                }
                //重试次数100
                if (options.attempt > 100) {
                    logger.error("Redis retry amount exhausted " + options.error);
                    return false;
                }
                //1s后重试
                return 1000;
            }
        },
        //过期时间最少1s=1000ms
        "expire": 10000,
        //获取缓存时等待时间,等待时间后直接拼凑新的page
        "timeout": 500
    },
    pm2: {
        "name": "temp",
        "instances": 4,
        "max_memory_restart": "1024M",
        "error_file": "./error.log",
        "out_file": "./info.log",
        "log_date_format": "YYYY-MM-DD HH:mm:ss",
        "merge_logs": true,
        "script": "index.js",
        "exec_mode": "cluster"
    }
};
const dev = {
    "port": 8000,
    "cdn": "//127.0.0.1:8000/resource/",
    "log": {
        categories: {
            default: {
                appenders: ['out'],
                level: 'TRACE'
            },
            http: {
                appenders: ['out'],
                level: 'TRACE'
            }
        },
        pm2: false
    },
    "redis": {
        "expire": 1000,
        "timeout": 0
    },
    "https": {
        "enable": false
    }
};
let config = production;
if (process.env.NODE_ENV !== "production") {
    config = deep({}, production, dev)
}
module.exports = config;