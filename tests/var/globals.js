// Try/catch statement here to prevent "process not defined" error.
// It's always defined when run in node though.
try {
    var proc = process;
} catch(e) {
    console.log(e);
}
var globals = {
    process: proc || { env: {} },
    /**
     * Sets a global variable. Should only be set once. Converts all values to strings.
     * @param key
     * @param val
     */
    set: function(key, val) {
        if (key === '_count') {
            console.warn('ERROR: Cannot overwrite process.env._count in test/var/globals.js');
        } else if (this.process.env[key]) {
            console.log('warn: global ' + key + ' being overwritten.');
        }
        return this.process.env[key] = val;
    },
    /**
     * Returns a global variable
     * @param key
     * @returns {*}
     */
    get: function(key) {
        return this.process.env[key];
    }
};
// Export as AMD if available, otherwise export as node module
if (typeof define === "function") {
    define(globals);
} else {
    module.exports = globals;
}
