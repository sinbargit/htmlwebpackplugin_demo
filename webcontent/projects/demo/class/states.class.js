import React from 'react'
import {connect} from 'react-redux';

class States extends React.Component{
    constructor (props){
        super(props)
        this.name="states"
        this.state = {};
        this.state.value = JSON.stringify(this.props.root)
    }
    render()
    {
        return <div>
            <h3>HERE IS THE STATES</h3>
            <h3>{this.props.value}</h3>
        </div>
    }
}
const mapStateToProps = (state)=>{
    return {
        value:JSON.stringify(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {}

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(States)