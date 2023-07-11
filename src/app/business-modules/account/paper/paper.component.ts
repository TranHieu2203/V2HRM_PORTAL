import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';

interface IPaper {
  id: string,
  paperId: string,
  typeId: string,
  pageName: string,
  dateInput: string, // Ngày nộp
  statusId: string,
  url: string,
  note: string, // ghi chú
}

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaperComponent implements OnInit {

  paper!: IPaper[];
  selectedId = 0;
  randomImages!: string[];

  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) this.selectedId = parseInt(id);
    this.getPaper();
  }

  getPaper() {
    this.accountService.getPaper()
      .subscribe(response => {
        if (response.ok && response.status === 200) {
          this.paper = response.body.result;
        }
      });
  }

}
