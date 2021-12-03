import { Component, Input, OnInit } from '@angular/core';
import { VmService } from "../../Service/vm.service";

@Component({
  selector: 'app-film-component',
  templateUrl: './vm-component.component.html',
  styleUrls: ['./vm-component.component.css']


})
export class VmComponentComponent implements OnInit {
  @Input() vm: any;

  constructor(private vmService: VmService) { }
  ngOnInit(): void {
  }

  deleteVm(id: any) {
    this.vmService.DeleteVm(id).subscribe((res: any) => {
      console.log(res);
      alert("deleted Successfully");
      window.location.reload();
    },
      error => {
        console.log(error.error)
      }
    )

  }

  changerEtat(id: any, etat: any) {
    // je change pas etat dans serveur
    if (etat == 1) {
      etat = 0;
    }
    else {
      etat = 1
    }
    this.vmService.ChanegeVmState(id, etat).subscribe((res: any) => {
      console.log(res);
      alert("changed Successfully");
      window.location.reload();
    },
      error => {
        console.log(error.error)
      }
    )
  }
}
