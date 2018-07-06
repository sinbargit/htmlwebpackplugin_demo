import React from 'react';
import lifecycle from './lifecycle';

if (process.env.BROWSER) {
    require('antd/dist/antd.min.css');
}

class BaseComponent extends React.Component {
    constructor() {
        super();
        //set constructor hook
        lifecycle.constructor.apply(this, Array.prototype.slice.call(arguments));
        this.setLifecycle(lifecycle);
    }

    handleTrack(url) {
        return function(){
            console.log(this)
            console.log('I am track' + this.state.value)

            fetch(url).then(function (response) {
                return response.text()
            }).then(function (body) {
                console.log(body)
            })
        }.bind(this)
    }

    //set other lifecycle hook
    setLifecycle(lifecycle) {
        Object.keys(lifecycle).forEach((ele) => {
            this['__' + ele] = this[ele];
            this[ele] = () => {
                if (typeof lifecycle[ele] !== 'function') {
                    throw 'the ' + ele + ' is not a function, make sure you pass a react lifecycle function';
                }
                else {
                    lifecycle[ele].apply(this, Array.prototype.slice.call(arguments));
                    if ((typeof this['__' + ele]) === 'function') {
                        this['__' + ele]();
                    }
                    //since maybe a shouldComponentUpdate fun, so we return true by default
                    else {
                        return true;
                    }
                }
            };
        });
    }
}

export default BaseComponent;