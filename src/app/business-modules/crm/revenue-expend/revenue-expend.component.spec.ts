import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueExpendComponent } from './revenue-expend.component';

describe('RevenueExpendComponent', () => {
  let component: RevenueExpendComponent;
  let fixture: ComponentFixture<RevenueExpendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueExpendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueExpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
