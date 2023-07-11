import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InschangeComponent } from './inschange.component';

describe('InschangeComponent', () => {
  let component: InschangeComponent;
  let fixture: ComponentFixture<InschangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InschangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InschangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
