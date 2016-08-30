<a name="1.4.6"></a>
# 1.4.6 (comming soon)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/51 (mdl-textfield and input attributes / events)



<a name="1.4.5"></a>
# 1.4.5 (2016-08-30)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/48 (id handling for input fields with label)
* https://github.com/mseemann/angular2-mdl/issues/49 (Pattern on Text Input invalidating Reactive Forms)
    See https://github.com/mseemann/angular2-mdl/wiki/Mdl-Textfield-and-native-validity-checking for a detailed description.


<a name="1.4.4"></a>
# 1.4.4 (2016-08-28)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/41 (Build 1.4.3 contains console.log statements)
* https://github.com/mseemann/angular2-mdl/issues/46 (ripple effect not working in ff)
* https://github.com/mseemann/angular2-mdl/issues/47 (Chrome Autofill Not Showing on TextFields)


<a name="1.4.3"></a>
# 1.4.3 (2016-08-25)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/38

The mdl-button component can now also be used as attributes for button 
elements. This make the mdl-button behave more natively as a regular html button.

Both is valid. But the button element is more natively:

```html
  <button mdl-button mdl-button-type="fab" mdl-ripple>
    <mdl-icon>add</mdl-icon>
  </button>

  <mdl-button mdl-button-type="fab" mdl-ripple>
    <mdl-icon>add</mdl-icon>
  </mdl-button>
```


<a name="1.4.2"></a>
# 1.4.2 (2016-08-23)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/36


<a name="1.4.1"></a>
# 1.4.1 (2016-08-20)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/34


<a name="1.4.0"></a>
# 1.4.0 (2016-08-19)

### Features
* Now includes the mdl version 1.2.0 with chips
* Unfortunately there is a bug in this version that misalignes 
the hamburger icon (https://github.com/google/material-design-lite/issues/4673). 
A workaround is to add the followiug scss to your code:

```scss
@media screen and (min-width: 1025px) {
  .mdl-layout__drawer-button {
    line-height: 52px;
  }
}

@media screen and (max-width: 1024px) {
  .mdl-layout__drawer-button {
    line-height: 50px;
  }
}
```

For sure this will be fixed until it is fixed in mdl!


<a name="1.3.1"></a>
# 1.3.1 (2016-08-18)

### Features
* https://github.com/mseemann/angular2-mdl/issues/29
   (select tab porgrammatically, support for rich tab titles)

<a name="1.3.0"></a>
# 1.3.0 (2016-08-17)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/31

### BREAKING CHANGES
You need to use the new angular2 forms API - e.g. FormsModule.


<a name="1.2.0"></a>
# 1.2.0 (2016-08-07)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/28

### BREAKING CHANGES
you need to make your app require @angular/forms@0.2.0

<a name="1.1.5"></a>
# 1.1.5 (2016-07-26)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/27

<a name="1.1.4"></a>
# 1.1.4 (2016-07-25)

### Features
* avoid using window and document  -> be compatible with angular-univeral

### BREAKING CHANGES

<a name="1.1.2"></a>
# 1.1.2 (2016-07-25)

### Features
* intenalize all exteranl templates -> be compatible with angular-univeral

### BREAKING CHANGES



<a name="1.1.1"></a>
# 1.1.1 (2016-07-22)

### Features
* mdl-button attribute disabled is now dynamic

### BREAKING CHANGES



<a name="1.1.0"></a>
# 1.1.0 (2016-07-21)

### Features
* mdl-button attribute mdl-colored behavior changed

### BREAKING CHANGES
* mdl-colored need an explicit value (e.g. wether primary or accent)


<a name="1.0.4"></a>
# 1.0.4 (2016-07-20)

### Features
* mdl-list-item supports mdl-ripple

### BREAKING CHANGES
- none -


<a name="1.0.0-rc1"></a>
# 1.0.0-rc1 (2016-07-12)

* textfield (+floating label)
* multiline textfield
* expandable textfield

### BREAKING CHANGES
* mdl-text-field renamed to mdl-textfield

<a name="1.0.0-alpha.2"></a>
# 1.0.0-alpha.1 (2016-07-10)

### Bug Fixes
- none -

### Features
* Attribute mdl-layout-fixed-drawer for mdl-layout
* Attribute mdl-layout-fixed-header for mdl-layout
* Mode scroll, waterfall for mdl-layout
* Tabs (standalone)
* (fix) Tabs for layouts

### BREAKING CHANGES
- none -

<a name="1.0.0-alpha.1"></a>
# 1.0.0-alpha.1 (2016-07-06)

### Bug Fixes

### Features
* Badges
* Buttons 
* Cards
* Icons
* Loading
* Shadow
* Toggle (Checkbox, Radio, Icon Toggle, Switch)
* Lists
* Slider
* Snackbar
* Table
* Tooltips
* Menu
* Layout (standard)

### BREAKING CHANGES