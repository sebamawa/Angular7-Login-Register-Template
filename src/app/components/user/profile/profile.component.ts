import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/User";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userLogged: User = null;

  constructor(private authService: AuthService, private router: Router) {
    console.log("Instancia creada de ProfileComponent");
  }

  private getUserLogged(): void {
    let usr: User = this.authService.getCurrentUser();
    if (usr != null) {
      this.userLogged = usr;
    }
  }

  onDeleteUser() {
    // id: number = localStorage.getItem('currentUser').id;
    // console.log(JSON.parse(localStorage.getItem("currentUser")).id);
    let ok = confirm("Esta seguro que quiere darse de baja?");
    if (ok) {
      return this.authService.deleteUser(JSON.parse(localStorage.getItem("currentUser")).id)
        .subscribe(data => {
            alert("Usuario eliminado del sistema.");
            this.router.navigate(['/user/login']);
            location.reload(); // recarga pagina
          },
          error => {

          });
    }
  }

  ngOnInit() {
    this.getUserLogged();
  }

}
