import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MccDatatableComponent } from './mcc-datatable.component';

describe('MccDatatableComponent', () => {
  let component: MccDatatableComponent;
  let fixture: ComponentFixture<MccDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MccDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MccDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
