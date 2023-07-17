import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonHttpRequestService } from './common-http-request.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileEmployeeService {


  genderList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])


constructor(private commonHttpRequestService: CommonHttpRequestService,
  private authService: AuthService,
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
  
}

