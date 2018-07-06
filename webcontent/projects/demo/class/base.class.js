import React from 'react'
import {connect} from 'react-redux';
export default (name) => {
    class Base extends React.Component{
        constructor (props){
            super(props)
            this.state = {};
            this.state.value = JSON.stringify(this.props.style)
        }
        handleChange(event)
        {
            this.setState({value: event.target.value});
        }
        handleClick(event)
        {
            this.props.handleClick(event,this.state.value);
        }
        render()
        {
            return <div style={this.props.style}>
                <h3>I AM {name}</h3>
                <h3>try to change me</h3>
                <textarea  rows="10" cols="25" onChange={(event)=>{this.handleChange(event)}} value={this.state.value}></textarea>
                <input type="button" value="提交" onClick={(event)=>{this.handleClick(event)}}/>
                {this.props.children}
            </div>
        }
    }

    const mapStateToProps = (state) => {
        return {...state[name]};
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            handleClick: (event,value) => {
                dispatch({type:name,payload:JSON.parse(value)})
            }
        }
    }
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Base)
}
