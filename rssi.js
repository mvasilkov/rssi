/* Ruby-like simple string interpolation for Node.js
 * Copyright (c) 2013 Mark Vasilkov (https://github.com/mvasilkov)
 * License: MIT */
(function(window) {
    "use strict";
    var re = new RegExp('#\{(.*?)\}', 'g');

    function rewrite(source, prop) {
        return '"+(obj&&obj["' + prop + '"]||"' + source + '")+"';
    }

    function fmt(input) {
        input = input && input + '' || '';
        /* jshint evil: true */
        return new Function('obj', 'return "' + input.replace(re, rewrite) + '"');
    }

    if (window.module && window.module.exports) window.module.exports = fmt;
    else if (typeof window.define === 'function' && window.define.amd) window.define(function() { return fmt; });
    else window.fmt = fmt;
    
})(window);
