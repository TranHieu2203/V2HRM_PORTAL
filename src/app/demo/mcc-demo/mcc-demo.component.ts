import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IMccInput } from 'src/app/libraries/mcc/mcc-input';

@Component({
  selector: 'app-mcc-demo',
  templateUrl: './mcc-demo.component.html',
  styleUrls: ['./mcc-demo.component.css']
})
export class MccDemoComponent implements OnInit {

  mccDemoForm = this.fb.group({
    firstArticleId: [0, Validators.min(1)],
    secondArticleId: [0, Validators.min(1)],
  });

  inputData1: IMccInput = {
    placeholder: "Pickup a value...",
    searchholder: "Search your value here...",
    form: "this is a form",
    fieldName: "firstArticleId",
    gridDboName: "this is a gridDboName",
    readonly: false,
    disabled: false,
    apiMethod: 'POST',
    apiPath: "https://miukafoto.com/api/Art/article-list",
    apiBody: {
      catId: 7,
    },
    apiPathGetById: "https://miukafoto.com/api/Art/article-one",
    apiBodyGetById: {},
    boundField: "id",
    displayField: "artCaption",
    shownColumns: [
      {
        header: "ID",
        accessor: "id"
      },
      {
        header: "Caption",
        accessor: "artCaption"
      },
      {
        header: "Body",
        accessor: "artBody"
      },
      {
        header: "Edited on",
        accessor: "artModifiedDate",
        type: 'date',
      },
    ],
    listResponseResultProp: 'list_data',
    listResponseCountProp: 'total_row',
    confirmValueBeforeChanges: () => true,
    afterValueChanges: () => console.log("afterValueChanges")
  }

  inputData2: IMccInput = {
    placeholder: "Pickup a value...",
    searchholder: "Search your value here...",
    form: "this is a form",
    fieldName: "secondArticleId",
    gridDboName: "this is a gridDboName",
    readonly: false,
    disabled: false,
    apiMethod: 'POST',
    apiPath: "https://miukafoto.com/api/Art/article-list",
    apiBody: {
      catId: 7,
    },
    apiPathGetById: "https://miukafoto.com/api/Art/article-one",
    apiBodyGetById: {},
    boundField: "id",
    displayField: "artCaption",
    shownColumns: [
      {
        header: "ID",
        accessor: "id"
      },
      {
        header: "Caption",
        accessor: "artCaption"
      },
      {
        header: "Body",
        accessor: "artBody"
      },
      {
        header: "Edited on",
        accessor: "artModifiedDate",
        type: "date",
      },
    ],
    listResponseResultProp: 'list_data',
    listResponseCountProp: 'total_row',
    confirmValueBeforeChanges: () => true,
    afterValueChanges: () => console.log("afterValueChanges")
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void { }

  submit() {
    window.alert(JSON.stringify(this.mccDemoForm.value, null, 2));
  }

  onMccChanged(e: any): void {
    this.mccDemoForm.get(e.fieldName)?.setValue(e.value);
  }

}
