import axios from 'axios'

class Http {
    fetch() {
        const instance = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            params: {
                appid: process.env.VUE_APP_SECRET_KEY,
            },
        })

        return instance
    }

    /**
     * @param {String} url
     * @param {Object} queries
     * @param {FetchOptions} options
     * @returns {Promise}
     * */
    async get(url, queries, options) {
        const params = {
            params: prepareParams(queries),
        }

        return this.fetch().get(url, params, options)
    }
}

function prepareParams(params) {
    const obj = {}
    if (
        typeof params === 'object' &&
        !Array.isArray(params) &&
        params !== null
    ) {
        for (const propName in params) {
            // eslint-disable-next-line
            if (params.hasOwnProperty(propName)) {
                if (
                    typeof params[propName] === 'string' &&
                    params[propName].length === 0
                ) {
                    continue
                }
                obj[propName] = params[propName]
            }
        }
        return obj
    } else {
        return params
    }
}

export default new Http()
