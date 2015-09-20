var BASE_API_URL = 'https://api.zalando.com/';

/**
 * Simple wrapper around XMLHttpRequest that returns a ES6 Promise
 */
module.exports =  function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', BASE_API_URL + url, true);

        // Accept language is used on API side to give zalando articles from matching country.
        // This header is by default taken from browser settings, but since this demo is only
        // available in english, we forcibly set the header to get UK store articles.
        xhr.setRequestHeader('Accept-Language', 'en-UK');
        xhr.setRequestHeader('Accept', 'application/json, */*');

        xhr.onload = function() {
            var status = xhr.status,
                response;
            try {
                response = JSON.parse(xhr.responseText);
            } catch (e) {
                response = {
                    status: 500,
                    message: "Unknown server error"
                };
            }
            if (((status / 100) | 0) == 2) {
                resolve(response);
            } else {
                reject(response);
            }
        };
        xhr.send(null);
    });
};
