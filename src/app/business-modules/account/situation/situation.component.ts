import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
interface ISituation {
  relationshipName: string,
  name: string,
  no: string,
  taxNo: string,
  familyNo: string,
  familyName: string,
  address: string,
  birth: string,
  dateStart: string,
  dateEnd: string,
}

@Component({
  selector: 'app-situation',
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SituationComponent implements OnInit {
  situation!: ISituation[];
  selectedId = 0;
  randomImages!: string[];
  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) this.selectedId = parseInt(id);
    this.getSituation();
  }
  getSituation() {
    this.accountService.getSituation()
      .subscribe(response => {
        if (response.ok && response.status === 200) {
          this.situation = response.body.result;
        }
      });
  }

}
