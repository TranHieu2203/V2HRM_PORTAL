import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeInfo, Situation } from 'src/app/model/employeeInfo';
import { ProfileEmployeeService } from 'src/app/services/profile-employee.service';
import { OtherListService } from 'src/app/services/other-list.service';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { FieldSettingsModel } from '@syncfusion/ej2-dropdowns';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { Configs } from 'src/app/common/configs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  FilterService,
  VirtualScrollService,
  GridComponent,
} from '@syncfusion/ej2-angular-grids';
import { ToolbarItem } from 'src/app/common/ToolbarItem';
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { Globals } from 'src/app/common/globals';
import { TrainingBefore } from 'src/app/model/trainingbefore';
import { WorkingBefore } from 'src/app/model/workingbefore';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import {
  SelectEventArgs,
  SelectingEventArgs,
} from '@syncfusion/ej2-navigations';

import { TabComponent } from '@syncfusion/ej2-angular-navigations';

// import { Consts } from "src/app/common/const";
const $ = require('jquery');
const _ = require('lodash');
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @ViewChild('tabDefault') tabDefault!: TabComponent;
  @ViewChild('overviewgrid', { static: false })
  public gridInstance!: GridComponent;
  editForm!: FormGroup;
  employeeInfo: EmployeeInfo = new EmployeeInfo();
  situation: Situation = new Situation();
  trainingbefore: TrainingBefore = new TrainingBefore();
  workingbefore: WorkingBefore = new WorkingBefore();
  // employeeInfo = NEW EmployeeInfo();
  tab: any;
  private _unsubscribeAll: Subject<any>;
  removeId: any;
  public query = new Query();
  lstOrgId: any = [];
  lstPositionId: any = [];
  lstStaffRank: any = [];
  lstDirectManagerId: any = [];
  lstGenderId: any = [];
  lstReligionId: any = [];
  lstNativeId: any = [];
  lstNationalityId: any = [];
  lstWorkStatusId: any = [];
  lstProvinceId: any = [];
  lstDistrictId: any = [];
  lstWardId: any = [];
  lsthomeProvinceId: any = [];
  lsthomeDistrictId: any = [];
  lsthomeWardId: any = [];
  lstCurProvinceId: any = [];
  lstCurDistrictId: any = [];
  lstCurWardId: any = [];
  lstContractId: any = [];
  lstLastWorkingId: any = [];
  lstObjectSalaryId: any = [];
  lstMaritalStatusId: any = [];
  lstBankId: any = [];
  lstBankBranchId: any = [];
  lstSchoolId: any = [];
  lstQualificationId: any = [];
  lstTrainingFormId: any = [];
  lstLearningLevelId: any = [];
  lstEmpSituation: any;
  lstResident: any = [];
  lstInsRegionId: any = [];
  lstPaperId: any = [];
  lstPlaceId: any = [];
  lstCertificate: any = [];
  lstFormTrain: any = [];
  lstSpecialized: any = [];
  lstCompanyId: any = [];

  dataFamilyEdit: any;
  dataTraining: any;
  dataTrainingEdit: any;
  dataWorkingBeforeEdit: any;
  dataWorkingBefore: any;
  dataDecision: any;
  dataFamily: any;
  dataContract: any;
  dataCommend: any;
  dataDiscipline: any;
  dataInsChange: any;
  lstExperienceId: any = [];
  public fields: FieldSettingsModel = { value: 'key', text: 'value' };
  public fields1: FieldSettingsModel = { value: 'id', text: 'name' };
  public curentTab: string = 'profile';
  public checkWorkingBefore: number = 0;
  public checkTrainingBefore: number = 0;
  constructor(
    private profileEmployeeService: ProfileEmployeeService,
    private otherListService: OtherListService,
    private commomHttpService: CommonHttpRequestService,
    private globals: Globals,
    private _formBuilder: FormBuilder
  ) {
    this.editForm = this._formBuilder.group({
      currentinfor: this._formBuilder.group({
        firstName: [
          '',
          [Validators.required, this.globals.noWhitespaceValidator],
        ],
        lastName: [
          '',
          [Validators.required, this.globals.noWhitespaceValidator],
        ],
        taxCode: ['', [Validators.required, this.globals.noWhitespaceValidator]], //Mã sô thuế
        placeId: ['', [Validators.required]],
        // orgName: ['',[]],
        // positionName: ['',[]]
      }),
      infor: this._formBuilder.group({
        birthDate: ['', [Validators.required]],
        genderId: ['', [Validators.required]],
        birthPlace: ['', [Validators.required, this.globals.noWhitespaceValidator]],
        idNo: ['', [Validators.required]], //CMND
        idDate: ['', [Validators.required]], //Ngày cấp
        idPlace: ['', [Validators.required]], //Nơi cấp
       
        nationalityId: ['', [Validators.required]], //Quốc tịch
        nativeId: ['', [Validators.required]], //Dân tộc
        religionId: ['', [Validators.required]], //Tôn giáo
        maritalStatusId: ['', [Validators.required]], //Tình trạng hôn nhân
        residentId: ['', [Validators.required]],
        experienceId: ['', [Validators.required]]
      }),
      homeAddress: this._formBuilder.group({
        homeAddress: ['', [Validators.required]],
        homeProvinceId: ['', [Validators.required]],
        homeDistrictId: ['', [Validators.required]],
        homeWardId: ['', [Validators.required]],

      }),
      address: this._formBuilder.group({
        address: ['', [Validators.required]],
        provinceId: ['', [Validators.required]],
        districtId: ['', [Validators.required]],
        wardId: ['', [Validators.required]],
      }),
      curAddress: this._formBuilder.group({
        curAddress: ['', [Validators.required]],
        curProvinceId: ['', [Validators.required]],
        curDistrictId: ['', [Validators.required]],
        curWardId: ['', [Validators.required]],
      }),
      contact: this._formBuilder.group({
        mobilePhone: ['', [Validators.required]],
        email: ['', [Validators.required]],
        workEmail: ['', [Validators.required]],
        contactPer: ['', [Validators.required]], //Người liên hệ khi cần
        contactPerPhone: ['', [Validators.required]],
      }),
      addinfo: this._formBuilder.group({
        passNo: ['', []], //Hộ chiếu
        passDate: ['', []], //Ngày cấp
        passExpire: ['', []],
        passPlace: ['', []],
        visaNo: ['', []],
        visaDate: ['', []],
        visaExpire: ['', []],
        visaPlace: ['', []],
        workPermit: ['', []], //Giấy phép lao động
        workPermitDate: ['', []],
        workPermitExpire: ['', []],
        workPermitPlace: ['', []],
        workNo: ['', []],
        workDate: ['', []],
        workScope: ['', []],
        workPlace: ['', []],
      }),
      user: this._formBuilder.group({
        bankId: ["", []],
        bankBranch: ["", []],
        bankNo: ["", []],
      }),
      education: this._formBuilder.group({
        schoolId: ['', [Validators.required]],
        qualificationId: ['', [Validators.required]], //Trình độ chuyên môn
        trainingFormId: ['', [Validators.required]], //Hình thức đào tạo
        learningLevelId: ['', [Validators.required]], //trình độ học vấn
        languageMark: ['', []], //điểm số
        language: ['', []], //ngoại ngữ
      }),
      situation: this._formBuilder.group({
        name: ['', [Validators.required]],
        birth: ['', []],
        no: ['', [Validators.required]], // CMND
        taxNo: ['', [Validators.required]], // CMND
        familyNo: ['', [Validators.required]], // CMND
        familyName: ['', [Validators.required]], // CMND
        address: ['', [Validators.required]], // CMND
        relationshipId: ['', [Validators.required]],
        dateStart: ['', []],
        dateEnd: ['', []],
      }),
      trainingbefore: this._formBuilder.group({
        yearGra: ['', [Validators.required]],
        nameSchools: ['', [Validators.required]],
        fromDate: ['', [Validators.required]],
        toDate: ['', [Validators.required]],
        certificateTypeId: ['', [Validators.required]],
        formTrainId: ['',[Validators.required]],
        specializedTrainId: ['',[Validators.required]],
        resultTrain: ['',[Validators.required]],
        note: ['',[Validators.required]],
        effectiveDateFrom: ['', [Validators.required]],
        effectiveDateTo: ['', [Validators.required]],
      }),
      workingbefore: this._formBuilder.group({
        orgName: ['', [Validators.required]],
        joinDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        companyAddress: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        salary: ['', [Validators.required]],
        titleName: ['', [Validators.required]],
        levelName: ['', [Validators.required]],
        reference: ['', [Validators.required]],
        remark: ['', [Validators.required]],
        workDetail: ['', [Validators.required]],
        terReason: ['', [Validators.required]],
        companyId: ['', [Validators.required]],
      }),
    });
    this._unsubscribeAll = new Subject();
    this.loadData();
  }

  ngOnInit() { }
  changeTab(e: SelectEventArgs) {
    this.tabDefault.selectedItem;
  }


  public onFiltering(e: any, a: any) {
    e.preventDefaultAction = true;
    const predicate = new Predicate('value', 'contains', e.text, true, true);
    this.query = new Query();
    this.query = e.text !== '' ? this.query.where(predicate) : this.query;
    e.updateData(a, this.query);
  }
  changeDate = (model: any) => {
    setTimeout(() => {
      const idDate = '#' + model + '_input';
      const value = $(idDate).val();
      //get form group of control
      let form: any;
      for (let field in this.editForm.controls) {
        if (this.editForm.controls[field].get(model)) {
          form = this.editForm.controls[field].get(model);
        }
      }
      var patt = new RegExp(
        'q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m'
      );
      if (value.length === 0) {
        form.setErrors({ required: true });
        return;
      } else if (value.length > 0 && patt.test(value.toLowerCase()) === true) {
        form.setErrors({ incorrect: true });
        return;
      } else if (value.length > 10) {
        form.setErrors({ incorrect: true });
        return;
      } else {
        form.clearValidators();
      }
      if (
        value &&
        ((value.length === 8 && value.indexOf('/') === -1) ||
          (value.length === 6 && value.indexOf('/') === -1) ||
          (value.length === 10 && value.indexOf('/') > -1))
      ) {
        if (value.indexOf('-') === -1) {
          const returnDate = this.globals.replaceDate(value);
          // (this.model as any)[model] = returnDate;
          if (returnDate && returnDate.length > 0) {
            $(idDate).val(returnDate);
            const dateParts: any = returnDate.split('/');
            (this.employeeInfo as any)[model] = new Date(
              +dateParts[2],
              dateParts[1] - 1,
              +dateParts[0]
            );
            form.clearValidators();
          }
        }
      }
    }, 200);
  };

  loadData() {
    Promise.all([this.getById()]).then((res: any) => {
      this.otherListService.nationList.subscribe((res: any) => {
        this.lstNativeId = res;
      });

      this.otherListService.nationalityList.subscribe((res: any) => {
        this.lstNationalityId = res;
      });

      this.otherListService.religionList.subscribe((res: any) => {
        this.lstReligionId = res;
      });
      this.otherListService.statusEmpList.subscribe((res: any) => {
        this.lstWorkStatusId = res;
      });
      this.otherListService.provinceList.subscribe((res: any) => {
        this.lstProvinceId = res;
        this.lstCurProvinceId = res;
        this.lsthomeProvinceId = res;
      });


      this.otherListService.familyStatusList.subscribe((res: any) => {
        this.lstMaritalStatusId = res;
      });
      this.otherListService.empSituationList.subscribe((res: any) => {
        this.lstEmpSituation = res;
      });
      this.otherListService.trainingFormIdList.subscribe((res: any) => {
        this.lstTrainingFormId = res;
      });
      this.otherListService.learningLevelList.subscribe((res: any) => {
        this.lstLearningLevelId = res;
      });
      this.otherListService.bankIdList.subscribe((res: any) => {
        this.lstBankId = res;
      });
      this.otherListService.residentList.subscribe((res: any) => {
        this.lstResident = res;
      });
      this.otherListService.insRegionIdList.subscribe((res: any) => {
        this.lstInsRegionId = res;
      });
      this.otherListService.paperIdList.subscribe((res: any) => {
        this.lstPaperId = res;
      });

      this.otherListService.placeIdList.subscribe((res: any) => {
        this.lstPlaceId = res;
      });
      this.otherListService.experienceList.subscribe((res: any) => {
        this.lstExperienceId = res;
      });
      // this.commomHttpService
      //   .commonGetRequest('laythongtin', 'hr/otherlist/CERTIFICATE_TYPE')
      //   .subscribe((res: any) => {
      //     // this.lstCertificate = res;
      //     this.lstCertificate = res;
      //   });
      this.otherListService.companyIdList.subscribe((res: any) => {
        this.lstCompanyId = res;
      });

      this.otherListService.genderList.subscribe((res: any) => {
        this.lstGenderId = res;
      });
      this.otherListService.certificateList.subscribe((res: any) => {
        this.lstCertificate = res;
      });

      this.otherListService.formTrainList.subscribe((res: any) => {
        this.lstFormTrain = res;
      });

      this.otherListService.specializedList.subscribe((res: any) => {
        this.lstSpecialized = res;
      });
      this.otherListService.bankIdList.subscribe((res: any) => {
        this.lstBankId = res;
      });
      this.employeeInfo = _.cloneDeep(
        _.omit(
          res[0].body.result,
          ['districtId', 'wardId'],
          ['curDistrictId', 'curWardId'],
          ['homeDistrictId', 'homeWardId'],
          ['bankBranch']
        )
      );
      this.loadDatalazy(res[0].body.result);
      this.getListSituation();
      this.getListSituationProfile();
      this.getListTrainingBefore();
      this.getListTrainingBeforeProfile();
      this.getListWorkingBefore();
      this.getListWorkingBeforeProfile();
      this.getListDecisionProfile();
      this.getListContractProfile();
      this.getListCommendProfile();
      this.getListDisciplineProfile();
      this.getListInsChangeProfile();
    });
  }
  loadDatalazy(model: EmployeeInfo) {
    if (model && model.homeProvinceId) {
      this.getDistrict(model.homeProvinceId)
        .then((res: any) => {
          this.lsthomeDistrictId = res.body.data;
        })
        .then((x) => {
          this.employeeInfo.homeDistrictId = model.homeDistrictId;
        });

      this.getWard(model.homeDistrictId)
        .then((res: any) => {
          this.lsthomeWardId = res.body.data;
        })
        .then((x) => {
          this.employeeInfo.homeWardId = model.homeWardId;
        });
    }
    if (model && model.provinceId) {
      this.getDistrict(model.provinceId)
        .then((res: any) => {
          this.lstDistrictId = res.body.data;
        })
        .then((x) => {
          this.employeeInfo.districtId = model.districtId;
        });

      this.getWard(model.districtId)
        .then((res: any) => {
          this.lstWardId = res.body.data;
        })
        .then((x) => {
          this.employeeInfo.wardId = model.wardId;
        });
    }
    if (model && model.curProvinceId) {
      this.getDistrict(model.curProvinceId)
        .then((res: any) => {
          this.lstCurDistrictId = res.body.data;
        })
        .then((x) => {
          this.employeeInfo.curDistrictId = model.curDistrictId;
        });
      this.getWard(model.curDistrictId)
        .then((res: any) => {
          this.lstCurWardId = res.body.data;
        })
        .then((x) => {
          this.employeeInfo.curWardId = model.curWardId;
        });
    }
    if (model && model.bankId) {
      this.getBankBranch(model.bankId)
        .then((res: any) => {
          this.lstBankBranchId = res.body.data;
        })
        .then((x) => {
          this.employeeInfo.bankBranch = model.bankBranch;
        });
    }
    if (model && model.bankId) {
      this.getBankBranch(model.bankId)
        .then((res: any) => {
          this.lstBankBranchId = res.body.data;
        })
        .then((x) => {
          this.employeeInfo.bankBranch = model.bankBranch;
        });

    }
  }
  getListSituation() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        'hr/Employee/ListSituationEdit'
      )
      .subscribe((res: any) => {
        this.dataFamilyEdit = res.body.data;
        this.gridInstance.refresh();
      });
  }
  getListSituationProfile() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        'hr/Employee/ListSituation'
      )
      .subscribe((res: any) => {
        this.dataFamily = res.body.data;
        this.gridInstance.refresh();
      });
  }

  getListTrainingBefore() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        'hr/Employee/ListTrainingBeforeEdit'
      )
      .subscribe((res: any) => {
        this.dataTrainingEdit = res.body.data;
        if (this.dataTrainingEdit.length !== 0) {
          this.checkTrainingBefore = 1;
          
        }
      });
  }
  getListTrainingBeforeProfile() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        'hr/Employee/ListTrainingBefore'
      )
      .subscribe((res: any) => {
        this.dataTraining = res.body.data;
        if (this.dataTraining.length !== 0) {
          this.checkTrainingBefore = 1;
          
        }
      });
  }
  getListWorkingBefore() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        'hr/Employee/ListWorkingBeforeEdit'
      )
      .subscribe((res: any) => {
        this.dataWorkingBeforeEdit = res.body.data;
        if (this.dataWorkingBeforeEdit.length !== 0) {
          this.checkWorkingBefore = 1;
          
        }
      });
  }
  getListWorkingBeforeProfile() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        'hr/Employee/ListWorkingBefore'
      )
      .subscribe((res: any) => {
        this.dataWorkingBefore = res.body.data;
        if (this.dataWorkingBefore.length !== 0) {
          this.checkWorkingBefore = 1;
          
        }
      });
  }
  getListDecisionProfile() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        "hr/working/GetAllPortal?PageNo=1&PageSize=500&orgId=1&IsShow=1"
      )
      .subscribe((res: any) => {
        this.dataDecision = res.body.data;

      });
  }
  getListContractProfile() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        "hr/contract/GetAllPortal?PageNo=1&PageSize=500&orgId=1&IsShow=1"
      )
      .subscribe((res: any) => {
        this.dataContract = res.body.data;

      });
  }
  getListCommendProfile() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        "hr/commend/GetAllPortal?PageNo=1&PageSize=500&orgId=1&IsShow=1"
      )
      .subscribe((res: any) => {
        this.dataCommend = res.body.data;

      });
  }
  getListDisciplineProfile() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        "hr/discipline/GetAllPortal?PageNo=1&PageSize=500&orgId=1&IsShow=1"
      )
      .subscribe((res: any) => {
        this.dataDiscipline = res.body.data;

      });
  }
  getListInsChangeProfile() {
    this.commomHttpService
      .commonGetRequest(
        'laythongtin',
        "hr/inschange/GetAllPortal?PageNo=1&PageSize=500&orgId=1&IsShow=1"
      )
      .subscribe((res: any) => {
        this.dataInsChange = res.body.data;

      });
  }
  getById() {
    return new Promise((resolve) => {
      this.profileEmployeeService.getEmployeeInfo().subscribe((res: any) => {
        if (res.status == 200) {
          // this.employeeInfo = res.body.result;
          resolve(res);
        }
      });
    });
  }
  getGender() {
    return;
  }
  getEmpSituation() {
    return new Promise((resolve) => {
      this.otherListService.empSituationList.subscribe((res: any) => {
        // this.lstEmpSituation = res;
        resolve(res);
      });
    });
  }
  getNation() {
    return new Promise((resolve) => {
      this.otherListService.nationList.subscribe((res: any) => {
        // this.lstNativeId = res;
        resolve(res);
      });
    });
  }
  getNationality() {
    return new Promise((resolve) => {
      this.otherListService.nationalityList.subscribe((res: any) => {
        // this.lstNationalityId = res;
        resolve(res);
      });
    });
  }
  getReligion() {
    return new Promise((resolve) => {
      this.otherListService.religionList.subscribe((res: any) => {
        // this.lstReligionId = res;
        resolve(res);
      });
    });
  }
  getListFamilyStatus() {
    return new Promise((resolve) => {
      this.otherListService.familyStatusList.subscribe((res: any) => {
        // this.lstMaritalStatusId = res;
        resolve(res);
      });
    });
  }
  getListStatusEmp() {
    return new Promise((resolve) => {
      this.otherListService.statusEmpList.subscribe((res: any) => {
        // this.lstWorkStatusId = res;
        resolve(res);
      });
    });
  }

  getProvince() {
    return new Promise((resolve) => {
      this.otherListService.provinceList.subscribe((res: any) => {
        // this.lstProvinceId = res;
        // this.lstCurProvinceId = res;
        resolve(res);
      });
    });
  }
  getlstTrainingFormId() {
    //hình thức đào tạo
    return new Promise((resolve) => {
      this.otherListService.trainingFormIdList.subscribe((res: any) => {
        // this.lstTrainingFormId = res;
        resolve(res);
      });
    });
  }
  GetListLearningLevel() {
    //trình độ học vấn
    return new Promise((resolve) => {
      this.otherListService.learningLevelList.subscribe((res: any) => {
        // this.lstLearningLevelId = res;
        resolve(res);
      });
    });
  }
  getlstBankId() {
    //hình thức đào tạo
    return new Promise((resolve) => {
      this.otherListService.bankIdList.subscribe((res: any) => {
        // this.lstBankId = res;
        resolve(res);
      });
    });
  }
  getlstResident() {
    //đối tượng thường trú
    return new Promise((resolve) => {
      this.otherListService.residentList.subscribe((res: any) => {
        // this.lstResident = res;
        resolve(res);
      });
    });
  }

  getlstInsRegionId() {
    //vùng bảo hiểm
    return new Promise((resolve) => {
      this.otherListService.religionList.subscribe((res: any) => {
        // this.lstReligionId = res;

        resolve(res);
      });
    });
  }
  getlstPlaceId() {
    return new Promise((resolve) => {
      this.otherListService.placeIdList.subscribe((res: any) => {
        // this.lstPlaceId = res;
        resolve(res);
      });
    });
  }
  getlstPaperId() {
    //đối tượng thường trú
    return new Promise((resolve) => {
      this.otherListService.paperIdList.subscribe((res: any) => {
        // this.lstPaperId = res;
        resolve(res);
      });
    });
  }
  getlstCompanyId() {
    //đối tượng thường trú
    return new Promise((resolve) => {
      // this._coreService
      //   .Get("hr/otherlist/COMPANY_BEFORE")
      //   .subscribe((res: any) => {
      //     resolve(res.data);
      //   });
      this.otherListService.companyIdList.subscribe((res: any) => {
        // this.lstCompanyId = res;
        resolve(res);
      });
    });
  }
  changeProvince(e: any) {
    if (e.e) {
      this.employeeInfo.districtId = undefined;

      this.lstDistrictId = [];
      this.employeeInfo.wardId = undefined;
      this.lstWardId = [];

      this.getDistrict(e.itemData.key).then((res: any) => {
        this.lstDistrictId = res.body.data;
      });
    }
  }
  changehomeProvince(e: any) {
    if (e.e) {
      this.employeeInfo.homeDistrictId = undefined;

      this.lsthomeDistrictId = [];
      this.employeeInfo.homeWardId = undefined;
      this.lsthomeWardId = [];

      this.getDistrict(e.itemData.key).then((res: any) => {
        this.lsthomeDistrictId = res.body.data;
      });
    }
  }
  changeCurProvince(e: any) {
    if (e.e) {
      this.employeeInfo.curDistrictId = undefined;
      this.lstCurDistrictId = [];
      this.employeeInfo.curWardId = undefined;
      this.lstCurWardId = [];
      this.getDistrict(e.itemData.key).then((res: any) => {
        this.lstCurDistrictId = res.body.data;
      });
    }
  }
  changeDistrict(e: any) {
    if (e.e) {
      this.employeeInfo.wardId = undefined;
      this.lstWardId = [];
      this.getWard(e.itemData.id).then((res: any) => {
        this.lstWardId = res.body.data;
      });
    }
  }
  changehomeDistrict(e: any) {
    if (e.e) {
      this.employeeInfo.homeWardId = undefined;
      this.lsthomeWardId = [];
      this.getWard(e.itemData.id).then((res: any) => {
        this.lsthomeWardId = res.body.data;
      });
    }
  }
  changeCurDistrict(e: any) {
    if (e.e) {
      this.employeeInfo.curWardId = undefined;
      this.lstCurWardId = [];
      this.getWard(e.itemData.id).then((res: any) => {
        this.lstCurWardId = res.body.data;
      });
    }
  }
  changeBank(e: any) {
    if (e.e) {
      this.lstBankBranchId = [];
      this.getBankBranch(e.itemData.key).then((res: any) => {
        this.lstBankBranchId = res.body.data;
      });
    }
  }
  changeName() {
    this.employeeInfo.fullname =
      this.employeeInfo.firstName + ' ' + this.employeeInfo.lastName;
  }
  getBankBranch(id: number) {
    return new Promise((resolve) => {
      if (id) {
        this.commomHttpService
          .commonGetRequest(
            'laythongtin',
            'hr/bank/GetListBankBranch?bankId=' + id
          )
          .subscribe((res: any) => {
            // this.lstDistrictId = res.data
            resolve(res);
          });
      } else {
        resolve(false);
      }
    });
  }
  getDistrict(id: number) {
    return new Promise((resolve) => {
      if (id) {
        this.commomHttpService
          .commonGetRequest(
            'laythongtin',
            'hr/province/getListDistrict?provinceId=' + id
          )
          .subscribe((res: any) => {
            // this.lstDistrictId = res.body.data;
            resolve(res);
          });
      } else {
        resolve(false);
      }
    });
  }

  getWard(id: any) {
    return new Promise((resolve) => {
      this.commomHttpService
        .commonGetRequest(
          'laythongtin',
          'hr/province/getListWard?districtid=' + id
        )
        .subscribe((res: any) => {
          resolve(res);
        });
    });
  }
  getlstCertificate() {
    return new Promise((resolve) => {
      this.commomHttpService
        .commonGetRequest('laythongtin', 'hr/otherlist/CERTIFICATE_TYPE')
        .subscribe((res: any) => {
          // this.lstCertificate = res;
          resolve(res);
        });
    });
  }
  getlstFormTrain() {
    return new Promise((resolve) => {
      this.commomHttpService
        .commonGetRequest('laythongtin', 'hr/otherlist/GetListTrainingForm')
        .subscribe((res: any) => {
          // this.lstFormTrain = res;
          resolve(res);
        });
    });
  }
  getlstSpecialized() {
    return new Promise((resolve) => {
      this.commomHttpService
        .commonGetRequest('laythongtin', 'hr/otherlist/SPECIALIZED_TRAIN')
        .subscribe((res: any) => {
          // this.lstSpecialized = res;
          resolve(res);
        });
    });
  }

  RemoveRelation(id: any) {
    this.removeId = id;
    if (this.situation.status == 1) {
      this.DeleteSituation(this.removeId);
    } else {
      alert('Bản ghi đã phê duyệt, không được xóa');
    }
  }
  RemoveRelation1(id: any) {
    this.removeId = id;
    if (this.trainingbefore.status == 1) {
      this.DeleteTrainingBeforeEdit(this.removeId);
    } else {
      alert('Bản ghi đã phê duyệt, không được xóa');
    }
  }
  RemoveRelation2(id: any) {
    this.removeId = id;
    if (this.workingbefore.status == 1) {
      this.DeleteWorkingBeforeEdit(this.removeId);
    } else {
      alert('Bản ghi đã phê duyệt, không được xóa');
    }

    this.getListWorkingBefore();
  }
  DeleteSituation(id: any) {
    return new Promise((resolve) => {
      this.commomHttpService
        .commonPostRequest(
          'laythongtin',
          'hr/Employee/RemoveRelationEdit?id=',
          id
        )
        .subscribe((res: any) => {
          this.getListSituation();
        });
    });
  }

  DeleteTrainingBeforeEdit(id: any) {
    this.commomHttpService
      .commonPostRequest(
        'laythongtin',
        'hr/Employee/RemoveTrainingBeforeEdit?id=',
        id
      )
      .subscribe((res: any) => {
        this.getListTrainingBefore();
      });
  }
  DeleteWorkingBeforeEdit(id: any) {
    this.commomHttpService
      .commonPostRequest(
        'laythongtin',
        'hr/Employee/RemoveWorkingBeforeEdit?id=',
        id
      )
      .subscribe((res: any) => {
        this.getListWorkingBefore();
      });
  }
  convertModel(param: any) {
    let model = _.cloneDeep(param);

    model.birthDate = model.birthDate
      ? moment(model.birthDate).format('YYYY-MM-DD')
      : null;
    model.idDate = model.idDate
      ? moment(model.idDate).format('YYYY-MM-DD')
      : null;
    model.joinDate = model.joinDate
      ? moment(model.joinDate).format('YYYY-MM-DD')
      : null;
    model.terEffectDate = model.terEffectDate
      ? moment(model.terEffectDate).format('YYYY-MM-DD')
      : null;
    model.passDate = model.passDate
      ? moment(model.passDate).format('YYYY-MM-DD')
      : null;
    model.passExpire = model.passExpire
      ? moment(model.passExpire).format('YYYY-MM-DD')
      : null;
    model.visaDate = model.visaDate
      ? moment(model.visaDate).format('YYYY-MM-DD')
      : null;
    model.visaExpire = model.visaExpire
      ? moment(model.visaExpire).format('YYYY-MM-DD')
      : null;
    model.workPermitDate = model.workPermitDate
      ? moment(model.workPermitDate).format('YYYY-MM-DD')
      : null;
    model.workPermitExpire = model.workPermitExpire
      ? moment(model.workPermitExpire).format('YYYY-MM-DD')
      : null;
    model.contractDateEffect = model.contractDateEffect
      ? moment(model.contractDateEffect).format('YYYY-MM-DD')
      : null;
    model.workDate = model.workDate
      ? moment(model.workDate).format('YYYY-MM-DD')
      : null;
    return model;
  }
  rowSelectingFamilyEdit(e: any) {
    this.situation = e.data;
  }
  rowDeselectedFamilyEdit(e: any) {
    this.situation = new Situation();

    this.situation.id = 0;
  }
  rowSelectingFamily(e: any) {
    this.situation = e.data;
    this.situation.idFamily = this.situation.id;
    this.situation.id = undefined;
  }
  rowDeselectedFamily(e: any) {
    this.situation = new Situation();
    this.situation.idFamily = undefined;
    this.situation.id = 0;
  }
  rowSelectingTrainingEdit(e: any) {
    this.trainingbefore = e.data;
  }
  rowDeselectedTrainingEdit(e: any) {
    this.trainingbefore = new TrainingBefore();
    this.trainingbefore.id = 0;
  }
  rowSelectingTraining(e: any) {
    this.trainingbefore = e.data;
    this.trainingbefore.idTraining = this.trainingbefore.id;
    this.trainingbefore.id = undefined;
  }
  rowDeselectedTraining(e: any) {
    this.trainingbefore = new TrainingBefore();
    this.trainingbefore.idTraining = undefined;
    this.trainingbefore.id = 0;
  }
  rowSelectingWorkingBeforeEdit(e: any) {
    this.workingbefore = e.data;
  }
  rowDeselectedWorkingBeforeEdit(e: any) {
    this.workingbefore = new WorkingBefore();
    this.workingbefore.id = 0;
  }

  rowSelectingWorkingBefore(e: any) {
    this.workingbefore = e.data;
    this.workingbefore.idWorking = this.workingbefore.id;
    this.workingbefore.id = undefined;
  }
  rowDeselectedWorkingBefore(e: any) {
    this.workingbefore = new WorkingBefore();
    this.workingbefore.idWorking = undefined;
    this.workingbefore.id = 0;
  }

  saveForm() {
    
    // Lưu gia cảnh
    if (this.tabDefault.selectedItem == 4) {
      
      if (!this.editForm.get('situation')?.valid) {
        alert('Form chưa hợp lệ !');
        // this.notification.warning("Form chưa hợp lệ !");
        this.editForm.markAllAsTouched();
        return;
      }
      let param = this.convertModel(this.situation);
      if (param.status == 2 || param.status == 3) {
        alert('Bản ghi đã được phê duyệt hoặc từ chối, không thể sửa');
        return;
      }
      return new Promise((resolve) => {
        this.commomHttpService
          .commonPostRequest('INSERT', 'portal/employee/AddSituation', param)
          .subscribe((res: any) => {
            if (res.statusCode == 400) {
              alert('lỗi');
            } else {
              this.editForm.controls['situation'].reset();
              this.getListSituation();
              alert('thành công');
              // this.router.navigate(["/cms/profile/business/staffprofile"]);
            }
          });
      });

      // Lưu quá trình đào tạo trước đây
    } else if (this.tabDefault.selectedItem == 5) {
      
      if (!this.editForm.get('trainingbefore')?.valid) {
        alert('Form chưa hợp lệ !');
        // this.notification.warning("Form chưa hợp lệ !");
        this.editForm.markAllAsTouched();
        return;
      }
      let param = this.convertModel(this.trainingbefore);
      if (this.checkTrainingBefore == 0) {
        let param1 = this.convertModel(this.employeeInfo);
        if (!this.editForm.get('currentinfor')?.valid || !this.editForm.get('infor')?.valid 
        || !this.editForm.get('homeAddress')?.valid || !this.editForm.get('address')?.valid 
        || !this.editForm.get('curAddress')?.valid || !this.editForm.get('contact')?.valid)
         {
          alert('Form sơ yếu lý lịch chưa hợp lệ !');
          // this.notification.warning("Form chưa hợp lệ !");
          this.editForm.markAllAsTouched();
          return;
        }
        new Promise((resolve) => {this.commomHttpService
          .commonPostRequest('INSERT', 'portal/employee/EditInfomation', param1)
          .subscribe((res: any) => {
              
          })});
      }
      if (param.status == 2 || param.status == 3) {
        alert('Bản ghi đã được phê duyệt hoặc từ chối, không thể sửa');
        return;
      }
      return new Promise((resolve) => {
        this.commomHttpService
          .commonPostRequest(
            'INSERT',
            'portal/employee/AddTrainingBeforeEdit',
            param
          )
          .subscribe((res: any) => {
            if (res.statusCode == 400) {
              alert('lỗi');
            } else {
              this.editForm.controls['trainingbefore'].reset();
              this.getListTrainingBefore();
              alert('thành công');
              // this.router.navigate(["/cms/profile/business/staffprofile"]);
            }
          });
      });

      // Lưu quá trình công tác trước đây
    } else if (this.tabDefault.selectedItem == 6) {
      if (!this.editForm.get('workingbefore')?.valid) {
        alert('Form chưa hợp lệ !');
        // this.notification.warning("Form chưa hợp lệ !");
        this.editForm.markAllAsTouched();
        return;
      }
      let param = this.convertModel(this.workingbefore);
      if (this.checkWorkingBefore == 0) {
        let param1 = this.convertModel(this.employeeInfo);
        if (!this.editForm.get('currentinfor')?.valid || !this.editForm.get('infor')?.valid 
        || !this.editForm.get('homeAddress')?.valid || !this.editForm.get('address')?.valid 
        || !this.editForm.get('curAddress')?.valid || !this.editForm.get('contact')?.valid)
         {
          alert('Form sơ yếu lý lịch chưa hợp lệ !');
          // this.notification.warning("Form chưa hợp lệ !");
          this.editForm.markAllAsTouched();
          return;
        }
        new Promise((resolve) => {this.commomHttpService
          .commonPostRequest('INSERT', 'portal/employee/EditInfomation', param1)
          .subscribe((res: any) => {
              
          })});
      }
      if (param.status == 2 || param.status == 3) {
        alert('Bản ghi đã được phê duyệt hoặc từ chối, không thể sửa');
        return;
      }
      
      return new Promise((resolve) => {
        this.commomHttpService
          .commonPostRequest(
            'INSERT',
            'portal/employee/AddWorkingBeforeEdit',
            param
          )
          .subscribe((res: any) => {
            if (res.statusCode == 400) {
              alert('lỗi');
            } else {
              this.editForm.controls['workingbefore'].reset();
              this.getListWorkingBefore();
              alert('thành công');
              // this.router.navigate(["/cms/profile/business/staffprofile"]);
            }
          });
      });
      

      // lưu thông tin sơ yếu lý lịch, thông tin phụ, trình độ văn hóa, tài khoản
    } else {
      let param = this.convertModel(this.employeeInfo);
      // Kiểm tra xem nếu chọn đã có kinh nghiệm và lưới của quá trình công tác trc đây k có gì thì bắt phải nhập quá trình công tác trước đây
      
      if (!this.editForm.get('currentinfor')?.valid || !this.editForm.get('infor')?.valid 
        || !this.editForm.get('homeAddress')?.valid || !this.editForm.get('address')?.valid 
        || !this.editForm.get('curAddress')?.valid || !this.editForm.get('contact')?.valid)
         {
          alert('Form sơ yếu lý lịch chưa hợp lệ !');
          // this.notification.warning("Form chưa hợp lệ !");
          this.editForm.markAllAsTouched();
          return;
        }
      
      
      if (this.employeeInfo.experienceId == 10968 && this.checkWorkingBefore == 0 && !this.editForm.get('workingbefore')?.valid) {

        alert('Đã có kinh nghiệm cần nhập thông tin quá trình công tác trước đây');
        return;
      }
      
      else {
        
         let param1 = this.convertModel(this.workingbefore);
        
        if(this.editForm.get('workingbefore')?.valid){
          new Promise((resolve) => {this.commomHttpService
            .commonPostRequest(
              'INSERT',
              'portal/employee/AddWorkingBeforeEdit',
              param1
            )
            .subscribe((res: any) => {
              
            })});
        }
          
            
      }

      if (this.employeeInfo.experienceId == 10969 && this.checkTrainingBefore == 0 && !this.editForm.get('trainingbefore')?.valid) {

        alert('Chưa có kinh nghiệm cần nhập thông tin quá trình đào tạo trước đây');
        return;
      }
      else {
        let param1 = this.convertModel(this.trainingbefore);
        
        if(this.editForm.get('trainingbefore')?.valid){
          new Promise((resolve) => {this.commomHttpService
            .commonPostRequest(
              'INSERT',
              'portal/employee/AddTrainingBeforeEdit',
              param1
            )
            .subscribe((res: any) => {
              
            })});
        }
        
        
      }

      return new Promise((resolve) => {
        this.commomHttpService
          .commonPostRequest('INSERT', 'portal/employee/EditInfomation', param)
          .subscribe((res: any) => {
            if (res.statusCode == 400) {
              alert('lỗi');
              return;
            } else {
              alert('thành công');
              return;
            }
          });
      });
    }

    // let param = this.convertModel(this.employeeInfo);
  }
  coppyAddress() {
    if (this.employeeInfo.provinceId != null) {
      this.employeeInfo.curProvinceId = this.employeeInfo.provinceId;
      this.getDistrict(this.employeeInfo.curProvinceId).then((res: any) => {
        this.lstCurDistrictId = res.body.data;
        this.employeeInfo.curDistrictId = this.employeeInfo.districtId;
        this.getWard(this.employeeInfo.curDistrictId).then((res: any) => {
          this.lstCurWardId = res.body.data;
          this.employeeInfo.curWardId = this.employeeInfo.wardId;
        });
      });
      this.employeeInfo.curAddress = this.employeeInfo.address;
    }
  }
  changeTab1(param: any) {
    this.curentTab = param;

  }
}
