angular.module('kipling.services', [])

.constant('FEED_URLS', {
    root: 'http://imaginista.mx/blog',
    rss2json: 'http://rss2json.com/api.json?rss_url=',
    top_ten: 'feed/?time=dia'
})

.factory('blogService', function($http, FEED_URLS) {
    var feedHelper = function(path) {
        return FEED_URLS.rss2json + FEED_URLS.root + '/' + path;
    };

    return {
        getTopTen: function() {
            return $http.get(feedHelper(FEED_URLS.top_ten)).then(
                function(
                    response) {
                    var items = [];

                    if (response.status == 200 && response.data) {
                        items = response.data.items;
                    }

                    //habra alguna forma de parsear las fechas desde el template?
                    angular.forEach(items, function(value, key) {
                        items[key].pubDate = new Date(
                            items[key].pubDate);
                    });

                    return items;
                });
        }
    }
})
