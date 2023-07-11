import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

import { LibrariesModule } from 'src/app/libraries.module';

import { AccountRoutingModule } from './account-routing.module';

import { AccountCenterComponent } from './account-center/account-center.component';
import { MainComponent } from './main/main.component';
import { MoreComponent } from './more/more.component';
import { EducationComponent } from './education/education.component';
import { UserBankComponent } from './user-bank/user-bank.component';
import { SituationComponent } from './situation/situation.component';
import { PaperComponent } from './paper/paper.component';
import { BonusComponent } from './bonus/bonus.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { ContractComponent } from './contract/contract.component';
import { WorkingComponent } from './working/working.component';
import { InschangeComponent } from './inschange/inschange.component';

@NgModule({
  declarations: [
    AccountCenterComponent,
    MainComponent,
    MoreComponent,
    EducationComponent,
    UserBankComponent,
    SituationComponent,
    PaperComponent,
    BonusComponent,
    DisciplineComponent,
    ContractComponent,
    WorkingComponent,
    InschangeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccordionModule,
    LibrariesModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
