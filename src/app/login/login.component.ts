import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../service/check-form.service';
import { AuthService } from '../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	username: String;
	password: String;

	constructor(
		private checkForm: CheckFormService,
		private flashMessages: FlashMessagesService,
		private router: Router,
		private authService: AuthService) { }

	ngOnInit() {
	}

	userLogin() {
		const user = {
			username: this.username,
			password: this.password
		}

		if (!this.checkForm.checkEmpty(user.password)) {
			this.flashMessages.show("Introduceti text in campul password", {
				cssClass: 'alert-danger',
				timeout: 4000
			});
			return false;
		}

		this.authService.authUser(user).subscribe(data => {
			if (!data.success) {
				this.flashMessages.show(data.msg, {
					cssClass: 'alert-danger',
					timeout: 4000
				});
			} else {
				this.flashMessages.show("Logare cu succes", {
					cssClass: 'alert-success',
					timeout: 4000
				});
				this.router.navigate(['/dashboard']);
				this.authService.storeUser(data.token, data.user);
			}
		})
	}

}
