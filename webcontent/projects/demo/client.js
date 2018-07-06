import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {Content} from './index'
import {reduces} from './index'
import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {combineReducers} from 'redux';

const preloadedState = window.__INITIAL_STATE__;
const _reduces = typeof reduces === "object"?combineReducers(reduces):reduces
const store = createStore(_reduces,preloadedState,applyMiddleware(thunkMiddleware))
render(
    <Provider store={store}>
        <Content />
    </Provider>,
    document.getElementById('root')
)