import React from 'react'
import Base from './base.class'
export default class Left extends React.Component{
    constructor (props){
        super(props)
    }
    render() {
        const Inner = Base("left")
        return <div>
            <Inner/>
        </div>
    }
}