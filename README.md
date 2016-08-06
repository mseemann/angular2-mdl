
Angular 2 components, directives and styles based on material design lite https://getmdl.io (v: 1.1.3).

This package assumes that you are building an Angular2 app with TypeScript. Angular CLI makes it even easier but isn't required.

[Demo-App with all supported components and documentation](http://mseemann.github.io/angular2-mdl/)

[![Build Status](https://travis-ci.org/mseemann/angular2-mdl.svg?branch=master)](https://travis-ci.org/mseemann/angular2-mdl)
[![npm version](https://badge.fury.io/js/angular2-mdl.svg)](http://badge.fury.io/js/angular2-mdl)
[![Coverage Status](https://coveralls.io/repos/github/mseemann/angular2-mdl/badge.svg?branch=master)](https://coveralls.io/github/mseemann/angular2-mdl?branch=master)
[![Dependencies](https://david-dm.org/mseemann/angular2-mdl.svg)](https://david-dm.org/mseemann/angular2-mdl)
[![DevDependencies](https://david-dm.org/mseemann/angular2-mdl/dev-status.svg)](https://david-dm.org/mseemann/angular2-mdl#info=devDependencies&view=table)

[![Build Status](https://saucelabs.com/browser-matrix/angular2-mdl.svg)](https://saucelabs.com/u/angular2-mdl)


CAVEAT: This package uses the angular forms API from @angular/common. In the next releases it will change to @angular/forms! (see: https://docs.google.com/document/u/1/d/1RIezQqE4aEhBRmArIAS1mRIZtWFf6JxN_7B4meyWK0Y/pub)


### Status of the npm package version 1.1

- Badges
- Buttons 
- Cards
- Icons
- Loading
- Shadow
- Toggle (Checkbox, Radio, Icon Toggle, Switch)
- Lists
- Slider
- Snackbar
- Table
- Tooltips
- Menu
- Layout (standard, scroll, waterfall, tabs)
- Tabs
- Textfields (multiline, expandable)



### Installation

```bash
npm install angular2-mdl --save
```

### How to use the mdl components

You need to extend the `angular-cli-build.js` file to include `angular2-mdl` as a vendor package: 

```JavaScript
return new Angular2App(defaults, {

    vendorNpmFiles: [
      ...
      'angular2-mdl/**/*'
    ]
  });
```

Next you need to configure your `system-config.js` file:

```JavaScript
const map: any = {
  'angular2-mdl': 'vendor/angular2-mdl'
};

/** User packages configuration. */
const packages: any = {
  'angular2-mdl': { main: 'dist/components/index.js'}
};
```

After that you may use the angular2-mdl directives in your components:
```JavaScript
import { MDL_DIRECTIVES } from 'angular2-mdl';

@Component{
   ...
   directives: [ MDL_DIRECTIVES ]
}
```

### css from material-design-lite
You may include the material-deisgn-lite css in your html and you're done!
```HTML
<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.indigo-pink.min.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
Under https://getmdl.io/customize/index.html you'll find a customizing tool to change the theme colors.

### How to use the scss files from material-design-lite
But there is also another way. This package includes the scss files from material-design-lite. 
With these files you are able to change the colors and other variables in your own scss files:

First of all you need to install node-sass for your project:

```bash
npm install node-sass --save-dev
```

After that you need to configure the sass compiler to use the sass files from the angular2-mdl package. 
For that the file `angular-cli-build.js` needs to be extended:

```JavaScript
return new Angular2App(defaults, {

    sassCompiler: {
      includePaths: [
        `${__dirname}/node_modules/angular2-mdl/src/scss-mdl`
      ]
    },
    vendorNpmFiles: [
      ...
    ]
  });
```

Now you can use the sass sources form angular-material-lite and change the used colors in your app:

```scss
@import "color-definitions";

$color-primary: $palette-blue-500;
$color-primary-dark: $palette-blue-700;
$color-accent: $palette-amber-A200;
$color-primary-contrast: $color-dark-contrast;
$color-accent-contrast: $color-dark-contrast;

@import 'material-design-lite';
```




.
