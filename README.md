# intern-ui 0.0.6 (WIP)

## Installation:

Go to a comfy directory. Run `npm install intern-ui`.

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

## File Structure

Version 0.10.0 will restructure this project to allow for testing within your project directory.

For now though, this project is currently intended to exist _outside_ of your project directory, as a stand-alone project.
In order to test your project files, add symlinks to the `/projects` folder.


### Windows:

    mklink /j "path\to\symlink" path\to\original
    
For example, if your project is located on `c:\nodejs\www\yourProject`, put intern-ui in `c:\nodejs\www\intern-ui` and run:

    `mklink /j "c:\nodejs\www\intern-ui\projects\yourProject" c:\nodejs\www\yourProject
    
### Mac / Linux:

    ln -s /path/to/original /path/to/symlink
    
For example, if your project is located on `/etc/nodejs/www/yourProject`, put intern-ui in `/etc/nodejs/www/intern-ui` and run:

    ln -s /etc/nodejs/www/yourProject /etc/nodejs/www/intern-ui/projects/yourProject


## Reserved Words / Filenames

Do not add `~@~` to your filenames (i.e. `/tests/unit/your_project/someFileName~@~whichIsInvalid` will error out).

The `mock` name is reserved for custom helpers within your `/tests/unit/your_project`
and `/tests/functional/your_project` folders. Any files within this folder **will not be tested**.
This is intentional, as it allows you to have `/tests/unit/your_project/mock/someHelperFile.js` without
it muddling your tests.
