export class TrainingBefore {
  
  id?: number | null;
  employeeId?: number | null; //mã nhân viên
  employeeName?: string | null; //mã nhân viên
  employeeCode?: string | null;
  yearGra?: number | null;
  nameSchools?: string | null;
  fromDate?: Date | null; 
  toDate?: Date | null; 
  certificateTypeId?: number = 0;
  certificateTypeName?: string | null;
  formTrainId?: number = 0;
  formTrainName?: number | null;
  specializedTrainId?:number = 0;
  specializedTrainName?: number | null;
  resultTrain?: string | null;
  effectiveDateFrom?: Date | null; 
  effectiveDateTo?: Date | null; 
  note?: string | null;
  
}
