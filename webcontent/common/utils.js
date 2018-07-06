export function isIE() {
    const myNav = navigator.userAgent.toLowerCase()
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false
}

export function removeSelect() {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty()
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges()
        }
    } else if (document.selection) {  // IE?
        document.selection.empty()
    }

    return true
}

export function location() {
    return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
}

export function getCookieByName(name) {
    // for (let cookie of document.cookie.split('; ')) {
    //     const [key, value] = cookie.split('=')
    //     if (key === name) {
    //         return decodeURIComponent(value)
    //     }
    // }
    //
    // return ''
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
    else
        return '';
}

export function getCookies() {
    let cookies = {}

    for (let cookie of document.cookie.split('; ')) {
        let [name, value] = cookie.split('=')
        cookies[name] = decodeURIComponent(value)
    }

    return cookies
}

export function addCookie(name, value, days) {
    let expires
    if (days) {
        let date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = '; expires=' + date.toUTCString()
    } else {
        expires = ''
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/'
}

export function removeCookieByName(name) {
    addCookie(name, '', -1)
}

export function cutString(s = '', n) {
    if (s.length > n) {
        return s.slice(0, n) + '...'
    } else {
        return s
    }
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function swap(arr, indexA, indexB) {
    const temp = arr[indexA]
    arr[indexA] = arr[indexB]
    arr[indexB] = temp

    return arr
}

export function getUrlParam(name) {
    var reg = new RegExp("[?|&]" + name + "=([^&]*)(&|$)", "i")
    var r = window.location.search.match(reg)
    return r ? decodeURIComponent(r[1]) : ''
}

export function isArray(target) {
    return target instanceof Array
}

export function isNaN(target) {
    if (!isNumber(target)) return false
    return Number.isNaN(target)
}

export function isEmpty(target) {
    return Object.keys(target).length === 0 && target.constructor === Object
}

export function isNumber(target) {
    return Object.prototype.toString.call(target) === '[object Number]'
}

export function isString(target) {
    return Object.prototype.toString.call(target) === '[object String]'
}

export function json2Form(json) {
    let str = []
    for (let p in json) {
        if (json.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
        }
    }
    return str.join('&')
}
