import { location, isArray, json2Form } from './utils'

export function ajax(url = '', payload = {}, trackData = {}, method = 'POST') {
    let init = {}

    if (method === 'GET' || method === 'get') {
        if (json2Form(payload)) {
            url = url + '?' + json2Form(payload)
        }

        init = {
            method: 'GET',
            credentials: 'include',
        }
    } else if (method === 'POST' || method === 'post') {
        init = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: json2Form(payload)
        }
    } else {
        return
    }

    url = `${location()}/webapp/_api/` + url

    return fetch(url, init).then(res => res.json()).then((response) => {
        return new Promise((resolve, reject) => {
            if (isArray(response)) {
                resolve(response)
            } else {
                if (response.code === 'A00000' || response.code === 200 || response.status === 0) {
                    if (trackData.type) {
                        window.track[trackData.type]({ success: true, ...response })
                    }

                    resolve(response)
                } else {
                    if (trackData.type) {
                        window.track[trackData.type]({ success: false, ...response })
                    }

                    reject(response)
                }
            }
        })
    })
}