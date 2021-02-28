import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  resultMan: String;
  resultWomen: String;
  result: String;
  name: String;
  foods: any = [];
  displayedColumns: string[] = ['partea_zilei', 'name', 'calories', 'foto_link'];

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      SEX: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  getData() {
    this.name = this.secondFormGroup.controls['name'].value;
    let age = this.secondFormGroup.controls['age'].value;
    let height = this.secondFormGroup.controls['height'].value;
    let weight = this.secondFormGroup.controls['weight'].value;
    let genre = this.firstFormGroup.controls['SEX'].value;
    console.log('firstFormControl ', this.firstFormGroup.controls);
    console.log('secondFormControl ', this.secondFormGroup.controls);
    if (genre === '1') {
      this.resultMan = ((10 * weight) + (6.25 * height) - (5 * age) + 5) + '';
      this.result = this.resultMan;
    }
    else {
      this.resultWomen = ((10 * weight) + (6.25 * height) - (5 * age) - 161) + '';
      this.result = this.resultWomen;
    }

    this.apiService.getFoods().subscribe((data) => {
      this.foods = data;
    });
  }
}
