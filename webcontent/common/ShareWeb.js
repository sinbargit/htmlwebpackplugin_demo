import React, { Component } from 'react';
import Env from './Env';
import './shareWeb.css'

class Share extends Component {

	render(){

		const {title,content,url,pic,shareMessage} = this.props;

		var share_info = 'title=' + encodeURIComponent('#'+title+'#'+content)
           + '&url=' + encodeURIComponent(url)
           + '&appkey=801148568&site=g.iqiyi.com';
           
	    var dialog_size = 'width=600,height=300,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,location=yes,resizable=no,status=no';

	    function shareSina(){
	      var link = 'http://v.t.sina.com.cn/share/share.php?'+share_info + '&pic=' + encodeURIComponent(pic);
	      window.open(link,'shareDialog',dialog_size);
	    }

	    function shareQzone(){
	      var link = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+share_info + '&pics=' + encodeURIComponent(pic);
	      window.open(link,'shareDialog',dialog_size);
	    }

	    function shareQQ(){
	        var share_info = 'title=' + encodeURIComponent(title)
	             + '&desc=' + shareMessage
	             + '&summary=' + content
	             + '&url=' + encodeURIComponent(url)
	             + '&appkey=801148568&site=g.iqiyi.com'
	             + '&pics=' + encodeURIComponent(pic);
	        window.open('http://connect.qq.com/widget/shareqq/index.html?'+share_info,'shareDialog',dialog_size);
	    }

		return(
			<div className="web-share">
	          <a className="sina" href="javascript:;" onClick={shareSina}>新浪</a>
	          <a className="qzone" href="javascript:;" onClick={shareQzone}>QQ空间</a>
	          <a className="qq" href="javascript:;" onClick={shareQQ}>QQ好友</a>
	        </div>			
		)
	}
}

export default Share;