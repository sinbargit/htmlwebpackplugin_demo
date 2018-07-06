import React from 'react'
import { render } from 'react-dom'
import Index from './index'
import '../../lib/flexible';

// class Test extends Component {
// 	render () {
// 		return (<div>hhh</div>)
// 	}
// }
render(
	<Index />,
	document.getElementById('root')
)