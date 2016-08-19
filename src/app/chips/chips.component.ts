import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'chips-demo',
  templateUrl: 'chips.component.html'
})
export class ChipsDemo {

  public deleteChip() {
    console.log('delete the chip');
  }

}
