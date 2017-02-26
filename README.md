
Angular 4 components, directives and styles based on material design lite https://getmdl.io (v: 1.3.0).

**If you are looking for an Angular 2 compatible version please refer to this branch: https://github.com/mseemann/angular2-mdl/tree/angular2 . 
The master is under active development to be compatible with Angular 4.**


This package assumes that you are building an Angular app with TypeScript. Angular CLI makes it even easier but isn't required.

[Demo-App with all supported components and documentation](http://mseemann.io/angular2-mdl/)

[![Build Status](https://travis-ci.org/mseemann/angular2-mdl.svg?branch=master)](https://travis-ci.org/mseemann/angular2-mdl)
[![CircleCI](https://circleci.com/gh/mseemann/angular2-mdl/tree/master.svg?style=shield)](https://circleci.com/gh/mseemann/angular2-mdl/tree/master)
[![npm version](https://badge.fury.io/js/@angular-mdl%2Fcore.svg)](https://www.npmjs.com/package/@angular-mdl/core)
[![Coverage Status](https://coveralls.io/repos/github/mseemann/angular2-mdl/badge.svg?branch=master)](https://coveralls.io/github/mseemann/angular2-mdl?branch=master)
[![Dependencies](https://david-dm.org/mseemann/angular2-mdl.svg)](https://david-dm.org/mseemann/angular2-mdl)
[![peerDependencies Status](https://david-dm.org/mseemann/angular2-mdl/peer-status.svg)](https://david-dm.org/mseemann/angular2-mdl?type=peer)
[![DevDependencies](https://david-dm.org/mseemann/angular2-mdl/dev-status.svg)](https://david-dm.org/mseemann/angular2-mdl#info=devDependencies&view=table)
[![Code Climate](https://codeclimate.com/github/mseemann/angular2-mdl/badges/gpa.svg)](https://codeclimate.com/github/mseemann/angular2-mdl)

**Please don't use github to ask questions. Use stackoverflow instead: http://stackoverflow.com/questions/tagged/angular2-mdl.**

**Here is a plnkr if you'd like to play around http://plnkr.co/edit/I3dLfLUDIH2xlEJqj0da?p=preview.**


### Status of the npm package version 4 (mdl version 1.3.0; angular 4)

- Badges
- Buttons
- Cards
- Chips
- Dialogs (imperative and declarative)
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
npm install @angular-mdl/core --save
```


### How to use the mdl components with webpack

Just use it. Add the MdlModule to your NgModule imports and you are done!

### How to use the mdl components with system js

You need to configure your `system-config.js` file:

```JavaScript
const map: any = {
  '@angular-mdl/core': 'vendor/@angular-mdl/core'
};

/** User packages configuration. */
const packages: any = {
  '@angular-mdl/core': { main: 'bundle/angular-mdl.js'}
};
```


### css from material-design-lite
You may include the material-deisgn-lite css in your html and you're done!
```HTML
<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.indigo-pink.min.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
Under http://mseemann.io/angular2-mdl/theme you'll find a customizing tool to change the theme colors.

### How to use the scss files from material-design-lite
This package includes the scss files from material-design-lite.
With these files you are able to change the colors and other variables in your own scss files:

```scss
@import "~@angular-mdl/core/scss/color-definitions";

$color-primary: $palette-blue-500;
$color-primary-dark: $palette-blue-700;
$color-accent: $palette-amber-A200;
$color-primary-contrast: $color-dark-contrast;
$color-accent-contrast: $color-dark-contrast;

@import '~@angular-mdl/core/scss/material-design-lite';
```

To make this working you need to find out the way how you could tell your build system where the scss is located.
For example with webpack you can use the special `~@angular-mdl/core` syntax or you can configure the includePaths:

```JavaScript
sassLoader: {
	includePaths: [util.root('node_modules', '@angular-mdl/core', 'scss')]
}
```

# Contributing

Every contribution is welcome. Please checkout the [CONRIBUTION.md](https://github.com/mseemann/angular2-mdl/blob/master/CONTRIBUTION.md) file.

# Remarks

If you need a working example for the current angular-cli with the current angular2-mdl and angular versions please have a look at:
[https://github.com/mseemann/a2-mdl-webpack](https://github.com/mseemann/a2-mdl-webpack).
