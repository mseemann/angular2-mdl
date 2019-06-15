# Select

### Installing

    npm i --save @angular-mdl/popover @angular-mdl/fab-menu

    import { MdlSelectModule } from '@angular-mdl/fab-menu';

If you need to support IE11 please add https://www.npmjs.com/package/custom-event-polyfill
to your polyfills.

### Usage example

```angular2html
<mdl-fab-menu #mainFabMenu>
    <mdl-fab-menu-item
        [fabMenu]="mainFabMenu"
        icon="note_add"
        label="make a note"
        (menu-clicked)="log('we need to do something here')">
    </mdl-fab-menu-item>
    <mdl-fab-menu-item
        [fabMenu]="mainFabMenu"
        icon="refresh"
        label="refresh"
        (menu-clicked)="/*do something here*/">
    </mdl-fab-menu-item>
    <mdl-fab-menu-item
        [fabMenu]="mainFabMenu"
        icon="refresh"
        label="refresh"
        (menu-clicked)="/*do something here*/">
    </mdl-fab-menu-item>
</mdl-fab-menu>
```
#### forcing the tooltips to be displayed
```angular2html
<mdl-fab-menu #mainFabMenu [alwaysShowTooltips]="true">
    ...
</mdl-fab-menu>
```

### API Summary

#### mdl-fab-menu

| Name | Type | Description |
| --- | --- | --- |
| `[alwaysShowTooltips]` | boolean | decide if either or not the tooltips should always be displayed (let it unbinds to always display them on touch screens and on mouseover on "mouse-screen")

#### mdl-fab-menu-item

| Name | Type | Description |
| --- | --- | --- |
| `[fabMenu]` | MdlFabMenu | the enclosing menu
| `[icon]` | string | mini-fab icon
| `[label]` | string | tooltip content
| `(menu-clicked)` | event<void> | the item has been clicked 
