//本组件输出当前所处环境
//browser是浏览器
//os是系统（仅移动端输出）
//client 所处环境是基线，游戏中心，还是浏览器（仅移动端输出）

let agent = navigator.userAgent.toLowerCase();

const env = {
	    isMobile: !!agent.match(/applewebkit.*mobile.*/), //是否为移动终端
	    isAndroid: /android/.test(agent), //android终端或者uc浏览器
	    isIos: !!agent.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端l
	    isWeixin:/micromessenger/.test(agent)  //微信
	};

const env_info ={};

//系统
if(env.isMobile){
	env_info.os = env.isAndroid ? 'android' : 'ios';

	if(/iqiyiapp_gc/.test(agent) || (window.location.href.indexOf('platform=GPhone')>-1 && /iqiyiapp/.test(agent)) ){
	    env_info.client = 'androidGC'; //安卓游戏中心
	}if(window.location.href.indexOf('platform=iPhone')>-1 && /iqiyiapp/.test(agent)){
	    env_info.client = 'iosGC'; //IOS游戏中心
	}else if(/iqiyiapp/.test(agent)){
		env_info.client = 'jx';
	}else{
		env_info.client = 'browser';
	}
}

//浏览器
if(env.isMobile){
	switch (true){

		case env.isWeixin :
	            env_info.browser = 'wx';
	            break;

	    case /ucbrowser/.test(agent):
	        env_info.browser = 'uc';
	        break;

	    case /baidu/.test(agent) :
	        env_info.browser = 'baidu';
	        break;

	    case /qhbrowser/.test(agent) :
	    case /qihoobrowser/.test(agent) :
	        env_info.browser = '360';
	        break;

	    case /liebao/.test(agent) :
	        env_info.browser = 'cheetah';
	        break;

	    case /qq/.test(agent) :
	        env_info.browser = 'qq';
	        break;

	    case /opr/.test(agent) :
	        env_info.browser = 'opera';
	        break;

	    case /sogou/.test(agent) :
	        env_info.browser = 'sogou';
	        break;

	    default :
	        env_info.browser = 'other';
	}
}else{
	if (!!window.ActiveXObject || "ActiveXObject" in window) {
        env_info.browser = 'ie';
    }
    switch (true) {

        case (/metasr/.test(agent) && env_info.browser === 'ie'):
            env_info.browser = 'sogou-compatible';
            break;

        case /metasr/.test(agent):
            env_info.browser = 'sogou-speed';
            break;

        case /firefox/.test(agent):
            env_info.browser = 'firefox';
            break;

        case (/qq/.test(agent) && env_info.browser === 'ie'):
            env_info.browser = 'qq-compatible';
            break;

        case /qq/.test(agent):
            env_info.browser = 'qq-speed';
            break;

        default:
            if (env_info.browser === 'ie') {
                if (/rv:11/.test(agent)) {
                    env_info.browser = 'IE11';
                } else if (/msie 8/.test(agent)) {
                    env_info.browser = 'IE8';
                } else if (/msie 9/.test(agent)) {
                    env_info.browser = 'IE9';
                } else if (/msie/.test(agent)) {
                    env_info.browser = 'IE10';
                } else {
                    env_info.browser = 'IE';
                }
            } else {
                env_info.browser = 'other';
            }
    }
}

export default env_info;
