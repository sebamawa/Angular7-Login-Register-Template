import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userLogged: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private http: HttpClient) { }

  // register user against loopback api rest
  registerUser(name: string, email: string, password: string) {
    // esto es una prueba
    const url_api = 'http://localhost:3000/api/users'; // local
    // const url_api = 'https://angular-loopback-template.herokuapp.com/api/users'; // loopback api hosteada en heroku
    return this.http.post<User>(
      url_api,
      {
        realm: name,
        email: email,
        password: password
      },
      {headers: this.headers}
    ).pipe(map(data => data));
  }

  loginUser(email: string, password: string): Observable<User> {
    const url_api = 'http://localhost:3000/api/Users/login?include=user'; // local
    // const url_api = 'https://angular-loopback-template.herokuapp.com/api/Users/login?include=user'; // api heroku
    return this.http.post<User>(
      url_api,
      { email, password },  // forma corta de pasar objeto
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  // save user in localstorage from api request (as json)
  setUser(user: User): void {
    let user_string = JSON.stringify(user);
    console.log(user_string);
    localStorage.setItem('currentUser', user_string);
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  // se utilza desde el navbar para ver si el usuario esta logueado recuperandolo del local storage
  getCurrentUser(): User {
    let user_string = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)) {
      let user: User = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  // desloguea desde el server
  logoutUser() {
    let accessToken = localStorage.getItem('accessToken');
    const url_api = `http://localhost:3000/api/users/logout?access_token=${accessToken}`; // local
    // const url_api = `https://angular-loopback-template.herokuapp.com/api/users/logout?access_token=${accessToken}`; // api en heroku
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.post<User>(
      url_api,
      {headers: this.headers});
  }

  deleteUser(id: number) {
    let accessToken = localStorage.getItem('accessToken');
    const url_api = `http://localhost:3000/api/Users/${id}?access_token=${accessToken}`; // local
    // const url_api = `https://angular-loopback-template.herokuapp.com/api/Users/${id}?access_token=${accessToken}`; // api en heroku
    console.log(url_api);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.delete<User>(
      url_api,
      {headers: this.headers}
    );
  }

}
