import Env from './Env'

function login(data){

	if(typeof data != 'object') return;

	var url = data.url ? data.url : '';
	var useWX = data.useWX ? data.url : false;
	var useNative = data.useNative ? data.useNative : false;

	if (Env.browser == 'wx' && useWX){
		window.location.href = 'http://passport.iqiyi.com/apis/thirdparty/mobile_login.action?type=29&isapp=0&requestType=3&agenttype=234&url='+url;
		return;
	}

	if(Env.client == 'jx' && useNative){
		if(Env.client == 'browser'){
			var iqiyi = {}
		}
		iqiyi.loadNativePage({
			page : 'login',
			returnUrl : url
		});

		return;
	}

	if (Env.client == 'androidGC'){
		window.AppStoreHelper.login();
	}else{
		window.location.href = 'http://m.iqiyi.com/user.html?redirect_url='+url;
	}
}

export default login;