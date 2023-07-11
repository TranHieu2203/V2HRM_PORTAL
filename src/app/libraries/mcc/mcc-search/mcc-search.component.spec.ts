import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MccSearchComponent } from './mcc-search.component';

describe('MccSearchComponent', () => {
  let component: MccSearchComponent;
  let fixture: ComponentFixture<MccSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MccSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MccSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
