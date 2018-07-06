const path = require('path');
const basePath = require('../config').basepath;
module.exports = function() {
		var ROOT_RE = new RegExp('^' + basePath)
		return function (req, res, next) {
			if (ROOT_RE.test(req.url)) {
				req.url = req.url.replace(ROOT_RE, '')
				if (req.url === '') {
					req.url = '/'
				}
			}
			next()
		}
}