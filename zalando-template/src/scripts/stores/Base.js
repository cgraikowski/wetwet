var getJSON = require('../util/request-json');
var EventEmitter = require('events').EventEmitter;

/**
 *
 * @param requestParams parameters used for initial request to API
 * @param props allows to override fields of Store without subclassing
 * @constructor
 */
function BaseStore(requestParams, props) {
    Object.assign(this, props);
    this.update(requestParams);
}

BaseStore.prototype = Object.create(EventEmitter.prototype);

Object.assign(BaseStore.prototype, {
    /**
     * Internal storage for the data fetched from the server
     * @private
     */
    data: false,
    /**
     * Current Status of the store. Possible values are
     *    'loading', 'available', 'error'
     * @var {String}
     */
    status: 'loading',
    /**
     *
     * @var {String}
     */
    resourceName: '',
    /**
     * Provides a way for subclasses to have default params.
     * Useful for pagination or prefiltering.
     * @returns {Object}
     */
    getDefaultParams: function () {
        return {};
    },
    /**
     * Updates store with results of an API call with provided params.
     * @param params
     */
    update: function (params) {
        params = Object.assign(this.getDefaultParams(), params);

        var query = Object.keys(params).map(function (key) {
            return key + '=' + params[key];
        }).join('&');

        this.status = 'loading';
        this.emit('change');

        getJSON(this.resourceName + (query ? ('?' + query) : '')).then(
            this.handleLoad.bind(this),
            this.handleError.bind(this)
        );
    },
    /**
     * Provides ability to preprocess data after receving it from the server
     * and before exposing it to the client view
     * @param data
     * @returns {*}
     */
    processResponse: function (data) {
        return data;
    },
    /**
     * Default load handler. Generally you don't need to override that.
     * @param data
     */
    handleLoad: function (data) {
        this.status = 'available';
        this.data = this.processResponse(data);
        this.emit('change');
    },
    /**
     * Default load handler. Generally you don't need to override that.
     * If you want to respond to errors it's better to check status.
     */
    handleError: function () {
        this.status = 'error';
        this.data = false;
        this.emit('change');
    },
    /**
     * Gets the state of the store. Used as a part of the state of a View
     * representing this store
     * @returns {{status: String, data: *}}
     */
    getState: function () {
        return {
            status: this.status,
            data: this.data
        }
    }
});

module.exports = BaseStore;

