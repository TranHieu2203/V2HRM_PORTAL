import { ContractComponent } from './../../account/contract/contract.component';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ControlService } from '../_services/control.service';

@Component({
  selector: 'process-view',
  templateUrl: './process-view.component.html',
  styleUrls: ['./process-view.component.scss']
})
export class ProcessViewComponent implements OnInit, AfterViewInit {
  @Input() public selectedDosing: any;
  @ViewChild('stepper') stepper!: MatStepper;
  public processing: boolean = true;
  public selectIndex: number = 0;
  constructor(private controlServices: ControlService) { }

  ngOnInit() {
    this.controlServices.nodeId$.subscribe(value => {
      this.selectedDosing.forEach((data: any, index: any) => {
        if (data.nodeId == value) this.selectIndex = index
      });
    })
  }
  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => '';
  }
}
