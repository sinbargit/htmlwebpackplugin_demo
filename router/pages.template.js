delete require.cache[require.resolve('./mapping.json')];
const mapping = require('./mapping.json');
export default (link,pages)=>{
    const list = pages.map((ele)=>{
        return `<li><a href="${ele}">${ele}</a><span>  ${mapping[ele].desc||''}</span></li>`
    }).join('');
    return `
	<!DOCTYPE html>
	<html>
		<head>
		<style></style>
		</head>
		<body>
			<h1>mapping.json中没有对应路由，目前有以下路由</h1>
			<ul>
			    ${list}
            </ul>
		</body>
	</html>
	`;
}