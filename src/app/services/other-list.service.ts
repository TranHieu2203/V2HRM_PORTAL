import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from './common-http-request.service';
import { AuthService } from './auth.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherListService {

  genderList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  provinceList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  districtList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  wardList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  nationList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  nationalityList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  religionList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  familyStatusList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  statusEmpList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  trainingFormIdList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  learningLevelList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  bankIdList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  residentList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  insRegionIdList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  placeIdList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  paperIdList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  companyIdList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  empSituationList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  constructor(private commonHttpRequestService: CommonHttpRequestService, private authService: AuthService) {
    this.commonHttpRequestService.commonGetRequest('getGenderList', this.authService.serverModel.getGendersUrl!)
      .subscribe(x => {
        debugger;
        console.log('vaoday')
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.genderList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getProvinceList', this.authService.serverModel.getProvincesUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.provinceList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getDistrictList', this.authService.serverModel.getDistrictsUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.districtList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getWardList', this.authService.serverModel.getWardsUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.wardList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getNation', this.authService.serverModel.getNationUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.nationList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getNationality', this.authService.serverModel.getNationalityUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.nationalityList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getReligion', this.authService.serverModel.getReligionUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.religionList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getListFamilyStatus', this.authService.serverModel.getListFamilyStatusUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.familyStatusList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getListStatusEmp', this.authService.serverModel.getListStatusEmpUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.statusEmpList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getlstTrainingFormId', this.authService.serverModel.getlstTrainingFormIdUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.trainingFormIdList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('GetListLearningLevel', this.authService.serverModel.GetListLearningLevelUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.learningLevelList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getlstBankId', this.authService.serverModel.getlstBankIdUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.bankIdList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getlstResident', this.authService.serverModel.getlstResidentUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.residentList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getlstInsRegionId', this.authService.serverModel.getlstInsRegionIdUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.insRegionIdList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getlstPlaceId', this.authService.serverModel.getlstPlaceIdUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.placeIdList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getlstPaperId', this.authService.serverModel.getlstPaperIdUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.paperIdList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getlstCompanyId', this.authService.serverModel.getlstCompanyIdUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.companyIdList.next(newList);
        }
      })

      this.commonHttpRequestService.commonGetRequest('getEmpsituation', this.authService.serverModel.getEmpsituationUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.empSituationList.next(newList);
        }
      })
  }
}
