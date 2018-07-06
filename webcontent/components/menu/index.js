import React from 'react';
import {Menu} from 'antd';
import BaseComponent from '../basecomponent';

export default class Menuiqiyi extends BaseComponent {
	constructor() {
		super();
	}

	handleClick(e) {
		this.props.handleClick(e);
	}

	render() {
		return (
				<Menu onClick={()=>{this.handleClick}}
				      mode="horizontal">
					{this.props.menu.list.map((ele) => {
						return <Menu.Item key={ele.key ? ele.key : ele.name}>
							{
								ele.link ? <a href={ele.link} target={ele.linktarget||''}>{ele.name}</a> : ele.name
							}
						</Menu.Item>;
					})}
				</Menu>
		);
	}
}
