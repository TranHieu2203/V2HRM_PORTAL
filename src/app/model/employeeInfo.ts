export class EmployeeInfo {
    id?: number
    code?: string
    firstName?: string
    avatar?: any
    lastName?: string
    fullname?: string
    image?: any
    orgId?: number
    orgName?: string
    orgParentName?: string
    orgManager?: any
    positionId?: number
    positionName?: string
    directManagerId?: any
    genderId?: number
    genderName?: string
    birthDate?: string
    idNo?: any
    idDate?: any
    idPlace?: any
    placeId?:any
    provinceId?: any
    provinceName?: any
    districtId?: any
    districtName?: any
    wardId?: any
    wardName?: any
    religionId?: any
    religionName?: any
    nativeId?: any
    nativeName?: any
    nationalityId?: any
    nationalityName?: any
    address?: any
    birthPlace?: any
    joinDate?: string
    workStatusId?: number
    contractId?: number
    contractCode?: string
    contractDateEffect?: string
    contractDateExpire?: any
    lastWorkingId?: number
    terEffectDate?: any
    itimeCode?: string
    objectSalaryId?: number
    taxCode?: string
    mobilePhone?: string
    workEmail?: string
    email?: string
    maritalStatusId?: any
    passNo?: any
    passDate?: any
    passExpire?: any
    passPlace?: any
    visaNo?: any
    visaDate?: any
    visaExpire?: any
    visaPlace?: any
    workPermit?: any
    workPermitDate?: any
    workPermitExpire?: any
    workPermitPlace?: any
    contactPer?: any
    contactPerPhone?: any
    bankId?: any
    bankBranch?: any
    bankNo?: any
    schoolId?: any;
    qualificationId?: any;
    trainingFormId?: any
    trainingFormName?: any
    learningLevelId?: any
    learningLevelName?: any
    language?: any
    languageMark?: any
    residentId?: any
    salTotal?: number
    curProvinceId?: any
    curProvinceName?: any
    curDistrictId?: any
    curDistrictName?: any
    curWardId?: any
    curAddress?: any
    workNo?: any
    workDate?: any
    workScope?: any
    workPlace?: any
    insRegionId?: number
    insRegionName?: string
    homeAddress?: string; //Địa chỉ
    homeProvinceId?: number;
    homeDistrictId?: number;
    homeWardId?: number;
    experienceId?: number;
    year?: number;
    idNoOld?:string;
    certificateOther?:string;
    isTechcombank?:boolean;
  }
  export class Situation {
    
    id?: number;
    relationshipId?: number = 0;
    relationshipName?: number;
    employeeId?: number;
    name?: string;
    no?: string;
    taxNo?: string;
    familyNo?: string;
    familyName?: string;
    address?: string;
    birth?: any;
    dateStart?: any;
    dateEnd?: any;
    status?:number;
    idFamily?: number;
  }
  
  export class PosPage {
    id?: number;
    empId?: number;
    paperId?: number;
    url?: string;
    note?: string;
    statusId?: boolean;
    dateInput?: Date;
    pageName?: string;
  }
  