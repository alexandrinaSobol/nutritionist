import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { CheckFormService } from '../service/check-form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;

  password: String;
  new_pass: String;
  r_new_pass: String;

  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  changePassword() {
    const newpassword = {
      password: this.password,
      new_pass: this.new_pass,
      r_new_pass: this.r_new_pass
    };

    if (!this.checkForm.checkEmpty(newpassword.password)
      || !this.checkForm.checkEmpty(newpassword.new_pass)
      || !this.checkForm.checkEmpty(newpassword.r_new_pass)) {
      this.flashMessages.show("Introduceti text in toate campurile", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }
    if (!this.checkForm.validatePassword(newpassword.new_pass, newpassword.r_new_pass)) {
      this.flashMessages.show("Parola nu coincide cu parola de repetare", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }

    const user = this.authService.getUser();

    const newUserPassword = {
      id: user.id,
      password: newpassword.password,
      new_pass: newpassword.new_pass
    };

    this.authService.changePassword(newUserPassword).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['/dashboard']);
      }
    })
  }

  logout() {
    this.authService.logout();
    this.flashMessages.show("Ati iesit cu success din cont", {
      cssClass: 'alert-warning',
      timeout: 4000
    });
    this.router.navigate(['login']);
    return false;
  }
}
