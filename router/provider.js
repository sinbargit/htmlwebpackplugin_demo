import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import React from 'react';
import {combineReducers} from 'redux';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import __template from '../webcontent/template';
import { composeWithDevTools } from 'redux-devtools-extension';

    const renderContent = (reduces,Dom,pre,asset,template)=>{
    	reduces = typeof reduces ==='object'?combineReducers(reduces):reduces;

		const tpl = template||__template;
		return Promise.all(pre).then((preState)=>{
            preState = preState.reduce((acc,cur)=>{
            	return {...acc,...cur}
			})
			let body =  '';
			if(reduces!==undefined)
			{
                const store = createStore(reduces,preState,composeWithDevTools(applyMiddleware(thunkMiddleware)));
                body = ReactDOMServer.renderToString(<Provider store={store}><Dom/></Provider>);
			}
			else
			{
                body = ReactDOMServer.renderToString(<Dom preState = {{...preState}}/>);
			}
			const script = '<script src="'+asset.js+'"></script>';
			const link = asset.css?'<link href="'+asset.css+'" rel="stylesheet"></head>':"";
			return tpl(body,preState,script,link);
		})
};
    module.exports = renderContent;