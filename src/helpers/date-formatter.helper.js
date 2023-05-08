import moment from 'moment'

/**
 *
 * @param {String} date
 * @param {String} format
 */

export default (date, format = 'DD.MM.YYYY') => {
    return moment(new Date(date)).format(format)
}
