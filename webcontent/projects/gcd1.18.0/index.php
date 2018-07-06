<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $data['webConfig']['web_title'];?></title>
    <link rel="stylesheet" href="//gamestatic.iqiyi.com/game/react/resource/gcd1.18.0/styles.css">
    <script src="https://pv.sohu.com/cityjson?ie=utf-8"></script> 
</head>
<body>
    <script>
        var data = <?php echo json_encode($data);?>;
        // console.log(data);
        // data.common[0].h5_video_play = 'https://gamebigstatic.iqiyi.com/video/manghuangjihezuofang20180510/logo.mp4'
    </script>
	<div id="root"></div>
	<script src="//gamestatic.iqiyi.com/game/react/resource/gcd1.18.0/client-0ed36c.js"></script>
</body>
</html>