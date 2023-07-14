import { Component, OnInit } from '@angular/core';
import { EmployeeInfo, Situation } from 'src/app/model/employeeInfo';
import { ProfileEmployeeService } from 'src/app/services/profile-employee.service';
import { OtherListService } from 'src/app/services/other-list.service';
import { Query, Predicate } from "@syncfusion/ej2-data";
import { FieldSettingsModel } from "@syncfusion/ej2-dropdowns";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { Globals } from 'src/app/common/globals';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { TrainingBefore } from 'src/app/model/trainingbefore';
import { WorkingBefore } from 'src/app/model/workingbefore';

// import { Consts } from "src/app/common/const";
const $ = require("jquery");
 const async = require("async");
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
      addinfo: this._formBuilder.group({
        passNo: ["", []], //Hộ chiếu
        passDate: ["", []], //Ngày cấp
        passExpire: ["", []],
        passPlace: ["", []],
        visaNo: ["", []],
        visaDate: ["", []],
        visaExpire: ["", []],
        visaPlace: ["", []],
        workPermit: ["", []], //Giấy phép lao động
        workPermitDate: ["", []],
        workPermitExpire: ["", []],
        workPermitPlace: ["", []],
        workNo: ["", []],
        workDate: ["", []],
        workScope: ["", []],
        workPlace: ["", []],
      }),
      user: this._formBuilder.group({
        bankId: ["", []],
        bankBranch: ["", []],
        bankNo: ["", []],
      }),
      education: this._formBuilder.group({
        schoolId: ["", []],
        qualificationId: ["", []], //Trình độ chuyên môn
        trainingFormId: ["", []], //Hình thức đào tạo
        learningLevelId: ["", []], //trình độ học vấn
        languageMark: ["", []], //điểm số
        language: ["", []], //ngoại ngữ
      }),
      situation: this._formBuilder.group({
        name: ["", []],
        birth: ["", []],
        no: ["", []], // CMND
        taxNo: ["", []], // CMND
        familyNo: ["", []], // CMND
        familyName: ["", []], // CMND
        address: ["", []], // CMND
        relationshipId: ["", []],
        dateStart: ["", []],
        dateEnd: ["", []],
      }),
      page: this._formBuilder.group({
        paperId: ["", []],
        dateInput: ["", []],
        note: ["", []], // CMND
        statusId: ["", []], // CMND
        pageName: ["", []],
      }),
    });
    console.log("vào nè")
    this.loadData();
   
    
  }

  ngOnInit() {
    
    this.profileEmployeeService.getEmployeeInfo().subscribe((res:any)=>{
      if(res.status==200){
        this.employeeInfo = res.body.result;
        console.log("data",this.employeeInfo)
      }
    })
    this.loadData();
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
      this.getGender(), //0
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
      this.getlstCompanyId()
    ]);
  }

 
  getGender() {
    return new Promise((resolve) => {
      
      this.otherListService.genderList.subscribe((res:any)=>{


          
          this.lstGenderId = res;
          console.log("lstGenderId: ", this.lstGenderId )
        
      })
    });
  }
  getEmpSituation() {
    return new Promise((resolve) => {
      
      this.otherListService.empSituationList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstEmpSituation = res.body.result;
        }
      })
    });
  }
  getNation() {
    return new Promise((resolve) => {
      
      this.otherListService.nationList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstNativeId = res.body.result;
        }
      })
    });
  }
  getNationality() {
    return new Promise((resolve) => {
      
      this.otherListService.nationalityList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstNationalityId = res.body.result;
        }
      })
    });
  }
  getReligion() {
    return new Promise((resolve) => {
      
      this.otherListService.religionList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstReligionId = res.body.result;
        }
      })
    });
  }
  getListFamilyStatus() {
    return new Promise((resolve) => {
      
      this.otherListService.familyStatusList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstMaritalStatusId = res.body.result;
        }
      })
    });
  }
  getListStatusEmp() {
    return new Promise((resolve) => {
      
      this.otherListService.statusEmpList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstWorkStatusId = res.body.result;
        }
      })
    });
  }
 
  getProvince() {
    return new Promise((resolve) => {
      
      this.otherListService.provinceList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstProvinceId = res.body.result;
        }
      })
    });
  }
  getlstTrainingFormId() {
    //hình thức đào tạo
    return new Promise((resolve) => {
      
      this.otherListService.trainingFormIdList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstTrainingFormId = res.body.result;
        }
      })
    });
  }
  GetListLearningLevel() {
    //trình độ học vấn
    return new Promise((resolve) => {
      
      this.otherListService.learningLevelList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstLearningLevelId = res.body.result;
        }
      })
    });
  }
  getlstBankId() {
    //hình thức đào tạo
    return new Promise((resolve) => {
      
      this.otherListService.bankIdList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstBankId = res.body.result;
        }
      })
    });
  }
  getlstResident() {
    //đối tượng thường trú
    return new Promise((resolve) => {
      
      this.otherListService.residentList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstResident = res.body.result;
        }
      })
    });
  }
 
  getlstInsRegionId() {
    //vùng bảo hiểm
    return new Promise((resolve) => {
      
      this.otherListService.religionList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstReligionId = res.body.result;
        }
      })
    });
  }
  getlstPlaceId() {
    return new Promise((resolve) => {
      
      this.otherListService.placeIdList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstPlaceId = res.body.result;
        }
      })
    });
  }
  getlstPaperId() {
    //đối tượng thường trú
    return new Promise((resolve) => {
      
      this.otherListService.paperIdList.subscribe((res:any)=>{
        if(res.status==200){
          this.lstPaperId = res.body.result;
        }
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
        if(res.status==200){
          this.lstCompanyId = res.body.result;
        }
      })
    });
  }
  changeProvince(e: any) {
    
    if (e.e) {
      this.employeeInfo.districtId = undefined;
      console.log("vafo tuwf changeprovince")
      this.lstDistrictId = [];
      this.employeeInfo.wardId = undefined;
      this.lstWardId = [];
      
      this.getDistrict(e.itemData.id).then((res: any) => {
        
        this.lstDistrictId = res;
      });
    }
  }
  changeCurProvince(e: any) {
    
    if (e.e) {
      console.log("vafo tuwf changeCurProvince")
      this.employeeInfo.curDistrictId = undefined;
      this.lstCurDistrictId = [];
      this.employeeInfo.curWardId = undefined;
      this.lstCurWardId = [];
      this.getDistrict(e.itemData.id).then((res: any) => {
        this.lstCurDistrictId = res;
      });
    }
  }
  changeDistrict(e: any) {
    if (e.e) {
      this.employeeInfo.wardId = undefined;
      this.lstWardId = [];
      this.getWard(e.itemData.id).then((res: any) => {
        this.lstWardId = res;
      });
    }
  }
  changeCurDistrict(e: any) {
    if (e.e) {
      this.employeeInfo.curWardId = undefined;
      this.lstCurWardId = [];
      this.getWard(e.itemData.id).then((res: any) => {
        this.lstCurWardId = res;
      });
    }
  }
  changeBank(e: any) {
    if (e.e) {
      this.lstBankBranchId = [];
      this.getBankBranch(e.itemData.id).then((res: any) => {
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
          this.lstDistrictId = res.data
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
          this.lstDistrictId = res.body.data
       });
      } else {
        resolve(false);
      }
    });
  }
  
  getWard(id: any) {
    console.log(" sao vao luon day vay", id)
    return new Promise((resolve) => {
      
      this.commomHttpService.commonGetRequest('laythongtin', 'hr/province/getListWard?districtid=' + id).subscribe((res: any) => {
        this.lstWardId = res.body.data
     });
    });
  }
  getlstCertificate() {
    return new Promise((resolve) => {
      
        this.commomHttpService.commonGetRequest('laythongtin', 'hr/otherlist/CERTIFICATE_TYPE').subscribe((res: any) => {
          this.lstCertificate = res.body.data;
       });
    });
  }
  getlstFormTrain() {
    return new Promise((resolve) => {
      
        this.commomHttpService.commonGetRequest('laythongtin', 'hr/otherlist/GetListTrainingForm').subscribe((res: any) => {
          this.lstFormTrain = res.body.data;
       });
    });
  }
  getlstSpecialized() {
    return new Promise((resolve) => {
      
        this.commomHttpService.commonGetRequest('laythongtin', 'hr/otherlist/SPECIALIZED_TRAIN').subscribe((res: any) => {
          this.lstSpecialized = res.body.data;
       });
    });
  }
  
  RemoveRelation(id: any) {
    this.removeId = id;
    // this.modalService.open("confirm-back-modal1");
   // this.modalService.open("confirm-delete-modal1");
  }
  saveForm() {
    if (!this.editForm.valid) {
      alert(" form chưa hợp lệ")
      return;
    }
    let param = this.employeeInfo
    return new Promise((resolve) => {
      
      this.commomHttpService.commonPostRequest('INSERT', 'portal/employee/EditInfomation','').subscribe((res: any) => {
        if (res.statusCode == 400) {
          alert("lỗi")
        } else {
          alert("thành công")
          // this.router.navigate(["/cms/profile/business/staffprofile"]);
        }
     });
  });
    
  } 
  
  
}
