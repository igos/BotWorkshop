var noodle = require('noodlejs');

var query = {
        url: 'http://google.com/search?q=javascript',
        type: 'html',
        selector: 'h3.r a',
        extract: 'text'
    },
    uriQuery = encodeURIComponent(JSON.stringify(query)),
    request  = 'http://example.noodlejs.com/?q=' +
        uriQuery + '&callback=?';

noodle.query(query).then(function (results) {
    console.log(JSON.stringify(results));
})