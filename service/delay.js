const redis = require("../service/redis");
const config = require("../config");
const logger = require('log4js').getLogger("service delay");

class Delay {
    constructor(duration) {
        this.duration = duration;
        this.hit = true;
    }

    doneA(data = null) {
        clearTimeout(this.timer);
        this.callback(data, true);
    }

    doneB(data = null) {
        this.callback(data, false);
    }

    begin() {
        this.planA(this.doneA);
        this.timer = setTimeout(() => {
            this.hit = false;
            this.planB(this.doneB);
        }, this.duration);
    }
    callback() {
    }
    planA() {
    }
    planB() {
    }
}

module.exports = class HitCache extends Delay {
    constructor(key,resp,req) {
        super(config.redis.timeout);
        this.key = key;
        this.resp = resp;
        this.req = req;
    }
    immediately()
    {
        this.planB(this.doneB);
    }
    callback(data,_)
    {
        this.resp.send(data);
    }
    planA() {
        redis.get(this.key, (err, reply) => {
            if(!this.hit)
            {
                return;
            }
            clearTimeout(this.timer);
            if (null!=reply) {
                this.req["through"] = "hit cache";
                logger.info("hit cache " + this.key);
                this.doneA(reply);
            }
            else {
                logger.info("miss cache " + this.key);
                this.immediately();
            }
        })
    }
}
