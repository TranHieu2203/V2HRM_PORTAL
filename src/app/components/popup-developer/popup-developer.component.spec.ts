import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeveloperComponent } from './popup-developer.component';

describe('PopupDeveloperComponent', () => {
  let component: PopupDeveloperComponent;
  let fixture: ComponentFixture<PopupDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
