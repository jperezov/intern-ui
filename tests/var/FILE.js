/**
 * These are absolute file paths. Make sure the files are actually located here.
 * Relative file paths do not work.
 */
define([
    'intern/dojo/text!../../config.json' // <-- this will throw an error if you don't create this file
], function(config) {
    config = JSON.parse(config) || { projectPath: '/full/path/to/intern-ui' };
    //noinspection JSUnresolvedVariable
    var root = config.projectPath + '/tests/file/';
    return {
        UPLOAD: {
            VIDEO: root + 'upload/cat.mp4',
            MEDIA: root + 'upload/cat.jpg'
        }
    };
});
