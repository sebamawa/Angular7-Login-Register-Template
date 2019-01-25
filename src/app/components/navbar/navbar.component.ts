import { AuthService } from './../../services/auth.service';
// import { Location } from '@angular/common';
import { User } from './../../models/User';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../services/preloader.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // app name
  public app_name = 'AppName';
  public isLogged: boolean = false; // para checkear si el usuario esta logueado
  public userLogged: User;

  constructor(private authService: AuthService, private router: Router) {
    // Subscribe here, this automatically update "isLogged" whenever a change to the subject is made.
    this.authService.isLogged.subscribe(
      value => {
        this.isLogged = value;
      }
    );
    this.authService.userLogged.subscribe(
      value => {
        this.userLogged = value;
      }
    );
  }

  onLogout() {
    //this.authService.logoutUser();
    PreloaderService.showPreloader();
    return this.authService.logoutUser()
      .subscribe(
      (data: any) => {
        this.router.navigate(['/user/login']);
        this.authService.isLogged.next(false);
        this.authService.userLogged.next(null);
        PreloaderService.hidePreloader();
      },
        error => {
          // alert("Hubo un error en el logout");
          location.reload();
          PreloaderService.hidePreloader();
        }
    );
    // location.reload(); // actualiza navbar para mostrar opciones de usuario no logueado (login y register)
  }

  onCheckUserLogged(): void {
    let usr: User = this.authService.getCurrentUser();
    if (usr == null) {
      // this.isLogged = false;
      this.authService.isLogged.next(false); // emite evento para actualizar navbar
    } else {
      // this.isLogged = true;
      this.authService.isLogged.next(true);
      // this.userLogged = usr;
      this.authService.userLogged.next(usr);
      // this.dataSharingService.isLogged.next(this.isLogged);
    }
  }

  ngOnInit() {
    this.onCheckUserLogged();
  }

}
