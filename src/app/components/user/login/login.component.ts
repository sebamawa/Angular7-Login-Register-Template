import { Component, OnInit } from '@angular/core';
import {error} from "selenium-webdriver";
import {User} from "../../../models/User";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
 import { Location } from "@angular/common";
import {PreloaderService} from "../../../services/preloader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isError: boolean = false;
  public msgToUser: string = '';
  public loading: boolean = false; // para mostrar mj de carga (variante a usar el servicio PreloaderService)

  public user: User = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) {
    console.log("Instancia creada de LoginComponent");
  }

  onLogin(form : NgForm){
    if (form.valid) {
      PreloaderService.showPreloader(); // se muestra mensaje de carga
      this.loading = true;
      return this.authService
        .loginUser(this.user.email, this.user.password)
        .subscribe(
          (data: any) => {
            let usr = data.user;
            this.authService.setUser(usr); // data.user es retornado por la api rest de loopback
            const token = data.id; // retornado por la api
            this.authService.setToken(token);
            this.authService.isLogged.next(true);
            this.authService.userLogged.next(usr);
            this.isError = false;
            this.router.navigate(['/user/profile']);
            // location.reload();
            PreloaderService.hidePreloader(); // se oculta mensaje de carga
          },
          error => {
            this.onMessage('Login error!');
            // alert("Hubo un error en el login."); // en principio se ejecuta primero
            PreloaderService.hidePreloader();
            this.loading = false;
          }
        );
    } else {
      this.onMessage('All data is required');
    }
  }

  onMessage(msg): void {
    this.isError = true;
    this.msgToUser = msg;
    setTimeout(() => {
      this.isError = false;
    }, 4000)
  }

  ngOnInit() {
  }

}
