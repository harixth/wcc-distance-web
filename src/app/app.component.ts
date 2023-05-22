import {Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wcc-distance-web';

  postcodesForm = this.formBuilder.group({
    postcode1: '',
    postcode2: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  Submit() {
    console.log(this.postcodesForm.value);
  }
}
