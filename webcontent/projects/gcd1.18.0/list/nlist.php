<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $data['webConfig']['web_title'];?></title>
    <link rel="stylesheet" href="//gamestatic.iqiyi.com/game/react/resource/gcd1.18.0/list/styles.css">
    <script src="https://pv.sohu.com/cityjson?ie=utf-8"></script> 
</head>
<body>
    <script>
        var data = <?php echo json_encode($data);?>;
        //console.log(data);
    </script>
	<div id="root"></div>
	<script src="//gamestatic.iqiyi.com/game/react/resource/gcd1.18.0/list/client-36a71e.js"></script>
</body>
</html>