import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user: any;

  baseUri = 'http://localhost:4000/api';

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.baseUri + '/account/reg',
      user,
      {headers: headers}).pipe(map(res => res.json()));
  }

  authUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.baseUri + '/account/auth',
      user,
      {headers: headers}).pipe(map(res => res.json()));
  }

  changePassword(newUserPassword) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.baseUri + '/account/password',
      newUserPassword,
      {headers: headers}).pipe(map(res => res.json()));
  }

  storeUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  isLoggedIn() {
    return tokenNotExpired();
  }
}
