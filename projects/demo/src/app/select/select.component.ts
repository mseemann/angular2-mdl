import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AbstractDemoComponent} from '../abstract-demo.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {flyInOutTrigger} from '../animations/flyInOutTrigger-animation';

@Component({
  selector: 'demo-select',
  templateUrl: 'select.component.html',
  animations: [
    flyInOutTrigger
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends AbstractDemoComponent implements OnInit {
  form: FormGroup;

  personId: FormControl = new FormControl(1);
  people: any[] = [
    {id: 1, name: 'Bryan Cranston'},
    {id: 2, name: 'Aaron Paul'},
    {id: 3, name: 'Bob Odenkirk'},
    {id: 4, name: 'Dean Norris'},
    {id: 5, name: 'Jonathan Banks'},
    {id: 6, name: 'Seal Henry Olusegun Olumide Adeola Samuel'},
    {id: 7, name: 'Rami Malek', disabled: true},
    {id: 8, name: 'Christian Slater'},
    {id: 9, name: 'Martin Wallström'},
    {id: 10, name: 'Angela Sarafyan'},
    {id: 11, name: 'Robert Pattinson'},
    {id: 12, name: 'Billy Bob Thornton', disabled: true}
  ];

  countryCode = 'FR';
  countryLabel = 'Country';
  autocompleteCountryCode: string = null;
  otherCountryCode: string = null;
  otherCountryCode2: string = null;
  countryCodes: string[] = ['FR', 'DE', 'IT'];
  countries: any = [
    {name: 'France', code: 'FR'},
    {name: 'Germany', code: 'DE'},
    {name: 'Italy', code: 'IT'},
    {name: 'Netherlands', code: 'NL'},
    {name: 'Poland', code: 'PL'},
    {name: 'Spain', code: 'ES'},
    {name: 'United Kingdom', code: 'UK'},
  ];

  color = 'all';
  colors: any = [
    {name: 'Red', code: 'r'},
    {name: 'Green', code: 'g'},
    {name: 'Blue', code: 'b'}
  ];

  foodCategory: any;

  foodCategories: any[] = [
    {id: '1', name: 'Vegetables'},
    {id: '2', name: 'Fruits'},
  ];

  foodByCategory: any = {
    1: [
      'Avocado', 'Beet', 'Broccoli', 'Carrot', 'Cucumber',
      'Onion', 'Potato', 'Pumpkin', 'Radish', 'Spinach'
    ],
    2: [
      'Apple', 'Banana', 'Cherry', 'Grapes', 'Orange',
      'Peach', 'Pear', 'Pineapple', 'Plum', 'Strawberry'
    ]
  };
  food: string[];

  arrayForm: FormGroup;
  locationControl = new FormControl('');

  cityCoordinates: any = [
    {name: 'İstanbul', latitude: '41.0055005', longitude: '28.7319952'},
    {name: 'Paris', latitude: '48.8589507', longitude: '2.2770202'},
    {name: 'London', latitude: '51.5287718', longitude: '-0.2416813'},
    {name: 'New York', latitude: '40.6976701', longitude: '-74.2598654'},
    {name: 'San Francisco', latitude: '37.757815', longitude: '-122.50764'},
    {name: 'Sydney', latitude: '-33.8474027', longitude: '150.6517794'},
    {name: 'Shanghai', latitude: '31.2246325', longitude: '121.1965643'}
  ];
  locations: any[];

  constructor(router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.form = new FormGroup({
      personId: this.personId
    });

    this.arrayForm = new FormGroup({
      locations: this.locationControl
    });

    this.locationControl.valueChanges
      .subscribe((value: any) => {
        console.log('locationControl.valueChanges', value);
      });

    this.locationControl.setValue([
      {latitude: '41.0055005', longitude: '28.7319952'},
      {latitude: '37.757815', longitude: '-122.50764'}
    ]);

    console.log('this.arrayForm.value', this.arrayForm.value);


    this.personId.valueChanges
      .subscribe((value: any) => {
        console.log('personId.valueChanges', value);
      });
  }

  onChange(value: any) {
    console.log('onChange', value);
  }
}
