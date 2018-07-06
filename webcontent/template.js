export default (__body,__preState,__script,__link,...params)=>{
    return `
	<!DOCTYPE html>
	<html>
		<head>
		 ${__link}
		</head>
		<body>
			<div id="root">${__body}</div>
		</body>
		<script>
            window.__INITIAL_STATE__ = ${JSON.stringify(__preState)};
        </script>
        ${__script}
	</html>
	`;
}