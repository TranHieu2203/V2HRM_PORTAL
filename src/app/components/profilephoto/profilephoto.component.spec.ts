import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilephotoComponent } from './profilephoto.component';

describe('ProfilephotoComponent', () => {
  let component: ProfilephotoComponent;
  let fixture: ComponentFixture<ProfilephotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilephotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilephotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
