# Popover

### Installing

    npm i --save @angular-mdl/popover

    import { MdlPopoverModule } from '@angular-mdl/popover';

If you need to support IE11 please add https://www.npmjs.com/package/custom-event-polyfill
to your polyfills.

### Usage example

    <button
        mdl-button
        (click)="myPopover.toggle($event)"
        mdl-button-type="icon"
        mdl-ripple>
      <mdl-icon>more_vert</mdl-icon>
    </button>
    
    <mdl-popover #myPopover [style.width.px]="300">
      <div mdl-shadow="6" style="padding: 1rem;">
        <b>This is example popover</b> you can put any HTML content here.
      </div>
    </mdl-popover>

### API Summary

#### mdl-popover

| Name | Type | Description |
| --- | --- | --- |
| `[hide-on-click]` | boolean | Hide popover on clicking inside it, default `false`
| `[style.*]` | ... | Styling i.e. `[style.width.px]="300"`
| `(onHide)` | ... | on hide event 
| `(onShow)` | ... | on show event 
