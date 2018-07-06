  //分享
 function Share_plug(obj){
    var share_info = 'title=' + encodeURIComponent('#'+obj.shareTitle+'#'+obj.shareContent)
            + '&url=' + encodeURIComponent(obj.shareUrl)
            + '&appkey=801148568&site=g.iqiyi.com';  
    var dialog_size = 'width=600,height=300,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,location=yes,resizable=no,status=no';
    var url = 'http://v.t.sina.com.cn/share/share.php?'+share_info + '&pic=' + encodeURIComponent(obj.sharePic);
    window.open(url,'shareDialog',dialog_size);    
  }
  
  export default Share_plug;
