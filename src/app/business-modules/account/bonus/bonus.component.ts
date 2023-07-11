import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '../account.service';

interface IBonus {
  no: string, // Số quyết đinhj
  commendObjName: string, // Loại khen thưởng
  orgName: string, // Phòng ban
  employees: string, //
  employeeName: string, // Tên nhân viên
  effectDate: string, // Ngày hiệu lực
  commendType: string, // Hình thức
  money: string, //Số tiền
  sourceCostName: string, //Nguồn chi
  statusName: string, //Trạng thái
  isTax: string, //Tính thuế
  reason: string, //Lý do khen thưởng
}

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BonusComponent implements OnInit {

  bonuses!: IBonus[];
  selectedId = 0;
  randomImages!: string[];

  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) this.selectedId = parseInt(id);
    this.getBonuses();

  }

  getBonuses() {
    this.accountService.getBonuses()
      .subscribe(response => {
        console.log("bonus",response.body.result)
        if (response.ok && response.status === 200) {
          this.bonuses = response.body.result;
        }
      });
  }

}
