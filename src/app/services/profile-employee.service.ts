import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonHttpRequestService } from './common-http-request.service';
import { AuthService } from './auth.service';
import { Globals } from "src/app/common/globals";
import { HttpClient as Http } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ProfileEmployeeService {


  genderList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])


constructor(private commonHttpRequestService: CommonHttpRequestService,
  private authService: AuthService,
  private globals: Globals,
  @Inject(Http) private http: Http,
) { }

  getEmployeeInfo(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getEmployeeInfo',
      this.authService.serverModel.getEmployeeInfoUrl!
      
    )
  }
  getGender(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getGender',
      this.authService.serverModel.getGendersUrl!
      
    )
  }
  getEmsituation(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getEmsituation',
      this.authService.serverModel.getEmpsituationUrl!
      
    )
  }
  getProvince(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getProvince',
      this.authService.serverModel.getProvincesUrl!
      
    )
  }
  getDistrict(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getDistrict',
      this.authService.serverModel.getDistrictsUrl!
      
    )
  }
  getWard(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getWard',
      this.authService.serverModel.getWardsUrl!
      
    )
  }
  getNation(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getNation',
      this.authService.serverModel.getNationUrl!
      
    )
  }
  getNationality(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getNationality',
      this.authService.serverModel.getNationalityUrl!
      
    )
  }
  getReligion(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getReligion',
      this.authService.serverModel.getReligionUrl!
      
    )
  }
  getListFamilyStatus(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getListFamilyStatus',
      this.authService.serverModel.getListFamilyStatusUrl!
      
    )
  }
  getListStatus(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getListStatus',
      this.authService.serverModel.getListStatusEmpUrl!
      
    )
  }
  getlstResident(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getlstResident',
      this.authService.serverModel.getlstResidentUrl!
      
    )
  }
  uploadFileV2Hrm = (formData: any,_module: string,_function: string): Observable<any> => {
    const url = this.globals.apiUrlFileManager + "file/uploadv2" +"?module=" + _module + "&function=" + _function;
    return this.http.post(url, formData).pipe(
      map((response: any) => {

        return response;
      })
    );
  };
  
  
}

