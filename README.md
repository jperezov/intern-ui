# intern-ui
[![Build Status](https://travis-ci.org/jperezov/intern-ui.svg?branch=master)](https://travis-ci.org/jperezov/intern-ui) [![npm version](https://img.shields.io/npm/v/intern-ui.svg?style=flat-square)](https://www.npmjs.com/package/intern-ui) [![npm downloads](https://img.shields.io/npm/dm/intern-ui.svg?style=flat-square)](https://www.npmjs.com/package/intern-ui)

WIP. Project is usable, but make sure to always update to the latest version.

## Warnings:

Installing this package **will overwrite your `/tests` folder**.
Make sure to temporarily rename your `/tests` folder to ensure no files are lost.

## Installation:

In your project directory, run `npm install intern-ui`.

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

## Creating Tests

### File Structure

In order to be picked up by the UI, the following file structure must be adhered to:

    /tests
        /functional
            /yourProjectName
                all.js
                yourTest.js
        /unit
            /yourProjectName
                /mock
                    yourLocalHelpers.js
                /yourModuleGroup
                    all.js
                    yourTest.js
                all.js

Where `yourProjectName` may be a single library, or a full-blown
website with multiple scripts. `yourModuleGroup` is an organizational
sub-folder, such as "controllers", "models", etc.

The other folders within `/test` are mere recommendations, not requirements.

Within `/yourProjectName`, all javascript files _not_ in the `/mock` folder
will be included as a test. `all.js` is required to be able to run all tests
within the folder. These tests must be manually added into the dependency array.
Future versions of intern-ui will automate this process.

`all.js` follows the following structure:

    if (typeof define === 'function') {
        define([
            './yourTest',
            './yourModuleGroup/all'
        ], function() {});
    } else {
        module.exports = function() {};
    }

It's simply a RequireJS Asynchronous Module Definition (AMD). The CommonJS
export is used for the UI, and _is_ required. You must manually add your
tests within the dependency array passed through to the `define` function.

### Unit Tests

Within your `/tests/unit` folder, make a copy of the `/tests/unit/template` folder and rename
the folder to your project's name. Rename `template.js` to the module of code you are testing.
Within `all.js`, update the dependency call from `./template` to whatever you renamed the file
to. You may delete the folder `/nested`. Now that you're set up, follow the examples to see
how to write your very own unit tests.

#### Examples

Navigate to `/tests/unit/intern-ui` to see commented examples on how
to create unit tests for angular.js modules.

### Functional Tests

Within your `/tests/functional` folder, copy and rename `/tests/unit/functional` to
your project's name. A login example is included to get you started.

### Config

Within `/tests/intern.js`, edit the `internConfig` object to change the intern's
configuration (e.g. to add your BrowserStack / SauceLabs credentials). To add
global dependencies to your tests, edit the `projects` and `cPackages` objects.

To add browsers to the UI's browser drop-down, edit `/tests/environments.json`.
This file _must_ be updated if using a cloud testing service other than BrowserStack.
An example file for SauceLabs will be included in the future. For now, just follow
the [naming convention for SauceLabs](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/)
and [naming conventions for BrowserStack](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate)
to properly add / edit browsers into `environments.json`.

### Resources

As this project completely relies on [The Intern](https://theintern.github.io), here are
some shortcuts to the documentation there. I plan on adding enough documentation here to make
it a one-stop-shop for learning how to make tests, but these resources will always be useful:

- [Writing unit tests in the Object interface](https://theintern.github.io/intern/#interface-object)
    - Currently, I have only tested the Object interface when writing tests in this project. This will be updated in future versions.
- [Unit tests](https://theintern.github.io/intern/#writing-unit-test)
    - Unit tests are designed to test individual modules / functions within your code base.
- [Functional tests](https://theintern.github.io/intern/#writing-functional-test)
    - Functional tests are designed to automate the manual testing you do now.