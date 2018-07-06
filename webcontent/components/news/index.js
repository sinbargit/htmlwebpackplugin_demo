import React from 'react';
import {Carousel as ReactCarousel,Tabs} from 'antd';
import BaseComponent from '../basecomponent';
require('./style.css')
const TabPane = Tabs.TabPane
export default class News extends BaseComponent {
	constructor() {
		super();
	}

	render() {
		return <div className={"news"}>
			<div className={"part"}>
				<ReactCarousel {...this.props.setting}>
					{this.props.list.map((ele, index) => {
						return <a src={ele.link} key={index} style={{backgroundImage: 'url('+ele.banner+')',backgroundColor:'transprate'}}>{ele.label}</a>
					})}
				</ReactCarousel>
			</div>
			<div className={"part"}>
				<Tabs type="card">
					{this.props.tabs.list.map((ele,index)=>{
						return <TabPane tab={ele.name} key={index}>{ele.content}</TabPane>
					})}
				</Tabs>
			</div>
		</div>
	}
}