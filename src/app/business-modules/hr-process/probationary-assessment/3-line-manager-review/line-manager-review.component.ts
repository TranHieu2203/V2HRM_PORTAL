import { Component, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-line-manager-review',
  templateUrl: './line-manager-review.component.html',
  styleUrls: ['./line-manager-review.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]

})
export class LineManagerReviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
