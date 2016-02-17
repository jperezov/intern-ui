# intern-ui (WIP)

## Installation:

Go to a comfy directory. Run `npm install intern-ui`, then `npm run-script installation`.

UI is accessible at `localhost:9090`

## Reserved Words / Filenames

Do not add `~@~` to your filenames (i.e. `/tests/unit/your_project/someFileName~@~whichIsInvalid` will error out).

The `mock` name is reserved for custom helpers within your `/tests/unit/your_project`
and `/tests/functional/your_project` folders. Any files within this folder **will not be tested**.
This is intentional, as it allows you to have `/tests/unit/your_project/mock/someHelperFile.js` without
it muddling your tests.

For those that don't know, WIP == work in progress.
