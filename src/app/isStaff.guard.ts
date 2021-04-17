import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable()
export class IsStaff implements CanActivate {
    constructor(
        private authService: AuthService
    ) {}

    canActivate() {
        if (this.authService.isStaff()) {
            return true;
        } else {
            return false;
        }
    }
}