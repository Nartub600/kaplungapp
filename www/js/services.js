angular.module('kipling.services', [])

.constant('FEED_URLS', {
    root: 'http://imaginista.mx/blog', //dev
    root_proxy: 'http://localhost:8100/blog',
    rss2json: 'http://rss2json.com/api.json?rss_url=',
    top_ten: 'feed/?time=dia'
})

.factory('blogService', function($http, FEED_URLS, $filter) {
    var feedHelper = function(path) {
        return FEED_URLS.rss2json + FEED_URLS.root + '/' + path;
    };

    var postHelper = function(link) {
        return link.replace(FEED_URLS.root, FEED_URLS.root_proxy) + 'feed/';
    };

    var feed = [];
    var index;
    var post;

    var _getPost = function(i) {
        if (isNaN(i)) {
            return post;
        } else {
            index = i;
            console.log('current index', index);
            return $http.get(postHelper(feed[index].link)).then(
                function(response) {
                    if (response.status == 200 && response.data) {
                        var xml = $filter('text2xml')(response.data);
                        var rss = $filter('xml2js')(xml).rss;
                        post = {
                            title: rss.channel.title.value,
                            author: 'Unknonwn',
                            description: rss.channel.description.value
                        };
                    }
                    return post;
                });
        }
    };

    return {
        getTopTenFeed: function() {
            return $http.get(feedHelper(FEED_URLS.top_ten)).then(
                function(response) {
                    if (response.status == 200 && response.data) {
                        feed = response.data.items;
                        //habra alguna forma de parsear las fechas desde el template?
                        angular.forEach(feed, function(value, key) {
                            feed[key].pubDate = new Date(feed[key].pubDate);
                        });
                    }

                    return feed;
                });
        },
        getPost: _getPost,
        hasNext: function() {
            return feed[index + 1] ? true : false;
        },
        hasPrevious: function() {
            return feed[index - 1] ? true : false;
        },
        loadNext: function() {
            _getPost(index + 1);
        },
        loadPrevious: function() {
            _getPost(index - 1);
        }
    }
})
