import {
  Component,
  OnInit
} from '@angular/core';
import { flyInOutTrigger } from './../animations/flyInOutTrigger-animation';
import { hostConfig } from './../animations/flyInOutTrigger-animation';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import 'rxjs/add/operator/filter';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from './../abstract-demo.component';

@Component({
  moduleId: module.id,
  selector: 'reactive-form-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'reactiveform.component.html'
})
export class ReactiveFormsDemo extends AbstractDemoComponent implements OnInit {

  public form: FormGroup;
  public firstName = new FormControl('');
  public lastName = new FormControl('', Validators.required);

  constructor(router: Router, route: ActivatedRoute, titleService: Title, private fb:FormBuilder) {
    super(router, route, titleService);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.form = this.fb.group({
      'firstName': this.firstName,
      'lastName': this.lastName
    });
    this.form.valueChanges
      .map((formValues) => {
        formValues.firstName = formValues.firstName.toUpperCase();
        return formValues;
      })
      .filter((formValues) => this.form.valid)
      .subscribe((formValues) => {
        console.log('Model Driven Form valid value: ', JSON.stringify(formValues));
      });
  }

  public onSubmit() {
    console.log(this.form);
  }
}
