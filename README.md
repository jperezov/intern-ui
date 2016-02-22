# intern-ui
[![Build Status](https://travis-ci.org/jperezov/intern-ui.svg?branch=master)](https://travis-ci.org/jperezov/intern-ui) [![npm version](https://img.shields.io/npm/v/intern-ui.svg?style=flat-square)](https://www.npmjs.com/package/intern-ui) [![npm downloads](https://img.shields.io/npm/dm/intern-ui.svg?style=flat-square)](https://www.npmjs.com/package/intern-ui)

Project is now usable! Make sure to _not_ download any version before 0.1.1.

## Installation:

In your project directory, run `npm install intern-ui`.

Before you run the next script, a warning: **this will overwrite your `/tests` folder**. It is recommended to
temporarily rename the folder (assuming you already have a `/tests` folder) and reorganize everything after.
Now, if that's fine, run `node node_modules/intern-ui/installation.js`.

In your package.json, make sure you have the following:

    "scripts": {
        "intern-ui": "node node_modules/intern-ui/server.js"
    }

Now you can run `npm run-script intern-ui`. UI is accessible at `localhost:9090/node_modules/intern-ui/`.

If you don't want to add the script to your package.json, feel free to start the server with
just `node node_modules/intern-ui/server.js`.

## Reserved Words / Filenames

Do not add `~@~` to your filenames (i.e. `/tests/unit/your_project/someFileName~@~whichIsInvalid` will error out).

The `mock` name is reserved for custom helpers within your `/tests/unit/your_project`
and `/tests/functional/your_project` folders. Any files within this folder **will not be tested**.
This is intentional, as it allows you to have `/tests/unit/your_project/mock/someHelperFile.js` without
it muddling your tests.
