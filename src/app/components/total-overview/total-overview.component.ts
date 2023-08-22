import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { HrProcessService } from 'src/app/services/hr-process.service';
import { __values } from 'tslib';

interface ITotalOverviewItem {
  name: string;
  iconPath: string,
  total: number;
  bgColor: string;
  typeId: number;
}


@Component({
  selector: 'app-total-overview',
  templateUrl: './total-overview.component.html',
  styleUrls: ['./total-overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TotalOverviewComponent implements OnInit {

  processData!: any;
  processDataKey!: any[];
  totalOverviewList: ITotalOverviewItem[] = [];
  constructor(private commonHttpRequestService: CommonHttpRequestService,
    private hrProcessServices: HrProcessService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.hrProcessServices.processList$.subscribe((data) => {
      const groupedKeys = data.reduce((group: { [key: string]: any[] }, item: { process_Name: string | number; }) => {
        if (!group[item.process_Name]) {
          group[item.process_Name] = [];
        }
        group[item.process_Name].push(item);
        return group;
      }, {});
      this.processData = groupedKeys
      this.processDataKey = Object.keys(this.processData)
      this.processDataKey.forEach((e: any) => {
        this.totalOverviewList.push({
          name: e,
          iconPath: this.processData[e][0].icon!,
          total: this.processData[e].length,
          bgColor: "#FBEDD9",
          typeId: this.processData[e][0].type_Id

        })
      })
    })


  }
  goToProcess(event: any) {
    console.log(event)
    this.router.navigate(['hr-process'], { queryParams: { processSelected: event.typeId } });
  }
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
  };

}
