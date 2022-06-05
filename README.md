Angular 14 components, directives and styles based on material design lite https://getmdl.io (v: 1.3.0). This package
assumes that you are building an Angular app with TypeScript. Angular CLI makes it even easier but isn't required.

[![CircleCI](https://circleci.com/gh/mseemann/angular2-mdl/tree/master.svg?style=shield)](https://circleci.com/gh/mseemann/angular2-mdl/tree/master)
[![npm version](https://badge.fury.io/js/@angular-mdl%2Fcore.svg)](https://www.npmjs.com/package/@angular-mdl/core)
[![Downloads](http://img.shields.io/npm/dm/@angular-mdl%2Fcore.svg)](https://npmjs.org/package/@angular-mdl/core)
[![Coverage Status](https://coveralls.io/repos/github/mseemann/angular2-mdl/badge.svg?branch=master)](https://coveralls.io/github/mseemann/angular2-mdl?branch=master)
[![Code Climate](https://codeclimate.com/github/mseemann/angular2-mdl/badges/gpa.svg)](https://codeclimate.com/github/mseemann/angular2-mdl)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmseemann%2Fangular2-mdl.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmseemann%2Fangular2-mdl?ref=badge_shield)

- **Please don't use github to ask questions.** Use stackoverflow
  instead: http://stackoverflow.com/questions/tagged/angular-mdl.
- plnkr if you'd like to play around http://plnkr.co/edit/f73PKEmzpAcchza8Q9rb?p=preview
- [Demo-App with all supported components and documentation](http://mseemann.io/angular2-mdl/)
- Porting of the [MDL-Dashboard](https://getmdl.io/templates/dashboard/index.html) provided
  by [AndreaM16](https://github.com/AndreaM16): [Demo-App](https://angular-mdl-dashboard.herokuapp.com/#/home)
  , [Sources](https://github.com/AndreaM16/angular-mdl-dashboard).

### Status of the npm package version 14 (mdl version 1.3.0; angular 14)

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

### css from material-design-lite

You may include the material-design-lite css in your html and you're done!

```HTML

<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.indigo-pink.min.css"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Under http://mseemann.io/angular2-mdl/theme you'll find a customizing tool to change the theme colors.

### How to use the scss files from material-design-lite

This package includes the scss files from material-design-lite. With these files you are able to change the colors and
other variables in your own scss files:

```scss
@import "~@angular-mdl/core/scss/color-definitions";

$color-primary: $palette-blue-500;
$color-primary-dark: $palette-blue-700;
$color-accent: $palette-amber-A200;
$color-primary-contrast: $color-dark-contrast;
$color-accent-contrast: $color-dark-contrast;

@import "~@angular-mdl/core/scss/material-design-lite";
```

To make this working you need to find out the way how you could tell your build system where the scss is located. For
example with webpack you can use the special `~@angular-mdl/core` syntax used above. Or you can configure the
includePaths:

```JavaScript
sassLoader: {
  includePaths: [util.root('node_modules', '@angular-mdl/core', 'scss')]
}
```

# @angular-mdl/\*

Additional components for @angular-mdl/core that are not part of material design lite

- current angular version: 13
- current angular-mdl version: 13

## The components

| Name            | Provided By                                     | Description                                      | npm                                                                                                                                       | documentation                                                                           | status       | demo                                                    |
| --------------- | ----------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------- |
| datepicker      | [mseemann](https://github.com/mseemann)         | a simple date picker                             | [![npm version](https://badge.fury.io/js/@angular-mdl%2Fdatepicker.svg)](https://www.npmjs.com/package/@angular-mdl/datepicker)           | [readme](https://github.com/mseemann/angular2-mdl/tree/master/projects/datepicker)      | experimental | [demo](http://mseemann.io/angular2-mdl/date-picker)     |
| expansion-panel | [abdulqadir93](https://github.com/abdulqadir93) | organise arbitrary content in an expansion panel | [![npm version](https://badge.fury.io/js/@angular-mdl%2Fexpansion-panel.svg)](https://www.npmjs.com/package/@angular-mdl/expansion-panel) | [readme](https://github.com/mseemann/angular2-mdl/tree/master/projects/expansion-panel) | experimental | [demo](http://mseemann.io/angular2-mdl/expansion-panel) |
| fab-menu        | [leojpod](https://github.com/leojpod)           | a fab menu component                             | [![npm version](https://badge.fury.io/js/@angular-mdl%2Ffab-menu.svg)](https://www.npmjs.com/package/@angular-mdl/fab-menu)               | [readme](https://github.com/mseemann/angular2-mdl/tree/master/projects/fab-menu)        | experimental | [demo](http://mseemann.io/angular2-mdl/fab-menu)        |
| popover         | [tb](https://github.com/tb)                     | popover with arbitrary content                   | [![npm version](https://badge.fury.io/js/%40angular-mdl%2Fpopover.svg)](https://www.npmjs.com/package/@angular-mdl/popover)               | [readme](https://github.com/mseemann/angular2-mdl-ext/tree/master/projects/popover)     | experimental | [demo](http://mseemann.io/angular2-mdl/popover)         |
| select          | [tb](https://github.com/tb)                     | a select box                                     | [![npm version](https://badge.fury.io/js/%40angular-mdl%2Fselect.svg)](https://www.npmjs.com/package/@angular-mdl/select)                 | [readme](https://github.com/mseemann/angular2-mdl-ext/tree/master/projects/select)      | experimental | [demo](http://mseemann.io/angular2-mdl/select)          |

These components support AOT and TreeShaking!

### How to use the components

Install the components via npm. Please check out the individual readme for each component from the table above.

Starting with version 0.2.0 the components each have no css styles imported by default. You need to setup your build
pipeline to include the scss files from each component you want to use. This makes it possible to configure the theming
for the components you want to use.

If you are using webpack you may use the special webpack import syntax for node_modules:

```
@import '~@angular-mdl/core/scss/color-definitions';

$color-primary: $palette-blue-500;
$color-primary-dark: $palette-blue-700;
$color-accent: $palette-amber-A200;
$color-primary-contrast: $color-dark-contrast;
$color-accent-contrast: $color-dark-contrast;

@import '~@angular-mdl/core/src/scss-mdl/material-design-lite';

@import '~@angular-mdl/popover/popover';
@import '~@angular-mdl/select/select';
```

Another way is to include each component folder in the search path for your scss preprocessor. An example for webpack:

```
sassLoader: {
	includePaths: [
		'node_modules/@angular-mdl/popover',
		'node_modules/@angular-mdl/select'
	]
}
```

### Development

- npm start - local dev server
- npm build - build a production release
- npm test - run the unit tests

The coverage report is stored under: coverage/coverage-remap/index.html

# Contributing

Every contribution is welcome. Please checkout
the [CONTRIBUTION.md](https://github.com/mseemann/angular2-mdl/blob/master/CONTRIBUTION.md) file.

# Remarks

And if you would like to see a real world app that uses this package have a look
at https://www.yovelino.de/apps/tour-planner/.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmseemann%2Fangular2-mdl.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmseemann%2Fangular2-mdl?ref=badge_large)
