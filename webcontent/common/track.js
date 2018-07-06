import {getCookieByName, json2Form ,getUrlParam} from './utils'
import Env from './Env'

function toObj(str) {
    if (str) {
        let obj = {}
        let pre = decodeURIComponent(str)
        pre.split('&').forEach((ele) => {
            if (ele != '' && (typeof ele !== 'function')) {
                obj[ele.split('=')[0]] = ele.split('=')[1]
            }
        })
        return obj
    }
    return {}
}

function getBrowserType() {
    const userAgent = navigator.userAgent
    const isOpera = userAgent.indexOf('Opera') > -1 //判断是否Opera浏览器
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera //判断是否IE浏览器
    const isEdge = userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !isIE; //判断是否IE的Edge浏览器
    const isFF = userAgent.indexOf('Firefox') > -1 //判断是否Firefox浏览器
    const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1 //判断是否Safari浏览器
    const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 //判断Chrome浏览器
    let browser_type = 'other'

    if (isIE) {
        if (userAgent.indexOf('QQBrowser') > -1) {
            browser_type = 'qq-compatible'
        } else if (userAgent.indexOf('MetaSr') > -1) {
            browser_type = 'sougou-compatible'
        } else {
            var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
            reIE.test(userAgent)
            var fIEVersion = parseFloat(RegExp['$1'])
            if (fIEVersion == 8) {
                browser_type = 'IE8'
            } else if (fIEVersion == 9) {
                browser_type = 'IE9'
            } else if (fIEVersion == 10) {
                browser_type = 'IE10'
            } else if (fIEVersion == 11) {
                browser_type = 'IE11'
            } else {
                browser_type = 'other'
            } //IE版本过低
        }
    } else if (isEdge) {
        browser_type = 'IEedge'
    } else if (isFF) {
        browser_type = 'firefox'
    } else if (isChrome) {
        if (userAgent.indexOf('QQBrowser') > -1) {
            browser_type = 'qq-speed'
        } else if (userAgent.indexOf('MetaSr') > -1) {
            browser_type = 'sougou-speed'
        } else {
            browser_type = 'chrome'
        }
    } else {
        browser_type = 'other'
    }

    return browser_type
}

function getRpage(pageData) {
    let rpage = 'home'
    if (pageData.rpage) {
        rpage = pageData.rpage
    }
    return rpage
}

function detectIE() {
    var ua = window.navigator.userAgent

    var msie = ua.indexOf('MSIE ')
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }

    var trident = ua.indexOf('Trident/')
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:')
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
    }

    var edge = ua.indexOf('Edge/')
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }

    // other browser
    return false
}

function getRn() {
    return new Date().getTime()
}
function getSectionId() {
    let sectionId = new Date().getTime() + Math.random()
    return sectionId
}

function initCommonData(pageData) {
    let data = {}
    if(Env.os == 'ios')
    {
        pageData.terminal ='1'
    }
    else if(Env.os == 'android')
    {
        pageData.terminal ='2'
    }
    else
    {
        pageData.terminal ='3'
    }

    if(pageData.isWebsite)
    {
        data = {
            terminal: pageData.terminal,
            category: 'Website',
            html_id:pageData.html_id,
            html_name:pageData.html_name,
            yx_ip: pageData.IP
        }
    }
    else
    {
        data = {
            terminal: pageData.terminal,
            category: 'Activity',
            activity_id:pageData.activity_id,
            activity_name:pageData.activity_name,
            yx_ip: pageData.IP
        }
    }
    data.browser_type = getBrowserType();
    if (getUrlParam('QYID')) {
        data.qiyi_id = getUrlParam('QYID')
    }
    else if(getUrlParam('deviceid'))
    {
        data.qiyi_id = getUrlParam('deviceid')
    }
    else
    {
        data.qiyi_id = getCookieByName('QC005')
    }
    if (pageData.content_id) {
        data.content_id = pageData.content_id
    }
    if (pageData.channel) {
        data.channel = pageData.channel
    }
    if (pageData.entry_source) {
        data.entry_source = pageData.entry_source
    }
    if (pageData.uid) {
        data.uid = pageData.uid
    }

    return data
}

function initLoadData(pageData) {
    let data = {
        rpage: getRpage(pageData),
    }

    data.action = 'stay'
    data.type = '1'
    data.section_id = getSectionId();

    return data
}

function initStayData(pageData) {
    let data = {
        rpage: getRpage(pageData),
    }

    data.action = 'stay'
    data.type = '2'

    data.section_id = getSectionId();
    return data
}
function initPopupData(pageData) {
    let data = {
        rpage: getRpage(pageData),
    }

    data.action = 'show'
    data.type = '1'

    data.section_id = getSectionId();
    return data
}
function initRequestData(pageData) {
    let data = {
        rpage: getRpage(pageData),
    }

    data.action = 'request'
    data.section_id = getSectionId();
    return data
}

function initClickData(pageData) {
    let data = {
        rpage: getRpage(pageData),
    }
    data.action = 'click'
    data.type = '1'
    if (pageData.block) {
        data.block = pageData.block
    }
    if (pageData.num) {
        data.num = pageData.num
    }
    return data
}
class T {
    static init(pageData) {
        this.commonData = this.initCommonData(pageData);
        this.clickData = this.initClickData(pageData);
        this.loadData = this.initLoadData(pageData);
        this.stayData = this.initStayData(pageData);
        this.popupData = this.initPopupData(pageData);
        this.requestData = this.initRequestData(pageData);
        this.host = 'https://msg.iqiyi.com/v5/yx/yxpage?';
        this.heartbeat();
    }

    static initCommonData(pageData) {
        return initCommonData(pageData)
    }

    static initClickData(pageData) {
        return initClickData(pageData)
    }

    static initLoadData(pageData) {
        return initLoadData(pageData)
    }
    static initStayData(pageData) {
        return initStayData(pageData)
    }
    static initPopupData(pageData){
        return initPopupData(pageData)
    }
    static initRequestData(pageData){
        return initRequestData(pageData)
    }
    static click(res) {
        const data = {
            action: 'click',
            ...this.commonData,
            ...this.clickData,
            ...res,
            rn: getRn(),
        }

        new Image(0, 0).src = this.host + json2Form(data)
    }

    static visit(res) {
        const data = {
            ...this.commonData,
            ...this.loadData,
            ...this.initStayData,
            ...res,
            rn: getRn(),
        }

        new Image(0, 0).src = this.host + json2Form(data)
    }
    static stay(res) {
        const data = {
            ...this.commonData,
            ...this.stayData,
            ...res,
            rn: getRn(),
        }

        new Image(0, 0).src = this.host + json2Form(data)
    }
    static getGift(res) {
        const data = {
            ...res,
            rn: getRn(),
        }

        new Image(0, 0).src = this.host + json2Form(data)
    }

    static acquireTask(res) {
        const data = {
            ...res,
            rn: getRn(),
        }

        new Image(0, 0).src = this.host + json2Form(data)
    }
    static popupTrack(res) {
        const data = {
            ...this.commonData,
            ...this.popupData,
            ...res,
            rn: getRn(),
        }

        new Image(0, 0).src = this.host + json2Form(data)
    }
    static requestTrack(res) {
        const data = {
            ...this.commonData,
            ...this.requestData,
            ...res,
            rn: getRn(),
        }

        new Image(0, 0).src = this.host + json2Form(data)
    }
    static heartbeat() {
        let self = this;
        let heartData = {
            ...this.commonData,
            ...this.stayData,
            rn: getRn(),
        }
        setTimeout(function () {
            self.stayData.stay_time = 1*1000
            new Image(0, 0).src = 'https://msg.iqiyi.com/v5/yx/yxpage?' + json2Form(heartData)
            setTimeout(function () {
                self.stayData.stay_time = 5*1000
                new Image(0, 0).src = 'https://msg.iqiyi.com/v5/yx/yxpage?' + json2Form(heartData)
                setInterval(function () {
                    self.stayData.stay_time = 10*1000
                    new Image(0, 0).src = 'https://msg.iqiyi.com/v5/yx/yxpage?' + json2Form( heartData)
                },10*1000)
            },5000)
        },1000);
    }
}

export default T