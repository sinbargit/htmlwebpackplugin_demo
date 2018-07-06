if (!Object.assign) {
	Object.defineProperty = function (obj, key, opts) {
		if (opts && opts.value) {
			obj[key] = opts.value;
		}
	}
}

Object.assign = Object.assign || function (obj1, obj2) {
	if (typeof obj1 != 'object') {
		if (typeof obj2 != 'object') {
			return {}
		}
		return obj2
	}
	if (typeof obj2 != 'object') {
		return obj1
	}
	for (var i in obj2) {
		obj1[i] = obj2[i]
	}
	return obj1
}

Object.keys = Object.keys || (function () {
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty,
		hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
		dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		],
		dontEnumsLength = dontEnums.length

	return function (obj) {
		if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
			throw new TypeError('Object.keys called on non-object');
		}

		var result = [], prop, i

		for (prop in obj) {
			if (hasOwnProperty.call(obj, prop)) {
				result.push(prop)
			}
		}

		if (hasDontEnumBug) {
			for (i = 0; i < dontEnumsLength; i++) {
				if (hasOwnProperty.call(obj, dontEnums[i])) {
					result.push(dontEnums[i])
				}
			}
		}
		return result;
	}
}())

Object.create = Object.create || function (o, props) {
	function F() {}
	F.prototype = o

	if (typeof(props) === "object") {
		for (prop in props) {
			if (props.hasOwnProperty((prop))) {
				F[prop] = props[prop]
			}
		}
	}
	return new F()
}

Array.prototype.indexOf = Array.prototype.indexOf || function (elt) {
	var len = this.length >>> 0
	var from = Number(arguments[1]) || 0
	from = (from < 0) ? Math.ceil(from) : Math.floor(from)
	if (from < 0) from += len
	for (; from < len; from++) {
		if (from in this && this[from] === elt) {
			return from
		}
	}
	return -1
}

Array.prototype.forEach = Array.prototype.forEach || function (iterator) {
	for (var i in this) {
		if (iterator(this[i], i) === false) {
			break
		}
	}
}

Array.prototype.map = Array.prototype.map || function (callback, thisArg) {
    var T, A, k

    if (this == null) {
        throw new TypeError("this is null or not defined")
    }
    var O = Object(this)
    var len = O.length >>> 0
    if (Object.prototype.toString.call(callback) != "[object Function]") {
        throw new TypeError(callback + " is not a function")
    }
    if (thisArg) {
        T = thisArg
    }
    A = new Array(len)
    k = 0;
    while(k < len) {
	    var kValue, mappedValue
	    if (k in O) {
	        kValue = O[k]
	        mappedValue = callback.call(T, kValue, k, O)
	        A[k] = mappedValue
	    }
	    k++
    }
    return A
}

Date.now = Date.now || function () {
	return (new Date()).getTime()
}

/**
 * Date format following ISO 8601,
 * Author: qiangyizhou
 */
Date.prototype.format = Date.prototype.format || function (format) {
	var tz = this.getTimezoneOffset()
	return format
		.replace(/^UTC$/i, this.toUTCString())
		.replace(/^GMT$/i, this.toGMTString())
		.replace(/^ISO$/i, this.toISOString())
		.replace(/TZD/g, function () {
			var atz = Math.abs(tz)
			return tz == 0 ? 'Z' : ((tz < 0 ? '-' : '+') + ('0' + (atz / 60)).slice(-2) + ':' + ('0' + (atz % 60)).slice(-2))
		})
		.replace(/YYYY/g, this.getFullYear())
		.replace(/MM/g, ('0' + (this.getMonth() + 1)).slice(-2))
		.replace(/DD/g, ('0' + (this.getDate())).slice(-2))
		.replace(/hh/g, ('0' + (this.getHours())).slice(-2))
		.replace(/mm/g, ('0' + (this.getMinutes())).slice(-2))
		.replace(/ss/g, ('0' + (this.getSeconds())).slice(-2))
		.replace(/s/g, this.getMilliseconds())
}

Date.prototype.toISOString = Date.prototype.toISOString || function () {
	return this.getFullYear() + '-' + ('0' + (this.getMonth() + 1)).slice(-2) + '-' + ('0' + (this.getDate())).slice(-2) + 'T' + ('0' + (this.getHours())).slice(-2) + ':' + ('0' + (this.getMinutes())).slice(-2) + ':' + ('0' + (this.getSeconds())).slice(-2) + '.' + this.getMilliseconds() + 'Z'
}

String.prototype.trim = String.prototype.trim || function () {
	return this.replace(/(^\s+)|(\s+$)/g, '')
}
