const express = require('express');
const path = require('path');
const fs = require('fs');
const EventsSet = require('../service/eventsset');
const config = require("../config");
const redis = require("../service/redis");
const logger = require('log4js').getLogger("/page");
const HitCache = require('../service/delay');
const router = express.Router();

router.get("*", (req, resp, next) => {
    delete require.cache[require.resolve('./mapping.json')];
    const mapping = require('./mapping.json');
    let item = mapping[req.path];
    let name = item;
    if(typeof item === "object")
	{
		name = item.name
	}
    let isStatic = false;
    global['__ROUTE'] = name;
    logger.info("through route" + req.originalUrl);
    resp.setHeader('Content-Type', 'text/html');
    if (name === undefined) {
    	const links = Object.keys(mapping);
    	const html = require('./pages.template')(req.path,links);
        resp.send(html);
        return;
    }
	const ext = path.extname(name);
	if(ext==='.html')isStatic=true;
    const hitCache = new HitCache(name,resp,req);
    hitCache.planB = function()
    {
	    req['through'] = "new composed page";
	    logger.info("use new composed page " + name);
	    let self = this;
	    const dir = name.split("/");
	    const project = dir.shift();
	    const page = dir.join("/");
	    if(isStatic)
	    {
		    const contentPath = path.join(__dirname,'../webcontent/projects',project,page);
		    console.log(contentPath)
		    fs.readFile(contentPath,'utf8',(err,html)=>{
			    self.doneB(html);
			    redis.set(name, html, 'EX', config.redis.expire / 1000);
		    })
	    }
	    else
	    {
		    let htmlPath = path.join(__dirname,'../webcontent/projects/',project,page,'../index.js');
		    let tplPath = path.join(__dirname,'../webcontent/projects/',project,page);
		    let assetPath = path.join(path.dirname(htmlPath),'dest/asset');
		    const renderContent = require('./provider');
		    const content = require(htmlPath).Content||require(htmlPath);
		    renderContent(require(htmlPath).reduces, content,require(htmlPath).pre,require(assetPath),require(tplPath))
			    .then((html)=>{
				    self.doneB(html);
				    redis.set(name, html, 'EX', config.redis.expire / 1000);
			    }).catch(function (err) {
				logger.error(err)
            });
	    }
    };
    hitCache.begin();
});
module.exports = router;

