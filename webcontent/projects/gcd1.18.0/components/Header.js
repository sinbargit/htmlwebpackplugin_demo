import React, {
	Component
} from 'react';
import './Header.css'
import Track from '../../../common/track'
import BaseComponet from '../../../components/basecomponent'

class Header extends Component {
	constructor() {
		super();
		let pageData = {
			isWebsite: true,
			IP: returnCitySN["cip"],
			rpage: 'homepage',
			html_id: '994',
			html_name: 'gcdh5'
		}

		Track.init(pageData)
	}
	clickTrack = (e) => {
		var node = e.target
		while (node !== document.body) {
			const track = JSON.parse(node.getAttribute('data-track'))
			if (track) {
				Track.click(track)

				break
			}
			node = node.parentNode
		}
	}
	render() {
		return (
			<div className="head">
				<a href="http://nt.game.iqiyi.com/index.php?cf=1528858305&qd=222&orientation=2" onClick={this.clickTrack} data-track={JSON.stringify({block:'play'})}><img src={require('../img/head.png')}/></a>
			</div>
		)
	}
}

export default Header;