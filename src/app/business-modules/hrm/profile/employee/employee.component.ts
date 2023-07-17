import { Component, OnInit } from '@angular/core';
import { EmployeeInfo, Situation } from 'src/app/model/employeeInfo';
import { ProfileEmployeeService } from 'src/app/services/profile-employee.service';
import { OtherListService } from 'src/app/services/other-list.service';
import { Query, Predicate } from "@syncfusion/ej2-data";
import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import { Configs } from "src/app/common/configs";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl 
} from "@angular/forms";
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { Globals } from 'src/app/common/globals';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { TrainingBefore } from 'src/app/model/trainingbefore';
import { WorkingBefore } from 'src/app/model/workingbefore';
import { Subject } from 'rxjs';

// import { Consts } from "src/app/common/const";
const $ = require("jquery");
 const async = require("async");
 const _ = require("lodash");
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  editForm!: FormGroup;
   employeeInfo:EmployeeInfo = new EmployeeInfo();
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
  data: any;
  public headerText: any = [{ text: 'HTML' }, { text: 'C Sharp(C#)' }, { text: 'Java' }, { text: 'VB.Net' },
  { text: 'Xamarin' }, { text: 'ASP.NET' }, { text: 'ASP.NET MVC' }, { text: 'JavaScript' }];

  public fields: FieldSettingsModel = { value: "key", text: "value" };
  public fields1: FieldSettingsModel = { value: "id", text: "name" };
  public curentTab:string='profile';
  constructor(
    private profileEmployeeService: ProfileEmployeeService,
    private otherListService: OtherListService,
    private commomHttpService: CommonHttpRequestService,
    private globals:Globals,
    private _formBuilder: FormBuilder,

  ) { 
    this.editForm = this._formBuilder.group({
      currentinfor: this._formBuilder.group({
        code: [
          { value: null, disabled: false },
          [Validators.required, this.globals.noWhitespaceValidator],
        ],
        firstName: [
          "",
          [Validators.required, this.globals.noWhitespaceValidator],
        ],
        lastName: [
          "",
          [Validators.required, this.globals.noWhitespaceValidator],
        ],
        taxCode: [[]], //Mã sô thuế
        salTotal: ["", []],
        insRegionId: ["",[Validators.required]]
      }),
      infor: this._formBuilder.group({
        birthDate: ["", []],
        genderId: [""],
        birthPlace: ["", []],
        idNo: ["", []], //CMND
        idDate: [""], //Ngày cấp
        idPlace: ["", []], //Nơi cấp
        passPlace: ["", []],
        nationalityId: ["", []], //Quốc tịch
        nativeId: ["", []], //Dân tộc
        religionId: ["", []], //Tôn giáo
        maritalStatusId: ["", []], //Tình trạng hôn nhân
        resident: [""],
        placeId: ["",[]]
        
      }),
      address: this._formBuilder.group({
        address: ["", []],
        provinceId: ["", []],
        districtId: ["", []],
        wardId: ["", []],
        directManagerId: ["", []],
        curAddress: [""],
        joinDate: ["", []],
        workStatusId: ["", []],
      }),
      curAddress: this._formBuilder.group({
        curAddress: ["", []],
        curProvinceId: ["", []],
        curDistrictId: ["", []],
        curWardId: ["", []],
      }),
      contact: this._formBuilder.group({
        mobilePhone: ["", []],
        email: ["", []],
        workEmail: ["", []],
        contactPer: ["", []], //Người liên hệ khi cần
        contactPerPhone: ["", []],
      }),
      // addinfo: this._formBuilder.group({
      //   passNo: ["", []], //Hộ chiếu
      //   passDate: ["", []], //Ngày cấp
      //   passExpire: ["", []],
      //   passPlace: ["", []],
      //   visaNo: ["", []],
      //   visaDate: ["", []],
      //   visaExpire: ["", []],
      //   visaPlace: ["", []],
      //   workPermit: ["", []], //Giấy phép lao động
      //   workPermitDate: ["", []],
      //   workPermitExpire: ["", []],
      //   workPermitPlace: ["", []],
      //   workNo: ["", []],
      //   workDate: ["", []],
      //   workScope: ["", []],
      //   workPlace: ["", []],
      // }),
      // user: this._formBuilder.group({
      //   bankId: ["", []],
      //   bankBranch: ["", []],
      //   bankNo: ["", []],
      // }),
      // education: this._formBuilder.group({
      //   schoolId: ["", []],
      //   qualificationId: ["", []], //Trình độ chuyên môn
      //   trainingFormId: ["", []], //Hình thức đào tạo
      //   learningLevelId: ["", []], //trình độ học vấn
      //   languageMark: ["", []], //điểm số
      //   language: ["", []], //ngoại ngữ
      // }),
      // situation: this._formBuilder.group({
      //   name: ["", []],
      //   birth: ["", []],
      //   no: ["", []], // CMND
      //   taxNo: ["", []], // CMND
      //   familyNo: ["", []], // CMND
      //   familyName: ["", []], // CMND
      //   address: ["", []], // CMND
      //   relationshipId: ["", []],
      //   dateStart: ["", []],
      //   dateEnd: ["", []],
      // }),
      // page: this._formBuilder.group({
      //   paperId: ["", []],
      //   dateInput: ["", []],
      //   note: ["", []], // CMND
      //   statusId: ["", []], // CMND
      //   pageName: ["", []],
      // }),
    });
    this._unsubscribeAll = new Subject();
    this.loadData();
   
    
  }

  ngOnInit() {

  

  }
  changeTab(e: any) {
    this.curentTab = e;
  }
  public onFiltering(e: any, a: any) {
    e.preventDefaultAction = true;
    const predicate = new Predicate("name", "contains", e.text, true, true);
    this.query = new Query();
    this.query = e.text !== "" ? this.query.where(predicate) : this.query;
    e.updateData(a, this.query);

    
  }
  changeDate = (model: any) => {
    setTimeout(() => {
      const idDate = "#" + model + "_input";
      const value = $(idDate).val();
      //get form group of control
      let form: any;
      for (let field in this.editForm.controls) {
        if (this.editForm.controls[field].get(model)) {
          form = this.editForm.controls[field].get(model);
        }
      }
      var patt = new RegExp(
        "q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m"
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
        ((value.length === 8 && value.indexOf("/") === -1) ||
          (value.length === 6 && value.indexOf("/") === -1) ||
          (value.length === 10 && value.indexOf("/") > -1))
      ) {
        if (value.indexOf("-") === -1) {
          const returnDate = this.globals.replaceDate(value);
          // (this.model as any)[model] = returnDate;
          if (returnDate && returnDate.length > 0) {
            $(idDate).val(returnDate);
            const dateParts: any = returnDate.split("/");
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
  // coppyAddress() {
  //   if (this.employeeInfo.provinceId != null) {
  //     this.employeeInfo.curProvinceId = this.employeeInfo.provinceId;
  //     this.getDistrict(this.employeeInfo.curProvinceId).then((res: any) => {
  //       this.lstCurDistrictId = res;
  //       this.employeeInfo.curDistrictId = this.employeeInfo.districtId;
  //       this.getWard(this.employeeInfo.curDistrictId).then((res: any) => {
  //         this.lstCurWardId = res;
  //         this.employeeInfo.curWardId = this.employeeInfo.wardId;
  //       });
  //     });
  //     this.employeeInfo.curAddress = this.employeeInfo.address;
  //   }
  // }
  loadData() {
    Promise.all([
      this.getById(),
      // this.getGender(), //0
      this.getNation(), //1
      this.getNationality(), //2
      this.getReligion(), //3
      this.getListStatusEmp(), //4
      this.getProvince(), //5
      this.getListFamilyStatus(), //6
      this.getEmpSituation(), //7
      this.getlstTrainingFormId(), //8
      this.GetListLearningLevel(), //9
      this.getlstBankId(), //10
      this.getlstResident(), //11
      this.getlstInsRegionId(),//12
      this.getlstPaperId(),//13
      this.getlstPlaceId(),//14
      this.getlstCertificate(),
      // this.getlstFormTrain(),
      // this.getlstSpecialized(),
      this.getlstCompanyId(),
      
    ]).then((res: any) => {
      console.log(res)
      this.lstNativeId = res[2];
      this.lstNationalityId = res[3];
      this.lstReligionId = res[4];
      this.lstWorkStatusId = res[5];
      this.lstProvinceId = res[6];
      this.lstCurProvinceId = res[6];
      this.lstMaritalStatusId = res[7];
      this.lstEmpSituation = res[8];
      this.lstTrainingFormId = res[9];
      this.lstLearningLevelId = res[10];  
      this.lstBankId = res[11];
      this.lstResident = res[12];
      this.lstInsRegionId = res[13];
      this.lstPaperId = res[14];
      this.lstPlaceId = res[15];

      this.otherListService.genderList.subscribe((res:any)=>{
        this.lstGenderId = res;
      })
      this.employeeInfo = _.cloneDeep(_.omit(res[0].body.result));
      
      this.loadDatalazy(res[0].body.result);
      // this.getListSituation();
      // this.getListPaper();
      
    });
    
    ;
  }
  loadDatalazy(model: EmployeeInfo) {
    if (model && model.provinceId ) {
      
      this.getDistrict(model.provinceId)
        .then((res: any) => {
          this.lstDistrictId = res;
        })
        .then((x) => {
          this.employeeInfo.districtId = model.districtId;
        });
      this.getWard(model.districtId)
        .then((res: any) => {
          this.lstWardId = res;
        })
        .then((x) => {
          this.employeeInfo.wardId = model.wardId;
        });
    }
    if (model && model.curProvinceId) {
      this.getDistrict(model.curProvinceId)
        .then((res: any) => {
          this.lstCurDistrictId = res;
        })
        .then((x) => {
          this.employeeInfo.curDistrictId = model.curDistrictId;
        });
      this.getWard(model.curDistrictId)
        .then((res: any) => {
          this.lstCurWardId = res;
        })
        .then((x) => {
          this.employeeInfo.curWardId = model.curWardId;
        });
    }
    if (model && model.bankId) {
      this.getBankBranch(model.bankId)
        .then((res: any) => {
          this.lstBankBranchId = res;
        })
        .then((x) => {
          this.employeeInfo.bankBranch = model.bankBranch;
        });
      
    }
    // if (model && model.genderId) {
    //   this.getBankBranch(model.genderId)
    //     .then((res: any) => {
    //       this.lstGenderId = res;
    //     })
    //     .then((x) => {
    //       this.employeeInfo.bankBranch = model.bankBranch;
    //     });
      
    // }
    
    
  }
  getById() {
    return new Promise((resolve) => {
      this.profileEmployeeService.getEmployeeInfo().subscribe((res:any)=>{
        if(res.status==200){
          // this.employeeInfo = res.body.result;
          resolve(res);
        }
      })
    });
  }
  getGender() {


    return new Promise((resolve) => {
      
      this.otherListService.genderList.subscribe((res:any)=>{

          // this.lstGenderId = res;
          console.log("giới tính: ", res)
          resolve(res);
        
      })
    });
  }
  getEmpSituation() {
    return new Promise((resolve) => {
      
      this.otherListService.empSituationList.subscribe((res:any)=>{

          // this.lstEmpSituation = res;
          resolve(res);
      })
    });
  }
  getNation() {
    return new Promise((resolve) => {
      
      this.otherListService.nationList.subscribe((res:any)=>{
        
          // this.lstNativeId = res;
          resolve(res);
      })
    });
  }
  getNationality() {
    return new Promise((resolve) => {
      
      this.otherListService.nationalityList.subscribe((res:any)=>{
        
          // this.lstNationalityId = res;
          resolve(res);
      })
    });
  }
  getReligion() {
    return new Promise((resolve) => {
      
      this.otherListService.religionList.subscribe((res:any)=>{
        
          // this.lstReligionId = res;
          resolve(res);
      })
    });
  }
  getListFamilyStatus() {
    return new Promise((resolve) => {
      
      this.otherListService.familyStatusList.subscribe((res:any)=>{
        
          // this.lstMaritalStatusId = res;
          resolve(res);
      })
    });
  }
  getListStatusEmp() {
    return new Promise((resolve) => {
      
      this.otherListService.statusEmpList.subscribe((res:any)=>{
        
          // this.lstWorkStatusId = res;
          resolve(res);
      })
    });
  }
 
  getProvince() {
    return new Promise((resolve) => {
      
      this.otherListService.provinceList.subscribe((res:any)=>{
        
          // this.lstProvinceId = res;
          // this.lstCurProvinceId = res;
          resolve(res);
      })
    });
  }
  getlstTrainingFormId() {
    //hình thức đào tạo
    return new Promise((resolve) => {
      
      this.otherListService.trainingFormIdList.subscribe((res:any)=>{
       
          // this.lstTrainingFormId = res;
          resolve(res);
        
      })
    });
  }
  GetListLearningLevel() {
    //trình độ học vấn
    return new Promise((resolve) => {
      
      this.otherListService.learningLevelList.subscribe((res:any)=>{
        
          // this.lstLearningLevelId = res;
          resolve(res);
        
      })
    });
  }
  getlstBankId() {
    //hình thức đào tạo
    return new Promise((resolve) => {
      
      this.otherListService.bankIdList.subscribe((res:any)=>{
        
          // this.lstBankId = res;
          resolve(res);
        
      })
    });
  }
  getlstResident() {
    //đối tượng thường trú
    return new Promise((resolve) => {
      
      this.otherListService.residentList.subscribe((res:any)=>{
        
          // this.lstResident = res;
          resolve(res);
        
      })
    });
  }
 
  getlstInsRegionId() {
    //vùng bảo hiểm
    return new Promise((resolve) => {
      
      this.otherListService.religionList.subscribe((res:any)=>{
        
          // this.lstReligionId = res;
        
          resolve(res);
      })
    });
  }
  getlstPlaceId() {
    return new Promise((resolve) => {
      
      this.otherListService.placeIdList.subscribe((res:any)=>{
        
          // this.lstPlaceId = res;
          resolve(res);
        
      })
    });
  }
  getlstPaperId() {
    //đối tượng thường trú
    return new Promise((resolve) => {
      
      this.otherListService.paperIdList.subscribe((res:any)=>{
        
          // this.lstPaperId = res;
          resolve(res);
        
      })
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
      this.otherListService.companyIdList.subscribe((res:any)=>{
        
          // this.lstCompanyId = res;
          resolve(res);
        
      })
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
  changeCurProvince(e: any) {
    
    if (e.e) {
      
      this.employeeInfo.curDistrictId = undefined;
      this.lstCurDistrictId = [];
      this.employeeInfo.curWardId = undefined;
      this.lstCurWardId = [];
      this.getDistrict(e.itemData.key).then((res: any) => {
        this.lstCurDistrictId = res.body.data;
        console.log("đang trong changcurProvince: ", this.lstCurDistrictId)
      });
    }
  }
  changeDistrict(e: any) {
    if (e.e) {
      this.employeeInfo.wardId = undefined;
      this.lstWardId = [];
      this.getWard(e.itemData.id).then((res: any) => {
        console.log("huyện: ", res.body.data)
        this.lstWardId = res.body.data;
      });
    }
  }
  changeCurDistrict(e: any) {
    if (e.e) {
      this.employeeInfo.curWardId = undefined;
      this.lstCurWardId = [];
      this.getWard(e.itemData.id).then((res: any) => {
        this.lstCurWardId =res.body.data;
      });
    }
  }
  changeBank(e: any) {
    if (e.e) {
      this.lstBankBranchId = [];
      this.getBankBranch(e.itemData.key).then((res: any) => {
        this.lstBankBranchId = res;
      });
    }
  }
  changeName() {
    this.employeeInfo.fullname = this.employeeInfo.firstName + " " + this.employeeInfo.lastName;
  }
  getBankBranch(id: number) {
    return new Promise((resolve) => {
      if (id) {
        
        this.commomHttpService.commonGetRequest('laythongtin', 'hr/bank/GetListBankBranch?bankId=' + id).subscribe((res: any) => {
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
        
        
        this.commomHttpService.commonGetRequest('laythongtin', 'hr/province/getListDistrict?provinceId=' + id).subscribe((res: any) => {
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
      
      this.commomHttpService.commonGetRequest('laythongtin', 'hr/province/getListWard?districtid=' + id).subscribe((res: any) => {
        resolve(res);
        
     });
    });
  }
  getlstCertificate() {
    return new Promise((resolve) => {
      
        this.commomHttpService.commonGetRequest('laythongtin', 'hr/otherlist/CERTIFICATE_TYPE').subscribe((res: any) => {
          // this.lstCertificate = res;
          resolve(res);
       });
    });
  }
  getlstFormTrain() {
    return new Promise((resolve) => {
      
        this.commomHttpService.commonGetRequest('laythongtin', 'hr/otherlist/GetListTrainingForm').subscribe((res: any) => {
          // this.lstFormTrain = res;
          resolve(res);
       });
    });
  }
  getlstSpecialized() {
    return new Promise((resolve) => {
      
        this.commomHttpService.commonGetRequest('laythongtin', 'hr/otherlist/SPECIALIZED_TRAIN').subscribe((res: any) => {
          // this.lstSpecialized = res;
          resolve(res);
       });
    });
  }
  
  RemoveRelation(id: any) {
    this.removeId = id;
    // this.modalService.open("confirm-back-modal1");
   // this.modalService.open("confirm-delete-modal1");
  }
  convertModel(param: any) {
    let model = _.cloneDeep(param);

    // model.birthDate = model.birthDate
    //   ? moment(model.birthDate).format("YYYY-MM-DD")
    //   : null;
    // model.idDate = model.idDate
    //   ? moment(model.idDate).format("YYYY-MM-DD")
    //   : null;
    // model.joinDate = model.joinDate
    //   ? moment(model.joinDate).format("YYYY-MM-DD")
    //   : null;
    // model.terEffectDate = model.terEffectDate
    //   ? moment(model.terEffectDate).format("YYYY-MM-DD")
    //   : null;
    // model.passDate = model.passDate
    //   ? moment(model.passDate).format("YYYY-MM-DD")
    //   : null;
    // model.passExpire = model.passExpire
    //   ? moment(model.passExpire).format("YYYY-MM-DD")
    //   : null;
    // model.visaDate = model.visaDate
    //   ? moment(model.visaDate).format("YYYY-MM-DD")
    //   : null;
    // model.visaExpire = model.visaExpire
    //   ? moment(model.visaExpire).format("YYYY-MM-DD")
    //   : null;
    // model.workPermitDate = model.workPermitDate
    //   ? moment(model.workPermitDate).format("YYYY-MM-DD")
    //   : null;
    // model.workPermitExpire = model.workPermitExpire
    //   ? moment(model.workPermitExpire).format("YYYY-MM-DD")
    //   : null;

    return model;
  }
  saveForm() {
    // console.log("this.editForm.valid: ", this.editForm)

    // this.editForm.markAllAsTouched()
    // if (!this.editForm.valid) {
    //   alert(" form chưa hợp lệ")
    //   return;
    // }
    let param = this.convertModel(this.employeeInfo);

    console.log("param: ", param)
  //   return new Promise((resolve) => {
      
  //     this.commomHttpService.commonPostRequest('INSERT', 'portal/employee/EditInfomation','').subscribe((res: any) => {
  //       if (res.statusCode == 400) {
  //         alert("lỗi")
  //       } else {
  //         alert("thành công")
  //         // this.router.navigate(["/cms/profile/business/staffprofile"]);
  //       }
  //    });
  // });
    
  } 
  
  
}
