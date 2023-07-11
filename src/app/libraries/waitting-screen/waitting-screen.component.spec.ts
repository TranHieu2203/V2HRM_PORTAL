import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaittingScreenComponent } from './waitting-screen.component';

describe('WaittingScreenComponent', () => {
  let component: WaittingScreenComponent;
  let fixture: ComponentFixture<WaittingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaittingScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaittingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
