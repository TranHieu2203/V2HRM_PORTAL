import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '../account.service';

interface IWorking {
  employeeCode: string, // Mã nhân viên
  employeeName: string, // Họ và tên
  orgName: string, // Phòng ban
  positionName: string, // Chức danh
  decisionNo: string, // Số quyết định
  typeName: string, // Loại quyết định
  effectDate: string, //Ngày hiệu lực
  signDate: string, //Ngày ký
  signerName: string, //Người ký
  signerPosition: string, //Chức danh
  statusName: string, //Trạng thái
}


@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkingComponent implements OnInit {
  workings!: IWorking[];
  selectedId = 0;
  randomImages!: string[];

  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) this.selectedId = parseInt(id);
    this.getWorkings();

  }
  getWorkings() {
    this.accountService.getWorking()
      .subscribe(response => {
        console.log("workingInfo",response.body.result)
        if (response.ok && response.status === 200) {
          this.workings = response.body.result;
        }
      });
  }

}
