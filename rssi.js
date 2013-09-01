/* Ruby-like simple string interpolation for Node.js
 * Copyright (c) 2013 Mark Vasilkov (https://github.com/mvasilkov)
 * License: MIT */
(function() {
    "use strict";
    var re = new RegExp('#{(.*?)}', 'g');

    function rewrite(source, prop) {
        return '"+(obj.hasOwnProperty("' + prop + '")&&obj["' + prop + '"]||"' + source + '")+"';
    }

    function fmt(input) {
        input = JSON.stringify(typeof input === 'string' ? input : '');
        /* jshint evil: true */
        return new Function('obj', 'return obj && obj.hasOwnProperty ? ' + input.replace(re, rewrite) + ' : ' + input);
    }

    if (typeof module !== 'undefined' && module.exports) module.exports = fmt;
    else if (typeof define === 'function' && define.amd) define(function () { return fmt });
    else if (typeof window !== 'undefined') window.fmt = fmt;

}());