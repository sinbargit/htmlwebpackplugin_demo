import React, {Component} from 'react';
import './MySwiper.css';
import Swiper from 'swiper';
import './swiper.css';
import {GetQueryString} from '../common';

class MySwiper extends Component {
	componentDidMount () {
		let pageIndex = GetQueryString('page') - 0;

		if (pageIndex && Number.isInteger(pageIndex) && pageIndex > 0 && pageIndex <= this.props.number) {
			pageIndex = pageIndex - 1;
		} else {
			pageIndex = 0;
		}

    new Swiper ('.swiper-container', {
      direction: 'horizontal',
      effect: 'flip',
      initialSlide: pageIndex,
      pagination: {
        el: '.swiper-pagination',
      }
    })       
	}

	render () {
		const listItems = data.common.map((item, index) => 
			<div className="swiper-slide" key={index}>
				<img src={item} />
			</div>
		);
		return (
			<div className="swiper-container">
		    <div className="swiper-wrapper">
					{listItems}
		    </div>
			</div>
		);
	}
}

export default MySwiper;