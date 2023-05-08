import client from '../../core/http/http.client'

/**
 * @param {Object} queries
 * @param {String} queries.q //city name
 * @param {String} queries.units
 * @param {String} queries.lang
 * @returns {Promise}
 * */
const getWeather = async (queries) => {
    const response = await client.get('/data/2.5/weather', queries)

    return response
}

const getWeatherForFiveDays = async (queries) => {
    const response = await client.get('/data/2.5/forecast', queries)

    return response
}

/**
 * @param {Object} queries
 * @param {String} queries.q //city name
 * @param {Number} queries.limit //city name
 * @returns {Promise}
 * */
const getCities = async (queries) => {
    const response = await client.get('/geo/1.0/direct', queries)

    return response
}

export default {
    getWeather,
    getCities,
    getWeatherForFiveDays,
}
