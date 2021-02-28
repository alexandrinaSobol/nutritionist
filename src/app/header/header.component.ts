import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
		private flashMessages: FlashMessagesService,
		private router: Router,
		private authService: AuthService) { }

  ngOnInit() {
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
