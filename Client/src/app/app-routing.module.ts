import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VmViewComponent } from './film-view/vm-view.component';
import {SignupComponent} from "./signup/signup.component";
import {SigninComponent} from "./signin/signin.component";

import {NavbarConnectedComponent} from "./navbar-connected/navbar-connected.component";
import {VmAddComponent} from "./vm-add/vm-add.component";

const routes: Routes = [
  {path:'', component: VmViewComponent},
  {path: 'signup' , component: SignupComponent},
  {path: 'signin' , component: SigninComponent},
  {path: 'connected' , component: NavbarConnectedComponent},
  {path: 'addVm' , component: VmAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
