import { Component, OnDestroy, OnInit } from '@angular/core';
import { VmService } from '../Service/vm.service';

@Component({
  selector: 'app-film-view',
  templateUrl: './vm-view.component.html',
  styleUrls: ['./vm-view.component.css']
})
export class VmViewComponent implements OnInit, OnDestroy {
  vms = [];
  constructor(private vmService: VmService) { }

  ngOnInit(): void {

    this.vmService.GetAllVms().subscribe((res: any) => {
      this.vms = res.result;
    })
  }
  ngOnDestroy() {

  }



}
