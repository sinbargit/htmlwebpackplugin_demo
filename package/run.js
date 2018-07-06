const gulp = require('gulp');
const path = require('path');
const project = process.argv[2];
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
if(project)
{
	console.log("watching project "+ "\x1b[33m"+project+"\x1b[0m");
	console.log(path.join(__dirname,'../webcontent/projects',project,'./**/*.js'));
	spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm',['run','build',project],{stdio:[0,1,2]})
	gulp.watch(path.join(__dirname,'../webcontent/projects',project,'./**/*.js'),(event)=>{
		const clientPath = event.path.replace('index.js','client.js');
		console.log("building "+clientPath+" ...");
		exec('gulp --gulpfile ./package/gulpfile.js --root ' + path.join(__dirname,'../webcontent/projects',project)+'+'+clientPath,(error,stdout,stderr)=>{
			console.log(stdout.toString('utf8'));
		});
	});
}
else
{
	console.log('\x1b[33m%s\x1b[0m', "watching Nothing");
}
const server = spawn('node',[path.join(__dirname,'../index.js')],{stdio:[0,1,2]});

