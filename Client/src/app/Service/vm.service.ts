import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NullTemplateVisitor } from '@angular/compiler';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';



const URL = environment.URL;

//todo: On Change Model

@Injectable({
  providedIn: 'root'
})
export class VmService {


  constructor(private http: HttpClient) { }


  //Register a user
  Register(username: any,email: any, password: any ){
    const url = URL + "/api/users/signup";
    const body = { username: username.toString(), email: email.toString() ,  password: password.toString() };
    return this.http.post(url,body);
  }
  //login a user
  Login(email: any, password: any ){
    const url = URL + "/api/users/signin";
    const body = {email: email.toString() ,  password: password.toString() };
    return this.http.post(url,body);
  }

  AddVm(nom: any, adressIp: any,os: any , etat:any) {
    const url = URL + "/api/vm";
    const body = { nom: nom, adressIp: adressIp, os: os , etat:etat };
    return this.http.post(url, body);
  }

  GetAllVms(){
    const url = URL + "/api/vm/" ;
    return this.http.get(url);
  }
  DeleteVm(id:any){
    const url = URL + "/api/vm/"+id.toString();
    return this.http.delete(url);
  }

  ChanegeVmState(id: any, etat:any){
    const url = URL + "/api/vm/"+id.toString();
    console.log(url== "http://localhost:3000/api/vm/61aa22b64b65908299b33f2e")
    // const url = "http://localhost:3000/api/vm/61aa22b64b65908299b33f2e";
    const body = { etat:etat.toString() };
    return this.http.put(url,body);
  }

}
