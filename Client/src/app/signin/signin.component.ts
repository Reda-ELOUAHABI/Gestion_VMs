import { Component, OnInit } from '@angular/core';
import {VmService} from "../Service/vm.service";
import {ActivatedRoute, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor( private  service: VmService,
               private route: ActivatedRoute,
               private router: Router ) { }
  allUsers: Array<Map<String, String>> =[];
  logged=false;
  ngOnInit(): void {
  }
//  using FireBase
/*
  TestUser(username: string, password: string) {
    this.service.GetUsers().subscribe((res:any)=>{
      // console.log(Object.values(res));
      Object.values(res).forEach((value: any) => {
  if (username===value.username && password===value.password){
    this.logged=true;
    this.router.navigate(['connected'])
    console.log(this.logged)
    return;
  }
        // console.log(this.logged)
        // this.allUsers.map(value);
        // console.log(value.password);

         // console.log("here")
      })
      if (this.logged==false){
        alert("incorrect inputs")
      }
      // console.log(res)
    })
  }
  */

  //using my own backend
  TestUser(email: string, password: string) {
    this.service.Login(email,password).subscribe(
      (res:any)=>{
      // console.log("User information : " + email + password);
      console.log(res.status);
      // console.log(Object.values(res));



if(res.status){
    this.router.navigate(['connected'])
    return;
  }
      if (!res.status){
        alert("incorrect inputs")
      }
    },
      err => {console.log('HTTP Error', err);
        alert(err.error)
        },
      () => console.log('HTTP request completed.')
      )
  }


}
