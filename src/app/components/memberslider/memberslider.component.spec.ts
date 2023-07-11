import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersliderComponent } from './memberslider.component';

describe('MembersliderComponent', () => {
  let component: MembersliderComponent;
  let fixture: ComponentFixture<MembersliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
