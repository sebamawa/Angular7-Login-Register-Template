import { LoginComponent } from './components/user/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import {ProfileComponent} from "./components/user/profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})], // inicializa el router e inicia este para que escuche cambios de ubicacion en el broswer
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
