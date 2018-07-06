import React from 'react';
import {Carousel as ReactCarousel} from 'antd';

if (process.env.BROWSER) {
	require('./carousel.css');
}

class Carousel extends React.Component {
	constructor() {
		super();
	}

	render() {
		return <div>
			<div className={"nav"}>

			</div>
			<ReactCarousel autoplay>
			</ReactCarousel>
		</div>;
	}
}

export default Carousel;