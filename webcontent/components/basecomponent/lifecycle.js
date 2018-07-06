const lifecycle = {
	constructor:function() {
	},
	componentDidMount:function() {
	},
	componentWillReceiveProps:function() {
		console.log('i am receive')
	},
	// must return ture or false
	shouldComponentUpdate:function() {
		return true;
	},
	componentDidUpdate:function() {
	}
}
 export default lifecycle;