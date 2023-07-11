import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MccDemoComponent } from './mcc-demo.component';

describe('MccDemoComponent', () => {
  let component: MccDemoComponent;
  let fixture: ComponentFixture<MccDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MccDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MccDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
