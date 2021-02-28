import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
