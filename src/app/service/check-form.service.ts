import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { }

  checkEmpty(text) {
    if (text == undefined)
      return false;
    else
      return true;
  }

  validatePassword(password, c_password) {
    if (password != c_password)
      return false;
    else
      return true;
  }
}
