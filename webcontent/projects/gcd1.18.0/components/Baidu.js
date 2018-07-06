import React, {
	Component
} from 'react';

///baidu 统计
class Baidu extends Component {
	render() {
		var _hmt = _hmt || [];
		(function() {
			var hm = document.createElement("script");
			hm.src = "https://hm.baidu.com/hm.js?7b2c747322ad4bca130dbe8874c6f6f4";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
		return (
			null
		)
	}
}

export default Baidu;