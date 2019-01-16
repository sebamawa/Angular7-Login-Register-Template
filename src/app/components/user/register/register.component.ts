import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User} from "../../../models/User";
import {PreloaderService} from "../../../services/preloader.service";
// import Swal, {SweetAlertType} from 'sweetalert2'; // libreria para alerts js
import { SweetAlert2 } from "../../../utilities/sweetalert2/sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User = {
    realm: "",
    email: "",
    password: ""
  };

  public isError = false;
  public msgToUser = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log("Instancia creada de RegisterComponent");
   }

  // register user
  onRegister(form: NgForm): void {
    if (form.valid) {
      PreloaderService.showPreloader();
      this.authService
      .registerUser(this.user.realm, this.user.email, this.user.password)
      .subscribe(user => {
          // console.log(user);
          this.router.navigate(['/user/login']); // una vez registrado se redirige a pagina de login
          PreloaderService.hidePreloader();
          // alert('Registro correcto. Ahora debe loguearse.');
          SweetAlert2.showModalSweetAlert("Registro correcto!", "Ahora debe loguearse", "success");
        },
        (statusText: any) => {
          console.log(statusText);
          this.onMessage("Register Error!: " + statusText.error.error.message);
          PreloaderService.hidePreloader();
          // alert("Hubo un error en el registro " + error);
         }
      );
    } else {
      // alert("Complete los datos requeridos");
      this.onMessage("All data is required");
      PreloaderService.hidePreloader();
    }
  }

  onMessage(msg): void {
    this.isError = true;
    this.msgToUser = msg;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }



  // showModalSweetAlert(title: string, text: string, type: SweetAlertType) {
  //   Swal({
  //     title: title,
  //     text: text,
  //     type: type
  //   });
  // }

  ngOnInit() {
  }

}
