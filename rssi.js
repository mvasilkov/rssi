(function () {

  if(typeof define === 'undefined') {
    /**
     * Simulates asynchronous module definition.
     * @param {mixed} d Module definition. Can be a function or an object.
     */
    function define(d) {
      if (typeof module !== 'undefined' && module.exports)
        module.exports = (typeof d === 'function') ? d() : d
    }
  }

  define(function() {
    /** @module rssi */

    function rewrite(foo, bar) {
      return '"+(typeof obj["' + bar + '"]!="undefined"?obj["' + bar + '"]:"' + foo + '")+"'
    }

    var exports = function(input) {
      var out = JSON.stringify(input).replace(/#\{(.*?)\}/g, rewrite)
      /* jshint evil: true */
      return Function('obj', 'return ' + out)
    }

    return exports
  })

}())
