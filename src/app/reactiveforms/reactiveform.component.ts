import { Component } from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'reactive-form-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'reactiveform.component.html'
})
export class ReactiveFormsDemo {

  public form: FormGroup;
  public firstName = new FormControl('');
  public lastName = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      'firstName': this.firstName,
      'lastName': this.lastName
    });
  }

  public onSubmit() {
    console.log(this.form);
  }
}
