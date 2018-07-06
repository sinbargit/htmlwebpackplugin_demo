import React,{Component} from 'react'
import './swiper.css'
import Swiper from 'swiper'
 
class S extends Component{
	componentDidMount() {
        // console.log('组件挂载之后');
        var mySwiper = new Swiper('.swiper-container', {
		    direction: 'horizontal',
		    effect: 'coverflow',
		    grabCursor: true,
		    centeredSlides: true,
		    slidesPerView: 'auto',
		    coverflowEffect: {
		        rotate: 50,
		        stretch: 0,
		        depth: 200,
		        modifier: 1,
		        slideShadows : true,
		      },
		    loop: true,
		    
		    // 如果需要分页器
		    pagination: {
		      el: '.swiper-pagination',
		    },
		    
		    // 如果需要前进后退按钮
		    navigation: {
		      nextEl: '.swiper-button-next',
		      prevEl: '.swiper-button-prev',
		    }
		  })  
    }

    render() {
        return (
        	<div className="swiper-container">
			    <div className="swiper-wrapper">
			        <div className="swiper-slide"><img src="https://static.g.iqiyi.com/operation/img/4688_315_181_f482cfe06a7e916f6076f792d4d75ffa.jpg" alt="" /></div>
			        <div className="swiper-slide"><img src="https://static.g.iqiyi.com/operation/img/4688_315_181_f482cfe06a7e916f6076f792d4d75ffa.jpg" alt="" /></div>
			        <div className="swiper-slide"><img src="https://static.g.iqiyi.com/operation/img/4688_315_181_f482cfe06a7e916f6076f792d4d75ffa.jpg" alt="" /></div>
			    </div>
			    <div className="swiper-pagination"></div>
			    
			    <div className="swiper-button-prev"></div>
			    <div className="swiper-button-next"></div>
			</div>
            )
    }
}
export default S;