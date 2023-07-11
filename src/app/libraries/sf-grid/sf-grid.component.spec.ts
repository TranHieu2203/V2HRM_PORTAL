import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfGridComponent } from './sf-grid.component';

describe('SfGridComponent', () => {
  let component: SfGridComponent;
  let fixture: ComponentFixture<SfGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
