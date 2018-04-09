<a name="next"></a>
# 5.x (next)
* [1182](https://github.com/mseemann/angular2-mdl/issues/1182) (the sortable property of mdl-table was marked as deprecated, becasue it was never supported)
* [1449](https://github.com/mseemann/angular2-mdl/pull/1449) (fix: menus from menuregistry not removed on compnent destroy)
* [1007](https://github.com/mseemann/angular2-mdl/pull/1007) (fix: Snackbar Module Name)
* [1051](https://github.com/mseemann/angular2-mdl/pull/1051) (add maxlength if mdl-textfield is a textarea)
* [997](https://github.com/mseemann/angular2-mdl/issues/997) (fix Issue with dialog in lazy loaded components)
* [1038](https://github.com/mseemann/angular2-mdl/issues/1038) (fix Including an mdl-dialog causes things to happen twice)
### Breaking Changes
* the Snackbar Module Name has changed from MdlSnackbaModule to MdlSnackbarModule


<a name="4.0.8"></a>
# 4.0.8 (2017-06-10)

### Features
* MdlScreenSizeService.isSmallScreen method added.


<a name="4.0.7"></a>
# 4.0.7 (2017-06-06)

### Features
* [990](https://github.com/mseemann/angular2-mdl/pull/990) (add openDrawer and openDrawerOnSmallScreens method on mdl-layout)


<a name="4.0.6"></a>
# 4.0.6 (2017-05-27)

### Bug Fixes
* [973](https://github.com/mseemann/angular2-mdl/issues/973) (MdlScreenSizeService is destroyed on MdlLayoutComponent destroy)

<a name="4.0.5"></a>
# 4.0.5 (2017-05-20)

### Bug Fixes
*remove debug code

<a name="4.0.4"></a>
# 4.0.4 (2017-05-20)

### Bug Fixes
* [536](https://github.com/mseemann/angular2-mdl/issues/536) (MediaQuery no longer runs in ngZone)


<a name="4.0.3"></a>
# 4.0.3 (2017-04-13)

### Features
* remove check that mdl-list-item need mdl-list as a parent


<a name="4.0.2"></a>
# 4.0.2 (2017-04-12)

### Bug Fixes
* [775](https://github.com/mseemann/angular2-mdl/issues/775) (Restore the behavior for mdl-badge as of version 2)
### Features
* [765](https://github.com/mseemann/angular2-mdl/issues/765) (OpaqueToken has been deprecated - should not break anythingv ;)

<a name="4.0.1"></a>
# 4.0.1 (2017-03-28)

### Bug Fixes
* [724](https://github.com/mseemann/angular2-mdl/issues/724) (call animation done - even if no polyfill is available)



<a name="4.0.0"></a>
# 4.0.0 (2017-03-24)
* match angular 4.x

<a name="3.0.0-rc.6"></a>
# 3.0.0-rc.6 (2017-03-23)
* keep the rc number in sync with angular

### Bug Fixes
* [688](https://github.com/mseemann/angular2-mdl/issues/688) (mdl-tooltip is not updated when its value changes)


<a name="3.0.0-rc.5"></a>
# 3.0.0-rc.5 (2017-03-17)
* keep the rc number in sync

<a name="3.0.0-rc.4"></a>
# 3.0.0-rc.4 (2017-03-17)

* Upgade to angular 4 rc.4 and fixing breaking changes
* package renamed to -rc.4 to make clear that this version corresponds to the current rc of angular4 

<a name="3.0.0-beta.7"></a>
# 3.0.0-beta.7 (2017-03-12)

* the umd bundle file name has changed to bundle/core.js


<a name="3.0.0-beta.6"></a>
# 3.0.0-beta.6 (201-03-11)

* Renderer replaced by Renderer2
* fix dialog animations - keep focus


<a name="3.0.0-beta.5"></a>
# 3.0.0-beta.5 (2017-03-07)

### Bug Fixes
* [639](https://github.com/mseemann/angular2-mdl/issues/639) (BrowserModule imported twice with angular 4.rc2)


### Features
* [631](https://github.com/mseemann/angular2-mdl/pull/631) (changed table columns to allow for HTML content by [@joevanwanzeele](https://github.com/joevanwanzeele))

###Breaking Changes
* the public methods show and hide on tooltips have be removed
* the mld-ripple directive no longer works on mdl-list-items

<a name="3.0.0-beta.4"></a>
# 3.0.0-beta.4 (2017-03-02)
* build with angular 4.0.0-rc.2

<a name="3.0.0-beta.3"></a>
# 3.0.0-beta.3 (2017-02-24)

###Breaking Changes
* The npm package and the name have changed. It is now: @angular-mdl/core
* This Verison is compatible with Angualr 4.rc.1

<a name="2.13.2"></a>
# 2.13.2 (2017-02-24)

### Bug Fixes
* [595](https://github.com/mseemann/angular2-mdl/issues/595) (Incorrect typings of mdl table)


<a name="2.13.1"></a>
# 2.13.1 (2017-02-12)

### Bug Fixes
* [512](https://github.com/mseemann/angular2-mdl/issues/512) (Tabs cannot be rendered dynamically with an *ngFor loop)
* [516](https://github.com/mseemann/angular2-mdl/issues/516) (Building with AoT throws errors) by [@jlee1201](https://github.com/jlee1201


<a name="2.13.0"></a>
# 2.13.0 (2017-01-30)

### Features
* [483](https://github.com/mseemann/angular2-mdl/pull/483) (Event emitter to detect state of modals being opened or closed by [@mgiuliani](https://github.com/mgiuliani))

<a name="2.12.1"></a>
# 2.12.1 (2017-01-19)

### Bug Fixes
* [452](https://github.com/mseemann/angular2-mdl/issues/452) (fire screen size events after subscribing to the events)


<a name="2.12.0"></a>
# 2.12.0 (2017-01-13)

### Bug Fixes
* [403](https://github.com/mseemann/angular2-mdl/issues/403) (dialog service: onHide should declare Observable<any> instead of Observable<void>)

### Features
* [369](https://github.com/mseemann/angular2-mdl/issues/369) (Tooltip delay by [@guzmo](https://github.com/guzmo))
* [397](https://github.com/mseemann/angular2-mdl/issues/397) (maxlength in mdl-textfield by[@tomicasoft](https://github.com/tomicasoft))
* [436](https://github.com/mseemann/angular2-mdl/pull/436) (add keyup emitter to textfield)[crystalraebryant](https://github.com/crystalraebryant)

<a name="2.11.0"></a>
# 2.11.0 (2016-12-26)

### Bug Fixes
* [370](https://github.com/mseemann/angular2-mdl/issues/370) (do not set the tabindex to 1 as the default value)

### Features
* [191](https://github.com/mseemann/angular2-mdl/issues/191) (Custom Decorators are a stumbling block for treeshaking


<a name="2.10.0"></a>
# 2.10.0 (2016-12-22)
### Features
* [364](https://github.com/mseemann/angular2-mdl/issues/364) (upgrade mdl to version 1.3.0)


<a name="2.9.0"></a>
# 2.9.0 (2016-12-16)

### Features
* [325](https://github.com/mseemann/angular2-mdl/issues/325) (mdl-shadow supports 0 as valid value)
* [329](https://github.com/mseemann/angular2-mdl/issues/329) (adaptable layout-screen-size-treshold)
* [331](https://github.com/mseemann/angular2-mdl/issues/331) (screensize service - listen to screen size changes)


<a name="2.8.0"></a>
# 2.8.0 (2016-12-13)

### Features
* [283](https://github.com/mseemann/angular2-mdl/issues/283) (consecutive snackbars)
* [284](https://github.com/mseemann/angular2-mdl/issues/284) (auto aciton on snackbar timeout)
* [288](https://github.com/mseemann/angular2-mdl/issues/288) (tab index)
* [300](https://github.com/mseemann/angular2-mdl/issues/300) (confirm dialog with heading)


<a name="2.7.0"></a>
# 2.7.0 (2016-12-07)

### Bug Fixes
* [282](https://github.com/mseemann/angular2-mdl/issues/282) (Add default type=text to mdl-textfield)
### Features
* [281](https://github.com/mseemann/angular2-mdl/issues/281) (step attribute for slider component)


<a name="2.6.0"></a>
# 2.6.0 (2016-12-04)

### Bug Fixes
* [275](https://github.com/mseemann/angular2-mdl/issues/275) (keep type number for input type number)
### Features
* [263](https://github.com/mseemann/angular2-mdl/issues/263) (pass a value for dialog hide)


<a name="2.5.1"></a>
# 2.5.1 (2016-12-01)

### Bug Fixes
- rebuild to get the right metadata for aot



<a name="2.5.0"></a>
# 2.5.0 (2016-11-22)

### Features
* [235](https://github.com/mseemann/angular2-mdl/issues/235) (Show/close tooltip)


<a name="2.4.5"></a>
# 2.4.5 (2016-11-21)

### Bug Fixes
* [232](https://github.com/mseemann/angular2-mdl/issues/232) (expose readonly for mdl-textfiled)
* [229](https://github.com/mseemann/angular2-mdl/issues/229) (<textarea> didn't use the "required" attribute)

<a name="2.4.4"></a>
# 2.4.4 (2016-11-20)

### Bug Fixes
* [2126](https://github.com/mseemann/angular2-mdl/issues/226) (mdl-layout-tab-panel-title is not moarked correctly if active)

<a name="2.4.3"></a>
# 2.4.3 (2016-11-18)

### Bug Fixes
* [216](https://github.com/mseemann/angular2-mdl/issues/216) (AOT fails because of private members)

<a name="2.4.2"></a>
# 2.4.2 (2016-11-17)

### Bug Fixes
* [200](https://github.com/mseemann/angular2-mdl/issues/200) (close menu if another menu will be opened)
* [205](https://github.com/mseemann/angular2-mdl/issues/205) (group nested radios not working)
* [216](https://github.com/mseemann/angular2-mdl/issues/216) (AOT fail for dialogs)

### Features
* [201](https://github.com/mseemann/angular2-mdl/issues/201) (Step in text fields)


<a name="2.4.1"></a>
# 2.4.1 (2016-11-13)

### Features
* [196](https://github.com/mseemann/angular2-mdl/issues/196) (provide open and close events for the layout drawer)


<a name="2.4.0"></a>
# 2.4.0 (2016-11-08)

### Features
* [186](https://github.com/mseemann/angular2-mdl/issues/186) (dialog animations (duration and curve) should be configurable)

<a name="2.3.1"></a>
# 2.3.1 (2016-10-29)

### Bug Fixes
* [175](https://github.com/mseemann/angular2-mdl/issues/175) ( dialog animation broken if animation polyfill is used)


<a name="2.3.0"></a>
# 2.3.0 (2016-10-29)

### Bug Fixes
* [169](https://github.com/mseemann/angular2-mdl/issues/169) (fix docu for snackbar and remove viewRef param from snackbar api)
### Features
* [143](https://github.com/mseemann/angular2-mdl/issues/143) (Dialog that starts animating from a specific element)


<a name="2.2.2"></a>
# 2.2.2 (2016-10-21)

### Bug Fixes
* [165](https://github.com/mseemann/angular2-mdl/issues/165) (Unable to compile AOT)

<a name="2.2.1"></a>
# 2.2.1 (2016-10-17)

### Bug Fixes
* [157](https://github.com/mseemann/angular2-mdl/issues/157) (modal for mld-dialog conflicts with config.isModal)

<a name="2.2.0"></a>
# 2.2.0 (2016-10-16)

### Features
* [148](https://github.com/mseemann/angular2-mdl/issues/148) (dialog width + more config options)


<a name="2.1.0"></a>
# 2.1.0 (2016-10-13)

### Bug Fixes
* Make dialog-outlet workaround possible. (https://github.com/mseemann/angular2-mdl/pull/149)

### Features
* [129](https://github.com/mseemann/angular2-mdl/issues/129) (set only local reference of menu template)

<a name="2.0.1"></a>
# 2.0.1 (2016-10-11)

### Bug Fixes
* [140](https://github.com/mseemann/angular2-mdl/issues/140) (dialog animation behaves different if native or polyfill is used)

<a name="2.0.0"></a>
# 2.0.0 (2016-10-10)

### Bug Fixes
### Features
* [127](https://github.com/mseemann/angular2-mdl/issues/127) (Autocomplete on inputs)
* [109](https://github.com/mseemann/angular2-mdl/issues/109) (AOT is now supported - e.g. the metadata files are generated)
* [121](https://github.com/mseemann/angular2-mdl/issues/121) (avoid editing the copied scss source from mdl)
* [118](https://github.com/mseemann/angular2-mdl/pull/118) (Add animation to mdl-dialogs)
* [113](https://github.com/mseemann/angular2-mdl/pull/113) (Disabled tabs)
* [112](https://github.com/mseemann/angular2-mdl/issues/112) (ViewEncapsulation.None for all components)
* [111](https://github.com/mseemann/angular2-mdl/issues/111) (forRoot module)
* [131](https://github.com/mseemann/angular2-mdl/issues/131) (Dialog design)
* [139](https://github.com/mseemann/angular2-mdl/issues/139) (change return types from Promise to Observable)

### Breaking Changes
* The distribution structure has change:
    - The scss folder is now located at scss and no longer in src/scss.
    - The package is now distributed as umd bundle and esm. The bundle file is `bundle/angular2-mdl.js`. The esm entry point is `components/index.js`
* The module *MdlModule* now works as a root module and makes sure that all providers are loaded into the root injector of the app. You can use *MdlNonRootModule*. But you should be aware that the providers are possibly not singletons. You also can use *MdlNonRootModule.forRoot*. This is the same as *MdlModule*.
* MdlDialogService and MdlSnackbarService have changed:
    - There is no longer a `setDefaultViewContainerRef` method. There are two ways to specify a `ViewContainerRef` where dynamic Components will be attached:
      - use `MdlDialogOutletService` and `setDefaultViewContainerRef`
      - use the `<dialog-outlet></dialog-outlet>` component. This component can be anywhere in your html site. The best place is the last child of the `body` element. (see https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService for more information)
    - The possibility to set a `ViewContainerRef` for each dialog or snackbar has been removed.
    - `alert` and `confirm` , `showDialog*` return an `Observable` and no longer a `Promise` (the enum `ConfirmResult` has been removed)
* This version now supports AOT - but you should be aware that AOT seems not to be ready for production. AOT behaves in many cases different then JIT. (see https://github.com/angular/angular/issues/11606)
* The MdlSnachbarService returns now an Observable and no longer a Promise. Just change from `then` to `subscribe`.
      
<a name="1.8.2"></a>
# 1.8.2 (2016-10-06)

### Bug Fixes
* [134](https://github.com/mseemann/angular2-mdl/issues/134) (throw an error if there is no viewcontainerref for the dialogs)


<a name="1.8.1"></a>
# 1.8.1 (2016-09-28)

### Features
* https://github.com/mseemann/angular2-mdl/issues/114 (mouseover event on tab (layout))


<a name="1.8.0"></a>
# 1.8.0 (2016-09-26)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/104 (Reactive Forms Disabled not handled)
### Features
* https://github.com/mseemann/angular2-mdl/issues/90 (add semver carret to the 2.0.0 angular deps)
* https://github.com/mseemann/angular2-mdl/issues/94 (make angular (core, common, forms) peerDependencies)
* https://github.com/mseemann/angular2-mdl/issues/44 (Add MDL Dialog)
  See the [docu](http://mseemann.io/angular2-mdl/dialogs) for mor information how to use the *MdlDialogService*
* https://github.com/mseemann/angular2-mdl/issues/99 (Missing min/max on textfield)


<a name="1.7.1"></a>
# 1.7.1 (2016-09-16)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/89 (Layout title not redrawing)

<a name="1.7.0"></a>
# 1.7.0 (2016-09-15)

### Bug Fixes
### Features
* https://github.com/mseemann/angular2-mdl/issues/81 (Make MdlTextFieldComponent::setFocus() public)
* https://github.com/mseemann/angular2-mdl/issues/82 (MediaQueryList is ngZone aware)
* update dependencies to angular 2.0.0 final

<a name="1.6.0"></a>
# 1.6.0 (2016-09-13)

Update to match angular2 RC7

<a name="1.5.2"></a>
# 1.5.2 (2016-09-10)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/33 (Hamburger Icon misaligned in mdl 1.2.0)


<a name="1.5.1"></a>
# 1.5.1 (2016-09-05)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/59 (compiler.compileComponentSync has been removed in rc6)

### Features
* https://github.com/mseemann/angular2-mdl/pull/62 (add change events for toggle components; thx to @tb )

<a name="1.5.0"></a>
# 1.5.0 (2016-09-03)

Upgrade to support angular 2 RC6


<a name="1.4.6"></a>
# 1.4.6 (2016-08-31)

### Bug Fixes
* https://github.com/mseemann/angular2-mdl/issues/51 (mdl-textfield and input attributes / events)
* https://github.com/mseemann/angular2-mdl/issues/52 (Radio Buttons and Drop Down)


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
