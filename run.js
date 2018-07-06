const pm2 = require('pm2');
const config = require('./config')

var name = config.name || 'AnnonymousApp';
name = name.replace(/\//g, '_');
if (name.indexOf('/') != 0) {
	name = '_' + name
}
process.env.NODE_ENV='production'
console.log('[PM2] ' + name + ' Starting...');
pm2_connect()
	.then(() => pm2_list())
	.then(list => {
		if (list && list.length) {
			let count = 0;
			for (let i in list) {
				if (list[i].name == name) {
					count++;
				}
			}
			if (count == 0) {
				console.log('[PM2] No "' + name + '" is running, starting...');
				return pm2_start(name);
			} else {
				console.log('[PM2] Found ' + count + ' process(es), reloading...');
				return pm2_reload(name)
					.catch(err => {
						console.log('[PM2] Reloading failed, starting...');
                        console.log(err)
						return pm2_delete(name)
							.then(() => pm2_start(name))
							.then(() => pm2_disconnect())
					});
			}
		} else {
			console.log('[PM2] No process is running, starting...');
			return pm2_start(name);
		}
	})
	.catch(err => {
		console.log('[PM2] Couldn\'t list processes, starting...');
		console.log(err)
		return pm2_delete(name)
			.then(() => pm2_start(name))
			.then(() => pm2_disconnect())
	})
	.then(() => {
		console.log('[PM2] - success');
		pm2_disconnect()
		console.log('[PM2] - disconnected');
	})
	.catch(err => {
		console.log('[PM2] - failed');
		console.log(name)
		console.log(err)
		pm2_disconnect(true)
		console.log('[PM2] - disconnected');
	})
	.then(() => {
		console.log('[PM2] Script DONE');
	});

function pm2_start() {
	return new Promise(function(resolve, reject) {
		pm2.start(Object.assign(config.pm2,{name:name}), function(err, apps) {
			if (err) {
				reject(err)
			} else {
				resolve(apps)
			}
		});
	})
}

function pm2_reload (appName) {
	return new Promise((resolve, reject) => {
		pm2.gracefulReload(appName, (err, proc) => {
			if (err) {
				reject(err);
			} else {
				resolve(proc);
			}
		});
	});
}

function pm2_disconnect (exit) {
	return new Promise((resolve) => {
		if (exit) {
			pm2.disconnect(process.exit);
		} else {
			pm2.disconnect();
		}
		resolve();
	});
}

function pm2_delete(appName) {
	return new Promise(function(resolve, reject) {
		pm2.delete(appName, function(err) {
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})
}

function pm2_list() {
	return new Promise(function(resolve, reject) {
		pm2.list(function(err, list) {
			if (err) {
				reject(err)
			} else {
				resolve(list)
			}
		})
	})
}

function pm2_connect() {
	return new Promise(function(resolve, reject) {
		pm2.connect(false, function(err) {
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})
}

// function pm2_describe(appName) {
// 	return new Promise(function(resolve, reject) {
// 		pm2.describe(appName, function(err, description) {
// 			if (err) {
// 				rejrect(err)
// 			} else {
// 				resolve(description)
// 			}
// 		})
// 	})
// }
//
// function pm2_kill() {
// 	return new Promise(function(resolve, reject) {
// 		pm2.killDaemon(function(err) {
// 			if (err) {
// 				reject(err)
// 			} else {
// 				resolve()
// 			}
// 		})
// 	})
// }
//
// function pm2_startup() {
// 	return new Promise(function(resolve, reject) {
// 		pm2.startup('centos', function(err, result) {
// 			if (err) {
// 				reject(err)
// 			} else {
// 				resolve(result)
// 			}
// 		})
// 	})
// }