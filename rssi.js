/* Ruby-like simple string interpolation for Node.js
 * Copyright (c) 2013 Mark Vasilkov (https://github.com/mvasilkov)
 * License: MIT */
(function () {
    var cache = {}

    var defaults = {
        noCache: false
    }

    function copy(src, dst) {
        for (var key in src) if (Object.prototype.hasOwnProperty.call(src, key))
            dst[key] = src[key]
    }

    function extend(target, src, otherOne) {
        copy(src, target)
        if (otherOne) copy(otherOne, target)
        return target
    }

    function rewrite(foo, bar) {
        return '"+(typeof obj["' + bar + '"]!="undefined"?obj["' + bar + '"]:"' + foo + '")+"'
    }

    function fmt(input, options) {
        options = extend({}, defaults, options)

        if (options.noCache === false && input in cache) return cache[input]

        var out = JSON.stringify(input).replace(/#\{(.*?)\}/g, rewrite)
        /* jshint evil: true */
        var template = Function('obj', 'return ' + out)
        /* jshint boss: true */
        return options.noCache ? template : (cache[input] = template)
    }

    if (typeof module != 'undefined' && module.exports) module.exports = fmt
    else if (typeof define == 'function' && define.amd) define(function () { return fmt })
    else if (typeof window != 'undefined') window.fmt = fmt
}())
