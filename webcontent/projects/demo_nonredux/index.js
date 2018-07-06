import React from 'react';
import Root from './class/root.class';
import reduces from './reduces';
import BaseComponent from '../../components/basecomponent'
import preState from '../../../api/demo'

class Content extends BaseComponent {
	constructor() {
		super();
	}

	render() {
		return <div>
			<Root/>
		</div>
	}
}
const pre = [preState()]
export {Content, reduces, pre};


