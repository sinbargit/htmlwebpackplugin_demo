import React from 'react'
import Base from './base.class'
export default class Right extends React.Component{
    constructor (props){
        super(props)
    }
    render() {
        const Inner = Base("right")
        return <div>
            <Inner/>
        </div>
    }
}