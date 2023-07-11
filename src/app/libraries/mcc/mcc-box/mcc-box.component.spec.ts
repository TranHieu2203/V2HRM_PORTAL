import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MccBoxComponent } from './mcc-box.component';

describe('MccBoxComponent', () => {
  let component: MccBoxComponent;
  let fixture: ComponentFixture<MccBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MccBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MccBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
