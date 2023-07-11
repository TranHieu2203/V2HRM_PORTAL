import { Injectable } from '@angular/core';
import { DataManager, CustomDataAdaptor, AjaxOption } from '@syncfusion/ej2-data';
import { tap } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { CommonHttpRequestService } from './common-http-request.service';

@Injectable({
  providedIn: 'root'
})
export class SyncfusionService {

  private createListHttpRequest = (url: string, option: AjaxOption) => {
    const dataObject = JSON.parse(option.data!);
    const { skip, take } = dataObject;
    const current_page = (skip | 0) / take + 1;
    const page_size = take;

    dataObject.current_page = current_page;
    dataObject.page_size = page_size;
    dataObject.currentPage = current_page; // for some other SERVERS
    dataObject.pageSize = page_size; // for some other SERVERS


    if (this.authService.serverModel.modelName === 'MiukaFoto') dataObject.catID = 7;

    console.log("dataObject", dataObject)

    const req = this.commonHttpRequestService.commonPostRequest('Syncfusion list', url, dataObject)
      .pipe(
        tap(xhttp => {

          console.log("FAKE xhttp", xhttp)

          let request: any = {
            ...dataObject,
            httpRequest: xhttp
          };
          if ((xhttp.status >= 200 && xhttp.status <= 299) || xhttp.status === 304) {

            let data: any = xhttp.body;
  
            if (option.onSuccess) {
              /*
              to bypass convertion error: request.httpRequest.getResponseHeader is not a function
              */
              request.httpRequest = {}
              request.httpRequest.getResponseHeader = (key: string) => {
                console.log("FAKE getResponseHeader for ", key)
                return key
              }
              /* End faking */

              option.onSuccess({
                result: this.authService.serverModel.modelName.includes('MiukaFoto') ? data.list_data : data.data.list_data,
                count: this.authService.serverModel.modelName.includes('MiukaFoto') ? data.total_row : data.data.total_row,
              }, request);
            }
          } else {
            console.log("option.onFailure")
            if (option.onFailure) option.onFailure(request);
          }
  
        })
      ).subscribe();


  }

 
  makeListManager(fullUrl: string): DataManager {

    return new DataManager({
      adaptor: new CustomDataAdaptor({
        getData: (option: AjaxOption) => {
          console.log("getData", option)
          // this.createListRequest(fullUrl, option);
          this.createListHttpRequest(fullUrl, option);
        },
      }),
      crossDomain: true,
      offline: true,

    });
  }


  constructor(
    private authService: AuthService,
    private commonHttpRequestService: CommonHttpRequestService
  ) { }
}
