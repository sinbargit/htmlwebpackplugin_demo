import React from 'react';
import {connect} from 'react-redux';
if (process.env.BROWSER) {
	require("./gap.css");
}
const mapDispatchToProps = (dispatch)=>({
});
const mapStatesToProps = (state)=>({...state.background});
class Background extends React.Component
{
	constructor()
	{
		super();
	}
	render()
	{
		return <div className={"gap"} style={{...this.props.style}}></div>
	}
}
export default connect(mapStatesToProps,mapDispatchToProps)(Background)