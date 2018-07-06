const path = require('path');
const spawn = require('child_process').spawn;
const name = process.argv[2];
if(!name)
{
	console.log("U man! You forget the project name");
	process.exit();
}
const fs = require('fs');
const rootDir  = path.join(__dirname,'../webcontent/projects',name);
console.log('building ...');
fs.writeFileSync(path.join(rootDir,'build.json'),'{}');
(function itor(dir) {
	fs.readdir(dir,function(err,files) {
		err&&console.log(err);
		files.forEach((ele)=>{
			fs.stat(path.join(dir,ele),(err,stat)=>{
				if(stat.isFile()&&ele==="client.js")
				{
					console.log('building - '+path.join(dir,ele));
					spawn(/^win/.test(process.platform) ? 'gulp.cmd' : 'gulp',['--gulpfile','./package/gulpfile.js','--root',rootDir+'+'+path.join(dir,ele)],{stdio:[0,1,2]});
				}
				else if(stat.isDirectory())
				{
					itor(path.join(dir,ele));
				}
			})
		})
	})
}(rootDir));

