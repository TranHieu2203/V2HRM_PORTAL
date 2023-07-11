import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '../account.service';

interface IContract {
  employeeCode: string, // Mã nhân viên
  employeeName: string, // Họ và tên
  orgName: string, // Phòng ban
  contractNo: string, // Số hợp đồng
  contractTypeName: string, // Loại hợp đồng
  startDate: string, // Ngày bắt đầu
  expireDate: string, //Ngày kết thúc
  signDate: string, //Ngày ký
  signerName: string, //Người ký
  signerPosition: string, //Chức danh người ký
  statusName: string, //Trạng thái
}

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractComponent implements OnInit {
  contracts!: IContract[];
  selectedId = 0;
  randomImages!: string[];
  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) this.selectedId = parseInt(id);
    this.getContracts();

  }

  getContracts() {
    this.accountService.getContract()
      .subscribe(response => {
        console.log("bonus",response.body.result)
        if (response.ok && response.status === 200) {
          this.contracts = response.body.result;
        }
      });
  }

}
