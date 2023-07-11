import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsilderComponent } from './friendsilder.component';

describe('FriendsilderComponent', () => {
  let component: FriendsilderComponent;
  let fixture: ComponentFixture<FriendsilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
