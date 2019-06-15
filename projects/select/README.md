# Select

### Installing

    npm i --save @angular-mdl/popover @angular-mdl/select

    import { MdlSelectModule } from '@angular-mdl/select';

If you need to support IE11 please add https://www.npmjs.com/package/custom-event-polyfill
to your polyfills.

### Usage example

```js
<mdl-select [(ngModel)]="personId">
    <mdl-option *ngFor="let p of people" [value]="p.id">{{p.name}}</mdl-option>
</mdl-select>
```
#### using placeholder
```js
<mdl-select placeholder="Person Name" [(ngModel)]="personId">
    <mdl-option *ngFor="let p of people" [value]="p.id">{{p.name}}</mdl-option>
</mdl-select>
```

#### using label with floating label
```js
<mdl-select label="{{personLabel}}" floating-label [(ngModel)]="personId">
    <mdl-option *ngFor="let p of people" [value]="p.id">{{p.name}}</mdl-option>
</mdl-select>
```

### API Summary

#### mdl-select

| Name | Type | Description |
| --- | --- | --- |
| `[ngModel]` | any | Select data binding
| `[disabled]` | boolean | Whether or not the select is disabled
| `[placeholder]` | string | Placeholder text
| `[label]` | string | Label text
| `[floating-label]` | any | If present or true the ```label``` will be floating on ```focus``` event
| `[multiple]` | boolean | Multiselect mode
| `[autocomplete]` | boolean | Autocomplete mode
| `(blur)` | ... | on blur event
| `(change)` | ... | on change event

#### mdl-option

| Name | Type | Description |
| --- | --- | --- |
| `[value]` | any | Option value
| `[disabled]` | boolean | Whether or not the option is disabled
| `<content>` | string | Option label
