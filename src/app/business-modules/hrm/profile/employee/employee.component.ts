import { Component, OnInit } from '@angular/core';
import { EmployeeInfo } from 'src/app/model/employeeInfo';
import { ProfileEmployeeService } from 'src/app/services/profile-employee.service';
import { OtherListService } from 'src/app/services/other-list.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeInfo!:EmployeeInfo;

  constructor(
    private profileEmployeeService: ProfileEmployeeService,
    private otherListService: OtherListService,

  ) { }

  ngOnInit() {
    
    this.profileEmployeeService.getEmployeeInfo().subscribe((res:any)=>{
      console.log(res)
      if(res.status==200){
        this.employeeInfo = res.body.result;
        console.log("data",this.employeeInfo)
      }
    })
  }

}
