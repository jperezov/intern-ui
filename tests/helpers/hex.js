define(function() {
    return {
        /**
         * Encode a string to escaped unicode (hex)
         * Can convert back using <code>eval('"' + result + '"')</code> (strings only)
         * if you don't want to use the decode function.
         * @param str
         * @returns {string}
         */
        encode: function (str) {
            var hex, i;
            var result = "";
            for (i=0; i < str.length; i++) {
                hex = str.charCodeAt(i).toString(16);
                result += "\\u" + ("000"+hex).slice(-4);
            }
            return result;
        },
        /**
         * Decode an escaped unicode string
         * @param str
         * @returns {string}
         */
        decode: function(str) {
            var j;
            var hexes = str.match(/.{1,4}/g) || [];
            var back = "";
            for(j = 0; j < hexes.length; j++) {
                back += String.fromCharCode(parseInt(hexes[j], 16));
            }
            return back;
        }
    }
});
