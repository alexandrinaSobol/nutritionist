import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../service/check-form.service';
import { AuthService } from '../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  username: String;
  fullname: String;
  email: String;
  pass: String;
  c_pass: String;

  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  userRegister() {
    const user = {
      username: this.username,
      fullname: this.fullname,
      email: this.email,
      password: this.pass,
      c_pass: this.c_pass
    };

    if (!this.checkForm.checkEmpty(user.username)) {
      this.flashMessages.show("Introduceti text in campul username", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }
    if (!this.checkForm.checkEmpty(user.fullname)) {
      this.flashMessages.show("Introduceti text in campul full name", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }
    if (!this.checkForm.checkEmpty(user.email)) {
      this.flashMessages.show("Introduceti text in campul email", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }
    if (!this.checkForm.checkEmpty(user.password)) {
      this.flashMessages.show("Introduceti text in campul password", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }
    if (!this.checkForm.validatePassword(user.password, user.c_pass)) {
      this.flashMessages.show("Parola nu coincide cu parola de repetare", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.router.navigate(['/register']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['/login']);
      }
    });
  }
}