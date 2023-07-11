import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';

interface IDiscipline {
  id: string,
  no: string, // Số quyết định
  orgName: string, // Phòng ban
  employeeName: string, // Tên nhân viên
  effectDate: string, // Ngày hiệu lực
  disciplineType: string, // Hình thức
  money: string, //Số tiền phạt
  statusName: string, //Trạng thái
  isTax: string, //Tính thuế
  reason: string, //Lý do kỷ luật
}

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DisciplineComponent implements OnInit {
  discipline!: IDiscipline[];
  selectedId = 0;
  randomImages!: string[];

  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) this.selectedId = parseInt(id);
    this.getDiscipline();

  }

  getDiscipline() {
    this.accountService.getDiscipline()
      .subscribe(response => {
        console.log("discipline",response.body.result)
        if (response.ok && response.status === 200) {
          this.discipline = response.body.result;
        }
      });
  }

}
