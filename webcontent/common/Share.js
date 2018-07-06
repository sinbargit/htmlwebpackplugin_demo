import React, { Component } from 'react';
import Env from './Env';

class Share extends Component {

	render(){
		const {title,content,url,pic,wxData} = this.props;
		let that = this;

		//初始化分享数据（native右上角分享）基线
		if(Env.client === 'iosGC' || Env.client === 'jx'){
	        window.iqiyi.onShare({
	            title: title,
	            desc: content,
				link: url, // 分享链接
				imgUrl: pic, // 分享图标
	            shareType: 1,
	            success: function () {
	            	that.props.callback('success');
	            },
	            fail: function () {
	            	that.props.callback('fail');
	            },
	            cancel: function () {
	            	that.props.callback('cancel');
	            }
	        });
	    }else if(Env.browser === 'wx'){
	    	//微信分享
			window.wx.config({
				debug: false,
				jsApiList:[
					'onMenuShareTimeline',
					'onMenuShareAppMessage'
				],
				...wxData
			});
			window.wx.ready(function () {
				window.wx.onMenuShareTimeline({
					title: title, // 分享标题
					link: url, // 分享链接
					imgUrl: pic, // 分享图标
					success: function () {
						that.props.callback('success');
					},
					cancel: function () {
						that.props.callback('cancel');
					}
				});
				window.wx.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: content, // 分享描述
					link: url, // 分享链接
					imgUrl: pic, // 分享图标
					success: function () {
						that.props.callback('success');
					},
					cancel: function () {
						that.props.callback('cancel');
					}
				});
			});
	    }

        //分享按钮点击
		function handleShare(){
			if(Env.client === 'iosGC' || Env.client === 'jx'){
				window.iqiyi.share({
		            title: title,
		            desc: content,
					link: url, // 分享链接
					imgUrl: pic, // 分享图标
	                success: function () {
						that.props.callback('success');
	                },
	                fail: function () {
						that.props.callback('fail');
	                },
	                cancel: function () {
						that.props.callback('cancel');
	                }
				});
			}else if(Env.client === 'androidGC'){
				var data = {
					title: title,
			        text: content,
			        url: url,
			        pic: pic
				}

				var share_data = encodeURIComponent(JSON.stringify(data));
				window.location.href = 'iqiyi://share?p=wx&t=1&d=' + share_data;
			}else{
				that.props.otherShare();
			}
		}

		return(
			<div onClick={handleShare}>{this.props.children}</div>			
		)
	}
}

export default Share;