/**
 * An example file for storing your URLs
 */
define(function() {
    return (function() {
        var root = {
            // Highly recommend using a dev-server URL (if you're gonna have admin-level user logins)
            template: 'https://dev-server.your-site.com/'
        };
        return {
            TEMPLATE: {
                HOME: root.template,
                LOGIN: root.template + 'login',
                LOGOUT: root.template + 'logout'
            }
        }
    })();
});
