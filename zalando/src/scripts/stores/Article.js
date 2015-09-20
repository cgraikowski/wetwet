var BaseStore = require('./Base');

function ArticleStore(options) {
    BaseStore.call(this, options);
}

ArticleStore.prototype = Object.create(BaseStore.prototype);

Object.assign(ArticleStore.prototype, {
    resourceName: 'articles',
    processResponse: function (data) {
        // for this demo we don't care about pagination info
        // coming back from API, but you could save / process it here
        return data.content;
    },
    getDefaultParams: function () {
        return {
            page: 1,
            // We have 1- 2- and 3-column layouts in this demo
            // need a number divisible by all here, instead of default 20
            pageSize: 24
        };
    }
});

module.exports = ArticleStore;

