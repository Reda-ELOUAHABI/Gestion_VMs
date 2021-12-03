import { Component, OnInit } from '@angular/core';
import {VmService} from "../Service/vm.service";

@Component({
  selector: 'app-vm-add',
  templateUrl: './vm-add.component.html',
  styleUrls: ['./vm-add.component.css']
})
export class VmAddComponent implements OnInit {

  constructor(private vmService: VmService) { }

  ngOnInit(): void {
  }

  AddVm(nom: string, adressIp: string, os: string, etat: string) {

this.vmService.AddVm(nom,adressIp,os,etat).subscribe((res:any)=>{
  console.log(res);
  alert("Success");
},
  error => {
  alert("Error :  "+error.error)
  })
  }
}
