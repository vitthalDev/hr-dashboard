import axios from "axios"

export function parseEncryptedData(data) {
    let promise
    if (Array.isArray(data)) {
        promise = Promise.all(data.map(_ => {
            return parseEncryptedData(_)
        }))
    } else if (typeof data === 'object') {
        const arr = []
        const parsedObj = {}
        for (let key in data) {
            const a = parseEncryptedData(data[key])
            a.then(_ => {
                if (key.indexOf('_DE') >= 0) {
                    key = key.substring(0, key.indexOf('_DE'))
                }
                parsedObj[key] = _
            })
            arr.push(a)
        }
        promise = Promise.all(arr).then(_ => parsedObj)
    } else if (typeof data === 'boolean' || typeof data === 'number') {
        return Promise.resolve(data)
    } else if (typeof data === 'string') {
        if (data.match(/[\/\+\=]/) || (data.length > 25 && data.indexOf(' ') === -1)) {
            const formData = new FormData()
            formData.append('encryptedvalue', data)
            formData.append('userID', 'Admin')
            formData.append('pwd', 'Z39tmScgxC6u8VjQ1UCgWYbI1vQalFPudIZmwLZtVnw=')
            // console.log('--decrypting ', data) 
            return axios.post(`http://182.156.196.254:7000/getDecrypted`, formData, {
                headers: {
                    'Cache-Control': false,
                    'eO2-Secret-Code': '8djyCodQy23kVBp2nW63hLdZEV4QRb4m9r5eEXZRA6U',
                    Accept: 'application/json'
                }
            }).then(res => {
                // console.log('--decrypting done ', data, res.data.result.decryptionValue) 
                return res.data.result.decryptionValue
            }).catch(err => {
                return data
            })
        } else {
            console.log('as is ', data)
            return Promise.resolve(data)
        }
    }
    return promise
}
export const apiConfig = {
    path: 'http://182.156.196.254:7000',

    get: (path) => {
        console.log('get call', path)
        return axios.get(`http://182.156.196.254:7000${path}`).then(response => {
            return parseEncryptedData(response.data)
        })
    },
    post: (path, form, header, localStorageMap) => {
        console.log('post call', path)
        const formData = new FormData()
        const userData = JSON.parse(localStorage.getItem('userData'))
        formData.append('userID', userData.userID)
        formData.append('corporateID', userData.corporateId)
        formData.append('tokenID', userData.tokenID)
        if (localStorageMap) {
            for (const key in localStorageMap) {
                formData.append(key, userData[localStorageMap[key]])
            }
        }
        for (const key in form) {
            formData.append(key, form[key])
        }
        // form.append('userID', )
        return axios.post(`http://182.156.196.254:7000${path}`, formData, {
            headers: {
                'Cache-Control': false,
                'eO2-Secret-Code': '8djyCodQy23kVBp2nW63hLdZEV4QRb4m9r5eEXZRA6U',
                Accept: 'application/json'
            }
        }).then(response => {
            return parseEncryptedData(response.data.result)
        })
    }
}