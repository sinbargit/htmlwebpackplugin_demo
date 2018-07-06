import React from 'react'
import Base from './base.class'
import Left from './left.class'
import Right from './right.class'
import States from './states.class'
export default class Root extends React.Component{
    constructor (props){
        super(props)
        this.name = "root"
    }
    render()
    {
        const Inner = Base('root')
        return <div>
            <Inner>
                <Left/>
                <Right/>
            </Inner>
            <States/>
        </div>
    }
}