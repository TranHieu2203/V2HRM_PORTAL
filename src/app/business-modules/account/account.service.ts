import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';

import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { AuthService } from 'src/app/services/auth.service';

import { EnumFormBaseContolType, IFormBaseControl } from 'src/app/libraries/dynamic-form/form.service';

import { OtherListService } from 'src/app/services/other-list.service';

import { CustomValidators } from 'src/app/custom-validators';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  activeTabIndex: number = 0;

  constructor(
    private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService,
    private otherListService: OtherListService,
  ) { }

  getAccount(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getAccount',
      this.authService.serverModel.getAccountInfoUrl!
    )
  }

  updateEmployeePassport(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeePassport',
      this.authService.serverModel.updateEmployeePassportUrl!, body
    ).subscribe();
  }

  updateEmployeeVisa(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeVisa',
      this.authService.serverModel.updateEmployeeVisaUrl!, body
    ).subscribe();
  }

  updateAccountPartially(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateAccountPartially',
      this.authService.serverModel.updateAccountInfoUrl!, body
    ).subscribe();
  }
  updateEmployeeMainInfo(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeMainInfo',
      this.authService.serverModel.updateEmployeeMainInfoUrl!, body
    ).subscribe();
  }
  updateEmployeeInfo(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeInfo',
      this.authService.serverModel.updateEmployeeInfoUrl!, body
    ).subscribe();
  }
  updateEmployeeAddress(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeAddress',
      this.authService.serverModel.updateEmployeeAddressUrl!, body
    ).subscribe();
  }

  updateEmployeeCurAddress(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeCurAddress',
      this.authService.serverModel.updateEmployeeCurAddressUrl!, body
    ).subscribe();
  }
  updateEmployeeContactInfo(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeContactInfo',
      this.authService.serverModel.updateEmployeeContactInfoUrl!, body
    ).subscribe();
  }
  updateEmployeeEducation(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeEducation',
      this.authService.serverModel.updateEmployeeEducationUrl!, body
    ).subscribe();
  }
  updateEmployeeBank(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeBankUrl',
      this.authService.serverModel.updateEmployeeBankUrl!, body
    ).subscribe();
  }

  updateEmployeeWorkPermit(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeWorkPermit',
      this.authService.serverModel.updateEmployeeWorkPermitUrl!, body
    ).subscribe();
  }
  updateEmployeeCertificate(body: any): void {
    this.commonHttpRequestService.commonPostRequest(
      'updateEmployeeCertificate',
      this.authService.serverModel.updateEmployeeCertificateUrl!, body
    ).subscribe();
  }
  getEducation(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getEducation',
      this.authService.serverModel.getEducationUrl!
    )
  }

  getUsebank(): Observable<any> {
    return this.commonHttpRequestService.commonPostRequest(
      'getUserbank',
      this.authService.serverModel.getUserbankUrl!,
      {

      }
    )
  }
  getSituation(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getSituation',
      this.authService.serverModel.getSituationListUrl!,
    )
  }

  getPaper(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getPaper',
      this.authService.serverModel.getPaperListUrl!,
    )
  }

  getBonuses(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getBonuses',
      this.authService.serverModel.getBonusListUrl!,
    )
  }

  getDiscipline(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getDiscipline',
      this.authService.serverModel.getDisciplineListUrl!,
    )
  }
  getContract(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getContract',
      this.authService.serverModel.getContractListUrl!,
    )
  }
  getWorking(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getDiscipline',
      this.authService.serverModel.getWorkingListUrl!,
    )
  }
  getInschange(): Observable<any> {
    return this.commonHttpRequestService.commonGetRequest(
      'getInschange',
      this.authService.serverModel.getInschangeListUrl!,
    )
  }

  getMainPrimaryControls(): IFormBaseControl[][] {
    const controls: IFormBaseControl[][] = [
      [
        {
          flexSize: 6,
          label: 'Mã nhân viên',
          key: 'code',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          readonly: true,
          type: 'text'
        },
      ],
      [
        {
          flexSize: 6,
          label: 'Họ và tên đệm',
          key: 'firstName',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',
          validators: [
            {
              name: 'required',
              validator: Validators.required,
              errorMessage: "cần nhập",
            },
            {
              name: 'minLength',
              validator: Validators.minLength(5),
              errorMessage: "ít nhất 5 ký tự",
            }
          ]
        },
        {
          flexSize: 6,
          label: 'Tên',
          key: 'lastName',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',
          validators: [
            {
              name: 'required',
              validator: Validators.required,
              errorMessage: "cần nhập",
            }
          ]
        },
      ],
      [
        {
          flexSize: 6,
          label: 'Phòng ban',
          key: 'orgName',
          value: '',
          readonly: true,
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
        {
          flexSize: 6,
          label: 'Chức vụ',
          key: 'positionName',
          value: '',
          readonly: true,
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
      ],
      [
        {
          flexSize: 6,
          label: 'Mã chấm công',
          key: 'itimeCode',
          value: '',
          readonly: true,
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
        {
          flexSize: 6,
          label: 'Mã số thuế cá nhân',
          key: 'taxCode',
          value: '',
          readonly: true,
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
      ],
      [
        {
          flexSize: 6,
          label: 'Người quản lý',
          key: 'orgManager',
          value: '',
          readonly: true,
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
      ],
    ];

    return controls;
  }

  getMainPersonalControls(): IFormBaseControl[][] {
    const controls: IFormBaseControl[][] = [
      [
        {
          flexSize: 6,
          label: 'Giới tính',
          key: 'genderId',
          value: '',
          controlType: EnumFormBaseContolType.Dropdown,
          type: 'number',
          options: this.otherListService.genderList.value,
        }
      ],
      [
        {
          flexSize: 6,
          label: 'Ngày sinh',
          key: 'birthDate',
          value: new Date(),
          controlType: EnumFormBaseContolType.Textbox,
          type: 'date',
        },
        {
          flexSize: 6,
          label: 'Nơi sinh',
          key: 'birthPlace',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',
        },
      ]
    ];

    return controls;
  }

getMainOwnAddressControls(onMainOwnAddressChange: (e: any) => void): IFormBaseControl[][] {
    const controls: IFormBaseControl[][] = [
      [
        {
          flexSize: 6,
          label: 'Tỉnh/TP',
          key: 'provinceId',
          value: 0,
          controlType: EnumFormBaseContolType.Mcc,
          type: 'number',
          mccData: {
            placeholder: 'Chọn Tỉnh/TP...',
            searchholder: 'Tìm kiếm Tỉnh/TP...',
            form: '',
            fieldName: 'provinceId',
            gridDboName: '',
            apiMethod: 'POST',
            apiPath: 'https://api.V2Hrm.online/api/client/profile/getprovincelist',
            apiPathGetById: 'https://api.V2Hrm.online/api/client/profile/getprovincebyid',
            boundField: 'id',
            displayField: 'name',
            shownColumns: [
              {
                accessor: 'id',
                header: 'ID',
                width: 100,
              },
              {
                accessor: 'code',
                header: 'Code',
                width: 100,
              },
              {
                accessor: 'name',
                header: 'Name',
                width: 300,
              },
            ],
            listResponseResultProp: 'result',
            listResponseCountProp: 'count',
          },
          onMccChanged: onMainOwnAddressChange
        },
        {
          flexSize: 6,
          label: 'Quận/Huyện',
          key: 'districtId',
          value: 0,
          controlType: EnumFormBaseContolType.Mcc,
          type: 'number',
          mccData: {
            placeholder: 'Chọn Quận/Huyện...',
            searchholder: 'Tìm kiếm Quận/Huyện...',
            form: '',
            fieldName: 'districtId',
            gridDboName: '',
            apiMethod: 'POST',
            apiPath: 'https://api.V2Hrm.online/api/client/profile/getdistrictlist',
            apiPathGetById: 'https://api.V2Hrm.online/api/client/profile/getdistrictbyid',
            boundField: 'id',
            displayField: 'name',
            shownColumns: [
              {
                accessor: 'id',
                header: 'ID',
                width: 100,
              },
              {
                accessor: 'code',
                header: 'Code',
                width: 100,
              },
              {
                accessor: 'name',
                header: 'Name',
                width: 300,
              },
            ],
            listResponseResultProp: 'result',
            listResponseCountProp: 'count',
          },
          onMccChanged: onMainOwnAddressChange
        },
        {
          flexSize: 6,
          label: 'Xã/Phường',
          key: 'wardId',
          value: 0,
          controlType: EnumFormBaseContolType.Mcc,
          type: 'number',
          mccData: {
            placeholder: 'Chọn Xã/Phường...',
            searchholder: 'Tìm kiếm Xã/Phường...',
            form: '',
            fieldName: 'wardId',
            gridDboName: '',
            apiMethod: 'POST',
            apiPath: 'https://api.V2Hrm.online/api/client/profile/getwardlist',
            apiPathGetById: 'https://api.V2Hrm.online/api/client/profile/getwardbyid',
            boundField: 'id',
            displayField: 'name',
            shownColumns: [
              {
                accessor: 'id',
                header: 'ID',
                width: 100,
              },
              {
                accessor: 'code',
                header: 'Code',
                width: 100,
              },
              {
                accessor: 'name',
                header: 'Name',
                width: 300,
              },
            ],
            listResponseResultProp: 'result',
            listResponseCountProp: 'count',
          },
          onMccChanged: onMainOwnAddressChange
        },
        {
          flexSize: 6,
          label: 'Số nhà, đường phố, thôn xóm',
          key: 'address',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
      ]
    ];
    return controls;
  }

  getMainNowAddressControls(onMainNowAddressChange: (e: any) => void): IFormBaseControl[][] {
    const controls: IFormBaseControl[][] = [
      [
        {
          flexSize: 6,
          label: 'Tỉnh/TP',
          key: 'curProvinceId',
          value: 0,
          controlType: EnumFormBaseContolType.Mcc,
          type: 'number',
          mccData: {
            placeholder: 'Chọn Tỉnh/TP...',
            searchholder: 'Tìm kiếm Tỉnh/TP...',
            form: '',
            fieldName: 'curProvinceId',
            gridDboName: '',
            apiMethod: 'POST',
            apiPath: 'https://api.V2Hrm.online/api/client/profile/getprovincelist',
            apiPathGetById: 'https://api.V2Hrm.online/api/client/profile/getprovincebyid',
            boundField: 'id',
            displayField: 'name',
            shownColumns: [
              {
                accessor: 'id',
                header: 'ID',
                width: 100,
              },
              {
                accessor: 'code',
                header: 'Code',
                width: 100,
              },
              {
                accessor: 'name',
                header: 'Name',
                width: 300,
              },
            ],
            listResponseResultProp: 'result',
            listResponseCountProp: 'count',
          },
          onMccChanged: onMainNowAddressChange
        },
        {
          flexSize: 6,
          label: 'Quận/Huyện',
          key: 'curDistrictId',
          value: 0,
          controlType: EnumFormBaseContolType.Mcc,
          type: 'number',
          mccData: {
            placeholder: 'Chọn Quận/Huyện...',
            searchholder: 'Tìm kiếm Quận/Huyện...',
            form: '',
            fieldName: 'curDistrictId',
            gridDboName: '',
            apiMethod: 'POST',
            apiPath: 'https://api.V2Hrm.online/api/client/profile/getdistrictlist',
            apiPathGetById: 'https://api.V2Hrm.online/api/client/profile/getdistrictbyid',
            boundField: 'id',
            displayField: 'name',
            shownColumns: [
              {
                accessor: 'id',
                header: 'ID',
                width: 100,
              },
              {
                accessor: 'code',
                header: 'Code',
                width: 100,
              },
              {
                accessor: 'name',
                header: 'Name',
                width: 300,
              },
            ],
            listResponseResultProp: 'result',
            listResponseCountProp: 'count',
          },
          onMccChanged: onMainNowAddressChange
        },
        {
          flexSize: 6,
          label: 'Xã/Phường',
          key: 'curWardId',
          value: 0,
          controlType: EnumFormBaseContolType.Mcc,
          type: 'number',
          mccData: {
            placeholder: 'Chọn Xã/Phường...',
            searchholder: 'Tìm kiếm Xã/Phường...',
            form: '',
            fieldName: 'curWardId',
            gridDboName: '',
            apiMethod: 'POST',
            apiPath: 'https://api.V2Hrm.online/api/client/profile/getwardlist',
            apiPathGetById: 'https://api.V2Hrm.online/api/client/profile/getwardbyid',
            boundField: 'id',
            displayField: 'name',
            shownColumns: [
              {
                accessor: 'id',
                header: 'ID',
                width: 100,
              },
              {
                accessor: 'code',
                header: 'Code',
                width: 100,
              },
              {
                accessor: 'name',
                header: 'Name',
                width: 300,
              },
            ],
            listResponseResultProp: 'result',
            listResponseCountProp: 'count',
          }
          ,
          onMccChanged: onMainNowAddressChange
        },
        {
          flexSize: 6,
          label: 'Số nhà, đường phố, thôn xóm',
          key: 'curAddress',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
      ]
    ];
    return controls;
  }

  getMainContactControls(): IFormBaseControl[][] {
    const controls: IFormBaseControl[][] = [
      [
        {
          flexSize: 6,
          label: 'Điện thoại cá nhân',
          key: 'mobilePhone',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',

        },
      ],
      [
        {
          flexSize: 6,
          label: 'Email cá nhân',
          key: 'email',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',
          validators: [
            {
              name: 'email',
              validator: Validators.email,
              errorMessage: "không phải là email"
            },
          ]
        },
        {
          flexSize: 6,
          label: 'Email công ty',
          key: 'workEmail',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',
          validators: [
            {
              name: 'email',
              validator: Validators.email,
              errorMessage: "không phải là email"
            },
          ]

        },
      ],
      [
        {
          flexSize: 6,
          label: 'Người liên hệ khi cần',
          key: 'contactPer',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',
          validators: [
            {
              name: 'upperCaseAll',
              validator: CustomValidators.upperCaseAll,
              errorMessage: "không viết hoa tất cả các chữ"
            },
            {
              name: 'startsWithUpperCase',
              validator: CustomValidators.startsWithUpperCase,
              errorMessage: "không viết hoa đầu các từ"
            },
            {
              name: 'minLength',
              validator: Validators.minLength(2),
              errorMessage: "ít nhất cần có 2 ký tự"
            },
          ]

        },
        {
          flexSize: 6,
          label: 'Số điện thoại người liên hệ',
          key: 'contactPerPhone',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',

        },
      ],
    ];
    return controls;
  }


// MORE START ===========================================================================================\
  //Hộ chiếu
getMorePassportControls(): IFormBaseControl[][] {
  const controls: IFormBaseControl[][] = [
    [
      {
        flexSize: 6,
        label: 'Số hộ chiếu',
        key: 'passNo',
        value: '',
        controlType: EnumFormBaseContolType.Textbox,
        type: 'text',
        validators: [
          {
            name: 'pattern',
            validator: Validators.pattern("^(?!^0+$)[a-zA-Z0-9]{3,20}$"),
            errorMessage: "REQUIRED"
          }
        ]
      },
      {
        flexSize: 6,
        label: 'Ngày cấp',
        key: 'passDate',
        value: new Date(),
        controlType: EnumFormBaseContolType.Textbox,
        type: 'date',

      }
    ],
    [
      {
        flexSize: 6,
        label: 'Ngày hết hạn',
        key: 'passExpire',
        value: new Date(),
        controlType: EnumFormBaseContolType.Textbox,
        type: 'date',

      },
      {
        flexSize: 6,
        label: 'Nơi cấp',
        key: 'passPlace',
        value: '',
        controlType: EnumFormBaseContolType.Textbox,
        type: 'text',

      },
    ]
  ];
  return controls;
}

//Visa
getMoreVisaControls(): IFormBaseControl[][] {
  const controls: IFormBaseControl[][] = [
    [
      {
        flexSize: 6,
        label: 'Số visa',
        key: 'visaNo',
        value: '',
        controlType: EnumFormBaseContolType.Textbox,
        type: 'text',
        validators: [
          {
            name: 'pattern',
            validator: Validators.pattern("^(?!^0+$)[a-zA-Z0-9]{3,20}$"),
            errorMessage: "Không đúng định dạng."
          }
        ]
      },
      {
        flexSize: 6,
        label: 'Ngày cấp',
        key: 'visaDate',
        value: new Date(),
        controlType: EnumFormBaseContolType.Textbox,
        type: 'date',
      }
    ],
    [
      {
        flexSize: 6,
        label: 'Ngày hết hạn',
        key: 'visaExpire',
        value: new Date(),
        controlType: EnumFormBaseContolType.Textbox,
        type: 'date',

      },
      {
        flexSize: 6,
        label: 'Nơi cấp',
        key: 'visaPlace',
        value: '',
        controlType: EnumFormBaseContolType.Textbox,
        type: 'text',
      },
    ]
  ];
  return controls;
}

//Giấy phép lao động
getMorePermitControls(): IFormBaseControl[][] {
  const controls: IFormBaseControl[][] = [
    [
      {
        flexSize: 6,
        label: 'Số giấy phép lao động',
        key: 'workPermit',
        value: '',
        controlType: EnumFormBaseContolType.Textbox,
        type: 'text',
        validators: [
          {
            name: 'pattern',
            validator: Validators.pattern("^(?!^0+$)[a-zA-Z0-9]{3,20}$"),
            errorMessage: "Không đúng định dạng."
          }
        ]
      },
      {
        flexSize: 6,
        label: 'Ngày cấp',
        key: 'workPermitDate',
        value: new Date(),
        controlType: EnumFormBaseContolType.Textbox,
        type: 'date',

      },
      {
        flexSize: 6,
        label: 'Ngày hết hạn',
        key: 'workPermitExpire',
        value: new Date(),
        controlType: EnumFormBaseContolType.Textbox,
        type: 'date',
      },
      {
        flexSize: 6,
        label: 'Nơi cấp',
        key: 'workPermitPlace',
        value: '',
        controlType: EnumFormBaseContolType.Textbox,
        type: 'text',

      },
    ],
  ];
  return controls;
}

//Chứng chỉ hành nghề
getMoreCertificateControls(): IFormBaseControl[][] {
  const controls: IFormBaseControl[][] = [
    [
      {
        flexSize: 6,
        label: 'Số chứng chỉ hành nghề',
        key: 'workNo',
        value: '',
        controlType: EnumFormBaseContolType.Textbox,
        type: 'text',
        validators: [
          {
            name: 'pattern',
            validator: Validators.pattern("^(?!^0+$)[a-zA-Z0-9]{3,20}$"),
            errorMessage: "Không đúng định dạng."
          }
        ]
      },
      {
        flexSize: 6,
        label: 'Ngày cấp',
        key: 'workDate',
        value: new Date(),
        controlType: EnumFormBaseContolType.Textbox,
        type: 'date',

      },
      {
        flexSize: 6,
        label: 'Phạm vi',
        key: 'workScope',
        value: '',
        controlType: EnumFormBaseContolType.Textbox,
        type: 'text',
      },
      {
        flexSize: 6,
        label: 'Nơi cấp',
        key: 'workPlace',
        value: '',
        controlType: EnumFormBaseContolType.Textbox,
        type: 'text',

      },
    ],
  ];
  return controls;
}
// MORE END   ===========================================================================================


getEducationControls(onEducationChange: (e: any) => void): IFormBaseControl[][] {
    const controls: IFormBaseControl[][] = [
      [
        {
          flexSize: 6,
          label: 'Trường',
          key: 'schoolId',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
        {
          flexSize: 6,
          label: 'Trình độ chuyên môn',
          key: 'qualificationId',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
      ],
      [
        {
          flexSize: 6,
          label: 'Hình thức đào tạo',
          key: 'trainingFormId',
          value: 0,
          controlType: EnumFormBaseContolType.Mcc,
          type: 'number',
          mccData: {
            placeholder: 'Chọn hình thức đào tạo...',
            searchholder: 'Tìm kiếm hình thức đào tạo...',
            form: '',
            fieldName: 'trainingFormId',
            gridDboName: '',
            apiMethod: 'POST',
            apiPath: 'https://api.V2Hrm.online/api/client/profile/getlisttrainingform',
            apiPathGetById: 'https://api.V2Hrm.online/api/client/profile/getotherlistbyid',
            boundField: 'id',
            displayField: 'name',
            shownColumns: [
              {
                accessor: 'id',
                header: 'ID',
                width: 100,
              },
              {
                accessor: 'code',
                header: 'Code',
                width: 100,
              },
              {
                accessor: 'name',
                header: 'Name',
                width: 300,
              },
            ],
            listResponseResultProp: 'result',
            listResponseCountProp: 'count',
          },
          onMccChanged: onEducationChange
        },
        {
          flexSize: 6,
          label: 'Trình độ học vấn',
          key: 'learningLevelId',
          value: 0,
          controlType: EnumFormBaseContolType.Mcc,
          type: 'number',
          mccData: {
            placeholder: 'Chọn hình trình độ học vấn...',
            searchholder: 'Tìm kiếm trình độ học vấn...',
            form: '',
            fieldName: 'learningLevelId',
            gridDboName: '',
            apiMethod: 'POST',
            apiPath: 'https://api.V2Hrm.online/api/client/profile/getlistlearninglevel',
            apiPathGetById: 'https://api.V2Hrm.online/api/client/profile/getotherlistbyid',
            boundField: 'id',
            displayField: 'name',
            shownColumns: [
              {
                accessor: 'id',
                header: 'ID',
                width: 100,
              },
              {
                accessor: 'code',
                header: 'Code',
                width: 100,
              },
              {
                accessor: 'name',
                header: 'Name',
                width: 300,
              },
            ],
            listResponseResultProp: 'result',
            listResponseCountProp: 'count',
          },
          onMccChanged: onEducationChange
        },
      ],
      [
        {
          flexSize: 6,
          label: 'Điểm số',
          key: 'languageMark',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
        {
          flexSize: 6,
          label: 'Ngoại ngữ',
          key: 'language',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text'
        },
      ],

    ];
    return controls;
  }

  getUserBankControls(onBankChange: (e: any) => void): IFormBaseControl[][] {
    const controls: IFormBaseControl[][] = [
      [
        {
          flexSize: 6,
          label: 'Số tài khoản',
          key: 'bankNo',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',
          validators: [
            {
              name: 'pattern',
              validator: Validators.pattern("^(?!^0+$)[a-zA-Z0-9]{3,20}$"),
              errorMessage: "REQUIRED"
            }
          ]
        },
        {
          flexSize: 6,
          label: 'Ngân hàng',
          key: 'bankId',
          value: 0,
          controlType: EnumFormBaseContolType.Mcc,
          type: 'number',
          mccData: {
            placeholder: 'Chọn ngân hàng...',
            searchholder: 'Tìm kiếm ngân hàng...',
            form: '',
            fieldName: 'bankId',
            gridDboName: '',
            apiMethod: 'POST',
            apiPath: 'https://api.V2Hrm.online/api/client/profile/getbanklist',
            apiPathGetById: 'https://api.V2Hrm.online/api/client/profile/getbankbyid',
            boundField: 'id',
            displayField: 'name',
            shownColumns: [
              {
                accessor: 'id',
                header: 'ID',
                width: 100,
              },
              {
                accessor: 'code',
                header: 'Code',
                width: 100,
              },
              {
                accessor: 'name',
                header: 'Name',
                width: 300,
              },
            ],
            listResponseResultProp: 'result',
            listResponseCountProp: 'count',
          },
          onMccChanged: onBankChange
        },
      ],
      [
        {
          flexSize: 12,
          label: 'Chi nhánh',
          key: 'bankBranch',
          value: '',
          controlType: EnumFormBaseContolType.Textbox,
          type: 'text',
        }
      ]
    ];
    return controls;
  }

}
