import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // comprueba si un usuario puede acceder o no a una ruta
  canActivate() {
    if (this.authService.getCurrentUser()) { // se recupera usuario del local storage
      // login TRUE
      return true;
    } else {

      this.router.navigate(['/user/login']);
      return false;
    }
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

}
