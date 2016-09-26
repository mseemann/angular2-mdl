
Angular 2 components, directives and styles based on material design lite https://getmdl.io (v: 1.2.1).

This package assumes that you are building an Angular2 app with TypeScript. Angular CLI makes it even easier but isn't required.

[Demo-App with all supported components and documentation](http://mseemann.io/angular2-mdl/)

[![Build Status](https://travis-ci.org/mseemann/angular2-mdl.svg?branch=master)](https://travis-ci.org/mseemann/angular2-mdl)
[![CircleCI](https://circleci.com/gh/mseemann/angular2-mdl/tree/master.svg?style=shield)](https://circleci.com/gh/mseemann/angular2-mdl/tree/master)
[![npm version](https://badge.fury.io/js/angular2-mdl.svg)](http://badge.fury.io/js/angular2-mdl)
[![Downloads](http://img.shields.io/npm/dm/angular2-mdl.svg)](https://npmjs.org/package/angular2-mdl)
[![Coverage Status](https://coveralls.io/repos/github/mseemann/angular2-mdl/badge.svg?branch=master)](https://coveralls.io/github/mseemann/angular2-mdl?branch=master)
[![Dependencies](https://david-dm.org/mseemann/angular2-mdl.svg)](https://david-dm.org/mseemann/angular2-mdl)
[![peerDependencies Status](https://david-dm.org/mseemann/angular2-mdl/peer-status.svg)](https://david-dm.org/mseemann/angular2-mdl?type=peer)
[![DevDependencies](https://david-dm.org/mseemann/angular2-mdl/dev-status.svg)](https://david-dm.org/mseemann/angular2-mdl#info=devDependencies&view=table)
[![Code Climate](https://codeclimate.com/github/mseemann/angular2-mdl/badges/gpa.svg)](https://codeclimate.com/github/mseemann/angular2-mdl)

[![Build Status](https://saucelabs.com/browser-matrix/angular2-mdl.svg)](https://saucelabs.com/u/angular2-mdl)

Do not take a red flag to serious. Most of the time this is a sauce lab issue and not a problem with this package. :-(

**Please don't use github to ask questions. Use stackoverflow instead: http://stackoverflow.com/questions/tagged/angular2-mdl.**

**Here is a plnkr if you'd like to play around http://plnkr.co/edit/I3dLfLUDIH2xlEJqj0da?p=preview.**


### Status of the npm package version 1.8 (mdl version 1.2.1; angular 2.0 final)

- Badges
- Buttons 
- Cards
- Chips
- Dialogs
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

This package no longer supports the deprecated forms APIs. You have to use the FormsModule in you app module. For example:

```JavaScript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MdlModule
  ],
  declarations: [
    Angular2MdlAppComponent
  ],
  entryComponents: [Angular2MdlAppComponent],
  bootstrap: [],
})
export class Angular2MdlAppModule {
  constructor(private appRef: ApplicationRef) { }

  public ngDoBootstrap() {
    this.appRef.bootstrap(Angular2MdlAppComponent);
  }
}
```

There are still a lot of bugs in angular2 rc5. For example: https://github.com/angular/angular/issues/10618. 
This means that prod builds are broken. You need to disable some minification options. See the comments in the mentioned ticket.

### Installation

```bash
npm install angular2-mdl --save
```

Please make sure you have installed typings before installation.
```bash
npm install typings -g
```
(This requirement will be removed in a future release)

### How to use the mdl components with the angular cli webpack version

Just use it. Add the MdlModule to your NgModule imports and you are done!

### How to use the mdl components with the angular cli system js version

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

After that you may use the angular2-mdl module in your app module:
```JavaScript
import { MdlModule } from 'angular2-mdl';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MdlModule
  ],
  ...
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


[comment]: <> (in angular-cli/lib/broccoli/angular-broccoli-bundle.js set { minify: true, mangle: false })
