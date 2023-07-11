import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '../account.service';

interface Iinschange {
  orgName: string, // Phòng ban
  changeTypeName: string, // Loại biến động
  changeMonth: string, // Tháng biến động
  salaryOld: string, // Hệ số kỳ trước
  salaryNew: string, // Hệ số kỳ này
}

@Component({
  selector: 'app-inschange',
  templateUrl: './inschange.component.html',
  styleUrls: ['./inschange.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InschangeComponent implements OnInit {

  inschange!: Iinschange[];
  selectedId = 0;
  randomImages!: string[];
  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) this.selectedId = parseInt(id);
    this.getInschange();

  }

  getInschange() {
    this.accountService.getInschange()
      .subscribe(response => {
        console.log("Inschange",response.body.result)
        if (response.ok && response.status === 200) {
          this.inschange = response.body.result;
        }
      });
  }

}
