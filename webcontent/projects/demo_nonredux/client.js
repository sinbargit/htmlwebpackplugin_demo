import React from 'react'
import { render } from 'react-dom'
import {Content} from './index'


const preloadedState = window.__INITIAL_STATE__;

render(
        <Content preState={...preloadedState}/>,
    document.getElementById('root')
)