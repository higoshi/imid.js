var setImid = (function () {
    'use strict';

    function imid (domain, path) {
        var cookie = " " + document.cookie;
        var imidExp = /\simid=([A-Za-z0-9\-_]{22})/;
        var imidCreatedExp = /\simid_created=(\d+)/;
        var imidMatched = cookie.match(imidExp);
        var imidCreatedMatch = cookie.match(imidCreatedExp);
        var imid;
        var imidCreated;
        var expire = 63072000000;
        if (imidMatched) {
            imid = imidMatched[1];
            if (imid === 'THISISOPTEDOUTCOOKIEID') {
                expire = 315360000000;
            }
        }
        else {
            var keywords_1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('');
            do {
                imid = '';
                if ('crypto' in window && 'Uint8Array' in window) {
                    var array = new Uint8Array(22);
                    crypto.getRandomValues(array);
                    array.forEach(function (value) {
                        imid += keywords_1[value & 63];
                    });
                }
                else {
                    for (var i = 22; i > 0; i--)
                        imid += keywords_1[keywords_1.length * Math.random() << 0];
                }
            } while (imid.charAt(0) === '-');
        }
        if (imidCreatedMatch) {
            imidCreated = imidCreatedMatch[1];
        }
        else {
            imidCreated = (new Date().getTime() / 1000 << 0) + '';
        }
        var sufix = "expires=" + new Date(new Date().getTime() + expire).toUTCString() + ";" + (domain ? " domain=" + domain + ";" : '') + (path ? " path=" + path + ";" : '');
        document.cookie = "imid=" + imid + "; " + sufix;
        document.cookie = "imid_created=" + imidCreated + "; " + sufix;
    }

    return imid;

}());
