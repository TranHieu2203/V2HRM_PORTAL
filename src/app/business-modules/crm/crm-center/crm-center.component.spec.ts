import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCenterComponent } from './crm-center.component';

describe('CrmCenterComponent', () => {
  let component: CrmCenterComponent;
  let fixture: ComponentFixture<CrmCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
